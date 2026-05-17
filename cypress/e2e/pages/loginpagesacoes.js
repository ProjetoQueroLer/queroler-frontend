/// <reference types="cypress" />
//  Essa classe contém ações que o usuário executa na tela.
import LoginElemento from '../elements/login-elemento.cy';

const loginElemento = new LoginElemento();

class LoginPageAcoes {
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
}

export default LoginPageAcoes;
