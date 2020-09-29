import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { RootState } from 'authentificatedPages/rootReducer';
import TextField from 'components/TextField';
// import Spinner from 'react-bootstrap/Spinner';

import { newDeck } from './slice';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootState) => state.deckCreation);
  const { loading, error } = searchState;

  const iniNewDeck = (): void => {
    dispatch(newDeck());
  };

  return (
    <div>
      <div>Rechercher une carte</div>
      <div>Deck name</div>
      <div>Main deck</div>
      <div>Side deck</div>
      <div>
        Deck action (save, load, ...)
        <Button variant="primary" className="mt-4" size="lg" onClick={iniNewDeck}>
          Init new deck
        </Button>
      </div>
    </div>
  );
};
