import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'authentificatedPages/rootReducer';
import TextField from 'components/TextField';
// import Spinner from 'react-bootstrap/Spinner';

import { searchCards } from './slice';
import CardList from './CardList';

export default (): JSX.Element => {
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
      <CardList />
      {/* {loading ? <Spinner animation="border" /> : null} */}
    </>
  );
};
