/* eslint-disable */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import ProfileOverlay from 'components/ProfileOverlay';
import { setProfileOverlayOpened } from 'features/auth/authSlice';

import './header.scss';

const LogoSvg = (props) => <span>Best LOGO</span>;

const MenuLink = ({ path, text }) => {
  const match = useRouteMatch({
    path,
    exact: true
  });
  const className = match ? classNames('header-menu__link', 'header-menu__link--active') : classNames('header-menu__link')

  return (
    <Link className={className} to={path}>
      {text}
    </Link>
  );
}

const ProfileSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 22 27">
    <path
      fill="none"
      fillRule="evenodd"
      stroke="#B7D1D6"
      strokeWidth="2"
      d="M11 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM1 25.829V20.8A4.8 4.8 0 015.8 16h10.4a4.8 4.8 0 014.8 4.8v5.122L1 25.83z"
    ></path>
  </svg>
);

class Navigation extends React.Component {
  _isMounted = false;
  _navRef = null;
  _burgerRef = null;
  _profileOpenerRef = null;

  state = {
    transparent: false,
    burgerOpen: false,
    profileOverlayOpen: false,
  };

  componentDidMount() {
    this._isMounted = true;
    this._profileOpenerRef = React.createRef();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('mousedown', this.handleCloseMobileMenu);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('mousedown', this.handleCloseMobileMenu);
  }

  handleCloseMobileMenu = (event) => {
    // Detect 2 areas for header + nav, and ignore the empty space around the menu

    // Not clicked on header
    if (this._navRef && !this._navRef.contains(event.target)) {
      // Not clicked on the burger menu
      if (this._burgerRef && !this._burgerRef.contains(event.target)) {
        // Only if burger menu is opened
        if (this.state.burgerOpen) {
          this.setState({ burgerOpen: false });
        }
      }
    }
  };

  handleScroll = () => {
    if (!this._isMounted) {
      return;
    }

    if (this.props.transparentHeader) {
      // transparency enabled
      window.scrollY > 0 ? this.setState({ transparent: false }) : this.setState({ transparent: true });
    }
  };
  render() {
    const isLoggedIn = this.props.authData && this.props.authData.user && this.props.authData.user.signInUserSession;
    const { profileOverlayOpened } = this.props;
    const user =
      this.props.authData && this.props.authData.user && this.props.authData.user.signInUserSession
        ? this.props.authData.user.signInUserSession.idToken.payload
        : null;
    const { transparent } = this.state;

    return (
      <>
        <nav
          className={classNames('header-menu', 'container-fluid', {
            transparent,
          })}
          role="navigation"
        >
          <div className="header-menu__layout" ref={(node) => (this._navRef = node)}>
            <div className="header-menu__container">
              {/* <a className="header-menu__logo-container" href={'/'}>
              <LogoSvg alt="logo" />
            </a> */}
              <Link className="header-menu__logo-container" to="/">
                <LogoSvg alt="logo" />
              </Link>
              {isLoggedIn ? (
                <div>
                  <MenuLink path="/" text="Overview" />
                  <MenuLink path="/client-credentials" text="Client credentials" />
                  <MenuLink path="/deck-creation" text="Creation de deck" />
                </div>
              ) : null}
              {isLoggedIn ? (
                <div
                  ref={this._profileOpenerRef}
                  onClick={() => this.props.dispatch(setProfileOverlayOpened(true))}
                  className="header-menu__profile-container"
                >
                  <ProfileSvg />
                  <ProfileOverlay
                    open={profileOverlayOpened}
                    close={() => this.props.dispatch(setProfileOverlayOpened(false))}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </nav>
        <div style={{ height: '90px' }} />
      </>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return auth;
}

export default connect(mapStateToProps)(Navigation);
