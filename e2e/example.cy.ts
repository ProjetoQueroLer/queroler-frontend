describe('Home page', () => {
  it('should render login heading', () => {
    cy.visit('/');
    cy.contains('h1', 'Login').should('be.visible');
  });
});
