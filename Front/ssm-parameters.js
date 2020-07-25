const AWS = require('aws-sdk');
const proxy = require('proxy-agent');
const fs = require('fs');
const _ = require('lodash');

const opts = process.env.HTTP_PROXY ? { httpOptions: { agent: proxy(process.env.HTTP_PROXY) } } : {};
AWS.config.update(opts);

const PATH = __dirname + '/.env';

// Get all env keys (unique) if the .env file exists and returns them in an array, ex: ['KEY1', 'KEY2']
function getExistingLocalEnvKeys() {
  let params = [];
  if (fs.existsSync(PATH)) {
    const str = fs.readFileSync(PATH, { encoding: 'utf8' });
    params = Array.from(
      new Set(
        str
          .split('\n')
          .filter((x) => x !== '')
          .map((x) => x.split('=')[0]),
      ),
    );
  }

  return params;
}

// Not used atm, we have to fix AWS rights in order to be able to use SSM Parameter Store
async function loadEnvironment() {
  const ssmService = new AWS.SSM({ region: 'eu-west-1' });

  const allParams = (
    await ssmService
      .describeParameters({
        MaxResults: 50,
      })
      .promise()
  ).Parameters.map(({ Name }) => Name);

  const chunkParams = _.chunk(allParams, 10);
  const promises = chunkParams.map((Names) => ssmService.getParameters({ Names, WithDecryption: true }).promise());

  const parameters = _.flatMap((await Promise.all(promises)).map(({ Parameters }) => Parameters));

  const existingLocalKeys = getExistingLocalEnvKeys();

  return (
    parameters
      // do not set env variables which already exists in the .env file (allow us to override locally some vars)
      .filter(({ Name }) => !existingLocalKeys.includes(`REACT_APP_${Name}`))
      .map(({ Name, Value }) => `REACT_APP_${Name}=${Value}`)
  );
}

async function mergeOrCreateEnvFile() {
  console.log('START -    Fetching SSM Parameters...');
  const ssmParameters = await loadEnvironment();
  const ssmParametersString = ssmParameters.join('\n');

  if (fs.existsSync(PATH)) {
    console.log('START -    Appending non-existing keys');
    fs.appendFileSync(PATH, '\n' + ssmParametersString);
    console.log('END   -    Appending non-existing keys');
  } else {
    console.log('START -    Creating .env file with SSM Keys');
    fs.writeFileSync(PATH, ssmParametersString, { flag: 'wx' });
    console.log('END   -    Creating .env file with SSM Keys');
  }

  console.log('END   -    Fetching SSM Parameters...');
}

mergeOrCreateEnvFile();
