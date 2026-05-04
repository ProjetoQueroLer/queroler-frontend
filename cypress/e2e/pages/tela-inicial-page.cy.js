/// <reference types="cypress" />

import TelaInicialElemento from '../elements/tela-inicial-elemento.cy';

const telaInicialElemento = new TelaInicialElemento();

class TelaInicialPage {
  nomeUsuario() {
    cy.get(telaInicialElemento.nomeDoUsuarioBotao(), { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
  }

  sair() {
    cy.get('.Toastify__close-button').should('be.visible').click().click();
    cy.get(telaInicialElemento.sairBotao()).should('be.visible');
  }

  tituloQueroLer() {
    const titulo = 'QueroLer';
    cy.title().should('contain', titulo);
  }

  sino() {
    cy.get('.Toastify__close-button').should('be.visible').click();
    cy.get(telaInicialElemento.sinoIcone()).should('be.visible');
  }
}

export default TelaInicialPage;
