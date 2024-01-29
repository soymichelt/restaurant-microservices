export const ERROR_CODES = {
  // SHA-100*: Shared kernel error codes
  InvalidTypeException: 'SHA-1001',
  EnumValueIsInvalidException: 'SHA-1002',
  ArgRequiredException: 'SHA-1003',
  ArgInvalidException: 'SHA-1004',
  EncryptException: 'SHA-1005',
  DecryptUnknownException: 'SHA-1006',
  UnauthorizedException: 'SHA-1006',
  UserTokenDecodeException: 'SHA-1007',
  UserTokenEncodeException: 'SHA-1008',
  TokenHasExpiredException: 'SHA-1009',
  UserNotFoundException: 'SHA-1010',
  // USR-200*: Users module error codes
  UserEmailAlreadyExistException: 'USR-2001',
  UserNameAlreadyExistException: 'USR-2002',
  UserCredentialsAreInvalidException: 'USR-2003',
};
