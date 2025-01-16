export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface SignInData {
  email: string;
  password: string;
}
