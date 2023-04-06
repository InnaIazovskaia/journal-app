import { render, screen } from "@testing-library/react";
import { LoginPage } from "./LoginPage";
import { BrowserRouter } from "react-router-dom";

describe("Given a LoginPage component", () => {
  describe("When it;s rendered", () => {
    test("Then it shouls show heading 'Login'", () => {
      const titleText = "Login";

      render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      );

      const title = screen.getByRole("heading", { level: 5, name: titleText });

      expect(title).toBeInTheDocument();
    });

    test("Then it should display button with text 'Login'", () => {
      const text = "Login";

      render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      );

      const button = screen.getByRole("button", { name: text });

      expect(button).toBeInTheDocument();
    });

    test("Then it should display button with text 'Google'", () => {
      const text = "Google";

      render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      );

      const button = screen.getByRole("button", { name: text });

      expect(button).toBeInTheDocument();
    });

    test("Then it should display input with label 'Email'", () => {
      const labelText = "Email";

      render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      );

      const input = screen.getByLabelText(labelText);

      expect(input).toBeInTheDocument();
    });

    test("Then it should display input with label 'Password'", () => {
      const labelText = "Password";

      render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      );

      const input = screen.getByLabelText(labelText);

      expect(input).toBeInTheDocument();
    });

    test("It should shoe link 'Create an account'", () => {
      const linkText = "Create an account";

      render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      );

      const link = screen.getByRole("link", { name: linkText });

      expect(link).toBeInTheDocument();
    });
  });
});
