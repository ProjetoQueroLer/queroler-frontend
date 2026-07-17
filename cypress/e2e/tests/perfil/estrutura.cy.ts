/// <reference types="cypress" />

import { HomePage } from '../../../support/pages/HomePage';
import { PerfilPage } from '../../../support/pages/PerfilPage';
import { TestData } from '../../../support/utils/Types/TestData';
import { Mensagem } from '../../../support/utils/Types/Mensagem';

let msg: Mensagem;
let dados: TestData;

const homePage = new HomePage();
const perfilPage = new PerfilPage();

describe('Estrutura do Perfil', () => {
  before(() => {
    cy.fixture('mensagem').then((fixture) => {
      msg = fixture;
    });
    cy.fixture('testData').then((fixture) => {
      dados = fixture;
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

  it('Deve exibir todos os elementos do formulário e os botões do Meu Perfil', () => {
    cy.allure()
      .feature('Meu Perfil')
      .story('Meu perfil com credenciais')
      .severity('normal');

    homePage.abrirMenuUsuario().fecharToast().clicarEmMeuPerfil();
    perfilPage
      .verificarPaginaCarregada(msg.meuPerfil.tituloPagina)
      .verificarSeExistemOsCamposLabels([
        dados.camposDoMeuPerfil.nomeCompleto,
        dados.camposDoMeuPerfil.email,
        dados.camposDoMeuPerfil.cpf,
        dados.camposDoMeuPerfil.dataDeNascimento,
        dados.camposDoMeuPerfil.cidade,
        dados.camposDoMeuPerfil.estado,
        dados.camposDoMeuPerfil.pais,
      ])
      .verificarFotoDePerfilVisivel()
      .verificarSeBotaoSalvarExiste()
      .verificarSeBotaoVoltarExiste()
      .verificarSeBotaoExculirPerfilExiste();
  });
});
