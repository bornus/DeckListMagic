import React from 'react';
import { Card } from 'mtgsdk-ts';

import styles from './style.module.scss';

type AppProps = { card: Card };
export default ({ card }: AppProps): JSX.Element => (
  <div className={styles.card}>
    <img
      className={styles['card-image']}
      src={card.imageUrl || 'https://via.placeholder.com/265x370.png?text=Image non trouvée'}
    />

    <div className={styles['card-type']}>
      <span className="visually-hidden">Info?</span>
      <i className="fas fa-clone" aria-hidden="true"></i>
    </div>
    <div className={styles['card-info']}>
      <ul>
        <li className={styles['card-name']}>
          <span>{card.name}</span>
        </li>
        <li className={styles['card-add']}>
          <button>
            <i className="fas fa-add" aria-hidden="true"></i> Add
          </button>
        </li>
      </ul>
    </div>
  </div>
);
