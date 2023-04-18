export interface Validations {
  email: [(value: string) => boolean, string];
  password: [(value: string) => boolean, string];
  displayName: [(value: string) => boolean, string];
}

export interface FormCheckValues {
  emailValidation: string;
  displayNameValidation: string;
  passwordValidation: string;
}
