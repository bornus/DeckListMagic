import React, { useState } from 'react';
import { API, Auth } from 'aws-amplify';

export type TestApiType = {
  body: object;
  path: string;
  verb?: string;
};

const testApi = async ({ body, path, verb = 'POST' }: TestApiType): Promise<string> => {
  try {
    const apiName = 'api';
    const Authorization = `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`;
    const data = {
      body: body,
      headers: {
        Authorization,
      },
    };

    const rest =
      verb === 'PUT' ? await API.put(apiName, path, data) : await API.post(apiName, path, data);

    console.log('Success', rest);
    return JSON.stringify(rest);
  } catch (e) {
    console.error(e);
    return e.toString();
  }
};

export default (): JSX.Element => {
  console.log('Homepage');
  const [result, setResult] = useState('');

  return (
    <div className="w-100">
      <h1>Home page</h1>
      <p>Résultat : {result}</p>
      Action pour tester la création d'un event :
      <button
        onClick={async (): Promise<void> =>
          setResult(
            await testApi({
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
            }),
          )
        }
      >
        Test api - Create event
      </button>
      Test save DeckList
      <button
        onClick={async (): Promise<void> =>
          setResult(
            await testApi({
              path: '/deck',
              // verb: 'POST',
              body: {
                Name: "Toto",
                Format: "Modern",
                Author: "Moi",
                MainDeck: [{ name: "firstCard", id: "bolt", quantity: 1 }],
                SideDeck: [{ name: "SideCard", id: "boltSide", quantity: 100 }],
              },
            }),
          )
        }
      >
        Test api - Create Deck
      </button>
    </div>
  );
};
