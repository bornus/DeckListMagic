import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'authentificatedPages/rootReducer';
import NewProjectModal from 'features/ClientCredentials/NewProjectModal';
import { setAddProjectModalOpened } from 'features/ClientCredentials/slice';

function ClientCredentials(): JSX.Element {
  const dispatch = useDispatch();
  const { opened } = useSelector((state: RootState) => state.clientCredentials.addModal);

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-5">No client credentials created yet</h1>
      <svg width="142px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142 113">
        <g fill="none" fillRule="evenodd">
          <path fill="#FFF" d="M2.407 31.255h137.186v78.138H2.407z"></path>
          <path
            fill="#19B1AF"
            fillRule="nonzero"
            d="M59.568 87.755v-33.66c-16.599-1.802-23.466 5.939-23.466 16.23 0 10.29 6.03 17.43 23.466 17.43z"
          ></path>
          <path
            fill="#7DBD59"
            fillRule="nonzero"
            d="M80.627 87.755v-33.66c16.598-1.802 23.466 5.939 23.466 16.23 0 10.29-6.03 17.43-23.466 17.43z"
          ></path>
          <path fill="#CEE3B1" d="M2.407 3.606h137.186v27.649H2.407z"></path>
          <path
            fill="#005E6E"
            fillRule="nonzero"
            d="M0 35.313v76.902h142V0H0v35.313zM4.814 5.076h132.372V28.85H4.814V5.076zm0 28.584h132.372v73.48H4.814V33.66z"
          ></path>
          <ellipse cx="16.847" cy="16.83" fill="#005E6E" fillRule="nonzero" rx="6.017" ry="6.011"></ellipse>
          <ellipse cx="33.695" cy="16.83" fill="#005E6E" fillRule="nonzero" rx="6.017" ry="6.011"></ellipse>
          <ellipse cx="50.542" cy="16.83" fill="#005E6E" fillRule="nonzero" rx="6.017" ry="6.011"></ellipse>
          <path
            fill="#005E6E"
            fillRule="nonzero"
            d="M59.699 50.85h-6.907c-9.889 0-18.208 7.821-19.62 17.395H19.987c-1.727 0-3.14.81-3.14 2.537 0 1.726 1.413 2.548 3.14 2.548h13.185c1.57 9.573 9.731 17.384 19.62 17.384H59.7a3.148 3.148 0 003.139-3.139V53.989a3.148 3.148 0 00-3.14-3.139zm-1.936 34.788h-4.97c-7.535 0-14.86-5.759-14.86-14.856s7.325-14.856 14.86-14.856h4.97v29.712zm64.407-17.393h-13.185c-1.57-9.574-9.731-17.395-19.62-17.395h-6.907a3.148 3.148 0 00-3.139 3.139v5.78h-7.377c-1.727 0-3.14.812-3.14 2.538 0 1.726 1.413 2.536 3.14 2.536h7.377v12.033h-7.377c-1.727 0-3.14.811-3.14 2.538 0 1.726 1.413 2.535 3.14 2.535h7.377v5.783a3.148 3.148 0 003.14 3.139h6.906c9.889 0 18.208-7.823 19.62-17.397h13.185c1.727 0 3.14-.809 3.14-2.535s-1.413-2.694-3.14-2.694zM89.208 85.638h-4.97V55.926h4.97c7.534 0 14.86 6.38 14.86 14.856 0 8.632-7.326 14.856-14.86 14.856z"
          ></path>
        </g>
      </svg>
      <button onClick={() => dispatch(setAddProjectModalOpened(true))} className="mt-5" style={{ maxWidth: 222 }}>
        + Add application
      </button>

      <NewProjectModal open={opened} />
    </div>
  );
}

export default ClientCredentials;
