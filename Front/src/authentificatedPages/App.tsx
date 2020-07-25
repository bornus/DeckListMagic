import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { RootState } from 'authentificatedPages/rootReducer';
import Header from 'components/Header';
import Navigation from 'components/Navigation';
import { currentAuthenticatedUser } from 'features/auth/authSlice';
import Home from 'features/dashboard/Home';
import ClientCredentials from 'features/ClientCredentials';
import SignIn from 'features/auth/SignIn';
import TwoFactorAuthentication from 'features/auth/2FA';
import NewPasswordRequired from 'features/auth/NewPasswordRequired';
import TwoFactorAuthenticationSetup from 'features/auth/2FASetup';
import ForgotPasswordAsk from 'features/auth/ForgotPasswordAsk';
import ForgotPasswordCode from 'features/auth/ForgotPasswordCode';
import ForgotPasswordNewPassword from 'features/auth/ForgotPasswordNewPassword';

import 'react-responsive-modal/styles.css';

export default function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentAuthenticatedUser());
  }, []);

  const auth = useSelector((state: RootState) => state.auth);

  let content = undefined;

  if (!auth.authData || !auth.authData.user) {
    if (auth.forgotPasswordData && auth.forgotPasswordData.code) {
      content = <ForgotPasswordNewPassword />;
    } else if (auth.forgotPasswordData && auth.forgotPasswordData.email) {
      content = <ForgotPasswordCode />;
    } else if (auth.forgotPasswordData && auth.forgotPasswordData.workflowStarted) {
      content = <ForgotPasswordAsk />;
    } else {
      content = <SignIn />;
    }
  } else if (auth.authData && auth.authData.user && auth.authData.user.signInUserSession) {
    return (
      <div className="app">
        <Router>
          <Header />
          <Navigation />
          <div className="main">
            <Switch>
              <Route path="/client-credentials">
                <ClientCredentials />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  } else if (auth.authData && auth.authData.user && auth.authData.user.challengeName === 'SOFTWARE_TOKEN_MFA') {
    content = <TwoFactorAuthentication />;
  } else if (auth.authData && auth.authData.user && auth.authData.user.challengeName === 'NEW_PASSWORD_REQUIRED') {
    content = <NewPasswordRequired />;
  } else if (auth.authData && auth.authData.user && auth.authData.user.challengeName === 'MFA_SETUP') {
    content = <TwoFactorAuthenticationSetup />;
  }

  return (
    <div className="app">
      <Router>
        <Header />
        <div className="main">{content}</div>
      </Router>
    </div>
  );
}
