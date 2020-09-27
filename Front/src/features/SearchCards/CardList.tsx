import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import { RootState } from 'authentificatedPages/rootReducer';
import Card from './Card';

import styles from './card-list.module.scss';

export default (): JSX.Element => {
  const searchState = useSelector((state: RootState) => state.searchCards);
  const { loading, cardsFound } = searchState;

  if (loading) return <Spinner animation="border" />;

  console.log('Array', cardsFound);
  return (
    <div className={styles.cards}>
      {cardsFound.map((card, i) => (
        <Card card={card} key={i} />
      ))}
    </div>
  );
};
