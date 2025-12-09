describe('Регистрация', () => {
    it('Регистрация с полным набором данных', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.url().should('include', '/registration');

        cy.get('input[name="name"]').type('Иван')
        cy.get('input[name=surname]').type('Иванов')
        cy.get('input[name=patronymic]').type('Иванович')
        cy.get('input[name=email]').type('zxcv@zxcv.com')
        cy.get('input[name=password]').type('zxcv1234.')

        cy.contains('Зарегистрироваться').click();
        cy.url().should('include', '/catalog')
    })

    it('Регистрация с неполным набором данных', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.url().should('include', '/registration');

        cy.contains('Зарегистрироваться').click();
        cy.url().should('include', '/registration')
    })

    it('Регистрация с занятыми данными', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.url().should('include', '/registration');

        cy.get('input[name="name"]').type('Иван')
        cy.get('input[name=surname]').type('Иванов')
        cy.get('input[name=patronymic]').type('Иванович')
        cy.get('input[name=email]').type('zxcv@zxcv.com')
        cy.get('input[name=password]').type('zxcv1234.')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Данный email уже занят.")
    })

    it('Регистрация с латинскими буквами в имени/фамилии/отчестве', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.url().should('include', '/registration');

        cy.get('input[name="name"]').type('Ivan')
        cy.get('input[name=surname]').type('Ivanov')
        cy.get('input[name=patronymic]').type('Ivanovich')
        cy.get('input[name=email]').type('zxcv@zxcv.com')
        cy.get('input[name=password]').type('zxcv1234.')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Поля имени, фамилии и отчества должны содержать только кириллицу.")
    })

    it('Регистрация с цифрами в имени/фамилии/отчестве', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.get('input[name="name"]').type('Иван1')
        cy.get('input[name=surname]').type('Иванов2')
        cy.get('input[name=patronymic]').type('Иванович3')
        cy.get('input[name=email]').type('zxcv@zxcv.com')
        cy.get('input[name=password]').type('zxcv1234.')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Поля имени, фамилии и отчества должны содержать только кириллицу.")
    })

    it('Регистрация с спецсимволами в имени/фамилии/отчестве', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.get('input[name="name"]').type('Иван!')
        cy.get('input[name=surname]').type('Иванов.')
        cy.get('input[name=patronymic]').type('Иванович-')
        cy.get('input[name=email]').type('zxcv@zxcv.com')
        cy.get('input[name=password]').type('zxcv1234.')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Поля имени, фамилии и отчества должны содержать только кириллицу.")
    })

    it('Регистрация c паролем, содержащим менее 8 символов', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.get('input[name="name"]').type('Иван')
        cy.get('input[name=surname]').type('Иванов')
        cy.get('input[name=patronymic]').type('Иванович')
        cy.get('input[name=email]').type('zxcv@zxcv.com')
        cy.get('input[name=password]').type('z!1')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Длина пароля должна быть не менее 8 символов.")
    })

    it('Регистрация без цифр в пароле', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.get('input[name="name"]').type('Иван')
        cy.get('input[name=surname]').type('Иванов')
        cy.get('input[name=patronymic]').type('Иванович')
        cy.get('input[name=email]').type('zxcv@zxcv.com')
        cy.get('input[name=password]').type('zxcvzxcv.')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Пароль должен содержать цифры.")
    })

    it('Регистрация без спецсимволов в пароле', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.get('input[name="name"]').type('Иван')
        cy.get('input[name=surname]').type('Иванов')
        cy.get('input[name=patronymic]').type('Иванович')
        cy.get('input[name=email]').type('zxcv@zxcv.com')
        cy.get('input[name=password]').type('zxcv1234')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Пароль должен содержать специальные символы. [! @ # $ % ^ & * ( ) _ + - .]")
    })

})
