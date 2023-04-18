import { Validations } from "./types";

export const formValidations: Validations = {
  email: [(value: string) => value.includes("@"), "Email must have a @"],
  password: [
    (value: string) => value.length >= 6,
    "The password must have more then 6 characters",
  ],
  displayName: [(value: string) => value.length >= 1, "The name is required"],
};
