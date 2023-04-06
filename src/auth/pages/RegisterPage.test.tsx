import { BrowserRouter } from "react-router-dom";
import { RegisterPage } from "./RegisterPage";
import { render, screen } from "@testing-library/react";

describe("Given a RegisterPage component", () => {
  describe("When it's rendered", () => {
    test("Then it should show heading 'Register'", () => {
      const titleText = "Register";

      render(
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      );

      const title = screen.getByRole("heading", { level: 5, name: titleText });

      expect(title).toBeInTheDocument();
    });

    test("Then it should display button with text 'Register'", () => {
      const text = "Register";

      render(
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      );

      const button = screen.getByRole("button", { name: text });

      expect(button).toBeInTheDocument();
    });

    test("Then it should display input with label 'Username'", () => {
      const labelText = "Username";

      render(
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      );

      const input = screen.getByLabelText(labelText);

      expect(input).toBeInTheDocument();
    });

    test("Then it should display input with label 'Email'", () => {
      const labelText = "Email";

      render(
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      );

      const input = screen.getByLabelText(labelText);

      expect(input).toBeInTheDocument();
    });

    test("Then it should display input with label 'Password'", () => {
      const labelText = "Password";

      render(
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      );

      const input = screen.getByLabelText(labelText);

      expect(input).toBeInTheDocument();
    });

    test("Should show link 'Log in'", () => {
      const linkText = "Log in";

      render(
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      );

      const link = screen.getByRole("link", { name: linkText });

      expect(link).toBeInTheDocument();
    });

    test("Should show text 'Already a member?'", () => {
      const expectedText = "Already a member?";

      render(
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      );

      const text = screen.getByText(expectedText);

      expect(text).toBeInTheDocument();
    });
  });
});
