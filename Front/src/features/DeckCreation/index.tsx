import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Card } from 'mtgsdk-ts';
import classNames from 'classnames';

import { RootState } from 'authentificatedPages/rootReducer';
import SearchCards from 'features/SearchCards';
// import Spinner from 'react-bootstrap/Spinner';
import Deck from './Deck';

import { newDeck, addCard, removeCard } from './slice';
import styles from './style.module.scss';
import { Commander } from './deckTypes/commander';
import { Test } from './deckTypes/test';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootState) => state.deckCreation);
  const { deckConfig, lists, selectedList } = searchState;

  const iniCommanderDeck = (): void => {
    dispatch(newDeck(new Commander()));
  };
  const iniTestDeck = (): void => {
    dispatch(newDeck(new Test()));
  };

  const currentDeck = lists[selectedList].map(({ name }) => name);
  const canAddCard = (card: Card): boolean => {
    if (!deckConfig) return false;
    return true;
    // return currentDeck.indexOf(card.id) == -1;
  };
  const canRemoveCard = (card: Card): boolean => {
    if (!deckConfig) return false;
    return currentDeck.indexOf(card.name) >= 0;
  };

  return (
    <div>
      <div>Deck name</div>
      <div>
        Deck action (save, load, ...)
        <Button variant="primary" className="mt-4" size="lg" onClick={iniCommanderDeck}>
          Init commander deck
        </Button>
        <Button variant="primary" className="mt-4" size="lg" onClick={iniTestDeck}>
          Init test deck
        </Button>
        La suite
      </div>

      {deckConfig ? (
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <SearchCards
              canAddCard={canAddCard}
              addCard={(card: Card): void => {
                dispatch(addCard(card));
              }}
              canRemoveCard={canRemoveCard}
              removeCard={(card: Card): void => {
                dispatch(removeCard(card));
              }}
            />
          </div>
          <Deck />
        </div>
      ) : null}
    </div>
  );
};
