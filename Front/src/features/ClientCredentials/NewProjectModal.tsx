import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CSVLink } from 'react-csv';

import { RootState } from 'authentificatedPages/rootReducer';
import Modal from 'components/Modal';
import { Spinner } from 'components/Spinner';
import TextField from 'components/TextField';
import { WarningIcon, DownloadIcon } from 'components/SVGs';
import CopyTextField from 'components/CopyTextField';
import { addProject, setAddProjectModalOpened } from 'features/ClientCredentials/slice';

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

export default function NewProjectModal(props: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    formState: { touched },
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
  const { loading, credentials } = useSelector((state: RootState) => state.clientCredentials.addModal);

  const onSubmit = async ({ applicationName }: Form) => {
    dispatch(addProject(applicationName));
  };

  const onClose = () => {
    dispatch(setAddProjectModalOpened(false));
  };

  if (credentials) {
    return (
      <Modal {...props}>
        <h1>Application 3 credentials details</h1>
        <div className="d-flex mt-3 mb-3">
          <WarningIcon className="mr-3" width="100%" style={{ minWidth: 31, maxWidth: 31 }} />
          <p className="flex-grow-1">
            You should copy and securely store your Client ID and Client Secret. It will not be possible to recover or
            reveal Client Secret after closing this window.
          </p>
        </div>
        <CopyTextField label="Client ID" text={credentials.clientId || ''} className="my-4" />
        <CopyTextField label="Client Secret" text={credentials.clientSecret || ''} className="mb-4" />

        <CSVLink
          data={[
            ['clientId', 'clientSecret', 'apiKey'],
            [credentials.clientId, credentials.clientSecret, credentials?.apiKey],
          ]}
        >
          <div
            style={{ color: '#2AB2AF', fontSize: 16, fontWeight: 'bold', cursor: 'pointer' }}
            className="d-flex align-items-baseline"
          >
            <DownloadIcon width="20px" height="18px" className="mr-2" /> Download credentials
          </div>
        </CSVLink>
        <div className="d-flex justify-content-center mt-5">
          <button onClick={() => onClose()} style={{ maxWidth: 200 }} className="outline">
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal {...props}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>New application</h1>
        <p className="mt-3">
          Give your application a name. This will help you identify the service. Once you have named this Project, we
          will provide you with unique client ID and client secret.
        </p>
        <TextField name="applicationName" type="string" placeholder="Application name" {...TextFieldProps} />
        <div className="d-flex justify-content-between mt-4">
          <div onClick={() => onClose()} style={{ maxWidth: 200 }} className="button outline">
            Cancel
          </div>
          <button style={{ maxWidth: 200 }}>{loading ? <Spinner /> : 'Create'}</button>
        </div>
      </form>
    </Modal>
  );
}
