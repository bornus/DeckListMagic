import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default (): JSX.Element => (
  <div className="p-5 d-flex flex-column justify-content-between align-items-center">
    <h1>Home page!</h1>

    <Link to="/signIn">
      <Button variant="primary" className="mt-4" size="lg">
        Sign in
      </Button>
    </Link>
    <Link to={'/signUp'}>
      <Button variant="primary" className="mt-4" size="lg">
        Sign up
      </Button>
    </Link>
  </div>
);
