import { API, Auth } from 'aws-amplify';

type apiCall = {
  body: object;
  path: string;
};

type getCall = {
  path: string;
};

const apiName = 'api';

export const getAuthorization = async (): Promise<string> =>
  `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`;

export const putAction = async ({ body, path }: apiCall): Promise<any> =>
  await API.put(apiName, path, {
    body,
    headers: {
      Authorization: getAuthorization,
    },
  });

export const postAction = async ({ body, path }: apiCall): Promise<any> =>
  await API.post(apiName, path, {
    body,
    headers: {
      Authorization: getAuthorization,
    },
  });

export const getAction = async ({ path }: getCall): Promise<any> =>
  await API.get(apiName, path, {
    headers: {
      Authorization: getAuthorization,
    },
  });
