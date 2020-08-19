import { Auth as awsAuth } from 'aws-amplify';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from 'authentificatedPages/store';

import { Auth, CognitoUser, SetupOtpResponse } from 'features/auth/types';
import { buildOtpAuthPath } from 'features/auth/utils';

const initValuesCommonForm = {
  loading: false,
  error: undefined,
};

const initialState: Auth = {
  authData: {
    user: undefined,
  },
  forgotPasswordData: {
    workflowStarted: false,
    email: undefined,
    code: undefined,
  },
  signInForm: initValuesCommonForm,
  signUpForm: {
    ...initValuesCommonForm,
    email: '',
    step: 0,
  },
  signOutForm: initValuesCommonForm,
  twoFactorForm: initValuesCommonForm,
  newPasswordRequiredForm: initValuesCommonForm,
  verifyTotpForm: {
    ...initValuesCommonForm,
    loadingQrCode: false,
  },
  forgotPasswordForm: initValuesCommonForm,
  profileOverlayOpened: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfileOverlayOpened(state: Auth, action: PayloadAction<boolean>) {
      state.profileOverlayOpened = action.payload;
    },
    askForForgotPasswordStart(state: Auth) {
      // reinit state as default
      Object.keys(state).forEach((key) => {
        // @ts-ignore
        state[key] = initialState[key];
      });

      state.forgotPasswordData = {
        workflowStarted: true,
      };
      state.forgotPasswordForm = initValuesCommonForm;
    },
    askForForgotPasswordStop(state: Auth) {
      state.forgotPasswordData = {
        workflowStarted: false,
      };
      state.forgotPasswordForm = initValuesCommonForm;
    },
    askForForgotPasswordIn(state: Auth) {
      state.forgotPasswordForm.loading = true;
    },
    askForForgotPasswordSuccess(state: Auth, action: PayloadAction<any>) {
      state.forgotPasswordData.email = action.payload;
      state.forgotPasswordForm = initValuesCommonForm;
      state.profileOverlayOpened = false;
    },
    askForForgotPasswordCode(state: Auth, action: PayloadAction<any>) {
      state.forgotPasswordData.code = action.payload;
      state.forgotPasswordForm = initValuesCommonForm;
    },
    askForForgotPasswordResetCode(state: Auth, action: PayloadAction<any>) {
      state.forgotPasswordData.code = undefined;
    },
    askForForgotPasswordNewPasswordSuccess(state: Auth, action: PayloadAction<any>) {
      state.forgotPasswordData = {
        workflowStarted: false,
        email: undefined,
        code: undefined,
      };
      state.forgotPasswordForm = initValuesCommonForm;
      state.profileOverlayOpened = false;
    },
    askForForgotPasswordError(state: Auth, action: PayloadAction<any>) {
      state.forgotPasswordForm = {
        error: action.payload,
        loading: false,
      };
    },
    signIngIn(state: Auth) {
      state.signInForm = {
        ...initialState.signInForm,
        loading: true,
      };
    },
    signInSuccess(state: Auth, action: PayloadAction<CognitoUser>) {
      state.authData = {
        user: action.payload,
      };
      state.signInForm = initValuesCommonForm;
      state.profileOverlayOpened = false;
    },
    signInError(state: Auth, action: PayloadAction<any>) {
      state.signInForm = {
        error: action.payload,
        loading: false,
      };
    },
    signUpIn(state: Auth) {
      state.signUpForm = {
        ...initialState.signUpForm,
        loading: true,
      };
    },
    signUpSuccess(state: Auth, action: PayloadAction<any>) {
      // state.authData = {
      //   user: action.payload,
      // };
      state.signUpForm = {
        ...initValuesCommonForm,
        email: action.payload,
        step: 1,
      };
      // state.profileOverlayOpened = false;
    },
    signUpError(state: Auth, action: PayloadAction<any>) {
      state.signUpForm = {
        ...initialState.signUpForm,
        error: action.payload,
        loading: false,
      };
    },
    confirmSignUpIn(state: Auth) {
      state.signUpForm = {
        ...initialState.signUpForm,
        loading: true,
      };
    },
    confirmSignUpSuccess(state: Auth, action: PayloadAction<CognitoUser>) {
      // state.authData = {
      //   user: action.payload,
      // };
      state.signUpForm = {
        ...initialState.signUpForm,
        step: 2,
      };
      // state.profileOverlayOpened = false;
    },
    confirmSignUpError(state: Auth, action: PayloadAction<any>) {
      state.signUpForm = {
        ...initialState.signUpForm,
        error: action.payload,
        loading: false,
      };
    },
    signUpGoToConfirm(state: Auth) {
      state.signUpForm = {
        ...initialState.signUpForm,
        step: 1,
      };
    },
    signingOut(state: Auth) {
      state.signOutForm = {
        loading: true,
      };
    },
    signOutSuccess(state: Auth) {
      state.authData = {
        user: undefined,
      };
      state.signOutForm = initValuesCommonForm;
      state.profileOverlayOpened = false;
    },
    signOutError(state: Auth, action: PayloadAction<any>) {
      state.signOutForm = {
        error: action.payload,
        loading: false,
      };
    },
    confirming2FA(state: Auth) {
      state.twoFactorForm = {
        ...initialState.twoFactorForm,
        loading: true,
      };
    },
    confirm2FASuccess(state: Auth, action: PayloadAction<CognitoUser>) {
      state.authData = {
        user: action.payload,
      };
      state.twoFactorForm = initValuesCommonForm;
      state.profileOverlayOpened = false;
    },
    confirm2FAError(state: Auth, action: PayloadAction<any>) {
      state.twoFactorForm = {
        error: action.payload,
        loading: false,
      };
    },
    confirmingNewPassword(state: Auth) {
      state.newPasswordRequiredForm = {
        ...initialState.newPasswordRequiredForm,
        loading: true,
      };
    },
    confirmNewPasswordSuccess(state: Auth, action: PayloadAction<CognitoUser>) {
      state.authData = {
        user: action.payload,
      };
      state.newPasswordRequiredForm = {
        error: undefined,
        loading: false,
      };
      state.profileOverlayOpened = false;
    },
    confirmNewPasswordError(state: Auth, action: PayloadAction<any>) {
      state.newPasswordRequiredForm = {
        error: action.payload,
        loading: false,
      };
    },
    setupTotp(state: Auth) {
      state.verifyTotpForm = {
        ...initialState.verifyTotpForm,
        loadingQrCode: true,
      };
    },
    setupTotpSuccess(state: Auth, action: PayloadAction<SetupOtpResponse>) {
      state.verifyTotpForm.qrCode = action.payload.qrCode;
      state.verifyTotpForm.secretKey = action.payload.secretKey;
      state.verifyTotpForm.error = undefined;
      state.verifyTotpForm.loadingQrCode = false;
      state.profileOverlayOpened = false;
    },
    setupTotpError(state: Auth, action: PayloadAction<any>) {
      state.verifyTotpForm.qrCodeError = action.payload;
      state.verifyTotpForm.loadingQrCode = false;
    },
    verifyingTotp(state: Auth) {
      state.verifyTotpForm.loading = true;
    },
    verifyTotpSuccess(state: Auth, action: PayloadAction<CognitoUser>) {
      state.authData = {
        user: action.payload,
      };
      state.verifyTotpForm.error = undefined;
      state.verifyTotpForm.loading = false;
      state.profileOverlayOpened = false;
    },
    verifyTotpError(state: Auth, action: PayloadAction<any>) {
      state.verifyTotpForm.error = action.payload;
      state.verifyTotpForm.loading = false;
    },
    fetchCurrentAuthenticatedUserSuccess(state: Auth, action: PayloadAction<CognitoUser>) {
      // reinit state as default
      Object.keys(state).forEach((key) => {
        // @ts-ignore
        state[key] = initialState[key];
      });

      state.authData = {
        user: action.payload,
      };
    },
    fetchCurrentAuthenticatedUserError(state: Auth, action: PayloadAction<any>) {
      // reinit state as default
      Object.keys(state).forEach((key) => {
        // @ts-ignore
        state[key] = initialState[key];
      });
    },
  },
});

