export enum AuthFlow {
  USER_SRP_AUTH = 'USER_SRP_AUTH',
  REFRESH_TOKEN_AUTH = 'REFRESH_TOKEN_AUTH',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  CUSTOM_AUTH = 'CUSTOM_AUTH',
  USER_PASSWORD_AUTH = 'USER_PASSWORD_AUTH',
  ADMIN_USER_PASSWORD_AUTH = 'ADMIN_USER_PASSWORD_AUTH',
}

export enum AuthState {
  SignUp = 'signup',
  SignOut = 'signout',
  SignIn = 'signin',
  Loading = 'loading',
  SignedOut = 'signedout',
  SignedIn = 'signedin',
  SigningUp = 'signingup',
  ConfirmSignUp = 'confirmSignUp',
  confirmingSignUpCustomFlow = 'confirmsignupcustomflow',
  ConfirmSignIn = 'confirmSignIn',
  confirmingSignInCustomFlow = 'confirmingsignincustomflow',
  VerifyingAttributes = 'verifyingattributes',
  ForgotPassword = 'forgotpassword',
  ResetPassword = 'resettingpassword',
  SettingMFA = 'settingMFA',
  TOTPSetup = 'TOTPSetup',
  CustomConfirmSignIn = 'customConfirmSignIn',
  VerifyContact = 'verifyContact',
}

export enum AuthError {
  USER_NOT_FOUND_EXCEPTION = 'UserNotFoundException',
  NOT_AUTHORIZED_EXCEPTION = 'NotAuthorizedException',
}

export enum AWSErrorCode {
  INVALID_PARAMETER_EXCEPTION = 'InvalidParameterException',
}
