import { useEffect, useMemo, useState } from "react";
import { FormCheckValues, Validations } from "./types";

export const useForm = <FormState>(
  initialForm: FormState,
  formValidations: Validations = {} as Validations
) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidtion, setFormValidation] = useState({} as FormCheckValues);

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidtion)) {
      if (formValidtion[formValue as keyof FormCheckValues] !== "")
        return false;
    }

    return true;
  }, [formValidtion]);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckValues: FormCheckValues = {
      emailValidation: "",
      displayNameValidation: "",
      passwordValidation: "",
    };

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] =
        formValidations[formField as keyof Validations];

      formCheckValues[`${formField}Validation` as keyof FormCheckValues] = fn(
        (formState as Record<string, string>)[formField]
      )
        ? ""
        : errorMessage;
    }

    setFormValidation(formCheckValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidtion,
    isFormValid,
  };
};
