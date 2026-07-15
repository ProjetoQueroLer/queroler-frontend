/// <reference types="cypress" />

import { HomePage } from '../../../support/pages/HomePage';
import { PerfilPage } from '../../../support/pages/PerfilPage';

type Mensagem = {
  meuPerfil: {
    tituloPagina: string;
  };
};

let msg: Mensagem;

const homePage = new HomePage();
const perfilPage = new PerfilPage();

describe('Estrutura do Perfil', () => {
  before(() => {
    cy.fixture('mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it('Deve acessar no meu perfil com credenciais', () => {
    cy.allure()
      .feature('Meu Perfil')
      .story('Meu perfil com credenciais')
      .severity('normal');

    homePage.abrirMenuUsuario().fecharToast().clicarEmMeuPerfil();
    perfilPage.verificarPaginaCarregada(msg.meuPerfil.tituloPagina);
  });
});
