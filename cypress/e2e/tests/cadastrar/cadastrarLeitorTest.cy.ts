/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR';
import { gerarCpf } from '../../../support/utils/geradorCpf';
import { gerarSenha } from '../../../support/utils/geradorSenha';
import { CadastrarLeitorPage } from '../../../support/pages/CadastrarLeitorPage';

const cadastrarLeitorPage = new CadastrarLeitorPage();

type UsuarioCadastrado = {
  email: string;
  cpf: string;
};

type TestData = {
  usuarioCadastrado: UsuarioCadastrado;
};

type Mensagem = {
  emailJaCadastrado: string;
  cpfJaCadastrado: string;
};

let dados: TestData;
let msg: Mensagem;

const senha = gerarSenha();

const dadosCadastro = {
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  senha: senha,
  confirmacaoSenha: senha,
  cpf: gerarCpf(),
};

describe('Cadastro de Leitor', () => {
  before(() => {
    cy.fixture('testData').then((fixture) => {
      dados = fixture;
    });
    cy.fixture('mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    cadastrarLeitorPage.visitarPaginaCadastrar();
  });

  it('Deve exibir todos os elementos do formulário de cadastro', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Estrutura da tela')
      .severity('normal');

    cadastrarLeitorPage.verificarPaginaCarregada();
  });

  it('Deve permitir o preenchimento do formulário de cadastro', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Preenchimento do formulário')
      .severity('normal');

    cadastrarLeitorPage.preencherFormulario(
      dadosCadastro.nome,
      dadosCadastro.email,
      dadosCadastro.senha,
      dadosCadastro.confirmacaoSenha,
      dadosCadastro.cpf
    );
  });

  it('Deve cadastrar leitor com sucesso', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Cadastro com sucesso')
      .severity('critical');

    cadastrarLeitorPage.preencherFormulario(
      dadosCadastro.nome,
      dados.usuarioCadastrado.email,
      dadosCadastro.senha,
      dadosCadastro.confirmacaoSenha,
      dados.usuarioCadastrado.cpf
    );

    cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
    cadastrarLeitorPage.clicarEmCadastrar();
  });

  describe('Duplicidade', () => {
    const senhaEmail = gerarSenha();
    const senhaCpf = gerarSenha();

    it('Não deve permitir cadastro com e-mail já existente', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('E-mail duplicado')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario(
        faker.person.fullName(),
        dados.usuarioCadastrado.email,
        senhaEmail,
        senhaEmail,
        gerarCpf()
      );

      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.clicarEmCadastrar();
      cadastrarLeitorPage.verificarMensagemJaCadastrado(msg.emailJaCadastrado);
    });

    it('Não deve permitir cadastro com CPF já existente', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('CPF duplicado')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario(
        faker.person.fullName(),
        faker.internet.email(),
        senhaCpf,
        senhaCpf,
        dados.usuarioCadastrado.cpf
      );

      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.clicarEmCadastrar();
      cadastrarLeitorPage.verificarMensagemJaCadastrado(msg.cpfJaCadastrado);
    });
  });
});
