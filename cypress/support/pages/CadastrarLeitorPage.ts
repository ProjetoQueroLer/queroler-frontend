/// <reference types="cypress" />

import { CadastrarLeitorElements } from '../elements/CadastrarLeitorElements';

export class CadastrarLeitorPage {
  visitarPaginaCadastrar(): this {
    cy.visit('/register');
    return this;
  }

  verificarPaginaCarregada(): this {
    cy.get(CadastrarLeitorElements.logoQueroLer, { timeout: 10000 }).should(
      'be.visible'
    );
    return this;
  }

  clicarEmCadastreSe(): this {
    cy.get(CadastrarLeitorElements.registerButton).should('be.visible').click();
    return this;
  }

  preencherFormulario(
    nome: string,
    email: string,
    senha: string,
    confirmarSenha: string,
    cpf: string
  ): this {
    cy.get(CadastrarLeitorElements.nameInput).should('be.visible').type(nome);
    cy.get(CadastrarLeitorElements.emailInput).should('be.visible').type(email);
    cy.get(CadastrarLeitorElements.passwordInput)
      .should('be.visible')
      .type(senha);
    cy.get(CadastrarLeitorElements.confirmPasswordInput)
      .should('be.visible')
      .type(confirmarSenha);
    cy.get(CadastrarLeitorElements.cpfUserInput).should('be.visible').type(cpf);
    return this;
  }

  clicarEmAceitarTermosDeUso(): this {
    cy.get(CadastrarLeitorElements.acceptTheTermsOfUseText).should(
      'be.visible'
    );
    cy.get(CadastrarLeitorElements.acceptTheTermsOfUseCheckbox)
      .should('be.visible')
      .click();
    return this;
  }

  clicarEmCadastrar(): this {
    cy.get(CadastrarLeitorElements.registeredButton)
      .should('be.visible')
      .click();
    return this;
  }
}
