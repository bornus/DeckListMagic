import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Card } from 'mtgsdk-ts';

import { RootState } from 'authentificatedPages/rootReducer';
import SearchCards from 'features/SearchCards';
// import Spinner from 'react-bootstrap/Spinner';
import DeckList from './DeckList';

import { newDeck, addCard, removeCard } from './slice';
import styles from './style.module.scss';
import Mordern from 'models/deckTypes/modern';

export default (): JSX.Element | null => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.deckCreation);
  const { deckListConfig, selectedList } = state;

  const iniMordernDeck = (): void => {
    dispatch(newDeck(new Mordern({ name: "Test" + (Math.random()*1000) })));
  };

  let currentDeck: string[];
  if (deckListConfig) {
    const { mainDeck, sideDeck } = deckListConfig;
    switch (selectedList) {
      case 0:
        currentDeck = mainDeck.map(({ name }) => name);
        break;
      case 1:
        currentDeck = sideDeck.map(({ name }) => name);
        break;
    }
  }

  const onAddCard = (card: Card): void => {
    if (!deckListConfig) return;
    dispatch(addCard(card));
  };

  const canAddCard = (card: Card): boolean => {
    if (!deckListConfig) return false;
    switch (selectedList) {
      case 0:
        return deckListConfig.canAddCardToMainDeck(card);
      case 1:
        return deckListConfig.canAddCardToSideDeck(card);
    }

    return true;
  };
  
  const canRemoveCard = (card: Card): boolean => {
    if (!deckListConfig) return false;
    return currentDeck.indexOf(card.name) >= 0;
  };

  return (
    <div>
      <div>Deck name</div>
      <div>
        Deck action (save, load, ...)
        <Button variant="primary" className="mt-4" size="lg" onClick={iniMordernDeck}>
          Init commander deck
        </Button>
        {/* <Button variant="primary" className="mt-4" size="lg" onClick={iniTestDeck}>
          Init test deck
        </Button> */}
        {/* La suite */}
      </div>

      {deckListConfig ? (
        // <div className={styles.container}>
        // <div className={styles.searchContainer}>
        <div className="row">
          <SearchCards
            className="col-9"
            canAddCard={canAddCard}
            addCard={onAddCard}
            canRemoveCard={canRemoveCard}
            removeCard={(card: Card): void => {
              dispatch(removeCard(card));
            }}
          />
          <DeckList className="col-3" />
        </div>
      ) : null}
    </div>
  );
};
