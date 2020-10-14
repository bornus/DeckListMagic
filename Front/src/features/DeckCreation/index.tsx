import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Card } from 'mtgsdk-ts';

import { RootState } from 'authentificatedPages/rootReducer';
import SearchCards from 'features/SearchCards';
// import Spinner from 'react-bootstrap/Spinner';
import MainDeck from './MainDeck';

import { newDeck, addCardToMainDeck, addCardToSideDeck } from './slice';
import styles from './style.module.scss';
import { SelectedDeck, EnhancedCard } from './types';

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

    if (selected === SelectedDeck.side) currentDeck = sideDeck.map(({ id }) => id);
    currentDeck = mainDeck.map(({ id }) => id);
  }

  const canAddCard = (card: Card): boolean => {
    if (!deck) return false;
    return currentDeck.indexOf(card.id) == -1;
  };
  const addCard = (card: Card): void => {
    if (!deck) return;
    const { selected } = deck;

    if (selected === SelectedDeck.main) dispatch(addCardToMainDeck(card));
    else dispatch(addCardToSideDeck(card));
  };
  const canRemoveCard = (card: Card): boolean => {
    if (!deck) return false;
    return currentDeck.indexOf(card.id) >= 0;
  };
  const removeCard = (card: Card): void => {
    if (!deck) return;
    const { selected } = deck;

    if (selected === SelectedDeck.main) dispatch(addCardToMainDeck(card));
    else dispatch(addCardToSideDeck(card));
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
          <MainDeck className={styles.deckContainer} />
        </div>
      ) : null}
    </div>
  );
};
