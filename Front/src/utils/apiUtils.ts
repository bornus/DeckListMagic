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

export type HeaderLinks = {
  first?: string;
  next?: string;
  last?: string;
};
type DynamicObject = {
  [key: string]: any;
};
export const decodeLinksFromHeader = (link: string): HeaderLinks => {
  if (!link) return {};
  // <https://api.magicthegathering.io/v1/cards?name=b&page=111>; rel="last", <https://api.magicthegathering.io/v1/cards?name=b&page=2>; rel="next"

  // Cast as HeaderLinks
  return {
    ...link.split(',').reduce((acc: DynamicObject, val) => {
      const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/gi.exec(val);
      if (linkInfo && linkInfo.length >= 2) acc[linkInfo[2]] = linkInfo[1];
      return acc;
    }, {}),
  };
};
