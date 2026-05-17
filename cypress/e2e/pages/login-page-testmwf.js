/// <reference types="cypress" />

import LoginElemento from '../elements/login-elemento.cy';

const loginElemento = new LoginElemento();

class LoginPageTestMwf {
  preencherCampoDeEmail(email) {
    cy.get(loginElemento.emailCampo())
      .should('be.visible')
      .type(email)
      .should('have.value', email);
  }

  preencherSenha(senha) {
    cy.get(loginElemento.senhaCampo()).should('be.visible').type(senha);
  }

  clicarNoBotaoEntrar() {
    cy.get(loginElemento.entrarBotao()).should('be.visible').click();
  }

  clicarNoBotaoCadastro() {
    cy.get(loginElemento.cadastreLink()).should('be.visible').click();
  }

  //Esta método poderia estar em uma classe somente de validações.
  validarMensagemInvalidoEmail() {
    cy.get(loginElemento.emailInvalidoMensagem()).contains('E-mail inválido');
  }
}
//Está exportando esta classe para fora, ou seja, esta classe pode ser utilizada por outras classes.
export default LoginPageTestMwf;
