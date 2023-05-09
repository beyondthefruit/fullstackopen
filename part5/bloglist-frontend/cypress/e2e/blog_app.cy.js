describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Keke',
      username: 'root',
      password: 'rootuser',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    const usermasked = {
      name: 'Secret',
      username: 'bulbizar',
      password: 'pass',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', usermasked);
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
    describe('and a blogs exist', function () {
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

  describe('logged a user', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'rootuser' });
    });
    describe('and a few blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'I have only 2 likes',
          author: 'Likeless',
          url: 'http',
          likes: 2,
        });
        cy.createBlog({
          title: 'I have 10 likes',
          author: 'Likemore',
          url: 'http',
          likes: 10,
        });
        cy.createBlog({
          title: 'I have 5 likes',
          author: 'Likeaverage',
          url: 'http',
          likes: 5,
        });
      });
      it('blogs are ordered based on likes', function () {
        cy.get('.bloup').eq(0).should('contain', 'I have 10 likes');
        cy.get('.bloup').eq(1).should('contain', 'I have 5 likes');
        cy.get('.bloup').eq(2).should('contain', 'I have only 2 likes');
        // cy.contains('I have 10 likes');
      });
    });
  });

  describe('when logged', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'rootuser' });
    });
    describe('and a blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a blog test',
          author: 'bilou bila',
          url: 'http',
          likes: 2,
        });
      });

      it('another user cannott delete a blog and do not see Remove button', function () {
        cy.contains('logout').click();
        cy.login({ username: 'bulbizar', password: 'pass' });
        cy.contains('view').click();
        cy.contains('Remove').should('not.exist');
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
