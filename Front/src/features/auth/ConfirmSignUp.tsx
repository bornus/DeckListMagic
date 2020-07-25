import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

import { RootState } from 'authentificatedPages/rootReducer';
import { confirmSignUp, signUpResendCode } from 'features/auth/authSlice';
import { Spinner } from 'components/Spinner';
import TextField from 'components/TextField';
import { emailRegex } from 'utils/regexp';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').matches(emailRegex, 'Email is not valid'),
  code: yup.string().required('Code is required'),
});

interface Form {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  code: string;
}

export default function SignUp(): JSX.Element {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const { loading, error, email } = auth.signUpForm;

  const {
    register,
    handleSubmit,
    errors,
    getValues,
    formState: { touched, isValid },
    watch,
  } = useForm<Form>({
    validationSchema: schema,
    mode: 'onChange',
    defaultValues: {
      email,
    },
  });

  const TextFieldProps = {
    touched,
    errors,
    inputRef: register,
    values: getValues(),
  };

  const onSubmit = ({ email, code }: Form) => {
    dispatch(confirmSignUp(email, code));
  };

  const onResendCode = () => {
    dispatch(signUpResendCode(watch('email')));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="">Sign in</h1>
      <div className="error-message c8 my-3">{error?.message}</div>
      <TextField name="email" type="email" placeholder="Email" {...TextFieldProps} />
      <TextField name="code" type="text" placeholder="Code" autoComplete="off" {...TextFieldProps} />
      <button type="submit" className="mt-4" disabled={!isValid}>
        {loading ? <Spinner /> : 'Submit'}
      </button>

      <p style={{ marginTop: 20, marginBottom: 20 }} className="text-center">
        Lost your code?
        <button className="btn btn-link" onClick={onResendCode} disabled={loading}>
          Resend Code
        </button>
      </p>
    </form>
  );
}
