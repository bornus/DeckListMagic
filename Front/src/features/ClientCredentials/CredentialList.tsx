import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'authentificatedPages/rootReducer';
import ProjectList from 'features/ClientCredentials/ProjectList';
import NewProjectModal from 'features/ClientCredentials/NewProjectModal';
import { setAddProjectModalOpened } from 'features/ClientCredentials/slice';

function ClientCredentials(): JSX.Element {
  const dispatch = useDispatch();
  const { opened } = useSelector((state: RootState) => state.clientCredentials.addModal);

  return (
    <>
      <div className="d-flex flex-column w-100">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Client credentials</h1>

          <button onClick={() => dispatch(setAddProjectModalOpened(true))} className="rounded">
            +
          </button>
        </div>

        <ProjectList />
      </div>

      <NewProjectModal open={opened} />
    </>
  );
}

export default ClientCredentials;
