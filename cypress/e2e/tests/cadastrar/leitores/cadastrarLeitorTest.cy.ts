/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR';
import { gerarCpf } from '../../../../support/utils/geradorCpf';
import { gerarSenha } from '../../../../support/utils/geradorSenha';
import { gerarDataNascimento } from '../../../../support/utils/geradorData';
import { CadastrarLeitorPage } from '../../../../support/pages/CadastrarLeitorPage';

type UsuarioCadastrado = {
  email: string;
  cpf: string;
};

type TestData = {
  usuarioCadastrado: UsuarioCadastrado;
};

type Mensagem = {
  usuarioCadastradoSucesso: string;
  emailJaCadastrado: string;
  cpfJaCadastrado: string;
  nomeObrigatorio: string;
  emailObrigatorio: string;
  confirmacaoEmailObrigatoria: string;
  senhaObrigatoria: string;
  confirmacaoSenhaObrigatoria: string;
  cpfObrigatorio: string;
  dataNascimentoObrigatoria: string;
  termosObrigatorio: string;
  concordaComOsTermos: string;
  termosDeServiço: string;
  politicaDePrivacidade: string;
};

let dados: TestData;
let msg: Mensagem;

const cadastrarLeitorPage = new CadastrarLeitorPage();
const senha = gerarSenha();

const dadosCadastro = {
  nome: faker.person.firstName(),
  email: faker.internet.email(),
  senha: senha,
  confirmacaoSenha: senha,
  cpf: gerarCpf(),
  dataNascimento: gerarDataNascimento(),
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

  it('Deve exibir todos os elementos do formulário de cadastro', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Estrutura da tela')
      .severity('normal');

    cadastrarLeitorPage.verificarPaginaCarregada();
    cadastrarLeitorPage.verificarOsTermosDeServico([
      msg.concordaComOsTermos,
      msg.termosDeServiço,
      msg.politicaDePrivacidade,
    ]);
  });

  it('Deve permitir o preenchimento do formulário de cadastro', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Preenchimento do formulário')
      .severity('normal');

    cadastrarLeitorPage.preencherFormulario({
      nome: dadosCadastro.nome,
      email: dadosCadastro.email,
      confirmarEmail: dadosCadastro.email,
      senha: dadosCadastro.senha,
      confirmarSenha: dadosCadastro.confirmacaoSenha,
      cpf: dadosCadastro.cpf,
      dataNascimento: dadosCadastro.dataNascimento,
    });

    cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
  });

  it('Deve cadastrar leitor com sucesso', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Cadastro com sucesso')
      .severity('critical');

    cadastrarLeitorPage.preencherFormulario({
      nome: dadosCadastro.nome,
      email: dadosCadastro.email,
      confirmarEmail: dadosCadastro.email,
      senha: dadosCadastro.senha,
      confirmarSenha: dadosCadastro.confirmacaoSenha,
      cpf: dadosCadastro.cpf,
      dataNascimento: dadosCadastro.dataNascimento,
    });

    cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
    cadastrarLeitorPage.clicarEmCadastrar();
    cadastrarLeitorPage.verificarMensagemCadastroSucesso(
      msg.usuarioCadastradoSucesso
    );

    dados.usuarioCadastrado.email = dadosCadastro.email;
    dados.usuarioCadastrado.cpf = dadosCadastro.cpf;
  });

  it('Deve exibir mensagens de campos obrigatórios quando o formulário for submetido vazio', () => {
    cy.allure()
      .feature('Cadastro de Leitor')
      .story('Validação de campos obrigatórios')
      .severity('critical');

    cadastrarLeitorPage.clicaOsCamposObrigatorios();
    cadastrarLeitorPage.verificarMensagensCamposObrigatorios(
      msg.nomeObrigatorio,
      msg.emailObrigatorio,
      msg.confirmacaoEmailObrigatoria,
      msg.senhaObrigatoria,
      msg.confirmacaoSenhaObrigatoria,
      msg.cpfObrigatorio,
      msg.dataNascimentoObrigatoria,
      msg.termosObrigatorio
    );
    cadastrarLeitorPage.verificarOBotaoCadastrarInativo();
  });

  describe('Duplicidade', () => {
    const senhaEmail = gerarSenha();
    const senhaCpf = gerarSenha();

    it('Não deve permitir cadastro com e-mail já existente', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('E-mail duplicado')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario({
        nome: faker.person.firstName(),
        email: dados.usuarioCadastrado.email,
        confirmarEmail: dados.usuarioCadastrado.email,
        senha: senhaEmail,
        confirmarSenha: senhaEmail,
        cpf: gerarCpf(),
        dataNascimento: gerarDataNascimento(),
      });

      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.clicarEmCadastrar();
      cadastrarLeitorPage.verificarMensagemJaCadastrado(msg.emailJaCadastrado);
    });

    it('Não deve permitir cadastro com CPF já existente', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('CPF duplicado')
        .severity('critical');

      const emailFaker = faker.internet.email();

      cadastrarLeitorPage.preencherFormulario({
        nome: faker.person.firstName(),
        email: emailFaker,
        confirmarEmail: emailFaker,
        senha: senhaCpf,
        confirmarSenha: senhaCpf,
        cpf: dados.usuarioCadastrado.cpf,
        dataNascimento: gerarDataNascimento(),
      });

      cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
      cadastrarLeitorPage.clicarEmCadastrar();
      cadastrarLeitorPage.verificarMensagemJaCadastrado(msg.cpfJaCadastrado);
    });
  });

  describe('Validação dos Termos de Serviço e Política de Privacidade', () => {
    it('Deve exibir os Termos de Serviço', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Exibição dos Termos de Serviço')
        .severity('normal');

      cadastrarLeitorPage.verificaAcessaOModalOsTermosEPolitica(
        msg.termosDeServiço
      );
    });

    it('Deve exibir a Política de Privacidade', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Exibição da Política de Privacidade')
        .severity('normal');

      cadastrarLeitorPage.verificaAcessaOModalOsTermosEPolitica(
        msg.politicaDePrivacidade
      );
    });
  });
});
