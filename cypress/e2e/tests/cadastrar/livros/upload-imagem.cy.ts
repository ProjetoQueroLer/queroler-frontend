/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
import { GeradorDadosLivro } from '../../../../support/utils/geradorDadosLivro';
import { gerarESalvarImagemPesado } from '../../../../support/utils/geradorImagem';

type TestData = {
  nomeDoLivro: string;
};

type Mensagem = {
  mensagemToastNoCadastraLivro: {
    ISBNNaoEncontrado: string;
  };
  avisoErro: {
    ImagemMaiorQue10MB: string;
  };
};

let dados: TestData;
let msg: Mensagem;

const cadastrarLivroPage = new CadastrarLivroPage();

describe('Cadastrar Livro', () => {
  before(() => {
    gerarESalvarImagemPesado();
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

  it('Deve exibir mensagem de aviso ao tentar upload de uma imagem mais 10 MB', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Upload de imagem')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      { isbn: GeradorDadosLivro.criar().isbn }
    );
    cadastrarLivroPage.selecionarImagemLivro('pesado');
    cadastrarLivroPage.verificarSeExisteMensagemDeErro(
      msg.avisoErro.ImagemMaiorQue10MB
    );
  });
});
