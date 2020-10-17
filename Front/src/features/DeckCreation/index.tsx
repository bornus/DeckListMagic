import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Card } from 'mtgsdk-ts';
import classNames from 'classnames';

import { RootState } from 'authentificatedPages/rootReducer';
import SearchCards from 'features/SearchCards';
// import Spinner from 'react-bootstrap/Spinner';
import Deck from './Deck';

import { newDeck, addCardToMainDeck, addCardToSideDeck, removeCardToMainDeck, removeCardToSideDeck } from './slice';
import styles from './style.module.scss';
import { SelectedDeck } from './types';

export default (): JSX.Element => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootState) => state.deckCreation);
  const { deck, loading, error } = searchState;

  const iniNewDeck = (): void => {
    dispatch(newDeck());
  };

  let currentDeck: string[] = [];
  if (deck) {
    const { selected, mainDeck, sideDeck } = deck;
    currentDeck = (selected === SelectedDeck.side ? sideDeck : mainDeck).map(({ name }) => name);
  }

  const canAddCard = (card: Card): boolean => {
    if (!deck) return false;
    return true;
    // return currentDeck.indexOf(card.id) == -1;
  };
  const addCard = (card: Card): void => {
    if (!deck) return;
    const { selected } = deck;

    if (selected === SelectedDeck.main) dispatch(addCardToMainDeck(card));
    else dispatch(addCardToSideDeck(card));
  };
  const canRemoveCard = (card: Card): boolean => {
    if (!deck) return false;
    return currentDeck.indexOf(card.name) >= 0;
  };
  const removeCard = (card: Card): void => {
    if (!deck) return;
    const { selected } = deck;

    if (selected === SelectedDeck.main) dispatch(removeCardToMainDeck(card));
    else dispatch(removeCardToSideDeck(card));
  };

  return (
    <div>
      <div>Deck name</div>
      <div>
        Deck action (save, load, ...)
        <Button variant="primary" className="mt-4" size="lg" onClick={iniNewDeck}>
          Init new deck
        </Button>
        La suite
      </div>

      {deck ? (
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <SearchCards
              canAddCard={canAddCard}
              addCard={addCard}
              canRemoveCard={canRemoveCard}
              removeCard={removeCard}
            />
          </div>
          <Deck />
        </div>
      ) : null}
    </div>
  );
};
