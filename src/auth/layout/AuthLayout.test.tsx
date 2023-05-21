import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthLayout } from "./AuthLayout";

describe("Given a AuthLayout component", () => {
  describe("When it's rendered with title text 'Login'", () => {
    test("Then it should show heading 'Login'", () => {
      const titleText = "Login";

      render(<AuthLayout title={titleText}>{}</AuthLayout>);

      const title = screen.getByRole("heading", { level: 5, name: titleText });

      expect(title).toBeInTheDocument();
    });
  });
});
