describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Keke',
      username: 'root',
      password: 'rootuser',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login');
  });
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // cy.contains('login').click();
      cy.get('#username').type('root');
      cy.get('#password').type('rootuser');
      cy.get('#login-button').click();
    });
  });
  it('login fails with wrong password', function () {
    cy.get('#username').type('root');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();
    // cy.get('.error').contains('wrong credentials');
    //   cy.contains('wrong credentials');
    //or
    cy.get('.error').should('contain', 'Wrong username or passwords');
    // or
    // cy.get('.error')
    //   .should('contain', 'wrong credentials')
    //   .and('have.css', 'color', 'rgb(255, 0, 0)')
    //   .and('have.css', 'border-style', 'solid');

    // cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
  });
});
