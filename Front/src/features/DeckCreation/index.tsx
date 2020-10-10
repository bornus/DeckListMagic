import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { RootState } from 'authentificatedPages/rootReducer';
import SearchCards from 'features/SearchCards';
// import Spinner from 'react-bootstrap/Spinner';
import MainDeck from './MainDeck';

import { newDeck } from './slice';
import styles from './style.module.scss';

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
        La suite
      </div>

      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <SearchCards />
        </div>
        <MainDeck className={styles.deckContainer} /> 
      </div>
    </div>
  );
};