export const {
  askForForgotPasswordStart,
  askForForgotPasswordStop,
  askForForgotPasswordCode,
  setProfileOverlayOpened,
  signUpGoToConfirm,
} = authSlice.actions;

export const currentAuthenticatedUser = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const user = await awsAuth.currentAuthenticatedUser();
    dispatch(authSlice.actions.fetchCurrentAuthenticatedUserSuccess(user));
  } catch (e) {
    dispatch(authSlice.actions.fetchCurrentAuthenticatedUserError(e));
  }
};

export const signIn = (email: string, password: string): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.signIngIn());
    const user = await awsAuth.signIn(email, password);
    dispatch(authSlice.actions.signInSuccess(user));
  } catch (e) {
    dispatch(authSlice.actions.signInError(e));
  }
};

export const confirmSignIn = (cognitoUser: CognitoUser, code: string): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.confirming2FA());
    const user = await awsAuth.confirmSignIn(cognitoUser, code, 'SOFTWARE_TOKEN_MFA');
    dispatch(authSlice.actions.confirm2FASuccess(user));
  } catch (e) {
    dispatch(authSlice.actions.confirm2FAError(e));
  }
};

export const signUp = (email: string, password: string, firstname: string, lastname: string): AppThunk => async (
  dispatch: AppDispatch,
) => {
  try {
    dispatch(authSlice.actions.signUpIn());
    const user = await awsAuth.signUp({
      username: email,
      password,
      attributes: {
        family_name: lastname,
        name: firstname,
      },
    });

    dispatch(authSlice.actions.signUpSuccess(email));
  } catch (e) {
    dispatch(authSlice.actions.signUpError(e));
  }
};

