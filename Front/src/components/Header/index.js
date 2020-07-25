/* eslint-disable */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileOverlay from 'components/ProfileOverlay';
import { setProfileOverlayOpened } from 'features/auth/authSlice';

import './header.scss';

const LogoSvg = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 379 55" {...props}>
    <path fill="none" stroke="#fff" d="M185.5 16.5v34"></path>
    <g fill="#f9f9f9">
      <path d="M15.297 24.565c-.186-.248-.62-.186-.62.124L9.904 49.81c-.062.372.434.62.62.248l11.1-15.631a.844.844 0 000-.93zm30.455-10.482H31.796c-.248 0-.372.186-.372.434l1.054 5.582a.336.336 0 00.5.248l12.9-5.582a.354.354 0 00-.126-.682z"></path>
      <path d="M29.687 14.393a.393.393 0 00-.372-.31H.348a.354.354 0 00-.124.682l14.638 6.389a2.746 2.746 0 01.93.744l19.97 28.16a.383.383 0 00.682-.31zM16.6 9.989l12.963-4.156c.868-.31.868-.558-.062-.682l-2.605-.247L23.857.189a.466.466 0 00-.62-.124l-5.52 3.6c-.124.124-.248.248-.186.434l.744 3.66-1.924 1.545c-.744.685-.619.933.249.685zm56.941 21.089a8.588 8.588 0 01-8.932-8.56v-.124a8.692 8.692 0 018.994-8.622 8.588 8.588 0 018.932 8.56v.062a8.742 8.742 0 01-8.994 8.684m4.342-8.684a4.41 4.41 0 00-4.342-4.59 4.235 4.235 0 00-4.28 4.528v.062a4.41 4.41 0 004.342 4.59c2.667 0 4.28-2.047 4.28-4.59zm26.547-4.279v-4.032h-3.908V9.865h-4.714v4.218h-1.861c-2.791-.124-4.4 1.054-5.272 2.605v-2.605h-4.714v16.623h4.714v-6.761c0-3.97 1.923-5.831 5.024-5.831h2.047v7.877c0 3.846 1.923 4.962 4.838 4.962a7.329 7.329 0 003.722-.93V26.24a4.657 4.657 0 01-2.295.558c-1.054 0-1.489-.5-1.489-1.613v-7.07zm12.22 12.591v-2.357a5.9 5.9 0 01-4.838 2.667c-3.536 0-5.644-2.357-5.644-6.141V14.083h4.714v9.242c0 2.233 1.054 3.349 2.853 3.349s2.915-1.116 2.915-3.349v-9.242h4.717v16.623zm17.74 0v-9.3c0-2.233-1.054-3.349-2.853-3.349s-2.915 1.116-2.915 3.349v9.242h-4.715V14.083h4.714v2.357a5.9 5.9 0 014.838-2.667c3.536 0 5.644 2.357 5.644 6.141v10.73h-4.714zm22.391-6.513h-11.537a3.8 3.8 0 004.032 3.225 5.583 5.583 0 004.032-1.675l2.667 2.357a8.76 8.76 0 01-15.445-5.457v-.062c0-4.714 3.349-8.622 8.188-8.622 5.52 0 8.063 4.28 8.063 8.994v.062a3.755 3.755 0 010 1.179m-8-6.513c-1.923 0-3.225 1.365-3.6 3.536h7.071c-.248-2.109-1.489-3.536-3.473-3.536m17.988 13.521a8.588 8.588 0 01-8.932-8.56v-.062a8.692 8.692 0 018.994-8.622 8.588 8.588 0 018.932 8.56v.062c.062 4.776-3.784 8.622-8.994 8.622m4.4-8.622a4.41 4.41 0 00-4.342-4.59 4.235 4.235 0 00-4.28 4.528v.062a4.41 4.41 0 004.342 4.59 4.235 4.235 0 004.28-4.528zM64.051 41.25a2.639 2.639 0 01-1.737 2.543c1.3.372 2.357 1.116 2.357 2.667 0 1.861-1.551 2.977-3.97 2.977h-4.838V38.583h4.652c2.171 0 3.536 1.054 3.536 2.667zm-1.241.186c0-1.054-.868-1.8-2.419-1.8h-3.287v3.722h3.225c1.489.063 2.481-.619 2.481-1.922zm.62 4.962c0-1.179-.992-1.861-2.915-1.861h-3.411v3.846h3.659c1.613-.062 2.667-.806 2.667-1.985zm13.212 3.04h-1.3l-1.241-2.853h-5.893l-1.3 2.853h-1.245l4.962-10.917h1.116zm-5.579-9.552l-2.481 5.52h4.962zm15.068-1.303h1.178v10.855h-.992l-7.009-8.932v8.932h-1.177V38.583h1.116l6.823 8.684v-8.684zm14.391 10.234l-.868.93-1.427-1.3a5.522 5.522 0 01-8.932-4.4 5.532 5.532 0 015.582-5.644 5.467 5.467 0 015.52 5.582 5.851 5.851 0 01-1.3 3.66zm-5.21-2.853l.806-.93 1.985 1.8a4.759 4.759 0 00.93-2.853 4.347 4.347 0 00-4.28-4.528 4.293 4.293 0 00-4.28 4.466 4.347 4.347 0 004.28 4.528 4.1 4.1 0 002.481-.806zm15.941-1.181c0 3.163-1.8 4.838-4.528 4.838-2.667 0-4.528-1.675-4.528-4.714v-6.324h1.241v6.265c0 2.357 1.241 3.66 3.349 3.66 1.985 0 3.287-1.241 3.287-3.6v-6.325h1.241v6.2zm10.11-5.084h-6.637v3.722h5.96v1.116h-5.955v3.784h6.7v1.116h-7.945V38.583h7.877zM62.252 11.664c-1.054 0-1.675.558-1.675 1.8v.62h3.783v3.846h-3.72v12.776h-4.715V17.928H53.94v-3.845h1.923v-1.055c0-3.66 1.8-5.334 5.148-5.334a11.539 11.539 0 013.349.434v3.473c-.682 0-1.3.062-2.109.062"></path>
    </g>
    <text fill="#fff" fontFamily="Gotham Book" fontSize="16" transform="translate(199 17)">
      <tspan x="0" y="12">
        For
      </tspan>
      <tspan x="0" y="30">
        Developers
      </tspan>
    </text>
  </svg>
);

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
    const user = this.props.authData && this.props.authData.user && this.props.authData.user.signInUserSession ? this.props.authData.user.signInUserSession.idToken.payload : null
    const { transparent } = this.state;

    return (
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
            <Link className="header-menu__logo-container" to={'/'}>
              <LogoSvg alt="logo" />
            </Link>
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
            ): null}
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return auth;
}

export default connect(mapStateToProps)(Navigation);
