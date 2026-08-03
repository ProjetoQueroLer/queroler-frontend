/// <reference types="cypress" />

import { PerfilElements } from '../elements/PerfilElements';

const TIMEOUT = 30000;

export class PerfilPage {
  verificarPaginaCarregada(txt: string): this {
    cy.visit('/perfil');
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

  verificarSeExistemOsCamposLabels(txt: string[]): this {
    txt.forEach((label) => {
      cy.get(PerfilElements.campoLabel).should('contain.text', label);
    });
    return this;
  }

  verificarSeBotaoSalvarExiste(): this {
    cy.get(PerfilElements.salvarButton).should('be.visible');
    return this;
  }

  verificarSeBotaoVoltarExiste(): this {
    cy.get(PerfilElements.voltarButton).should('be.visible');
    return this;
  }

  verificarSeBotaoExculirPerfilExiste(): this {
    cy.get(PerfilElements.excluirPerfilButton).should('be.visible');
    return this;
  }

  acessaCadastrarLeitor(): this {
    cy.get(PerfilElements.cadastrarLeitorButton).should('be.visible').click();
    return this;
  }

  pularDadosPessoais(): this {
    cy.get(PerfilElements.pularDadosPessoaisButton)
      .should('be.visible')
      .click();
    return this;
  }

  clicarEmExcluirPerfil(): this {
    cy.get(PerfilElements.excluirPerfilButton)
      .should('be.visible')
      .click({ timeout: TIMEOUT });
    return this;
  }

  verificarSeModalExcluirPerfilEstaVisivel(txt: string): this {
    cy.get(PerfilElements.modalExcluirPerfil)
      .should('be.visible', { timeout: TIMEOUT })
      .and('contain.text', txt);
    return this;
  }

  fechaToast(): this {
    cy.get(PerfilElements.fechaToastButton)
      .should('be.visible')
      .click({ timeout: TIMEOUT });
    return this;
  }

  clicarEmConfirmarExcluir(): this {
    cy.get(PerfilElements.confirmarExcluirButton)
      .should('be.visible', { timeout: TIMEOUT })
      .click();
    return this;
  }

  validarPaginaDeLogin(): this {
    cy.url().should('include', '/', { timeout: TIMEOUT });
    return this;
  }
}
