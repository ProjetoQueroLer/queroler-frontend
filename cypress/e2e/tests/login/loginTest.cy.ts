/// <reference types="cypress" />

import { LoginPage } from '../../../support/pages/LoginPage';

const loginPage = new LoginPage();

type Mensagem = {
  emailObrigatorio: string;
  emailInvalido: string;
  emailMuitoLongo: string;
  senhaMinimaObrigatoria: string;
  senhaMuitoCurta: string;
};

type TestData = {
  emailInvalido: string;
  emailSemArroba: string;
  emailMuitoLongo: string;
  senhaCurta: string;
  credenciaisInvalidas: { email: string; senha: string };
  loginNaoPreenchidos: { email: string; senha: string };
};

type Perfil = {
  perfilAdministrador: { email: string; senha: string };
  perfilModerador: { email: string; senha: string };
};

let msg: Mensagem;
let dados: TestData;
let dadosPerfil: Perfil;

describe('Login', () => {
  before(() => {
    cy.fixture('mensagem').then((fixture) => {
      msg = fixture;
    });
    cy.fixture('testData').then((fixture) => {
      dados = fixture;
    });
    cy.fixture('perfil').then((fixture) => {
      dadosPerfil = fixture;
    });
  });

  beforeEach(() => {
    loginPage.visitarPagina();
  });

  describe('Estrutura da tela', () => {
    it('Deve exibir todos os elementos do formulário de login', () => {
      cy.allure().feature('Autenticação').story('Estrutura').severity('normal');

      loginPage.verificarPaginaCarregada();
    });

    it('Deve exibir o botão Entrar desabilitado com campos vazios', () => {
      cy.allure().feature('Autenticação').story('Estrutura').severity('normal');

      loginPage.verificarBotaoDesabilitado();
    });
  });

  describe('Validações do campo de e-mail', () => {
    it('Deve exibir erro ao deixar o campo de e-mail em branco e sair', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de e-mail')
        .severity('critical');

      loginPage.tocarCampoEmailESair().verificarErroEmail(msg.emailObrigatorio);
    });

    it('Deve exibir erro para e-mail com formato inválido', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de e-mail')
        .severity('critical');

      loginPage
        .preencherEmail(dados.emailInvalido)
        .tocarCampoSenhaESair()
        .verificarErroEmail(msg.emailInvalido);
    });

    it('Deve exibir erro para e-mail sem arroba', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de e-mail')
        .severity('critical');

      loginPage
        .preencherEmail(dados.emailSemArroba)
        .tocarCampoSenhaESair()
        .verificarErroEmail(msg.emailInvalido);
    });
  });

  describe('Validações do campo de senha', () => {
    it('Deve exibir erro ao deixar o campo de senha em branco e sair', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de senha')
        .severity('critical');

      loginPage
        .tocarCampoSenhaESair()
        .verificarErroSenha(msg.senhaMinimaObrigatoria);
    });

    it('Deve exibir erro para senha com menos de 8 caracteres', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de senha')
        .severity('critical');

      loginPage
        .preencherSenha(dados.senhaCurta)
        .tocarCampoEmailESair()
        .verificarErroSenha(msg.senhaMuitoCurta);
    });

    it('Deve habilitar o botão Entrar somente com e-mail e senha válidos', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Validação de senha')
        .severity('critical');

      loginPage
        .verificarBotaoDesabilitado()
        .preencherEmail('usuario.valido@teste.com')
        .preencherSenha('senha1234')
        .verificarBotaoHabilitado();
    });
  });

  describe('Visibilidade da senha', () => {
    it('Deve exibir a senha em texto ao clicar no ícone de mostrar senha', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Toggle de senha')
        .severity('normal');

      loginPage
        .preencherSenha('minhasenha')
        .verificarSenhaOculta()
        .alternarVisibilidadeSenha()
        .verificarSenhaVisivel();
    });

    it('Deve ocultar a senha ao clicar novamente no ícone', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Toggle de senha')
        .severity('normal');

      loginPage
        .preencherSenha('minhasenha')
        .alternarVisibilidadeSenha()
        .verificarSenhaVisivel()
        .ocultarSenha()
        .verificarSenhaOculta();
    });
  });

  describe('Navegação', () => {
    it('Deve navegar para a página de cadastro ao clicar em Cadastre-se', () => {
      cy.allure().feature('Autenticação').story('Navegação').severity('normal');

      loginPage.clicarEmCadastreSe();
      cy.url().should('include', '/register');
    });

    it('Deve navegar para recuperação de senha ao clicar em Esqueci minha senha', () => {
      cy.allure().feature('Autenticação').story('Navegação').severity('normal');

      loginPage.clicarEmEsqueciSenha();
      cy.url().should('include', '/esqueci-senha');
    });
  });

  describe('Autenticação com credenciais inválidas', () => {
    it('Deve exibir toast de erro ao tentar login com credenciais incorretas', () => {
      cy.allure()
        .feature('Autenticação')
        .story('Login inválido')
        .severity('critical');

      loginPage
        .preencherEmail(dados.credenciaisInvalidas.email)
        .preencherSenha(dados.credenciaisInvalidas.senha)
        .clicarEmEntrar();

      cy.get('.Toastify__toast--error').should('be.visible');
    });
  });

  describe('Login com perfil administrador e moderador', () => {
    beforeEach(() => {
      cy.allure()
        .feature('Login com perfil administrador')
        .story(
          'E1_HU01 - Disponibilizar acesso aos usuários com perfil administrador e moderador'
        )
        .severity('critical');
    });

    it('Deve fazer login com a conta administrador pré-cadastrada', () => {
      loginPage
        .preencherEmail(dadosPerfil.perfilAdministrador.email)
        .preencherSenha(dadosPerfil.perfilAdministrador.senha)
        .clicarEmEntrar();
    });

    it('Não deve fazer login com a conta administrador se a senha for incorreta', () => {
      loginPage
        .preencherEmail(dadosPerfil.perfilAdministrador.email)
        .preencherSenha(dados.credenciaisInvalidas.senha)
        .clicarEmEntrar();
    });

    it('Deve fazer login com a conta moderador pré-cadastrada', () => {
      loginPage
        .preencherEmail(dadosPerfil.perfilModerador.email)
        .preencherSenha(dadosPerfil.perfilModerador.senha)
        .clicarEmEntrar();
    });

    it('Não deve fazer login com a conta moderador se a senha for incorreta', () => {
      loginPage
        .preencherEmail(dadosPerfil.perfilModerador.email)
        .preencherSenha(dados.credenciaisInvalidas.senha)
        .clicarEmEntrar();
    });

    it('Não deve fazer login com email inexistente e senha correta', () => {
      loginPage
        .preencherEmail(dados.credenciaisInvalidas.email)
        .preencherSenha(dadosPerfil.perfilAdministrador.senha)
        .clicarEmEntrar();
    });

    it('Não deve fazer login sem email e senha preenchidos', () => {
      loginPage.verificarBotaoDesabilitado();
    });
  });
});
