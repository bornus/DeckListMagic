import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { RootState } from 'authentificatedPages/rootReducer';
import MainDeck from './MainDeck';
import SideDeck from './SideDeck';

import { selectDeck } from './slice';
import styles from './style.module.scss';
import { SelectedDeck, EnhancedCard } from './types';

export default (): JSX.Element | null => {
  const dispatch = useDispatch();
  const searchState = useSelector((state: RootState) => state.deckCreation);
  const { deck, loading, error } = searchState;

  if (!deck) return null;

  const { selected, mainDeck, sideDeck } = deck;
  const currentDeck: EnhancedCard[] = selected === SelectedDeck.side ? sideDeck : mainDeck;
  const currentDeckIds: string[] = currentDeck.map(({ name }) => name);

  return (
    <div>
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <a
            className={classNames('nav-link active', deck.selected === SelectedDeck.main ? 'active' : '')}
            onClick={(): void => {
              dispatch(selectDeck(SelectedDeck.main));
            }}
            href="#"
          >
            Main
          </a>
        </li>
        <li className="nav-item">
          <a
            className={classNames('nav-link active', deck.selected === SelectedDeck.side ? 'active' : '')}
            onClick={(): void => {
              dispatch(selectDeck(SelectedDeck.side));
            }}
            href="#"
          >
            Side
          </a>
        </li>
      </ul>

      {deck.selected === SelectedDeck.main ? (
        <MainDeck className={classNames(styles.deckContainer, 'bd-sidebar')} />
      ) : (
        <SideDeck className={classNames(styles.deckContainer, 'bd-sidebar')} />
      )}
    </div>
  );
};
