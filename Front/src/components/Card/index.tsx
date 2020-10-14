import React from 'react';
import { Card } from 'mtgsdk-ts';

import styles from './style.module.scss';

type AppProps = {
  card: Card;
  canAddCard?: (card: Card) => boolean;
  addCard?: (card: Card) => void;
  canRemoveCard?: (card: Card) => boolean;
  removeCard?: (card: Card) => void;
};
export default ({
  card,
  canAddCard = (): boolean => false,
  addCard = (): null => null,
  canRemoveCard = (): boolean => false,
  removeCard = (): null => null,
}: AppProps): JSX.Element => (
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
        {canAddCard(card) ? (
          <li className={styles['card-add']}>
            <button onClick={(): void => addCard(card)}>
              <i className="fas fa-add" aria-hidden="true"></i> Add
            </button>
          </li>
        ) : null}
        {canRemoveCard(card) ? (
          <li className={styles['card-delete']}>
            <button onClick={(): void => removeCard(card)}>
              <i className="fas fa-delete" aria-hidden="true"></i> Add
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  </div>
);
