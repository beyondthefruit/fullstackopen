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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'rootuser' });
    });
    it('a blog can be created', function () {
      cy.contains('New form').click();
      cy.get('.inputTitle').type('cypress is best for e2e');
      cy.get('.inputAuthor').type('Bernard');
      cy.get('.inputUrl').type('http');
      cy.get('.inputLikes').type('3');
      cy.contains('create').click();
      cy.contains('cypress is best for e2e');
    });
    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a blog',
          author: 'michou',
          url: 'http',
          likes: 2,
        });
      });
      it('an user can like a blog', function () {
        cy.contains('view').click();
        cy.contains('Like it').click();
        cy.contains(3);
      });
      it('an user can delete a blog', function () {
        cy.contains('view').click();
        cy.contains('Remove').click();
        // cy.contains('Like it').click();
        // cy.contains(3);
        cy.get('html').should('not.contain', 'a blog');
      });
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
  });
});
