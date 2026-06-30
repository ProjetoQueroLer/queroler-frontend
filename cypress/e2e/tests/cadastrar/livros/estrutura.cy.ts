/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';
import { GeradorDadosLivro } from '../../../../support/utils/geradorDadosLivro';

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
  labelsCadastrarLivro: {
    isbn: string;
    tituloDoLivro: string;
    autores: string;
    editora: string;
    anoDePublicacao: string;
    numeroDePaginas: string;
    idioma: string;
    sinopse: string;
    capaDoLivro: string;
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

  it('Deve exibir todos os elementos do formulário de cadastro de livro', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Estrutura da tela')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.verificarPaginaCarregada();
    cadastrarLivroPage.verificaSeExistemOsCamposLabels([
      msg.labelsCadastrarLivro.isbn,
      msg.labelsCadastrarLivro.tituloDoLivro,
      msg.labelsCadastrarLivro.autores,
      msg.labelsCadastrarLivro.editora,
      msg.labelsCadastrarLivro.anoDePublicacao,
      msg.labelsCadastrarLivro.numeroDePaginas,
      msg.labelsCadastrarLivro.idioma,
      msg.labelsCadastrarLivro.sinopse,
    ]);
    cadastrarLivroPage.verificarLabelDaCapaDoLivro(
      msg.labelsCadastrarLivro.capaDoLivro
    );
  });

  it('Deve preencher o formulário de cadastro de livro com os dados obrigatórios', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Preenchimento do formulário')
      .severity('critical');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      GeradorDadosLivro.criarCompleto()
    );
    cadastrarLivroPage.selecionarImagemLivro();
  });

  it('Deve exibir mensagens de campos obrigatórios ao tentar cadastrar sem preencher o formulário', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Campos obrigatórios')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      GeradorDadosLivro.criarCompleto()
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
});
