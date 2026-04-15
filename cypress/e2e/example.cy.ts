describe('Home page', () => {
  it('deve exibir o heading de boas-vindas', () => {
    cy.visit('/');
    cy.contains('h1', 'Bem-vindo').should('be.visible');
  });
});
