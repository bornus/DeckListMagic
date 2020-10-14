import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import { RootState } from 'authentificatedPages/rootReducer';
import Cards from 'components/Cards';

type AppProps = { className?: string | undefined };
export default ({ className }: AppProps): JSX.Element => {
  const searchState = useSelector((state: RootState) => state.deckCreation);
  const { loading, deck } = searchState;

  if (loading) return <Spinner animation="border" className={className} />;
  if (!deck || !deck.mainDeck || !deck.mainDeck.length) return <div className={className}>No card</div>;

  return <Cards cards={deck.mainDeck} className={className} small />;
};
