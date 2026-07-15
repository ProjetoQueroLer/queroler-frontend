/// <reference types="cypress" />

import { PerfilElements } from '../elements/PerfilElements';

const TIMEOUT = 30000;

export class PerfilPage {
  verificarPaginaCarregada(txt: string): this {
    cy.get(PerfilElements.tituloMeuPerfil)
      .should('be.visible', { timeout: TIMEOUT })
      .and('contain.text', txt);
    cy.get(PerfilElements.subtituloMeuPerfil).should('be.visible', {
      timeout: TIMEOUT,
    });
    return this;
  }

  verificarNome(txt: string): this {
    cy.get(PerfilElements.nomeInput).should('have.value', txt);
    return this;
  }

  verificarEmail(txt: string): this {
    cy.get(PerfilElements.emailInput).should('have.value', txt);
    return this;
  }

  verificarCpf(txt: string): this {
    cy.get(PerfilElements.cpfInput).should('have.value', txt);
    return this;
  }

  verificarDataNascimento(txt: string): this {
    cy.get(PerfilElements.dataNascimentoInput).should('have.value', txt);
    return this;
  }

  verificarCidade(txt: string): this {
    cy.get(PerfilElements.cidadeInput).should('have.value', txt);
    return this;
  }

  verificarEstado(txt: string): this {
    cy.get(PerfilElements.estadoInput).should('have.value', txt);
    return this;
  }

  verificarPais(txt: string): this {
    cy.get(PerfilElements.paisInput).should('have.value', txt);
    return this;
  }

  verificarFotoDePerfilVisivel(): this {
    cy.get(PerfilElements.fotoDePerfil).should('exist').and('be.visible');
    return this;
  }
}
