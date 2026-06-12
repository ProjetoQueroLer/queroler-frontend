/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../support/pages/CadastrarLivroPage';

type TestData = {
  nomeDoLivro: string;
};

let dados: TestData;

const cadastrarLivroPage = new CadastrarLivroPage();

describe('Cadastrar Livro', () => {
  before(() => {
    cy.fixture('testData').then((fixture) => {
      dados = fixture;
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
    cadastrarLivroPage.preencherFormularioObrigatorio();
  });
});
