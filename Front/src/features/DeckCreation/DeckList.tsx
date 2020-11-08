import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { RootState } from 'authentificatedPages/rootReducer';
import DeckList from './Deck';

import { selectDeck } from './slice';
import styles from './style.module.scss';

const DeckTabs = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.deckCreation);
  const { deckListConfig, selectedList } = state;
  if (!deckListConfig || deckListConfig.listCount === 0) return null;

  const { listConfig } = deckListConfig;
  return (
    <ul className="nav nav-pills nav-fill">
      {listConfig.map((name, key) => (
        <li className="nav-item" key={key}>
          <div
            role="link"
            className={classNames('nav-link active', key === selectedList ? 'active' : '')}
            onClick={(): void => {
              dispatch(selectDeck(key));
            }}
          >
            {name}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default (): JSX.Element | null => {
  const state = useSelector((state: RootState) => state.deckCreation);
  const { deckListConfig } = state;

  if (!deckListConfig) return null;

  return (
    <div>
      <DeckTabs />
      <DeckList className={classNames(styles.deckContainer, 'bd-sidebar')} />
    </div>
  );
};
