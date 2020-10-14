import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { Card } from 'mtgsdk-ts';

import { RootState } from 'authentificatedPages/rootReducer';
import Cards from 'components/Cards';

type AppProps = {
  canAddCard?: (card: Card) => boolean;
  addCard?: (card: Card) => void;
  canRemoveCard?: (card: Card) => boolean;
  removeCard?: (card: Card) => void;
};

export default ({
  canAddCard = (): boolean => false,
  addCard = (): null => null,
  canRemoveCard = (): boolean => false,
  removeCard = (): null => null,
}: AppProps): JSX.Element => {
  const searchState = useSelector((state: RootState) => state.searchCards);
  const { loading, cardsFound } = searchState;

  if (loading) return <Spinner animation="border" />;

  return (
    <Cards
      cards={cardsFound}
      canAddCard={canAddCard}
      addCard={addCard}
      canRemoveCard={canRemoveCard}
      removeCard={removeCard}
    />
  );
};
