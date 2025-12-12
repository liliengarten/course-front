describe('Авторизация', () => {
    it('Авторизация с полным набором данных', () => {
        cy.visit('/login')
        cy.url().should('include', '/login');

        cy.get('input[name=email]').type('zxcv@zxcv.com')
        cy.get('input[name=password]').type('zxcv1234.')

        cy.contains('Войти').click();
        cy.url().should('include', '/catalog')
        cy.logout();
    })

    it('Авторизация с неполным набором данных', () => {
        cy.visit('/login')
        cy.url().should('include', '/login');

        cy.contains('Войти').click();
        cy.url().should('include', '/login')
    })

    it('Авторизация с недействительным набором данных', () => {
        cy.visit('/login')
        cy.get('input[name=email]').type('john@doe.com')
        cy.get('input[name=password]').type('iamnotreal')

        cy.contains('Войти').click();
        cy.get(".modal").should('contain', "Неверные логин или пароль.")

    })
})
