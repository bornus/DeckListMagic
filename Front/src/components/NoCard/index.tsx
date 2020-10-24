import React from 'react';

import styles from './style.module.scss';

interface Props {
  alt?: string;
}

export default ({ alt }: Props): JSX.Element => (
  <img alt={alt || 'Unknown'} className={styles['noCard']} src={'/images/nocard.jpg'} />
);
