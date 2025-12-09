// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('signin', (username, password) => {
    cy.visit('/login')
    cy.url().should('include', '/login');

    cy.get('input[name=email]').type('zxcv@zxcv.com')
    cy.get('input[name=password]').type('zxcv1234.')

    cy.contains('Войти').click();
    cy.url().should('include', '/catalog')
})

Cypress.Commands.add('logout', (username, password) => {
    cy.contains('Выйти').click()
})