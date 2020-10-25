import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import { RootState } from 'authentificatedPages/rootReducer';
import Cards from './InlineCards';

type AppProps = { className?: string | undefined };
export default ({ className }: AppProps): JSX.Element => {
  const state = useSelector((state: RootState) => state.deckCreation);
  const { loading, deckListConfig, selectedList } = state;

  if (loading) return <Spinner animation="border" className={className} />;
  if (!deckListConfig) return <div className={className}>No deck config</div>;

  const { lists, maxCards } = deckListConfig;

  if (!lists[selectedList].length)
    return (
      <div className={className}>
        <span>Cards: 0/{maxCards}</span>
        No card
      </div>
    );

  const nbSelectedCards = lists[selectedList].reduce((sum, card) => sum + card.quantity, 0);

  return (
    <>
      <span>
        Cards: {nbSelectedCards}/{maxCards}
      </span>
      <Cards cards={lists[selectedList]} className={className} />
    </>
  );
};
