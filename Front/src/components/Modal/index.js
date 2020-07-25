/* eslint-disable */

import React from 'react';
import Modal from 'react-responsive-modal';

import './modal.scss';

export const MODAL_TYPE = {
  INFO: 'INFO',
  ERROR: 'ERROR',
};

const styles = {
  overlay: { background: 'rgba(0, 0, 0, 0.28)' },
  modal: { borderRadius: 10, maxWidth: 678, width: '100%', boxShadow: 'none' },
  closeButton: { display: 'flex', justifyContent: 'flex-end', outline: 'none' },
};

export default ({ type = MODAL_TYPE.INFO, open = false, onClose = () => {}, children }) => {
  switch (type) {
    case MODAL_TYPE.INFO:
      return (
        <Modal
          classNames={{
            modal: 'p-5',
          }}
          styles={styles}
          center
          open={open}
          onClose={() => onClose()}
          showCloseIcon={false}
        >
            <div className="modal__content">{children}</div>
        </Modal>
      );
  }

  return null;
};
