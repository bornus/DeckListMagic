/* eslint-disable */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import './navigation.scss';

const MenuLink = ({ path, text }) => {
  const match = useRouteMatch({
    path,
    exact: true
  });
  const className = match ? classNames('navigation__link', 'navigation__link--active') : classNames('navigation__link')

  return (
    <Link className={className} to={path}>
      {text}
    </Link>
  );
}

const Navigation = props => {
  return (
    <nav
      className={classNames('navigation', 'bd-sidebar')}
      role="navigation"
    >
      <div className="navigation__container">
        <MenuLink path='/' text='Overview' />
        <MenuLink path='/client-credentials' text='Client credentials' />
        <MenuLink path='/deck-creation' text='Creation de deck' />
        <MenuLink path='/search' text='Search a card' />
      </div>
      <MenuLink path='/t' text='Term of Use' />
    </nav>
  );
}

const mapStateToProps = state => {
  const { auth } = state;
  return auth;
}

export default connect(mapStateToProps)(Navigation);
