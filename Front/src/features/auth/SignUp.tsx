import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

import { RootState } from 'authentificatedPages/rootReducer';
import { signUp } from 'features/auth/authSlice';
import { Spinner } from 'components/Spinner';
import TextField from 'components/TextField';
import { emailRegex } from 'utils/regexp';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').matches(emailRegex, 'Email is not valid'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});

interface Form {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  code: string;
}

export default function SignUp(): JSX.Element {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    formState: { touched, isValid },
  } = useForm<Form>({
    validationSchema: schema,
    mode: 'onChange',
  });

  const TextFieldProps = {
    touched,
    errors,
    inputRef: register,
    values: getValues(),
  };

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const { loading, error } = auth.signUpForm;

  const onSubmit = ({ email, password, firstname, lastname }: Form) => {
    dispatch(signUp(email, password, firstname, lastname));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="m-auto">
      <h1 className="">Sign up</h1>
      <div className="error-message c8 my-3">{error?.message}</div>
      <TextField name="email" type="email" placeholder="Email" {...TextFieldProps} />
      <TextField name="password" type="password" placeholder="Password" autoComplete="off" {...TextFieldProps} />
      <TextField
        name="passwordConfirmation"
        type="password"
        placeholder="Confirm your password"
        autoComplete="off"
        {...TextFieldProps}
      />
      <TextField name="firstname" type="text" placeholder="Prénom" {...TextFieldProps} />
      <TextField name="lastname" type="text" placeholder="Nom" {...TextFieldProps} />
      <button type="submit" className="mt-4" disabled={!isValid}>
        {loading ? <Spinner /> : 'Submit'}
      </button>
    </form>
  );
}
