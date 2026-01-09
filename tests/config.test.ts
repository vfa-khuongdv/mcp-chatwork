import { validateConfig } from "../src/config";

describe("validateConfig", () => {
  it("should throw error if CHATWORK_API_TOKEN is not set", () => {
    process.env.CHATWORK_API_TOKEN = "";
    expect(() => validateConfig()).toThrow(
      "CHATWORK_API_TOKEN environment variable is not set."
    );
  });

  it("should not throw error if CHATWORK_API_TOKEN is set", () => {
    process.env.CHATWORK_API_TOKEN = "valid_token";
    expect(() => validateConfig()).not.toThrow();
  });
});
