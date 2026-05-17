import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
//sugestão do copilot para adicionar o Allure:
import allureWriter from '@shelex/cypress-allure-plugin/writer';

dotenv.config();

const _config = {
  apiUrl: process.env.API_URL || 'https://queroler-frontend.onrender.com/',
  apiKey: process.env.API_KEY || '',
};

export default defineConfig({
  e2e: {
    baseUrl: _config.apiUrl,
    specPattern: 'cypress/e2e/**/*.{js,ts}',
    env: {
      apiKey: _config.apiKey,
    },
    setupNodeEvents(on, config) {
      //sugestão do copilot para adicionar o Allure:
      allureWriter(on, config);
      // _config está disponível no escopo do módulo e pode ser usado aqui
      config.baseUrl = _config.apiUrl;
      config.env = { ...config.env, ..._config };

      // Exemplo: registrar uma task que retorna _config
      on('task', {
        getConfig() {
          return _config;
        },
      });

      return config;
    },
  },
});
