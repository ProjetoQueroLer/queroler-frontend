/// <reference types="cypress" />

import { CadastrarLeitorPage } from '../../../../support/pages/CadastrarLeitorPage';
import { gerarSenha } from '../../../../support/utils/geradorSenha';

type CadastrarLeitorInvalidos = {
  nome: string;
  email: string;
  emailNaoCoincidem: string;
  senhaInvalida: string;
  senhaNaoCoincidem: string;
  cpfCurto: string;
  senhaSemCaracteresEspecial: string;
  senhaSemNumero: string;
};

type TestData = {
  emailInvalido: string;
  cadastrarLeitorInvalidos: CadastrarLeitorInvalidos;
};

type Mensagem = {
  campoNomeInvalido: string;
  emailInvalido: string;
  emailsNaoCoincidem: string;
  cpfInvalido: string;
  senhaMinimoCaracteres: string;
  senhaDeveConterCaractereEspecial: string;
  senhaDeveConterNumero: string;
  senhasNaoCoincidem: string;
};

let dados: TestData;
let msg: Mensagem;

const cadastrarLeitorPage = new CadastrarLeitorPage();
const senha = gerarSenha();

const dadosCadastro = {
  senha: senha,
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
    cadastrarLeitorPage.visitarPaginaCadastrarDeLeitor();
  });

  describe('Preencher os campos inválidos', () => {
    it('Deve exibir mensagem de erro quando o nome contém número e caracteres especiais', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('O campo Nome nao deve conter numero')
        .severity('normal');

      cadastrarLeitorPage.preencherFormulario({
        nome: dados.cadastrarLeitorInvalidos.nome,
      });
      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.verificarMensagensCamposObrigatorios(
        msg.campoNomeInvalido
      );
    });

    it('Deve exibir mensagem de erro quando o CPF com menos de 11 dígitos', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('O campo CPF nao deve menos de 11 dígitos')
        .severity('normal');

      cadastrarLeitorPage.preencherFormulario({
        cpf: dados.cadastrarLeitorInvalidos.cpfCurto,
      });
      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.verificarMensagensCamposObrigatorios(msg.cpfInvalido);
    });

    it('Deve exibir mensagem de erro quando o E-mail invalido', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('O campo E-mail nao deve invalido')
        .severity('normal');

      cadastrarLeitorPage.preencherFormulario({
        email: dados.emailInvalido,
      });
      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.verificarMensagensCamposObrigatorios(
        msg.emailInvalido
      );
    });

    it('Deve exibir mensagem de erro quando os e-mails não coincidem', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Os campos e-mails não coincidem')
        .severity('normal');

      cadastrarLeitorPage.preencherFormulario({
        email: dados.cadastrarLeitorInvalidos.email,
        confirmarEmail: dados.cadastrarLeitorInvalidos.emailNaoCoincidem,
      });
      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.verificarMensagensCamposObrigatorios(
        msg.emailsNaoCoincidem
      );
    });

    it('Deve exibir mensagem de erro quando senha mínimo 8 de caracteres', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('O campo senha mínimo 8 de caracteres')
        .severity('normal');

      cadastrarLeitorPage.preencherFormulario({
        senha: dados.cadastrarLeitorInvalidos.senhaInvalida,
      });
      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.verificarMensagensCamposObrigatorios(
        msg.senhaMinimoCaracteres
      );
    });

    it('Deve exibir mensagem de erro quando senha deve conter pelo menos um caractere especial', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('O campo senha deve conter pelo menos um caractere especial')
        .severity('normal');

      cadastrarLeitorPage.preencherFormulario({
        senha: dados.cadastrarLeitorInvalidos.senhaSemCaracteresEspecial,
      });
      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.verificarMensagensCamposObrigatorios(
        msg.senhaDeveConterCaractereEspecial
      );
    });

    it('Deve exibir mensagem de erro quando senha deve conter pelo menos um número', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('O campo senha deve conter pelo menos um número')
        .severity('normal');

      cadastrarLeitorPage.preencherFormulario({
        senha: dados.cadastrarLeitorInvalidos.senhaSemNumero,
      });
      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.verificarMensagensCamposObrigatorios(
        msg.senhaDeveConterNumero
      );
    });

    it('Deve exibir mensagem de erro quando as senhas não coincidem', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Os campos senhas não coincidem')
        .severity('normal');

      cadastrarLeitorPage.preencherFormulario({
        senha: dadosCadastro.senha,
        confirmarSenha: dados.cadastrarLeitorInvalidos.senhaNaoCoincidem,
      });
      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.verificarMensagensCamposObrigatorios(
        msg.senhasNaoCoincidem
      );
    });

    it('Deve impedir o cadastro de um leitor sem o preenchimento dos campos obrigatórios', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Impedir o cadastro de um leitor')
        .severity('normal');

      cadastrarLeitorPage.verificarOBotaoCadastrarInativo();
    });
  });
});
