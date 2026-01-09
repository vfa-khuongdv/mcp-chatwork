export const config = {
  chatworkApiToken: process.env.CHATWORK_API_TOKEN,
};

export function validateConfig() {
  if (!config.chatworkApiToken) {
    throw new Error("CHATWORK_API_TOKEN environment variable is not set.");
  }
}
