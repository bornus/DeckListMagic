import React from 'react';
import classnames from 'classnames';

import NoCard from 'components/NoCard';

import styles from './style.module.scss';

type AppProps = {
  url: string;
  className: string;
};
export default ({ url, className }: AppProps): JSX.Element =>
  url ? <img className={classnames(styles['card-image'], className)} src={url} /> : <NoCard />;
