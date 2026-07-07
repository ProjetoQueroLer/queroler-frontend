/// <reference types = "cypress"/>

import { HomePage } from '../../../../support/pages/HomePage';

const homePage = new HomePage();

type Perfil = {
  perfilAdministrador2: { email: string; senha: string };
  perfilModerador2: { email: string; senha: string };
  perfilLeitor2: { email: string; senha: string };
};

let dadosPerfil: Perfil;

describe('visualizar todos os resultados da pesquisa de livros', () => {
  beforeEach(() => {
    cy.fixture('perfil').then((fixture) => {
      dadosPerfil = fixture;

      cy.visit('https://quero-ler-stg.netlify.app/');
      cy.login(
        dadosPerfil.perfilAdministrador2.email,
        dadosPerfil.perfilAdministrador2.senha
      );
    });
  });

  it('validar clicar no botão [Ver todos os  6 resultados]', () => {
    cy.allure()
      .feature('visualizar todos os resultados da pesquisa de livros')
      .story('E02H03 - Pesquisar os livros cadastrados')
      .severity('normal');

    homePage.pesquisaPorAutor();
    homePage.pesquisar('testeAutor');
    homePage.selecionarBotaoVerTodosOsResultados();
    cy.wait(5000);
    homePage.verificarQuantidadeExataDeLivros(6);
  });

  it('validar clicar no botão [Ver todos os  15 resultados]', () => {
    cy.allure()
      .feature('visualizar todos os resultados da pesquisa de livros')
      .story('E02H03 - Pesquisar os livros cadastrados')
      .severity('normal');

    homePage.pesquisaPorAutor();
    homePage.pesquisar('org');
    homePage.selecionarBotaoVerTodosOsResultados();
    cy.wait(5000);
    homePage.verificarQuantidadeExataDeLivros(15);
  });

  it('validar mais que 15 resultados', () => {
    cy.allure()
      .feature('visualizar todos os resultados da pesquisa de livros')
      .story('E02H03 - Pesquisar os livros cadastrados')
      .severity('normal');

    homePage.pesquisaPorAutor();
    homePage.pesquisar('mar');
    homePage.selecionarBotaoVerTodosOsResultados();
    cy.wait(5000);
    homePage.verificarQuantidadeExataDeLivros(15);
    homePage.selecionarBotaoPaginacao('2');
    homePage.verificarQuantidadeDeLivrosMaiorQue(0);
  });
});
