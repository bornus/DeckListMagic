import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';

import { RootState } from 'authentificatedPages/rootReducer';
import { completeNewPassword, signOut } from 'features/auth/authSlice';
import { Spinner } from 'components/Spinner';
import TextField from 'components/TextField';

const schema = yup.object().shape({
  password: yup
    .string()
    // .matches(passwordRegex, 'Password must have uppercase, symbol characters and must have length greater than or equal to 6')
    .required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});

interface Form {
  password: string;
  passwordConfirmation: string;
}

export default function NewPasswordRequired(): JSX.Element {
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
  const { loading, error } = auth.newPasswordRequiredForm;

  const onSubmit = ({ password }: Form) => {
    if (!auth.authData || !auth.authData.user) {
      throw new Error('No user');
    }

    const { user } = auth.authData;
    dispatch(completeNewPassword(user, password));
  };

  const handleCancel = () => dispatch(signOut());

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1>Update your password</h1>
      <div className="error-message c8 my-3">{error?.message}</div>
      <TextField name="password" type="password" placeholder="Password" {...TextFieldProps} />
      <TextField name="passwordConfirmation" type="password" placeholder="Confirm your password" {...TextFieldProps} />
      <button type="submit" className="mt-4" disabled={!isValid}>
        {loading ? <Spinner /> : 'Submit'}
      </button>

      <div className="form-text-action mb-4" onClick={handleCancel}>
        Cancel
      </div>
    </form>
  );
}
