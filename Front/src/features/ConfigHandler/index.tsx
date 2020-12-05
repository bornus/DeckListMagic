import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'authentificatedPages/rootReducer';
import { setSaveModalOpened } from './slice';

import SaveModal from './saveModal';

type AppProps = {
  className?: string;
};

export default ({
  className,
}: AppProps): JSX.Element => {
  const dispatch = useDispatch();
  const { opened } = useSelector((state: RootState) => state.configHandler.saveModal);

  return (
    <div className={className}>
      TODO:: Load and save config
      <SaveModal open={opened} />

      
      <button onClick={() => dispatch(setSaveModalOpened(true))} className="rounded">
        Open
      </button>
    </div>
  );
};



