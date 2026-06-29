/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';

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

let dados: TestData;
let mensagens: Mensagem;
let isbnCadastrado: string;

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

  describe('Cadastro de livro com imagem', () => {
    it('Deve exibir mensagem de sucesso ao cadastrar um livro', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('Cadastro bem-sucedido')
        .severity('normal');

      cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
      cadastrarLivroPage.preencherFormularioObrigatorio(
        mensagens.mensagemToastNoCadastraLivro.ISBNNaoEncontrado
      );
      cadastrarLivroPage.selecionarImagemLivro();
      cadastrarLivroPage.salvarCadastro(
        mensagens.mensagemToastNoCadastraLivro.registroDeLivroSucesso
      );

      isbnCadastrado = cadastrarLivroPage.getIsbnCadastrado();
    });

    it('Não deve permitir cadastro com ISBN já existente', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('ISBN duplicado - Cadastro com imagem')
        .severity('critical');

      cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
      cadastrarLivroPage.preencherISBNJaCadastrado(isbnCadastrado);
      cadastrarLivroPage.salvarCadastroDuplicado(
        mensagens.mensagemToastNoCadastraLivro.ISBNJaCadastrado
      );
    });

    it('Deve exibir mensagem ao cancelar o cadastro de um livro', () => {
      cy.allure()
        .feature('Cadastrar Livro')
        .story('Cancelar cadastro')
        .severity('normal');

      cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
      cadastrarLivroPage.preencherFormularioObrigatorio(
        mensagens.mensagemToastNoCadastraLivro.ISBNNaoEncontrado
      );
      cadastrarLivroPage.selecionarImagemLivro();
      cadastrarLivroPage.cancelarCadastro(
        mensagens.mensagemToastNoCadastraLivro.registroDeLivroCancelado
      );
    });
  });
});
