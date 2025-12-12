describe('Каталог и корзина', () => {
    it ('Просмотр каталога', () => {
        cy.signin();
        cy.get('div[name="catalogCard"]').should('exist');
    })

    it('Добавление товара в корзину', () => {
        cy.signin();
        cy.url().should('include','/catalog');
        cy.contains('Корзина').click();
        cy.contains('+').click();
        cy.get('.cartItem').should('exist')
        cy.get('.cartItem').contains('+').click();
    })

    it('Удаление товара из корзины', () => {
        cy.signin();

        cy.url().should('include','/catalog');
        cy.contains('Корзина').click();
        cy.contains('+').click();
        cy.contains('+').click();
        cy.get('.cartItem').should('exist')
        cy.contains('-').click()
        cy.get('.cartItem').contains('-').click();
        cy.get('.cartItem').should('not.exist')

    })

    it('Очистка корзины', () => {
        cy.signin();

        cy.url().should('include','/catalog');
        cy.contains('Корзина').click();
        cy.contains('+').click();
        cy.contains('Очистить корзину').click();
        cy.get('.cartItem').should('not.exist');
    })
})