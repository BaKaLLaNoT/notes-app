const baseUrl = 'http://localhost:3000'
const baseUrlBD = 'http://localhost:3001'

describe('Note App', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
    cy.request('POST', baseUrlBD + '/api/testing/reset')

    const user = {
      name: 'Administador',
      username: 'root',
      password: 'lapassword'
    }
    cy.request('POST', baseUrlBD + '/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login form can be opened', () => {
    cy.contains('Show Login').click()
  })

  it('user can login', () => {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('root')
    cy.get('[placeholder="Password"]').type('lapassword')
    cy.get('#form-login-button').click()
    cy.contains('Create a new note')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('root')
    cy.get('[placeholder="Password"]').type('nogood')
    cy.get('#form-login-button').click()
    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .should('have.css', 'color', 'rgb(255,0,0')
      .should('have.css', 'border-style', 'solid')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'root', password: 'lapassword' })
    })
    it('a new note can ben created', () => {
      const noteContent = 'a note created by cypress'
      cy.contains('Show Create Note').click()
      cy.get('input').type(noteContent)
      cy.contains('save').click()
      cy.contains(noteContent)
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'A note created from cypress',
          important: false
        })
      })

      it('it can be made important 12', () => {
        cy.contains('A note created from cypress').as('thenote')
        cy.get('@thenote').contains('make important').click()
        cy.get('@thenote').contains('make not important')
      })
    })
  })
})
