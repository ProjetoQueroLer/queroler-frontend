/// <reference types="cypress" />

import { LoginPage } from '../../../support/pages/LoginPage';

type TestData = {
  emailInvalido: string;
  emailSemArroba: string;
  emailMuitoLongo: string;
  senhaCurta: string;
  credenciaisInvalidas: { email: string; senha: string };
  loginNaoPreenchidos: { email: string; senha: string };
};

let dados: TestData;

const loginPage = new LoginPage();

describe('Login', () => {
  before(() => {
    cy.fixture('testData').then((fixture) => {
      dados = fixture;
    });
  });

  beforeEach(() => {
    loginPage.visitarPagina();
  });

  describe('Autenticação com credenciais inválidas', () => {
    it('Deve exibir toast de erro ao tentar login com credenciais incorretas', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Login inválido')
        .severity('critical');

      loginPage
        .preencherEmail(dados.credenciaisInvalidas.email)
        .preencherSenha(dados.credenciaisInvalidas.senha)
        .clicarEmEntrar();

      cy.get('.Toastify__toast--error').should('be.visible');
    });
  });
});
