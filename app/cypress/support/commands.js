const baseUrl = 'http://localhost:3000'
const baseUrlBD = 'http://localhost:3001'

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', '', {
    username,
    password
  }).then((response) => {
    localStorage.setItem('loggedNoteAppUser', JSON.stringify(response.body))
    cy.visit(baseUrl)
  })
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    method: 'POST',
    url: baseUrlBD + '/api/notes',
    body: {
      content,
      important,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('loggedNoteAppUser')).token
        }`
      }
    }
  })
  cy.visit(baseUrl)
})
