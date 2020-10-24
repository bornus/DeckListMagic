import React from 'react';
import { EnhancedCard } from '../types';

import InlineCard from '../InlineCard';
import styles from './style.module.scss';

type AppProps = {
  cards: EnhancedCard[];
  className?: string | undefined;
};
export default ({ cards, className }: AppProps): JSX.Element => (
  <div className={styles.cards + ' ' + (className || '')}>
    {cards.map((card, i) => (
      <InlineCard card={card} key={i} />
    ))}
  </div>
);
