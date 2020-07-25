import React from 'react';

import styles from './step-number.module.scss';

interface Props {
  number: string;
}

export default function Number({ number }: Props) {
  return <span className={styles.container}>{number}</span>;
}
