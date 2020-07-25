import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

import { confirmSignIn, signOut } from 'features/auth/authSlice';
import { RootState } from 'authentificatedPages/rootReducer';
import { Spinner } from 'components/Spinner';
import TextField from 'components/TextField';
import twoFactorImg from 'static/images/2FA.png';

const schema = yup.object().shape({
  code: yup.string().required('Token is required'),
});

interface Form {
  code: string;
}

export default function TwoFactorAuthentication(): JSX.Element {
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
  const { loading, error } = auth.twoFactorForm;

  const onSubmit = ({ code }: Form) => {
    if (!auth.authData || !auth.authData.user) {
      throw new Error('No user');
    }
    const { user } = auth.authData;
    dispatch(confirmSignIn(user, code));
  };

  const handleCancel = () => dispatch(signOut());

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1>Two-Factor Authentication</h1>
      <div className="error-message c8 my-3">{error?.message}</div>
      <div className="d-flex align-items-center">
        <img alt="Google Authenticator Logo" className="pr-3" src={twoFactorImg} />
        <p className="m-0 p-0">Enter Google Authenticator 2FA token</p>
      </div>
      <TextField name="code" type="string" placeholder="2FA token" {...TextFieldProps} />
      <button type="submit" className="mt-4" disabled={!isValid}>
        {loading ? <Spinner /> : 'Submit'}
      </button>
      <div className="form-text-action" onClick={handleCancel}>
        Cancel
      </div>
    </form>
  );
}
