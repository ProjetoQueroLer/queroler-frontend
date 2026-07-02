/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';

type TestData = {
  nomeDoLivro: string;
};

type Mensagem = {
  mensagemToastNoCadastraLivro: {
    ISBNNaoEncontrado: string;
  };
  campoObrigatorioCadastrarLivro: {
    ISBNObrigatorio: string;
    tituloObrigatorio: string;
    autorObrigatorio: string;
    editoraObrigatoria: string;
    anoPublicacaoObrigatorio: string;
    numeroDePaginasObrigatorio: string;
    sinopseObrigatorio: string;
  };
};

let dados: TestData;
let msg: Mensagem;

const cadastrarLivroPage = new CadastrarLivroPage();

describe('Cadastrar Livro', () => {
  before(() => {
    cy.fixture('testData').then((fixture) => {
      dados = fixture;
    });
    cy.fixture('mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it('Deve impedir cadastrar do um livro sem preencher os formulários', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Impedir o cadastro do um livro')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.botaoSalvarDesativa();
  });

  it('Deve exibir mensagens de campos obrigatórios ao tentar cadastrar sem preencher o formulário', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Campos obrigatórios')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.validarOCampoISBNObrigatorio(
      msg.campoObrigatorioCadastrarLivro.ISBNObrigatorio
    );
    cadastrarLivroPage.clicaOsCampos();
    cadastrarLivroPage.verificarCampoObrigatorio(
      msg.campoObrigatorioCadastrarLivro.tituloObrigatorio,
      msg.campoObrigatorioCadastrarLivro.autorObrigatorio,
      msg.campoObrigatorioCadastrarLivro.editoraObrigatoria,
      msg.campoObrigatorioCadastrarLivro.anoPublicacaoObrigatorio,
      msg.campoObrigatorioCadastrarLivro.numeroDePaginasObrigatorio,
      msg.campoObrigatorioCadastrarLivro.sinopseObrigatorio
    );
  });

  it('Deve manter os demais campos obrigatórios desabilitados enquanto o ISBN não for preenchido', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Campos obrigatórios')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.camposDesabilitados();
  });
});
