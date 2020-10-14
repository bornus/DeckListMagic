import React from 'react';
import { Card } from 'mtgsdk-ts';

import styles from './style.module.scss';

type AppProps = {
  card: Card;
};
export default ({ card }: AppProps): JSX.Element => (
  <div className={styles.card}>
    <span className={styles['card-imageContainer']}>
      <img
        className={styles['card-image']}
        src={card.imageUrl || 'https://via.placeholder.com/50x70.png?text=Image non trouvée'}
      />
    </span>
    {card.name}
  </div>
);
