import React from 'react';
import classnames from 'classnames';

import NoCard from 'components/NoCard';

import styles from './style.module.scss';

type AppProps = {
  url: string;
  alt: string;
  className: string;
};
export default ({ url, alt, className }: AppProps): JSX.Element =>
  url ? <img alt={alt} className={classnames(styles['card-image'], className)} src={url} /> : <NoCard alt={alt} />;
