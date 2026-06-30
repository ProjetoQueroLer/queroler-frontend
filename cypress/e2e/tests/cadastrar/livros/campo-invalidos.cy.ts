/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
// import { GeradorDadosLivro } from '../../../../support/utils/geradorDadosLivro';

type TestData = {
  nomeDoLivro: string;
};

// type Mensagem = {
//   mensagemToastNoCadastraLivro: {

//   };
// };

let dados: TestData;

const cadastrarLivroPage = new CadastrarLivroPage();

describe('Cadastrar Livro', () => {
  before(() => {
    cy.fixture('testData').then((fixture) => {
      dados = fixture;
    });
    // cy.fixture('mensagem').then((fixture) => {
    //   msg = fixture;
    // });
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
});
