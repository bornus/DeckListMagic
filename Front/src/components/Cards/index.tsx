import React from 'react';
import { Card } from 'mtgsdk-ts';

import CardCompo from '../SmallCard';
import SmallCardCompo from '../SmallCard';
import styles from './style.module.scss';

type AppProps = {
  cards: Card[];
  className?: string | undefined;
  small?: boolean | undefined;
};
export default ({ cards, className, small }: AppProps): JSX.Element => (
  <div className={styles.cards + ' ' + (className || '')}>
    {cards.map((card, i) => (small ? <SmallCardCompo card={card} key={i} /> : <CardCompo card={card} key={i} />))}
  </div>
);
