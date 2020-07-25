import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { RootState } from 'authentificatedPages/rootReducer';
import { updateProject, setUpdateProjectModalOpened } from 'features/ClientCredentials/slice';
import Modal from 'components/Modal';
import { Spinner } from 'components/Spinner';
import TextField from 'components/TextField';

const schema = yup.object().shape({
  applicationName: yup.string().required('The application name is required'),
});

interface Form {
  applicationName: string;
}

interface Props {
  open: boolean;
  onClose?: () => any;
}

export default function UpdateProjectModal(props: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    formState: { touched, isValid },
  } = useForm<Form>({
    validationSchema: schema,
    mode: 'onChange',
  });

  const TextFieldProps = {
    touched,
    errors,
    inputRef: register,
    values: getValues(),
  };

  const dispatch = useDispatch();
  const { updateModal, selectedProject } = useSelector((state: RootState) => state.clientCredentials);
  const { loading } = updateModal;

  const onSubmit = async ({ applicationName }: Form) => {
    dispatch(updateProject(applicationName));
  };

  const onClose = () => {
    dispatch(setUpdateProjectModalOpened(false));
  };

  return (
    <Modal {...props}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Update application informations</h1>
        <TextField
          name="applicationName"
          type="string"
          placeholder="Application name"
          defaultValue={selectedProject?.name}
          {...TextFieldProps}
        />
        <div className="d-flex justify-content-between mt-4">
          <div onClick={() => onClose()} style={{ maxWidth: 200 }} className="button outline">
            Cancel
          </div>
          <button style={{ maxWidth: 200 }}>{loading ? <Spinner /> : 'Submit'}</button>
        </div>
      </form>
    </Modal>
  );
}
