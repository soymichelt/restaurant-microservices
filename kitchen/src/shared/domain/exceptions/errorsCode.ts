export const ERROR_CODES = {
  // SHA-100*: Shared kernel error codes
  InvalidTypeException: 'SHA-1001',
  EnumValueIsInvalidException: 'SHA-1002',
  ArgRequiredException: 'SHA-1003',
  ArgInvalidException: 'SHA-1004',
  EncryptException: 'SHA-1005',
  DecryptUnknownException: 'SHA-1006',
  UnauthorizedException: 'SHA-1006',
  IdInvalidException: 'SHA-1007',
  // ORD-200*: Users module error codes
  OrderNotFoundException: 'ORD-2001',
  OrderStateInvalidException: 'ORD-2002',
  // RCP-300*: Recipes module error codes
  RecipeNotFoundException: 'RCP-3001',
};
