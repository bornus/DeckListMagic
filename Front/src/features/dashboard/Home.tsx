import React from 'react';
import { API, Auth } from 'aws-amplify';

export type TestApiType = {
  body: object;
  path: string;
};

const testApi = async ({ body, path }: TestApiType): Promise<void> => {
  try {
    const apiName = 'api';
    const Authorization = `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`;
    const data = {
      body: body,
      headers: {
        Authorization,
      },
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
      Action pour tester la création d'un event :
      <button
        onClick={(): Promise<void> =>
          testApi({
            path: '/event',
            body: {
              EventName: 'EventName-Test',
              TournamentName: 'TournamentName-Test',
              Format: 'Format-Test',
              Date: new Date(),
              EventId: 'EventId-Test',
              TournamentId: 'TournamentId-Test',
              RegisterCode: 'RegisterCode-Test',
            },
          })
        }
      >
        Test api - Create event
      </button>
    </div>
  );
};
