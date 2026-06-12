/// <reference types="cypress" />

import { CadastrarLeitorElements } from '../elements/CadastrarLeitorElements';

type DadosLeitor = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  cpf: string;
  dataNascimento: string;
};

export class CadastrarLeitorPage {
  visitarPaginaCadastrarDeLeitor(): this {
    cy.visit('/register');
    return this;
  }

  verificarPaginaCarregada(): this {
    cy.get(CadastrarLeitorElements.logoQueroLer).should('be.visible');
    cy.get(CadastrarLeitorElements.tituloCrieSuaConta).should('be.visible');
    cy.get(CadastrarLeitorElements.nomeInput).should('be.visible');
    cy.get(CadastrarLeitorElements.emailInput).should('be.visible');
    cy.get(CadastrarLeitorElements.senhaInput).should('be.visible');
    cy.get(CadastrarLeitorElements.confirmaSenhaInput).should('be.visible');
    cy.get(CadastrarLeitorElements.cpfUsuarioInput).should('be.visible');
    cy.get(CadastrarLeitorElements.dataDeNascimentoInput).should('be.visible');
    cy.get(CadastrarLeitorElements.aceitoOsTermosCheckbox).should('be.visible');
    cy.get(CadastrarLeitorElements.aceitoOsTermosLabel).should('be.visible');
    cy.get(CadastrarLeitorElements.cadastrarButton).should('be.visible');
    return this;
  }

  clicarEmCadastreSe(): this {
    cy.get(CadastrarLeitorElements.registrarButton)
      .should('be.visible')
      .click();
    return this;
  }

  preencherFormulario(dados: DadosLeitor): this {
    cy.get(CadastrarLeitorElements.nomeInput)
      .should('be.visible')
      .type(dados.nome);
    cy.get(CadastrarLeitorElements.emailInput)
      .should('be.visible')
      .type(dados.email);
    cy.get(CadastrarLeitorElements.senhaInput)
      .should('be.visible')
      .type(dados.senha);
    cy.get(CadastrarLeitorElements.confirmaSenhaInput)
      .should('be.visible')
      .type(dados.confirmarSenha);
    cy.get(CadastrarLeitorElements.cpfUsuarioInput)
      .should('be.visible')
      .type(dados.cpf);
    cy.get(CadastrarLeitorElements.dataDeNascimentoInput)
      .should('be.visible')
      .type(dados.dataNascimento);
    return this;
  }

  clicarEmAceitarTermosDeUso(): this {
    cy.get(CadastrarLeitorElements.aceitoOsTermosLabel).should('be.visible');
    cy.get(CadastrarLeitorElements.aceitoOsTermosCheckbox)
      .should('be.visible')
      .click();
    return this;
  }

  clicarEmCadastrar(): this {
    cy.get(CadastrarLeitorElements.cadastrarButton)
      .should('be.visible')
      .click();
    return this;
  }

  verificarMensagemJaCadastrado(msg: string): this {
    cy.get(CadastrarLeitorElements.erroMensagemToastLabel)
      .should('be.visible')
      .and('contain.text', msg);
    return this;
  }

  verificarMensagemCadastroSucesso(msg: string): this {
    cy.get(CadastrarLeitorElements.sucessoMensagemToastLabel)
      .should('be.visible')
      .and('contain.text', msg);
    return this;
  }

  clicaOsCamposObrigatorios(): this {
    const campos = [
      CadastrarLeitorElements.nomeInput,
      CadastrarLeitorElements.emailInput,
      CadastrarLeitorElements.senhaInput,
      CadastrarLeitorElements.confirmaSenhaInput,
      CadastrarLeitorElements.cpfUsuarioInput,
      CadastrarLeitorElements.dataDeNascimentoInput,
    ];

    campos.forEach((campo) => {
      cy.get(campo).click();
    });

    cy.get(CadastrarLeitorElements.aceitoOsTermosCheckbox).dblclick();
    cy.get(CadastrarLeitorElements.confirmaSenhaInput).click();

    return this;
  }

  verificarMensagensCamposObrigatorios(...mensagens: string[]): this {
    mensagens.forEach((msg) => {
      cy.get(CadastrarLeitorElements.campoObrigatorioLabel)
        .should('be.visible')
        .and('contain.text', msg);
    });
    return this;
  }
}
