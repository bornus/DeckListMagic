import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'mtgsdk-ts';

import { RootState } from 'authentificatedPages/rootReducer';
import TextField from 'components/TextField';
// import Spinner from 'react-bootstrap/Spinner';

import { searchCards } from './slice';
import CardList from './CardList';

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
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootState) => state.searchCards);
  const { loading, error } = searchState;

  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    dispatch(searchCards(e.target.value));
  };

  return (
    <>
      Rechercher une carte
      <TextField name="cardText" type="text" placeholder="Force of will" errors={{}} onBlur={onUpdate} />
      <CardList canAddCard={canAddCard} addCard={addCard} canRemoveCard={canRemoveCard} removeCard={removeCard} />
    </>
  );
};
