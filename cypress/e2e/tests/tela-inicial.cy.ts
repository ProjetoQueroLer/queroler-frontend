/// <reference types="cypress" />

 
import { LoginPage } from '../../support/pages/LoginPage';
 
import { HomePage } from '../../support/pages/HomePage';

const loginPage = new LoginPage();
const homePage = new HomePage();

type Mensagem = {
  toastLoginSucesso: string;
  toastLogoutSucesso: string;
};

let msg: Mensagem;

before(() => {
  cy.fixture('mensagem').then((fixture) => {
    msg = fixture;
  });
});

beforeEach(() => {
  cy.login();
});

// ─────────────────────────────────────────────
// Tela Inicial
// ─────────────────────────────────────────────
describe('Tela Inicial', () => {
  it('Deve exibir toast de sucesso após login realizado com sucesso', () => {
    cy.allure()
      .feature('Tela Inicial')
      .story('Login válido')
      .severity('critical');

    homePage.verificarToast(msg.toastLoginSucesso);
  });

  it('Deve exibir o logo da aplicação', () => {
    cy.allure()
      .feature('Tela Inicial')
      .story('Logo visível')
      .severity('normal');

    homePage.fecharToast().verificarLogoVisivel();
  });

  it('Deve exibir o ícone de notificação', () => {
    cy.allure()
      .feature('Tela Inicial')
      .story('Sino visível')
      .severity('normal');

    homePage.fecharToast().verificarSinoVisivel();
  });

  it('Deve realizar logout com sucesso e retornar à tela de login', () => {
    cy.allure().feature('Tela Inicial').story('Logout').severity('critical');

    homePage
      .fecharToast()
      .abrirMenuUsuario()
      .clicarEmSair()
      .verificarToast(msg.toastLogoutSucesso);

    loginPage.verificarPaginaCarregada();
  });
});
