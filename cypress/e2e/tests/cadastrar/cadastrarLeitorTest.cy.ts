/// <reference types="cypress" />

import { faker } from '@faker-js/faker/locale/pt_BR';
import { gerarCpf } from '../../../support/utils/geradorCpf';
import { CadastrarLeitorPage } from '../../../support/pages/CadastrarLeitorPage';
import { gerarSenha } from '../../../support/utils/geradorSenha';

const cadastrarLeitorPage = new CadastrarLeitorPage();
const senha = gerarSenha();

const dadosCadastro = {
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  senha: senha,
  confirmacaoSenha: senha,
  cpf: gerarCpf(),
};

beforeEach(() => {
  cadastrarLeitorPage.visitarPaginaCadastrar();
});

describe('Cadastro de Leitor', () => {
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
      .severity('critical');

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
      dadosCadastro.email,
      dadosCadastro.senha,
      dadosCadastro.confirmacaoSenha,
      dadosCadastro.cpf
    );

    cadastrarLeitorPage.clicarEmAceitarTermosDeUso();
    cadastrarLeitorPage.clicarEmCadastrar();
  });
});
