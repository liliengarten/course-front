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

        cy.get('input[name="name"]').type('Петр')
        cy.get('input[name=surname]').type('Петров')
        cy.get('input[name=patronymic]').type('Петрович')
        cy.get('input[name=email]').type('zxcv@zxcv.com')
        cy.get('input[name=password]').type('Petya2012.')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Данный email уже занят.")
    })

    it('Регистрация с латинскими буквами в имени/фамилии/отчестве', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.url().should('include', '/registration');

        cy.get('input[name="name"]').type('Andrey')
        cy.get('input[name=surname]').type('Andreev')
        cy.get('input[name=patronymic]').type('Andreevich')
        cy.get('input[name=email]').type('andreyka@mail.com')
        cy.get('input[name=password]').type('andrew123.')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Поля имени, фамилии и отчества должны содержать только кириллицу.")
    })

    it('Регистрация с цифрами в имени/фамилии/отчестве', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.get('input[name="name"]').type('Conor01')
        cy.get('input[name=surname]').type('Artificial1101')
        cy.get('input[name=patronymic]').type('Intelligence0101')
        cy.get('input[name=email]').type('robot@ai.com')
        cy.get('input[name=password]').type('iamrobot101.')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Поля имени, фамилии и отчества должны содержать только кириллицу.")
    })

    it('Регистрация с спецсимволами в имени/фамилии/отчестве', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.get('input[name="name"]').type('Максим!?.,,')
        cy.get('input[name=surname]').type('Максимов>?>?')
        cy.get('input[name=patronymic]').type('Максимович{}{{)-=]')
        cy.get('input[name=email]').type('maxon@rules.com')
        cy.get('input[name=password]').type('maxgamerboy123.')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Поля имени, фамилии и отчества должны содержать только кириллицу.")
    })

    it('Регистрация c паролем, содержащим менее 6 символов', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.get('input[name="name"]').type('Дмитрий')
        cy.get('input[name=surname]').type('Дмитриев')
        cy.get('input[name=patronymic]').type('Дмитриевич')
        cy.get('input[name=email]').type('dimulkin@badabulkin.com')
        cy.get('input[name=password]').type('sww1.')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Длина пароля должна быть не менее 6 символов.")
    })

    it('Регистрация без цифр в пароле', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.get('input[name="name"]').type('Виталий')
        cy.get('input[name=surname]').type('Цаль')
        cy.get('input[name=patronymic]').type('Васильевич')
        cy.get('input[name=email]').type('arthas@gmail.com')
        cy.get('input[name=password]').type('lefteightgrade.')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Пароль должен содержать цифры.")
    })

    it('Регистрация без спецсимволов в пароле', () => {
        cy.visit('/')
        cy.contains('Профиль').click();
        cy.get('input[name="name"]').type('Георгий')
        cy.get('input[name=surname]').type('Георгиев')
        cy.get('input[name=patronymic]').type('Георгиевич')
        cy.get('input[name=email]').type('goga753@gmail.com')
        cy.get('input[name=password]').type('gwfso1')

        cy.contains('Зарегистрироваться').click();
        cy.get(".modal").should('contain', "Пароль должен содержать специальные символы. [! @ # $ % ^ & * ( ) _ + - .]")
    })
})
