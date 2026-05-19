/// <reference types="cypress" />

import { HomeElements } from '../elements/HomeElements';

export class HomePage {
  verificarPaginaCarregada(): this {
    cy.get(HomeElements.logo, { timeout: 10000 }).should('be.visible');
    return this;
  }

  fecharToast(): this {
    cy.get(HomeElements.toastCloseButton).should('be.visible').click();
    return this;
  }

  verificarToast(mensagem: string): this {
    cy.get(HomeElements.toast)
      .should('be.visible')
      .and('contain.text', mensagem);
    return this;
  }

  abrirMenuUsuario(): this {
    cy.get(HomeElements.userMenuButton, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
    return this;
  }

  clicarEmSair(): this {
    cy.get(HomeElements.logoutButton).should('be.visible').click();
    return this;
  }

  verificarLogoVisivel(): this {
    cy.get(HomeElements.logo).should('be.visible');
    return this;
  }

  verificarSinoVisivel(): this {
    cy.get(HomeElements.bellIcon).should('be.visible');
    return this;
  }

  verificarFotoDoUsuarioVisivel(): this {
    cy.get(HomeElements.photoUser).should('be.visible');
    return this;
  }

  verificarNomeDoUsuarioVisivel(nome: string): this {
    cy.get(HomeElements.username).should('be.visible').and('have.text', nome);
    return this;
  }
}
