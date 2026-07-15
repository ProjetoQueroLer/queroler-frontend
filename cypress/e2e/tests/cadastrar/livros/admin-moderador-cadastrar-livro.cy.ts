/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
import { GeradorDadosLivro } from '../../../../support/utils/geradorDadosLivro';
import { gerarEsalvarImagemLeve } from '../../../../support/utils/geradorImagem';

type TestData = {
  nomeDoLivro: string;
};

type Mensagem = {
  mensagemToastNoCadastraLivro: {
    ISBNNaoEncontrado: string;
    registroDeLivroSucesso: string;
    registroDeLivroCancelado: string;
    ISBNJaCadastrado: string;
    ISBNEncontrado: string;
  };
};

type Perfil = {
  perfilAdministrador2: { email: string; senha: string };
  perfilModerador2: { email: string; senha: string };
};

let dados: TestData;
let mensagens: Mensagem;
let dadosPerfil: Perfil;

const cadastrarLivroPage = new CadastrarLivroPage();

describe('Cadastrar Livro', () => {
  before(() => {
    gerarEsalvarImagemLeve();
    cy.fixture('testData').then((fixture) => {
      dados = fixture;
    });
    cy.fixture('mensagem').then((fixture) => {
      mensagens = fixture;
    });
    cy.fixture('perfil').then((fixture) => {
      dadosPerfil = fixture;
    });
  });

  beforeEach(() => {
    cy.login(
      dadosPerfil.perfilAdministrador2.email,
      dadosPerfil.perfilAdministrador2.senha
    );
  });

  describe('Cadastrar de livro com perfil Administrador', () => {
    it('Deve exibir mensagem de sucesso ao cadastrar um livro sem imagem', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('Cadastro sem imagem')
        .severity('normal');

      cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
      cadastrarLivroPage.preencherFormularioObrigatorio(
        mensagens.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
        GeradorDadosLivro.criarCompleto()
      );
      cadastrarLivroPage.salvarCadastro(
        mensagens.mensagemToastNoCadastraLivro.registroDeLivroSucesso
      );
    });

    it('Deve exibir mensagem de sucesso ao cadastrar um livro com imagem', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('Cadastro com imagem até 10mb')
        .severity('normal');

      cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
      cadastrarLivroPage.preencherFormularioObrigatorio(
        mensagens.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
        GeradorDadosLivro.criarCompleto()
      );
      cadastrarLivroPage.selecionarImagemLivro();
      cadastrarLivroPage.salvarCadastro(
        mensagens.mensagemToastNoCadastraLivro.registroDeLivroSucesso
      );
    });
  });
});
