/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../support/pages/CadastrarLivroPage';

type TestData = {
  nomeDoLivro: string;
};

type Mensagem = {
  ISBNNaoEncontrado: string;
  registroDeLivroCancelado: string;
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
      mensagens.ISBNNaoEncontrado
    );
    cadastrarLivroPage.selecionarImagemLivro();
  });

  it('Deve exibir mensagem de sucesso ao cadastrar um livro', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Cadastro bem-sucedido')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      mensagens.ISBNNaoEncontrado
    );
    cadastrarLivroPage.selecionarImagemLivro();
    cadastrarLivroPage.salvarCadastro();
  });

  it('Deve cancelar o cadastro de um livro', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Cancelar cadastro')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      mensagens.ISBNNaoEncontrado
    );
    cadastrarLivroPage.selecionarImagemLivro();
    cadastrarLivroPage.cancelarCadastro(mensagens.registroDeLivroCancelado);
  });
});
