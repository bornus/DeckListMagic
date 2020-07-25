import { Auth } from 'aws-amplify';
import { CodeDeliveryDetails } from 'amazon-cognito-identity-js';

export interface CognitoUser {
  Session?: string | null;
  authenticationFlowType?: string;
  client?: {
    endpoint?: string;
    userAgent?: string;
  };
  keyPrefix?: string;
  pool?: {
    advancedSecurityDataCollectionFlag?: boolean;
    clientId?: string;
    userPoolId?: string;
  };
  username?: string;
  userConfirmed?: boolean;
  userSub?: string;
  challengeName?: string;
  challengeParam?: { [key: string]: any };
  unverified?: {
    email?: string;
    phone_number?: string;
  };
  [attributes: string]: any;
  signInUserSession?: SignInUserSession;
}

export interface SignInUserSession {
  idToken: {
    jwtToken: string;
    payload: {
      sub: string;
      aud: string;
      email_verified: boolean;
      event_id: string;
      token_use: string;
      auth_time: number;
      iss: string;
      'cognito:username': string;
      exp: number;
      iat: number;
      email: string;
    };
  };
}

export interface Error {
  code: string;
  name: string;
  message: string;
}

interface FormState {
  loading: boolean;
  error?: Error;
}

export interface AuthData {
  codeDeliveryDetails?: CodeDeliveryDetails;
  userConfirmed?: boolean;
  userSub?: string;
  user?: CognitoUser;
}

export interface ForgotPasswordData {
  workflowStarted: boolean;
  email?: string;
  code?: string;
}

export interface Auth {
  authData?: AuthData;
  forgotPasswordData: ForgotPasswordData;
  signInForm: FormState;
  signUpForm: FormState & {
    email: string;
    step: number;
  };
  signOutForm: FormState;
  twoFactorForm: FormState;
  newPasswordRequiredForm: FormState;
  verifyTotpForm: FormState & {
    secretKey?: string;
    qrCode?: string;
    loadingQrCode: boolean;
    qrCodeError?: Error;
  };
  forgotPasswordForm: FormState;
  profileOverlayOpened: boolean;
}

export interface SetupOtpResponse {
  secretKey: string;
  qrCode: string;
}
