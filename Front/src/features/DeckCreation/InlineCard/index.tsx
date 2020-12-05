import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'authentificatedPages/rootReducer';

import { EnhancedCard } from 'models/deckTypes';
import styles from './style.module.scss';

type AppProps = {
  card: EnhancedCard;
};
export default ({ card }: AppProps): JSX.Element | null => {
  const state = useSelector((state: RootState) => state.deckCreation);
  const { deckListConfig } = state;

  if (!deckListConfig) return null;

  const { maxCardsPerName } = deckListConfig;
  const { types, supertypes } = card;
  
  let quantity = `(${card.quantity}/${maxCardsPerName})`;
  if (types && supertypes && types.includes('Land') && supertypes.includes('Basic')) {
    quantity = `(${card.quantity})`;
  }

  return (
    <div className={styles.card}>
      <span className={styles['card-imageContainer']}>
        <img
          alt={card.name}
          className={styles['card-image']}
          src={card.imageUrl || 'https://via.placeholder.com/50x70.png?text=Image non trouvée'}
        />
      </span>
      <span style={{float:'right'}}>
        {card.name} {quantity}
      </span>
    </div>
  );
};
