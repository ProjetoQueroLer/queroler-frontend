/// <reference types="cypress" />

import LoginElemento from '../elements/login-elemento.cy';

const loginElemento = new LoginElemento();

class LoginPage {
  email(email) {
    cy.get(loginElemento.emailCampo())
      .should('be.visible')
      .type(email)
      .should('have.value', email);
  }

  senha(senha) {
    cy.get(loginElemento.senhaCampo()).should('be.visible').type(senha);
  }

  entrar() {
    cy.get(loginElemento.entrarBotao()).should('be.visible').click();
  }

  mensagemInvalidoEmail() {
    cy.get(loginElemento.emailInvalidoMensagem()).contains('E-mail inválido');
  }

  cadastre() {
    cy.get(loginElemento.cadastreLink()).should('be.visible').click();
  }
}

export default LoginPage;
