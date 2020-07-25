import React from 'react';

import { Link } from 'react-router-dom';

export default (): JSX.Element => (
  <div className="d-flex flex-column w-100">
    <div className="d-flex justify-content-between align-items-center">
      <h1>Home page!</h1>
      
      <Link to="/signIn">Sign in</Link>
      <Link to={'/signUp'}>Sign up</Link>
    </div>
  </div>
);
