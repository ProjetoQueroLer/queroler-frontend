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
let mensagens: Mensagem;

const cadastrarLivroPage = new CadastrarLivroPage();

describe('Cadastrar Livro', () => {
  before(() => {
    cy.fixture('testData').then((fixture) => {
      dados = fixture;
    });
    cy.fixture('mensagem').then((fixture) => {
      mensagens = fixture;
    });
  });

  beforeEach(() => {
    cy.login();
  });

  it('Deve exibir todos os elementos do formulário de cadastro de livro', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Estrutura da tela')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.verificarPaginaCarregada();
  });

  it('Deve preencher o formulário de cadastro de livro com os dados obrigatórios', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Preenchimento do formulário')
      .severity('critical');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      mensagens.mensagemToastNoCadastraLivro.ISBNNaoEncontrado
    );
    cadastrarLivroPage.selecionarImagemLivro();
  });

  it('Deve exibir mensagens de campos obrigatórios ao tentar cadastrar sem preencher o formulário', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Campos obrigatórios')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.validarOCampoISBNObrigatorio(
      mensagens.campoObrigatorioCadastrarLivro.ISBNObrigatorio
    );
    cadastrarLivroPage.clicaOsCampos();
    cadastrarLivroPage.verificarCampoObrigatorio(
      mensagens.campoObrigatorioCadastrarLivro.tituloObrigatorio,
      mensagens.campoObrigatorioCadastrarLivro.autorObrigatorio,
      mensagens.campoObrigatorioCadastrarLivro.editoraObrigatoria,
      mensagens.campoObrigatorioCadastrarLivro.anoPublicacaoObrigatorio,
      mensagens.campoObrigatorioCadastrarLivro.numeroDePaginasObrigatorio,
      mensagens.campoObrigatorioCadastrarLivro.sinopseObrigatorio
    );
  });
});
