/// <reference types="cypress" />

import { CadastrarLivroElements } from '../elements/CadastrarLivroElements';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Fixtures } from '../utils/fixtures';
import { GeradorDadosLivro } from '../utils/geradorDadosLivro';
export class CadastrarLivroPage {
  acessarPaginaCadastrarLivro(texto: string): this {
    cy.get(CadastrarLivroElements.buscarLivroInput).type(texto);
    cy.get(CadastrarLivroElements.modalSimButton).click();
    return this;
  }

  verificarPaginaCarregada(): this {
    const elementos = [
      CadastrarLivroElements.logoQueroler,
      CadastrarLivroElements.tituloIncrementeANossaBibliotecaText,
      CadastrarLivroElements.subtituloCadastreUmLivroText,
      CadastrarLivroElements.isbnInput,
      CadastrarLivroElements.tituloDoLivroInput,
      CadastrarLivroElements.autorInput,
      CadastrarLivroElements.editoraInput,
      CadastrarLivroElements.anoDePublicacaoInput,
      CadastrarLivroElements.numeroDePaginasInput,
      CadastrarLivroElements.idiomaComboBox,
      CadastrarLivroElements.sinopseInput,
      CadastrarLivroElements.textoSecundarioLabel,
      CadastrarLivroElements.cadastrarLivroButton,
      CadastrarLivroElements.cancelarCadastroButton,
    ];

    elementos.forEach((elemento) => {
      cy.get(elemento).should('be.visible');
    });

    return this;
  }

  private selecionarIdiomaAleatorio(): void {
    cy.get(CadastrarLivroElements.idiomaComboBox)
      .find('option')
      .then((options) => {
        const valores = [...options]
          .map((o) => o.value)
          .filter((v) => v !== '');
        const idiomaAleatorio = faker.helpers.arrayElement(valores);
        cy.get(CadastrarLivroElements.idiomaComboBox).select(idiomaAleatorio);
      });
  }

  fecharToast(): this {
    cy.get(CadastrarLivroElements.fechaToastButton)
      .should('be.visible')
      .click();
    return this;
  }

  verificarToastErro(msg: string): this {
    cy.get(CadastrarLivroElements.mensagemErrorToastLabel)
      .should('be.visible')
      .and('contain.text', msg);
    return this;
  }

  verificarToastSucesso(msg: string): this {
    cy.get(CadastrarLivroElements.mensagemSucessoToastLabel)
      .should('be.visible')
      .and('contain.text', msg);
    return this;
  }

  preencherFormularioObrigatorio(msg: string): this {
    const dadosLivro = GeradorDadosLivro.criar();

    cy.get(CadastrarLivroElements.isbnInput).type(dadosLivro.isbn);
    this.fecharToast();
    this.verificarToastErro(msg);
    cy.get(CadastrarLivroElements.tituloDoLivroInput).type(dadosLivro.titulo);
    cy.get(CadastrarLivroElements.autorInput).type(dadosLivro.autor);
    cy.get(CadastrarLivroElements.editoraInput).type(dadosLivro.editora);
    cy.get(CadastrarLivroElements.anoDePublicacaoInput).type(dadosLivro.ano);
    cy.get(CadastrarLivroElements.numeroDePaginasInput).type(
      dadosLivro.paginas
    );
    this.selecionarIdiomaAleatorio();
    cy.get(CadastrarLivroElements.sinopseInput).type(dadosLivro.sinopse);
    return this;
  }

  selecionarImagemLivro(): this {
    cy.get(CadastrarLivroElements.textoSecundarioLabel).should('be.visible');
    cy.get(CadastrarLivroElements.imagemLivroInput).selectFile(
      Fixtures.imagens.livro,
      { force: true }
    );
    return this;
  }

  salvarCadastro(msg: string): this {
    this.fecharToast();
    cy.get(CadastrarLivroElements.cadastrarLivroButton).click();
    this.verificarToastSucesso(msg);
    return this;
  }

  cancelarCadastro(msg: string): this {
    this.fecharToast();
    cy.get(CadastrarLivroElements.cancelarCadastroButton).click();
    this.verificarToastSucesso(msg);
    return this;
  }
}
