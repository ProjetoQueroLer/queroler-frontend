/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR';
import { gerarCpf } from '../../../../support/utils/geradorCpf';
import { gerarSenha } from '../../../../support/utils/geradorSenha';
import { gerarDataNascimento } from '../../../../support/utils/geradorData';
import { CadastrarLeitorPage } from '../../../../support/pages/CadastrarLeitorPage';

type Mensagem = {
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
  nome: string;
  cpf: string;
  email: string;
  confirmarEmail: string;
  senha: string;
  confirmarSenha: string;
  dataDeNascimento: string;
};

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
    cadastrarLeitorPage.verificarLabelsDosCampos([
      msg.nome,
      msg.cpf,
      msg.email,
      msg.confirmarEmail,
      msg.senha,
      msg.confirmarSenha,
      msg.dataDeNascimento,
    ]);
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

  describe('Visibilidade da senha e confirmar senha', () => {
    it('Deve exibir a senha em texto ao clicar no ícone de mostrar senha', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Visibilidade do campo senha')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario({
        senha: dadosCadastro.senha,
      });

      cadastrarLeitorPage.visibilidadeDaSenha();
    });

    it('Deve ocultar a senha ao clicar novamente no ícone', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Ocultar o campo senha')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario({
        senha: dadosCadastro.senha,
      });

      cadastrarLeitorPage.visibilidadeDaSenha();
      cadastrarLeitorPage.ocultarSenha();
    });

    it('Deve exibir a senha em texto ao clicar no ícone de mostrar confirmar senha', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Visibilidade do campo confirmar senha')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario({
        confirmarSenha: dadosCadastro.senha,
      });

      cadastrarLeitorPage.visibilidadeConfirmarSenha();
    });

    it('Deve ocultar a confirmar senha ao clicar novamente no ícone', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Ocultar o campo confirmar senha')
        .severity('critical');

      cadastrarLeitorPage.preencherFormulario({
        confirmarSenha: dadosCadastro.senha,
      });

      cadastrarLeitorPage.visibilidadeConfirmarSenha();
      cadastrarLeitorPage.ocultaConfirmarSenha();
    });
  });
});
