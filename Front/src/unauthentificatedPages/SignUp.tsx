import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'authentificatedPages/rootReducer';
import SignUp from 'features/auth/SignUp';
import ConfirmSignUp from 'features/auth/ConfirmSignUp';
import { signUpGoToConfirm } from 'features/auth/authSlice';

export default (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);
  const { step } = auth.signUpForm;
  const dispatch = useDispatch();

  const onGoToStep2 = () => {
    dispatch(signUpGoToConfirm());
  };

  switch (step) {
    case 0:
      return (
        <>
          <SignUp />

          <p style={{ marginTop: 40 }} className="text-center">
            Already have an account? <Link to="/signIn">Sign in</Link>
          </p>
          <p style={{ marginTop: 40 }} className="text-center">
            <a onClick={onGoToStep2}>Already have a code?</a>
          </p>
        </>
      );
    case 1:
      return <ConfirmSignUp />;

    default:
      return <Redirect to="/signIn" />;
  }
};
