import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'authentificatedPages/rootReducer';
import { deleteProject, setDeleteProjectModalOpened } from 'features/ClientCredentials/slice';
import { WarningIcon } from 'components/SVGs';
import Modal from 'components/Modal';
import Slider from 'components/Slider';

interface Props {
  open: boolean;
  onClose?: () => any;
}

export default function DeleteProjectModal(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const { deleteModal, selectedProject } = useSelector((state: RootState) => state.clientCredentials);
  const { loading, deletionSucceeded } = deleteModal;

  const handleClose = () => {
    dispatch(setDeleteProjectModalOpened(false));
  };

  return (
    <Modal {...props} onClose={handleClose}>
      <form noValidate>
        <h1>Delete API credentials</h1>
        <div className="d-flex flex-column mt-3 mb-3">
          <div className="d-flex align-items-center">
            <WarningIcon className="mr-3" width="100%" style={{ minWidth: 31, maxWidth: 31 }} />
            <p>
              You are about to delete {selectedProject?.name} <strong>{selectedProject?.clientId}</strong>.
            </p>
          </div>
          <p className="ml-3 mt-3" style={{ paddingLeft: 31 }}>
            All clients using these credentials will become unauthorized and will not be able to interact with the API.
            This operation is irreversible.
          </p>
        </div>
        <Slider
          succeeded={deletionSucceeded}
          loading={loading}
          onReachEnd={() => dispatch(deleteProject())}
          className="mt-4 mx-5"
        />
      </form>
      <div className="d-flex justify-content-center mt-5">
        <button onClick={() => handleClose()} style={{ maxWidth: 200 }} className="outline">
          Close
        </button>
      </div>
    </Modal>
  );
}
