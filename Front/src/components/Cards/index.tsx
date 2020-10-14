import React from 'react';
import { Card } from 'mtgsdk-ts';

import CardCompo from '../Card';
import SmallCardCompo from '../SmallCard';
import styles from './style.module.scss';

type AppProps = {
  cards: Card[];
  className?: string | undefined;
  small?: boolean | undefined;
  canAddCard?: (card: Card) => boolean;
  addCard?: (card: Card) => void;
  canRemoveCard?: (card: Card) => boolean;
  removeCard?: (card: Card) => void;
};
export default ({
  cards,
  className,
  small,
  canAddCard = (): boolean => false,
  addCard = (): null => null,
  canRemoveCard = (): boolean => false,
  removeCard = (): null => null,
}: AppProps): JSX.Element => (
  <div className={styles.cards + ' ' + (className || '')}>
    {cards.map((card, i) =>
      small ? (
        <SmallCardCompo card={card} key={i} />
      ) : (
        <CardCompo
          card={card}
          key={i}
          canAddCard={canAddCard}
          addCard={addCard}
          canRemoveCard={canRemoveCard}
          removeCard={removeCard}
        />
      ),
    )}
  </div>
);
