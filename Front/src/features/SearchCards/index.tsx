import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Card } from 'mtgsdk-ts';
import { useDebounce } from 'react-use';
import * as yup from 'yup';

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

const schema = yup.object().shape({
  cardText: yup.string().min(3, '3 caractères minimum'),
});

interface Form {
  cardText: string;
}

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
      if(val.length >= 3) {
        dispatch(searchCards(val));
      }
    },
    800,
    [val]
  );

  const {
    register,
    errors,
    formState: { touched, isValid },
  } = useForm<Form>({
    validationSchema: schema,
    mode: 'onChange',
  });

  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setVal(e.target.value);
  };

  const TextFieldProps = {
    touched,
    errors,
    inputRef: register,
  };

  return (
    <div className={className}>
      Rechercher une carte
      <TextField
        className={styles['searchCards__input']}
        name="cardText"
        type="text"
        placeholder="Nom de la carte"
        onChange={onUpdate}
        {...TextFieldProps}
      />

      <CardList canAddCard={canAddCard} addCard={addCard} canRemoveCard={canRemoveCard} removeCard={removeCard} />
    </div>
  );
};
