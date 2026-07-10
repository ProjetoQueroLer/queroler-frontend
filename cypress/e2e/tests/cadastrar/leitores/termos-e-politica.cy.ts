/// <reference types="cypress" />

import { CadastrarLeitorPage } from '../../../../support/pages/CadastrarLeitorPage';

type Mensagem = {
  termosEPolitica: {
    termosDeServico: string;
    politicaDePrivacidade: string;
  };
};

let msg: Mensagem;

const cadastrarLeitorPage = new CadastrarLeitorPage();

describe('Cadastro de Leitor', () => {
  before(() => {
    cy.fixture('mensagem').then((fixture) => {
      msg = fixture;
    });
  });

  beforeEach(() => {
    cadastrarLeitorPage.visitarPaginaCadastrarDeLeitor();
  });

  describe('Validação dos Termos de Serviço e Política de Privacidade', () => {
    it('Deve exibir os Termos de Serviço', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Exibição dos Termos de Serviço')
        .severity('normal');

      cadastrarLeitorPage.verificaAcessaOModalOsTermosEPolitica(
        msg.termosEPolitica.termosDeServico
      );
    });

    it('Deve exibir a Política de Privacidade', () => {
      cy.allure()
        .feature('Cadastro de Leitor')
        .story('Exibição da Política de Privacidade')
        .severity('normal');

      cadastrarLeitorPage.verificaAcessaOModalOsTermosEPolitica(
        msg.termosEPolitica.politicaDePrivacidade
      );
    });
  });
});
