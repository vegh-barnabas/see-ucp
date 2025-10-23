export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 32;
export const PASSWORD_MIN_LENGTH = 8;

export interface RegisterUser {
  username: string;
  password: string;
  email: string;
}

export interface ForgotPasswordUser {
  username: string;
  email: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
