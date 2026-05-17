/// <reference types="cypress" />

import LoginPageAcoes from '../pages/login-page-acoes';

const loginAcoes = new LoginPageAcoes();
//const loginValidacoes = new LoginPageValidacoes();

describe('Testes de Login - MWF Refaturado', () => {
  beforeEach(() => {
    // Boa prática: garantir ambiente limpo antes de cada teste
    cy.visit('/');
  });

  context('Cenários de sucesso', () => {
    it('Deve realizar login válido com sucesso', () => {
      // Usa command customizado para preencher login válido
      cy.preencherCamposDeLogin();

      // Usa método da classe LoginPageAcoes para clicar no botão
      loginAcoes.clicarNoBotaoEntrar();

      // Valida redirecionamento e sucesso
      cy.validarLoginComSucesso();
    });
  });

  context('Cenários de erro', () => {
    it('Deve exibir mensagem de erro ao tentar login inválido', () => {
      // Usa command customizado para preencher login inválido
      cy.preencherCamposDeLoginInvalido();

      // Usa método da classe LoginPageAcoes para clicar no botão
      loginAcoes.clicarNoBotaoEntrar();

      // Valida mensagem de erro
      cy.validarMensagemEmailInvalido();
    });
  });

  context('Fluxos alternativos', () => {
    it('Deve acessar a tela de cadastro ao clicar em "Cadastre-se"', () => {
      loginAcoes.clicarNoBotaoCadastro();
      cy.url().should('include', '/register');
    });
  });
});
