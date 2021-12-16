/// <reference types="cypress" />

describe('Verotunkki', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays frontpage', () => {
    //cy.get('.todo-list li').should('have.length', 2)
    cy.contains('Verotunkki')
    cy.contains('Kryptovaluutat')
    cy.contains('Arvopaperit')
  })
})
