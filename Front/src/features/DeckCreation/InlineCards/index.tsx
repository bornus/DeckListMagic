import React from 'react';
import classnames from 'classnames';

import { EnhancedCard } from 'models/deckTypes';

import InlineCard from '../InlineCard';
import styles from './style.module.scss';

type AppProps = {
  cards: EnhancedCard[];
  className?: string | undefined;
};
export default ({ cards, className }: AppProps): JSX.Element => (
  <div className={classnames(styles.cards, 'text-left', className)}>
    {cards.map((card, i) => (
      <InlineCard card={card} key={i} />
    ))}
  </div>
);
