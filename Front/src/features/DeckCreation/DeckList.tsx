import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import { RootState } from 'authentificatedPages/rootReducer';
import Cards from 'components/Cards';

type AppProps = { className?: string | undefined };
export default ({ className }: AppProps): JSX.Element => {
  const state = useSelector((state: RootState) => state.deckCreation);
  const { loading, deckConfig, lists, selectedList } = state;

  if (loading) return <Spinner animation="border" className={className} />;
  if (!deckConfig || !lists[selectedList].length) return <div className={className}>No card</div>;

  return <Cards cards={lists[selectedList]} className={className} small />;
};
