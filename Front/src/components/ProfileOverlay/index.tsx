import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';

import { RootState } from 'authentificatedPages/rootReducer';
import { signOut } from 'features/auth/authSlice';
import styles from './profile-overlay.module.scss';

interface Props {
  close: Function;
  open: boolean;
}

function ProfileOverlay({ close, open }: Props) {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const node = useRef<HTMLDivElement>(null);
  const handleClick = (e: any) => {
    if (node.current && node.current.contains(e.target)) {
      return;
    }

    close();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });

  const email =
    auth.authData && auth.authData.user && auth.authData.user.signInUserSession
      ? auth.authData.user.signInUserSession.idToken.payload.email
      : null;

  return (
    <div ref={node} className={classnames(styles.container, open ? styles.open : null)}>
      {email && <div className="mb-4">{email}</div>}

      <button
        className="outline"
        onClick={() => {
          dispatch(signOut());
          close();
        }}
      >
        Sign out
      </button>
    </div>
  );
}

export default ProfileOverlay;
