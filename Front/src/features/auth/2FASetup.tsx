import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from 'yup';
import QRCode from 'qrcode.react';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { verifyTotpToken, setupTOTP, signOut } from 'features/auth/authSlice';
import { HandleAWSErrorMessage } from 'features/auth/utils';
import { RootState } from 'authentificatedPages/rootReducer';
import { Spinner } from 'components/Spinner';
import TextField from 'components/TextField';
import StepNumber from 'components/StepNumber';
import twoFactorImg from 'static/images/2FA.png';
import { AppStoreButton, PlayStoreButton } from 'components/StoreButton';

const schema = yup.object().shape({
  code: yup.string().required('Token is required'),
});

interface Form {
  code: string;
}

export default function TwoFactorAuthentication(): JSX.Element {
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
  const auth = useSelector((state: RootState) => state.auth);
  const { loading, error, qrCode, secretKey } = auth.verifyTotpForm;

  const onSubmit = ({ code }: Form) => {
    if (!auth.authData || !auth.authData.user) {
      throw new Error('No user');
    }
    const { user } = auth.authData;
    dispatch(verifyTotpToken(user, code));
  };

  useEffect(() => {
    if (!auth.authData || !auth.authData.user) {
      throw new Error('No user');
    }
    dispatch(setupTOTP(auth.authData?.user));
  }, []);

  const handleCancel = () => dispatch(signOut());
  const [copied, setCopied] = useState(false);

  return (
    <div className="container">
      <div className="row flex-column">
        <h1>Two-Factor Authentication</h1>
        <div className="error-message c8 my-3">{HandleAWSErrorMessage(error)}</div>
        <p className="pl-0 mb-5">
          Two-Factor Authentication (2FA) enhance the security of your Deck list For Developers account.
        </p>
        <div className="d-flex align-items-center mb-4">
          <img alt="Google Authenticator Logo" style={{ width: 26, height: 26 }} src={twoFactorImg} />
          <p className="m-0 p-0 pl-3 font-weight-bold">Google Authenticator</p>
        </div>
        <div className="d-flex mb-4">
          <StepNumber number="1" />
          <div className="pl-3">
            <p className="p-0">Download and install Google Authenticator</p>
            <div className="d-flex mb-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://apps.apple.com/us/app/google-authenticator/id388497605"
              >
                <AppStoreButton className="mr-4" width="142" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
              >
                <PlayStoreButton width="142" />
              </a>
            </div>
          </div>
        </div>
        <div className="d-flex mb-4">
          <StepNumber number="2" />
          <div className="pl-3">
            <p className="p-0">Open Google Authenticator and scan the QR code or manualy enter the key below</p>
            <div className="d-flex align-items-center ">
              {qrCode && (
                <span className="mr-4">
                  <QRCode value={qrCode} />
                </span>
              )}
              {secretKey && (
                <CopyToClipboard text={secretKey} onCopy={() => setCopied(true)}>
                  <div
                    style={{
                      backgroundColor: '#F1F2F5',
                      borderRadius: 4,
                      position: 'relative',
                      cursor: 'pointer',
                      maxWidth: 300,
                      overflow: 'hidden',
                    }}
                    className="d-flex flex-column p-3"
                  >
                    {copied && (
                      <span style={{ position: 'absolute', right: 10, top: 10, fontSize: 11, color: '#005464' }}>
                        Copied !
                      </span>
                    )}
                    <div style={{ color: '#7E878C', fontSize: 15 }}>2FA backup key</div>
                    <div
                      style={{
                        color: '#232323',
                        fontSize: 16,
                        fontWeight: 'bold',
                        fontFamily: 'Gotham',
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {secretKey}
                    </div>
                  </div>
                </CopyToClipboard>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <StepNumber number="2" />
          <div className="pl-3">
            <p className="p-0">Enter Google Authenticator 2FA token</p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField name="code" type="string" placeholder="2FA token" {...TextFieldProps} />
              <button type="submit" className="mt-4" disabled={!isValid}>
                {loading ? <Spinner /> : 'Submit'}
              </button>

              <div className="form-text-action" onClick={handleCancel}>
                Cancel
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
