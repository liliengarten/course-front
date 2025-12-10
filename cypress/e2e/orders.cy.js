describe('Заказы', () => {
    it('Оформление заказа', () => {
        cy.signin()
        cy.url().should('include', '/catalog');
        cy.contains('Корзина').click()
        cy.get("div[name=catalogCard]").eq(0).contains('+').click()
        cy.get("div[name=catalogCard]").eq(1).contains('+').click()
        cy.contains('Оформить заказ').click();

        cy.contains('Заказы').click();
        cy.get('.orderWrapper').should('exist');
    })
})