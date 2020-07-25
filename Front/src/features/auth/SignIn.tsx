import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

import { RootState } from 'authentificatedPages/rootReducer';
import { signIn, askForForgotPasswordStart } from 'features/auth/authSlice';
import { Spinner } from 'components/Spinner';
import TextField from 'components/TextField';
import { emailRegex } from 'utils/regexp';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').matches(emailRegex, 'Email is not valid'),
  password: yup.string().required('Password is required'),
});

interface Form {
  email: string;
  password: string;
}

export default function SignIn(): JSX.Element {
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
  const { loading, error } = auth.signInForm;

  const onSubmit = ({ email, password }: Form) => {
    dispatch(signIn(email, password));
  };

  const onForgotPassword = () => {
    dispatch(askForForgotPasswordStart());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="">Sign in</h1>
      <div className="error-message c8 my-3">{error?.message}</div>
      <TextField name="email" type="email" placeholder="Email" {...TextFieldProps} />
      <TextField name="password" type="password" placeholder="Password" {...TextFieldProps} />
      <button type="submit" className="mt-4" disabled={!isValid}>
        {loading ? <Spinner /> : 'Submit'}
      </button>
      <div className="form-text-action" onClick={onForgotPassword}>
        Forgot your password ?
      </div>
    </form>
  );
}
