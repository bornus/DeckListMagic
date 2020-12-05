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
  if (!deckListConfig) return null;

  return (
    <ul className="nav nav-pills nav-fill">
      {['main', 'side'].map((name, key) => (
        <li className="nav-item" key={key}>
          <div
            role="link"
            className={classNames('nav-link', key === selectedList ? 'active' : '')}
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

type AppProps = {
  className?: string;
};
export default ({ className }: AppProps): JSX.Element | null => {
  const state = useSelector((state: RootState) => state.deckCreation);
  const { deckListConfig } = state;

  if (!deckListConfig) return null;

  return (
    <div className={classNames(className, "bg-light")}>
      <DeckTabs />
      <DeckList className={classNames(styles.deckContainer, 'bd-sidebar')} />
    </div>
  );
};
