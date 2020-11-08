import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'authentificatedPages/rootReducer';
import NoApps from 'features/ClientCredentials/NoApps';
import CredentialList from 'features/ClientCredentials/CredentialList';
import { listProjects } from 'features/ClientCredentials/slice';
import DeleteProjectModal from 'features/ClientCredentials/DeleteProjectModal';

function ClientCredentials(): JSX.Element {
  const dispatch = useDispatch();
  const { projects, loading, deleteModal } = useSelector((state: RootState) => state.clientCredentials);
  const { opened } = deleteModal;

  useEffect(() => {
    dispatch(listProjects());
  }, []);

  let content = <div>Loading...</div>;

  if (loading) return <div>Loading...</div>;

  content = projects.length ? <CredentialList /> : <NoApps />;

  return (
    <>
      {content}
      <DeleteProjectModal open={opened} />
    </>
  );
}

export default ClientCredentials;
