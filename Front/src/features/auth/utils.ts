import { CognitoUser, Error } from 'features/auth/types';
import { AWSErrorCode } from 'features/auth/enums';

const DEFAULT_ISSUER = 'DeckList';

export const buildOtpAuthPath = ({
  user,
  issuer = DEFAULT_ISSUER,
  secretKey,
}: {
  user: CognitoUser;
  issuer?: string;
  secretKey: string;
}) => `otpauth://totp/${user.username}?secret=${secretKey}&issuer=${issuer}`;

export function HandleAWSErrorMessage(error: Error | undefined): string {
  if (!error) {
    return '';
  }

  switch (error.code) {
    case AWSErrorCode.INVALID_PARAMETER_EXCEPTION:
      return `2 validation errors detected: Your user code should respect the following rules : length less or equal to 6 characters and only alphanumeric characters are allowed ( no special characters such as : ! # @ ...)`;
    default:
      return error.message;
  }
}
