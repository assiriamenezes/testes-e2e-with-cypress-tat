// authenticatedScenarios.spec.js

describe('Scenarios where authentication is a pre-requirement', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.login()
    cy.wait('@getNotes', {timeout: 90000})
  })

  it('CRUDs a note', () => {
    const faker = require('faker')
    const noteDescription = faker.lorem.words(4)

    cy.createNote(noteDescription)
    cy.wait('@getNotes', {timeout: 90000})

    const updatedNoteDescription = faker.lorem.words(4)
    const attachFile = true

    cy.editNote(noteDescription, updatedNoteDescription, attachFile)
    cy.wait('@getNotes', {timeout: 90000})

    cy.deleteNote(updatedNoteDescription)
    cy.wait('@getNotes', {timeout: 90000})
  })

  it('successfully submits the form', () => {
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')

    cy.fillSettingsFormAndSubmit()

    cy.wait('@getNotes', {timeout: 90000})
    cy.wait('@paymentRequest', {timeout: 90000}).then(response => {
      expect(response.state).to.equal('Complete')
    })
  })

  it('logs out', () => {
    cy.visit('/')
    cy.wait('@getNotes', {timeout: 90000})
  })

})