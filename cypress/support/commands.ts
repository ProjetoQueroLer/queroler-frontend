/// <reference types="cypress" />
// ***********************************************

//import LoginPageTestMwf from '../e2e/pages/login-page-testmwf.cy';
//Cypress.Commands.add('preencherCamposDeLogin', () =>{
//
//    cy.fixture("usuario-default").then(usuario =>{
//       LoginPageTestMwf.preencherCampoDeEmail('email@email.com');
//   });
//

//});
/*
import LoginPageTestMwf from '../e2e/pages/login-page-testmwf';
import LoginPageAcoes from '../pages/login-page-acoes';
import LoginPageValidacoes from '../pages/login-page-validacoes';

const loginAcoes = new LoginPageAcoes();
const loginValidacoes = new LoginPageValidacoes();

const loginPage = new LoginPageTestMwf();

Cypress.Commands.add('preencherCamposDeLogin', () => {
    cy.fixture("usuario-admin").then(usuario => {
        loginPage.preencherCampoDeEmail(usuario.email);
        loginPage.preencherSenha(usuario.senha);
    });

});
Cypress.Commands.add('preencherSenhaDeLoginInvalido', () => {
    cy.fixture("usuario-invalidoSenha").then(usuario => {
        loginPage.preencherCampoDeEmail(usuario.email);
        loginPage.preencherSenha(usuario.senha);
    });

});
*/
/// <reference types="cypress" />

import LoginPageAcoes from '../pages/login-page-acoes';
import LoginPageValidacoes from '../pages/login-page-validacoes';

const loginAcoes = new LoginPageAcoes();
const loginValidacoes = new LoginPageValidacoes();

// 🔹 Comando para preencher login válido
Cypress.Commands.add('preencherCamposDeLogin', () => {
  cy.fixture('usuario-admin').then((usuario) => {
    loginAcoes.preencherCampoDeEmail(usuario.email);
    loginAcoes.preencherSenha(usuario.senha);
  });
});

// 🔹 Comando para preencher login inválido
Cypress.Commands.add('preencherCamposDeLoginInvalido', () => {
  cy.fixture('usuario-invalidoSenha').then((usuario) => {
    loginAcoes.preencherCampoDeEmail(usuario.email);
    loginAcoes.preencherSenha(usuario.senha);
  });
});

// 🔹 Comando para validar mensagem de erro
Cypress.Commands.add('validarMensagemEmailInvalido', () => {
  loginValidacoes.validarMensagemInvalidoEmail();
});

// 🔹 Comando para validar login bem-sucedido
Cypress.Commands.add('validarLoginComSucesso', () => {
  loginValidacoes.validarLoginComSucesso();
});
