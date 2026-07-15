/// <reference types = "cypress"/>

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
import { HomePage } from '../../../../support/pages/HomePage';
import { Mensagem } from '../../../../support/utils/Types/Mensagem';
import { TestData } from '../../../../support/utils/Types/TestData';

type Perfil = {
  perfilAdministrador2: { email: string; senha: string };
  perfilModerador2: { email: string; senha: string };
  perfilLeitor2: { email: string; senha: string };
};

let dados: TestData;
let mensagens: Mensagem;
let dadosPerfil: Perfil;

let autor: string;
let titulo: string;
let nomeDoLivro: string;

const homePage = new HomePage();
const cadastrarLivroPage = new CadastrarLivroPage();

describe('visualizar todos os resultados da pesquisa de livros', () => {
  before(() => {
    cy.fixture('perfil').then((fixture) => {
      dadosPerfil = fixture;
    });
    cy.fixture('testData').then((fixture) => {
      dados = fixture;
      nomeDoLivro = dados.nomeDoLivro;
    });
    cy.fixture('mensagem').then((fixture) => {
      mensagens = fixture;
    });
  });

  beforeEach(() => {
    cy.allure()
      .feature('Visualizar todos os resultados da pesquisa de livros')
      .story('E02H03 - Pesquisar os livros cadastrados')
      .severity('normal');
  });

  describe('Perfil Administrador', () => {
    it('validar a busca retornar mais de 5 resultados do perfil Administrador', () => {
      cy.login(
        dadosPerfil.perfilAdministrador2.email,
        dadosPerfil.perfilAdministrador2.senha
      );

      homePage.contarMaisDe5LivrosDeAutor('testeAutor');
    });

    it('validar a busca retornar 15 resultados do perfil Administrador', () => {
      cy.login(
        dadosPerfil.perfilAdministrador2.email,
        dadosPerfil.perfilAdministrador2.senha
      );

      homePage.contar15LivrosDeAutor('org');
    });

    it('validar a busca retornar mais de 15 resultados do perfil Administrador', () => {
      cy.login(
        dadosPerfil.perfilAdministrador2.email,
        dadosPerfil.perfilAdministrador2.senha
      );
      homePage.contarMaisDe15LivrosDeAutor('ma');
    });

    it('visualizar livros ordenados por data de cadastro decrescente do perfil Administrador', () => {
      cy.login(
        dadosPerfil.perfilAdministrador2.email,
        dadosPerfil.perfilAdministrador2.senha
      );

      const [autor, titulo] = buscarDadosLivro();
      homePage.verificarOrdemDecrescenteDosLivrosPorAutor(autor, titulo);
    });
  });

  describe('Perfil Moderador', () => {
    it('validar a busca retornar mais de 5 resultados do perfil Moderador', () => {
      cy.login(
        dadosPerfil.perfilModerador2.email,
        dadosPerfil.perfilModerador2.senha
      );

      homePage.contarMaisDe5LivrosDeAutor('testeAutor');
    });

    it('validar a busca retornar 15 resultados do perfil Moderador', () => {
      cy.login(
        dadosPerfil.perfilModerador2.email,
        dadosPerfil.perfilModerador2.senha
      );

      homePage.contar15LivrosDeAutor('org');
    });

    it('validar a busca retornar mais de 15 resultados do perfil Moderador', () => {
      cy.login(
        dadosPerfil.perfilModerador2.email,
        dadosPerfil.perfilModerador2.senha
      );
      homePage.contarMaisDe15LivrosDeAutor('ma');
    });

    it('visualizar livros ordenados por data de cadastro decrescente do perfil Moderador', () => {
      cy.login(
        dadosPerfil.perfilModerador2.email,
        dadosPerfil.perfilModerador2.senha
      );

      const [autor, titulo] = buscarDadosLivro();
      homePage.verificarOrdemDecrescenteDosLivrosPorAutor(autor, titulo);
    });
  });

  describe('Perfil Leitor', () => {
    it('validar a busca retornar mais de  5 resultados do perfil Leitor', () => {
      cy.login(
        dadosPerfil.perfilLeitor2.email,
        dadosPerfil.perfilLeitor2.senha
      );

      homePage.contarMaisDe5LivrosDeAutor('testeAutor');
    });

    it('validar a busca retornar 15 resultados do perfil Leitor', () => {
      cy.login(
        dadosPerfil.perfilLeitor2.email,
        dadosPerfil.perfilLeitor2.senha
      );

      homePage.contar15LivrosDeAutor('org');
    });

    it('validar a busca retornar mais de 15 resultados do perfil Leitor', () => {
      cy.login(
        dadosPerfil.perfilLeitor2.email,
        dadosPerfil.perfilLeitor2.senha
      );
      homePage.contarMaisDe15LivrosDeAutor('ma');
    });

    it('visualizar livros ordenados por data de cadastro decrescente do perfil Leitor', () => {
      cy.login(
        dadosPerfil.perfilLeitor2.email,
        dadosPerfil.perfilLeitor2.senha
      );

      const [autor, titulo] = buscarDadosLivro();
      homePage.verificarOrdemDecrescenteDosLivrosPorAutor(autor, titulo);
    });
  });
  function buscarDadosLivro(): string[] {
    const dadosLivro = cadastrarLivroPage.preencherFormularioCompleto(
      nomeDoLivro,
      mensagens
    );
    autor = dadosLivro.autor ?? '';
    titulo = dadosLivro.titulo ?? '';
    return [autor, titulo];
  }
});
