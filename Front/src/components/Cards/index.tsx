import React from 'react';
import { Card } from 'mtgsdk-ts';

import CardCompo from '../Card';
import styles from './style.module.scss';

type AppProps = { cards: Card[] };
export default ({ cards }: AppProps): JSX.Element => (
  <div className={styles.cards}>
    {cards.map((card, i) => (
      <CardCompo card={card} key={i} />
    ))}
  </div>
);
