/// <reference types="cypress" />

import LoginPageTestMwf from '../pages/login-page-testmwf';

const loginPage = new LoginPageTestMwf();

describe('Testes positivos e negativos da Tela de Login', () => {
  const url = Cypress.config('baseUrl');

  it('Acesso com sucesso à tela inicial', () => {
    //allure é a biblioteca report
    cy.allure()
      .feature('Autenticação')
      .story('Login válido')
      .severity('critical');

    //cy.visit(url);
    //sugestão do copilot para não quebrar se o servidor estiver acordando
    cy.visit(url, { failOnStatusCode: false });
    cy.get('svg').should('be.visible');
    cy.preencherCamposDeLogin();
    loginPage.clicarNoBotaoEntrar();
  });
  /*
  it('Realizar logout do sistema', () => {
    cy.allure()
      .feature('Inicial da tela')
      .story('Login sair')
      .severity('critical');

    cy.visit(url, { failOnStatusCode: false });
    cy.preencherCamposDeLogin(); 
    loginPage.clicarNoBotaoEntrar();
    telaInicialPage.nomeUsuario();
    telaInicialPage.sair();
  });
*/

  it('Login inválido', () => {
    cy.allure()
      .feature('Autenticação')
      .story('Login inválido')
      .severity('critical');

    cy.visit(url, { failOnStatusCode: false });
    cy.get('svg').should('be.visible');
    cy.preencherSenhaDeLoginInvalido();
    loginPage.validarMensagemInvalidoEmail();
  });

  /*
  it('Verificar se titulo nome da aplicação', () => {
    cy.allure()
      .feature('Inicial da tela')
      .story('Titulo válido')
      .severity('critical');

    cy.visit(url);
    loginPage.preencherCampoDeEmail(Cypress.env('user_email'));
    loginPage.preencherSenha(Cypress.env('user_senha'));
    loginPage.clicarNoBotaoEntrar();
    telaInicialPage.nomeUsuario();
    telaInicialPage.tituloQueroLer();
  });

  it('Verificar se sino está desabilitado', () => {
    cy.allure()
      .feature('Inicial da tela')
      .story('Sino desabilitado')
      .severity('critical');

    cy.visit(url);
    loginPage.preencherCampoDeEmail(Cypress.env('user_email'));
    loginPage.preencherSenha(Cypress.env('user_senha'));
    loginPage.clicarNoBotaoEntrar();
    telaInicialPage.sino();
  }); */
});
