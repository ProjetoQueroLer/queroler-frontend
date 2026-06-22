import { faker } from '@faker-js/faker/locale/pt_BR';

export type DadosLivro = {
  isbn: string;
  titulo: string;
  autor: string;
  editora: string;
  ano: string;
  paginas: string;
  sinopse: string;
};

export class GeradorDadosLivro {
  static criar(): DadosLivro {
    return {
      isbn: faker.helpers.arrayElement([
        faker.string.numeric(10),
        faker.string.numeric(13),
      ]),
      titulo: faker.lorem.words(3),
      autor: `${faker.person.firstName()} ${faker.person.lastName()}`,
      editora: faker.company.name(),
      ano: faker.date.past({ years: 30 }).getFullYear().toString(),
      paginas: faker.number.int({ min: 10, max: 2000 }).toString(),
      sinopse: faker.lorem.sentences(3),
    };
  }
}
