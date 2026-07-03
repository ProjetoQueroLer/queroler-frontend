/// <reference types="cypress" />

import { CadastrarLivroPage } from '../../../../support/pages/CadastrarLivroPage';

type TestData = {
  nomeDoLivro: string;
  cadastrarLivroInvalidos: {
    ISBNInvalido: string;
    autorInvalido: string;
    anoPublicacaoFuturo: string;
    anoPublicacaoLetra: string;
    anoPublicacaoMenosDe4Digitos: string;
    numeroDePaginasComLetras: string;
    numeroDePaginasInvalido: string;
  };
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
  avisoErro: {
    campoAutorNaoDeveConterNumerosEEspeciais: string;
    isbnDeveConterApenasNumeros: string;
    anoPublicacaoNaoPodeMaiorQueAtual: string;
    anoPublicacaoDeveTer4Digitos: string;
    anoPublicacaoDeveConterApenasNumeros: string;
    numeroDePaginasDeveConterApenasNumeros: string;
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

  it('Deve exibir uma mensagem de aviso ao tentar preencher o campo ISBN com caracteres inválidos', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Campo ISBN')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.campoIsbnComPressTab(
      dados.cadastrarLivroInvalidos.ISBNInvalido
    );
    cadastrarLivroPage.verificarSeExisteMensagemDeErro(
      msg.avisoErro.isbnDeveConterApenasNumeros
    );
  });

  it('Deve exibir uma mensagem de aviso ao tentar preencher o campo Autor com números e caracteres especiais', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Campo Autor')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      { autor: dados.cadastrarLivroInvalidos.autorInvalido }
    );
    cadastrarLivroPage.clicaESair();
    cadastrarLivroPage.verificarSeExisteMensagemDeErro(
      msg.avisoErro.campoAutorNaoDeveConterNumerosEEspeciais
    );
  });

  it('Deve exibir uma mensagem de aviso ao tentar preencher o campo Ano de Publicação com ano futuro', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Campo Ano de Publicação')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      { ano: dados.cadastrarLivroInvalidos.anoPublicacaoFuturo }
    );
    cadastrarLivroPage.clicaESair();
    cadastrarLivroPage.verificarSeExisteMensagemDeErro(
      msg.avisoErro.anoPublicacaoNaoPodeMaiorQueAtual
    );
  });

  it('Deve exibir uma mensagem de aviso ao tentar preencher o campo Ano de Publicação com letras', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Campo Ano de Publicação')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      { ano: dados.cadastrarLivroInvalidos.anoPublicacaoLetra }
    );
    cadastrarLivroPage.clicaESair();
    cadastrarLivroPage.verificarSeExisteMensagemDeErro(
      msg.avisoErro.anoPublicacaoDeveConterApenasNumeros
    );
  });

  it('Deve exibir uma mensagem de aviso ao tentar preencher o campo Ano de Publicação com menos de 4 digitos', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Campo Ano de Publicação')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      { ano: dados.cadastrarLivroInvalidos.anoPublicacaoMenosDe4Digitos }
    );
    cadastrarLivroPage.clicaESair();
    cadastrarLivroPage.verificarSeExisteMensagemDeErro(
      msg.avisoErro.anoPublicacaoDeveTer4Digitos
    );
  });

  it('Deve exibir uma mensagem de aviso ao tentar preencher o campo Numero De Paginas com letras', () => {
    cy.allure()
      .feature('Cadastrar Livro')
      .story('Campo Numero De Paginas')
      .severity('normal');

    cadastrarLivroPage.acessarPaginaCadastrarLivro(dados.nomeDoLivro);
    cadastrarLivroPage.preencherFormularioObrigatorio(
      msg.mensagemToastNoCadastraLivro.ISBNNaoEncontrado,
      { paginas: dados.cadastrarLivroInvalidos.numeroDePaginasComLetras }
    );
    cadastrarLivroPage.clicaESair();
    cadastrarLivroPage.verificarSeExisteMensagemDeErro(
      msg.avisoErro.numeroDePaginasDeveConterApenasNumeros
    );
  });
});
