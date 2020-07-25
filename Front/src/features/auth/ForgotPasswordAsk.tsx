import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

import { askForForgotPassword, askForForgotPasswordStop } from 'features/auth/authSlice';
import { RootState } from 'authentificatedPages/rootReducer';
import { Spinner } from 'components/Spinner';
import TextField from 'components/TextField';

import { emailRegex } from '../../utils/regexp';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').matches(emailRegex, 'Email is not valid'),
});

interface Form {
  email: string;
}

export default function ForgotPasswordAsk(): JSX.Element {
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
  const { loading, error } = auth.forgotPasswordForm;

  const onSubmit = ({ email }: Form) => {
    dispatch(askForForgotPassword(email));
  };

  const onCancel = () => {
    dispatch(askForForgotPasswordStop());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1>Forgot your password?</h1>
      <div className="error-message c8 my-3">{error?.message}</div>
      <p className="m-0 p-0">Please enter your e-mail address:</p>
      <TextField name="email" type="email" placeholder="your.email@domain.do" {...TextFieldProps} />
      <button type="submit" className="mt-4" disabled={!isValid}>
        {loading ? <Spinner /> : 'Submit'}
      </button>
      <div className="form-text-action" onClick={onCancel}>
        Cancel
      </div>
    </form>
  );
}
