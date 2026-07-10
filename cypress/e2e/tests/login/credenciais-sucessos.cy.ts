/// <reference types="cypress" />

import { LoginPage } from '../../../support/pages/LoginPage';

type Perfil = {
  perfilLeitor: { email: string; senha: string };
};

type Mensagem = {
  mensagemToast: {
    toastLoginSucesso: string;
  };
};

let dados: Perfil;
let msg: Mensagem;

const loginPage = new LoginPage();

describe('Login', () => {
  before(() => {
    cy.fixture('perfil').then((fixture) => {
      dados = fixture;
    });
    cy.fixture('mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    loginPage.visitarPagina();
  });

  describe('Autenticação com credenciais', () => {
    it('Deve exibir toast de sucesso login com credenciais', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Login sucesso')
        .severity('critical');

      loginPage
        .preencherEmail(dados.perfilLeitor.email)
        .preencherSenha(dados.perfilLeitor.senha)
        .clicarEmEntrar();

      loginPage.verificarToast(msg.mensagemToast.toastLoginSucesso);
    });
  });
});
