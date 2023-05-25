import "@testing-library/jest-dom";
import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
  cleanup();
});
