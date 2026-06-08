/// <reference types="cypress" />

import { CadastrarLivroElements } from '../elements/CadastrarLivroElements';

export class CadastrarLivroPage {
  acessarPaginaCadastrarLivro(texto: string): this {
    cy.get(CadastrarLivroElements.buscarLivroInput).type(texto);
    cy.get(CadastrarLivroElements.modalSimButton).click();
    return this;
  }

  verificarPaginaCarregada(): this {
    cy.get(CadastrarLivroElements.logoQueroler).should('be.visible');
    cy.get(CadastrarLivroElements.tituloIncrementeANossaBibliotecaText).should(
      'be.visible'
    );
    cy.get(CadastrarLivroElements.subtituloCadastreUmLivroText).should(
      'be.visible'
    );
    cy.get(CadastrarLivroElements.isbnInput).should('be.visible');
    cy.get(CadastrarLivroElements.tituloDoLivroInput).should('be.visible');
    cy.get(CadastrarLivroElements.autorInput).should('be.visible');
    cy.get(CadastrarLivroElements.editoraInput).should('be.visible');
    cy.get(CadastrarLivroElements.anoDePublicacaoInput).should('be.visible');
    cy.get(CadastrarLivroElements.numeroDePaginasInput).should('be.visible');
    cy.get(CadastrarLivroElements.idiomaComboBox).should('be.visible');
    cy.get(CadastrarLivroElements.sinopseInput).should('be.visible');
    cy.get(CadastrarLivroElements.cadastrarLivroButton).should('be.visible');
    cy.get(CadastrarLivroElements.cancelarCadastroButton).should('be.visible');
    return this;
  }
}
