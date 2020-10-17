import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { RootState } from 'authentificatedPages/rootReducer';
import DeckList from './DeckList';

import { selectDeck } from './slice';
import styles from './style.module.scss';

const DeckTabs = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.deckCreation);
  const { deckConfig, selectedList } = state;
  if (!deckConfig || deckConfig.listCount === 0) return null;

  const { listNames } = deckConfig;
  return (
    <ul className="nav nav-pills nav-fill">
      {listNames.map((name, key) => (
        <li className="nav-item" key={key}>
          <a
            className={classNames('nav-link active', key === selectedList ? 'active' : '')}
            onClick={(): void => {
              dispatch(selectDeck(key));
            }}
            href="#"
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default (): JSX.Element | null => {
  const state = useSelector((state: RootState) => state.deckCreation);
  const { deckConfig } = state;

  if (!deckConfig) return null;

  return (
    <div>
      <DeckTabs />
      <DeckList className={classNames(styles.deckContainer, 'bd-sidebar')} />
    </div>
  );
};
