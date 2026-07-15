/// <reference types="cypress" />

import { HomePage } from '../../../support/pages/HomePage';
import { PerfilPage } from '../../../support/pages/PerfilPage';

type TestData = {
  meuPerfil: {
    nome: string;
    email: string;
    cpf: string;
    dataDeNascimento: string;
    cidade: string;
    estado: string;
    pais: string;
  };
};

let testData: TestData;

const homePage = new HomePage();
const perfilPage = new PerfilPage();

describe('Visualizar o Perfil', () => {
  before(() => {
    cy.fixture('testData').then((fixture) => {
      testData = fixture;
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it('Deve verificar os dados do meu perfil', () => {
    cy.allure()
      .feature('Meu Perfil')
      .story('Visualizar o meu perfil com credenciais')
      .severity('normal');

    homePage.abrirMenuUsuario().fecharToast().clicarEmMeuPerfil();
    perfilPage
      .verificarNome(testData.meuPerfil.nome)
      .verificarEmail(testData.meuPerfil.email)
      .verificarCpf(testData.meuPerfil.cpf)
      .verificarDataNascimento(testData.meuPerfil.dataDeNascimento)
      .verificarCidade(testData.meuPerfil.cidade)
      .verificarEstado(testData.meuPerfil.estado)
      .verificarPais(testData.meuPerfil.pais)
      .verificarFotoDePerfilVisivel();
  });
});
