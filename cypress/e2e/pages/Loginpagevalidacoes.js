/// <reference types="cypress" />
//Essa classe contém validações — ou seja, verificações de resultado esperado.

import LoginElemento from '../elements/login-elemento.cy';

const loginElemento = new LoginElemento();

class LoginPageValidacoes {
  validarMensagemInvalidoEmail() {
    cy.get(loginElemento.emailInvalidoMensagem()).should(
      'contain',
      'E-mail inválido'
    );
  }

  validarLoginComSucesso() {
    cy.url().should('include', '/tela-inicial');
  }
}

export default LoginPageValidacoes;
