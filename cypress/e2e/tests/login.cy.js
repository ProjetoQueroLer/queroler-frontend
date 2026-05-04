/// <reference types="cypress" />

import LoginPage from '../pages/login-page.cy';
import TelaInicialPage from '../pages/tela-inicial-page.cy';

const loginPage = new LoginPage();
const telaInicialPage = new TelaInicialPage();

describe('Tela inicial para acesso dos usuários', () => {
  const url = Cypress.config('baseUrl');

  it('Acesso com sucesso à tela inicial', () => {
    cy.allure()
      .feature('Autenticação')
      .story('Login válido')
      .severity('critical');

    cy.visit(url);
    loginPage.email(Cypress.env('user_email'));
    loginPage.senha(Cypress.env('user_senha'));
    loginPage.entrar();
  });

  it('A tela inicial sair com sucesso', () => {
    cy.allure()
      .feature('Inicial da tela')
      .story('Login sair')
      .severity('critical');

    cy.visit(url);
    loginPage.email(Cypress.env('user_email'));
    loginPage.senha(Cypress.env('user_senha'));
    loginPage.entrar();
    telaInicialPage.nomeUsuario();
    telaInicialPage.sair();
  });

  it('Login inválido', () => {
    cy.allure()
      .feature('Autenticação')
      .story('Login inválido')
      .severity('critical');

    cy.visit(url);
    loginPage.email('testes@');
    loginPage.senha('1234567890');
    loginPage.mensagemInvalidoEmail();
  });

  it('Verificar se titulo nome da aplicação', () => {
    cy.allure()
      .feature('Inicial da tela')
      .story('Titulo válido')
      .severity('critical');

    cy.visit(url);
    loginPage.email(Cypress.env('user_email'));
    loginPage.senha(Cypress.env('user_senha'));
    loginPage.entrar();
    telaInicialPage.nomeUsuario();
    telaInicialPage.tituloQueroLer();
  });

  it('Verificar se sino está desabilitado', () => {
    cy.allure()
      .feature('Inicial da tela')
      .story('Sino desabilitado')
      .severity('critical');

    cy.visit(url);
    loginPage.email(Cypress.env('user_email'));
    loginPage.senha(Cypress.env('user_senha'));
    loginPage.entrar();
    telaInicialPage.sino();
  });
});
