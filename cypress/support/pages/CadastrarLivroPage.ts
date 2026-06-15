/// <reference types="cypress" />

import { CadastrarLivroElements } from '../elements/CadastrarLivroElements';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Fixtures } from '../utils/fixtures';

type DadosLivro = {
  isbn: string;
  titulo: string;
  autor: string;
  editora: string;
  ano: string;
  paginas: string;
  sinopse: string;
};

const isbnFaker = faker.helpers.arrayElement([
  faker.string.numeric(10),
  faker.string.numeric(13),
]);
export class CadastrarLivroPage {
  readonly dadosLivro: DadosLivro = {
    isbn: isbnFaker,
    titulo: faker.lorem.words(3),
    autor: `${faker.person.firstName()} ${faker.person.lastName()}`,
    editora: faker.company.name(),
    ano: faker.date.past({ years: 30 }).getFullYear().toString(),
    paginas: faker.string.numeric(4),
    sinopse: faker.lorem.sentences(3),
  };

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

  preencherFormularioObrigatorio(msg: string): this {
    cy.get(CadastrarLivroElements.isbnInput).type(this.dadosLivro.isbn);
    cy.get(CadastrarLivroElements.fechaToastButton)
      .should('be.visible')
      .click();
    cy.get(CadastrarLivroElements.mensagemErrorToastLabel)
      .should('be.visible')
      .and('contain.text', msg);
    cy.get(CadastrarLivroElements.tituloDoLivroInput).type(
      this.dadosLivro.titulo
    );
    cy.get(CadastrarLivroElements.autorInput).type(this.dadosLivro.autor);
    cy.get(CadastrarLivroElements.editoraInput).type(this.dadosLivro.editora);
    cy.get(CadastrarLivroElements.anoDePublicacaoInput).type(
      this.dadosLivro.ano
    );
    cy.get(CadastrarLivroElements.numeroDePaginasInput).type(
      this.dadosLivro.paginas
    );
    this.selecionarIdiomaAleatorio();
    cy.get(CadastrarLivroElements.sinopseInput).type(this.dadosLivro.sinopse);
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

  salvarCadastro(): this {
    cy.get(CadastrarLivroElements.fechaToastButton)
      .should('be.visible')
      .click();
    cy.get(CadastrarLivroElements.cadastrarLivroButton).click();
    cy.get(CadastrarLivroElements.mensagemSucessoToastLabel).should(
      'be.visible'
    );
    return this;
  }

  cancelarCadastro(msg: string): this {
    cy.get(CadastrarLivroElements.fechaToastButton)
      .should('be.visible')
      .click();
    cy.get(CadastrarLivroElements.cancelarCadastroButton).click();
    cy.get(CadastrarLivroElements.mensagemSucessoToastLabel)
      .should('be.visible')
      .and('contain.text', msg);
    return this;
  }
}
