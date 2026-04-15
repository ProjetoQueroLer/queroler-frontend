import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },
});
