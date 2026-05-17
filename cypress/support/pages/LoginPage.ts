/// <reference types="cypress" />

import { LoginElements } from '../elements/LoginElements';

export class LoginPage {
  visitarPagina(): this {
    cy.visit('/');
    return this;
  }

  verificarPaginaCarregada(): this {
    cy.get(LoginElements.formContainer).should('be.visible');
    cy.contains('h1', 'Bem-vindo').should('be.visible');
    cy.get(LoginElements.emailInput).should('be.visible');
    cy.get(LoginElements.senhaInput).should('be.visible');
    cy.get(LoginElements.submitButton).should('be.visible');
    cy.get(LoginElements.forgotPasswordLink).should('be.visible');
    cy.get(LoginElements.registerLink).should('be.visible');
    return this;
  }

  preencherEmail(email: string): this {
    cy.get(LoginElements.emailInput).clear().type(email);
    return this;
  }

  preencherSenha(senha: string): this {
    cy.get(LoginElements.senhaInput).clear().type(senha);
    return this;
  }

  clicarEmEntrar(): this {
    cy.get(LoginElements.submitButton).click();
    return this;
  }

  verificarBotaoDesabilitado(): this {
    cy.get(LoginElements.submitButton).should('be.disabled');
    return this;
  }

  verificarBotaoHabilitado(): this {
    cy.get(LoginElements.submitButton).should('not.be.disabled');
    return this;
  }

  tocarCampoEmailESair(): this {
    cy.get(LoginElements.emailInput).focus().blur();
    return this;
  }

  tocarCampoSenhaESair(): this {
    cy.get(LoginElements.senhaInput).focus().blur();
    return this;
  }

  verificarErroEmail(mensagem: string): this {
    cy.get(LoginElements.errorMessage).first().should('contain.text', mensagem);
    return this;
  }

  verificarErroSenha(mensagem: string): this {
    cy.get(LoginElements.errorMessage).last().should('contain.text', mensagem);
    return this;
  }

  clicarEmEsqueciSenha(): this {
    cy.get(LoginElements.forgotPasswordLink).click();
    return this;
  }

  clicarEmCadastreSe(): this {
    cy.get(LoginElements.registerLink).click();
    return this;
  }

  alternarVisibilidadeSenha(): this {
    cy.get(LoginElements.showPasswordButton).click();
    return this;
  }

  ocultarSenha(): this {
    cy.get(LoginElements.hidePasswordButton).click();
    return this;
  }

  verificarSenhaVisivel(): this {
    cy.get(LoginElements.senhaInput).should('have.attr', 'type', 'text');
    return this;
  }

  verificarSenhaOculta(): this {
    cy.get(LoginElements.senhaInput).should('have.attr', 'type', 'password');
    return this;
  }
}
