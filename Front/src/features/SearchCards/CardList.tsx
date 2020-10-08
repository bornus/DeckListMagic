import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import { RootState } from 'authentificatedPages/rootReducer';
import Cards from 'components/Cards';

export default (): JSX.Element => {
  const searchState = useSelector((state: RootState) => state.searchCards);
  const { loading, cardsFound } = searchState;

  if (loading) return <Spinner animation="border" />;

  return <Cards cards={cardsFound} />;
};
