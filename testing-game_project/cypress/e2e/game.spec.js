describe('Игра в пары', () => {
    beforeEach(() => {
        cy.visit('../../index.html');
    });

    it('Проверка начального состояния', () => {
        cy.get('.card').should('have.length', 16);
        cy.get('.card').each(card => {
            cy.wrap(card).should('not.have.class', 'open');
        });
    });

    it('Открытие одной карточки', () => {
        cy.get('.card').first().click();
        cy.get('.card').first().should('have.class', 'open');
    });

    it('Проверка нахождения пары', () => {
        cy.get('.card').first().click();
        cy.get('.card').eq(1).click();
        cy.get('.card').should('have.class', 'success');
    });

    it('Проверка закрытия непарных карточек', () => {
        cy.get('.card').first().click();
        cy.get('.card').eq(2).click();
        cy.get('.card').first().should('not.have.class', 'open');
        cy.get('.card').eq(2).should('not.have.class', 'open');
    });
});
