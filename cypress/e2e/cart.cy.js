describe('Коризина', () => {
    it('Добавление товара в корзину', () => {
        cy.signin();
        cy.url().should('include','/catalog');
        cy.contains('Корзина').click();
        cy.contains('+').click();
        cy.get('.cartItem').contains('odio voluptas et') //точное совпадение
        cy.get('.cartItem').contains('+').click();

    })

    it('Удаление товара из корзины', () => {
        cy.signin();

        cy.url().should('include','/catalog');
        cy.contains('Корзина').click();
        cy.contains('+').click();
        cy.contains('+').click();
        cy.contains('-').click()
        cy.get('.cartItem').contains('-').click();
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