/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../support/pages/CadastrarLivroPage';

const cadastrarLivroPage = new CadastrarLivroPage();

type TestData = {
  nomeDoLivro: string;
};

let dados: TestData;

describe('Cadastrar Livro', () => {
  before(() => {
    cy.fixture('testData').then((fixture) => {
      dados = fixture;
    });
  });

  beforeEach(() => {
    cy.login();
    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
  });

  it('Deve exibir todos os elementos do formulário de cadastro de livro', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Estrutura da tela')
      .severity('normal');

    cadastrarLivroPage.verificarPaginaCarregada();
  });
});