export const signUpResendCode = (email: string): AppThunk => async () => {
  try {
    await awsAuth.resendSignUp(email);
  } catch (e) {
    console.error(e);
  }
};

export const confirmSignUp = (email: string, code: string): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.confirmSignUpIn());
    const user = await awsAuth.confirmSignUp(email, code);

    dispatch(authSlice.actions.confirmSignUpSuccess(user));
  } catch (e) {
    dispatch(authSlice.actions.confirmSignUpError(e));
  }
};

export const completeNewPassword = (cognitoUser: CognitoUser, password: string): AppThunk => async (
  dispatch: AppDispatch,
) => {
  try {
    dispatch(authSlice.actions.confirmingNewPassword());
    const user = await awsAuth.completeNewPassword(cognitoUser, password, null);
    dispatch(authSlice.actions.confirmNewPasswordSuccess(user));
  } catch (e) {
    dispatch(authSlice.actions.confirmNewPasswordError(e));
  }
};

export const setupTOTP = (user: CognitoUser): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.setupTotp());
    const secretKey = await awsAuth.setupTOTP(user);
    const code = buildOtpAuthPath({ user, secretKey });
    dispatch(authSlice.actions.setupTotpSuccess({ qrCode: code, secretKey }));
  } catch (e) {
    dispatch(authSlice.actions.setupTotpError(e));
  }
};

export const verifyTotpToken = (user: CognitoUser, challengeAnswer: string): AppThunk => async (
  dispatch: AppDispatch,
) => {
  try {
    dispatch(authSlice.actions.verifyingTotp());
    await awsAuth.verifyTotpToken(user, challengeAnswer);
    await awsAuth.setPreferredMFA(user, 'TOTP');
    const userResponse = await awsAuth.currentAuthenticatedUser();
    dispatch(authSlice.actions.verifyTotpSuccess(userResponse));
  } catch (e) {
    dispatch(authSlice.actions.verifyTotpError(e));
  }
};

export const signOut = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.signingOut());
    await awsAuth.signOut();
    dispatch(authSlice.actions.signOutSuccess());
  } catch (e) {
    dispatch(authSlice.actions.signOutError(e));
  }
};

export const askForForgotPassword = (email: string): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.askForForgotPasswordIn());
    await awsAuth.forgotPassword(email);
    dispatch(authSlice.actions.askForForgotPasswordSuccess(email));
  } catch (e) {
    dispatch(authSlice.actions.askForForgotPasswordError(e));
  }
};

export const askForForgotPasswordNewPassword = (email: string, code: string, password: string): AppThunk => async (
  dispatch: AppDispatch,
) => {
  try {
    dispatch(authSlice.actions.askForForgotPasswordIn());

    // Updage password
    await awsAuth.forgotPasswordSubmit(email, code, password);

    // Sign in
    const user = await awsAuth.signIn(email, password);

    // Update them together to not blink on the sign in page
    dispatch(authSlice.actions.askForForgotPasswordNewPasswordSuccess(code));
    if (user) {
      dispatch(authSlice.actions.signInSuccess(user));
    }
  } catch (e) {
    if (e.code === 'CodeMismatchException') {
      dispatch(authSlice.actions.askForForgotPasswordResetCode(e));
      dispatch(authSlice.actions.askForForgotPasswordError(e));
    } else {
      dispatch(authSlice.actions.askForForgotPasswordError(e));
    }
  }
};

export default authSlice.reducer;
