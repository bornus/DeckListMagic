import React from 'react';
import { API } from 'aws-amplify';

const testApi = async (): Promise<void> => {
  try {
    const apiName = 'api';
    const path = 'newsletter/subscribe';
    const data = {
      body: {},
    };

    const { statusCode, ...rest } = await API.post(apiName, path, data);
    if (statusCode === 200) {
      console.log('Success', rest);
    } else {
      console.error('Error', rest);
    }
  } catch (e) {
    console.error(e);
  }
};

export default (): JSX.Element => {
  console.log('Homepage');
  return (
    <div className="w-100">
      <h1>Home page</h1>
      <button onClick={testApi}>Test api</button>
    </div>
  );
};
