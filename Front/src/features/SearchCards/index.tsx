import React from 'react';
import { useDispatch } from 'react-redux';
import { Card } from 'mtgsdk-ts';
import { useDebounce } from 'react-use';

import TextField from 'components/TextField';
// import Spinner from 'react-bootstrap/Spinner';

import { searchCards } from './slice';
import CardList from './CardList';
import styles from './style.module.scss';

type AppProps = {
  className?: string;
  canAddCard?: (card: Card) => boolean;
  addCard?: (card: Card) => void;
  canRemoveCard?: (card: Card) => boolean;
  removeCard?: (card: Card) => void;
};

export default ({
  className,
  canAddCard = (): boolean => false,
  addCard = (): null => null,
  canRemoveCard = (): boolean => false,
  removeCard = (): null => null,
}: AppProps): JSX.Element => {
  const dispatch = useDispatch();
  const [val, setVal] = React.useState('');
  const [,] = useDebounce(
    () => {
      dispatch(searchCards(val));
    },
    800,
    [val]
  );

  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setVal(e.target.value);
  };

  return (
    <div className={className}>
      Rechercher une carte
      <TextField
        className={styles['searchCards__input']}
        name="cardText"
        type="text"
        placeholder="Nom de la carte"
        errors={{}}
        onChange={onUpdate}
      />
      <CardList canAddCard={canAddCard} addCard={addCard} canRemoveCard={canRemoveCard} removeCard={removeCard} />
    </div>
  );
};
