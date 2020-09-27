import React from 'react';

import { Card } from 'mtgsdk-ts';

import styles from './card-list.module.scss';

type AppProps = { card: Card };
export default ({ card }: AppProps): JSX.Element => (
  <div style={{ width: '100px', height: '200px' }} className={styles.card}>
    <span>{card.name}</span>
    <img style={{ height: '100%', width: '100%' }} src={card.imageUrl} />
  </div>
);
