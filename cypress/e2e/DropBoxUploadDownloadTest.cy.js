const CryptoJS = require('crypto-js');
const chaiJsonSchema = require('chai-json-schema');
chai.use(chaiJsonSchema);
const { uploadResponseSchema, getMetadataResponseSchema } = require('../fixtures/schemas')
const { 
  authCheckBody, 
  uploadDropBoxAPIArg,
  uploadContentType,
  fileName,
  test,
  metadata,
  uploadResponseLength,
  metadataResponseLength,
  path,
  wrongPath,
  errorResponse,
  ContentTypeAuthHeader,
  ContentTypeHeader,
  } = require('../fixtures/constants')
  let accessToken;
  let metadataValues;
describe('Should test DropBox api with retrieving oauth2 token, uploading the file, checking it metadata and deleting it', () => {
  it('Should successfully retrieve oauth2 authorization token from DropBox API and save it', () => {
    var options = {
      method: 'POST',
      url: Cypress.env('authTokenUrl'),
      headers: {
        'Content-Type': ContentTypeAuthHeader,
        'Cookie': 'locale=en; t=MHEYc5dUJHUnxofca9PH9XEQ'
      },
      body: {
        refresh_token: Cypress.env('DropBoxToken'),
        grant_type: 'refresh_token', 
        client_id: Cypress.env('appKey'), 
        client_secret: Cypress.env('appSecret')
    }
  }
    cy.request(options)
    .as('token')
    cy.get('@token')
    .then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body).to.include.key('access_token')
      accessToken = CryptoJS.AES.encrypt(response.body.access_token, Cypress.env('secret'))
    })
  });
  it('Should successfully check user authentication on DropBox', () => {
    var options = {
      method: 'POST',
      url: `${Cypress.env('authEndpoint')}/check/user`,
      headers: {
        'Authorization': `Bearer ${CryptoJS.AES.decrypt(accessToken, Cypress.env('secret')).toString(CryptoJS.enc.Utf8)}`,
        'Content-Type': ContentTypeHeader
      },
      body: authCheckBody
    }
    cy.request(options)
    .as('userAuth')
    cy.get('@userAuth')
    .then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body.result).to.be.equal(test)
    })  
  })
  it('Should successfully check app authentication on DropBox', () => {
    var options = {
      method: 'POST',
      url: `${Cypress.env('authEndpoint')}/check/app`,
      headers: {
        'Authorization': Cypress.env('appAuth'),
        'Content-Type': ContentTypeHeader
      },
      body: authCheckBody
    }
    cy.request(options)
    .as('appAuth')
    cy.get('@appAuth')
    .then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body.result).to.be.equal(test)
    })  
  })
  it('Should successfully upload text file to DropBox via API', () => {
    var options = {
      method: 'POST',
      url: `${Cypress.env('filesEndpoint')}/files/upload`,
      headers: {
        'Dropbox-API-Arg': JSON.stringify(uploadDropBoxAPIArg),
        'Content-Type': uploadContentType,
        'Authorization': `Bearer ${CryptoJS.AES.decrypt(accessToken, Cypress.env('secret')).toString(CryptoJS.enc.Utf8)}`
      },
      body: "Hello from Cypress!!!"
    };
    cy.request(options)
    .as('upload')
    cy.get('@upload')
    .then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.jsonSchema(uploadResponseSchema);
      expect(response.body.name).to.equal(fileName)
      expect(Object.keys(response.body).length).to.equal(uploadResponseLength)
      metadata.forEach((key,i) => {
        expect(Object.keys(response.body)[i]).to.equal(key)
      })
      metadataValues = Object.values(response.body)
    })
  })
  it('Should successfully search for uploaded file and validate it\'s metadata', () => {
    var options = {
      method: 'POST',
      url: `${Cypress.env('authEndpoint')}/files/get_metadata`,
      headers: {
        'Content-Type': ContentTypeHeader,
        'Authorization': `Bearer ${CryptoJS.AES.decrypt(accessToken, Cypress.env('secret')).toString(CryptoJS.enc.Utf8)}`
      },
      body: JSON.stringify({
        path: path,
        include_media_info: false,
        include_deleted: false,
        include_has_explicit_shared_members: false
      })
    };
    cy.request(options)
    .as('metadataCheck')
    cy.get('@metadataCheck')
    .then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body).to.be.jsonSchema(getMetadataResponseSchema);
      expect(Object.keys(response.body).length).to.equal(metadataResponseLength)
      Object.values(response.body).slice(1).forEach((el, i) => {
        expect(el).to.equal(metadataValues[i])
      })
    })
  })
  it('Should successfully delete uploaded file', () => {
    var options = {
      method: 'POST',
      url: `${Cypress.env('authEndpoint')}/files/delete_v2`,
      headers: {
        'Content-Type': ContentTypeHeader,
        'Authorization': `Bearer ${CryptoJS.AES.decrypt(accessToken, Cypress.env('secret')).toString(CryptoJS.enc.Utf8)}`
      },
      body: JSON.stringify({
        path: path
      }),
      failOnStatusCode: false
    };
    cy.request(options)
    .as('delete')
    cy.get('@delete')
    .then(response => {
      expect(response.status).to.be.equal(200)
      expect(Object.keys(response.body.metadata).length).to.equal(metadataResponseLength)
      Object.values(response.body).slice(1).forEach((el, i) => {
        expect(el).to.equal(metadataValues[i])
      })
    })
  })
});
describe('Should perform DropBox API negative tests with wrong endpoints, wrong body values and try to delete already deleted file', () => {
  it('Should check impossibility to upload file to DropBox via API with wrong endpoint', () => {
    var options = {
      method: 'POST',
      url: `${Cypress.env('filesEndpoint')}/files/upload/1`,
      headers: {
        'Dropbox-API-Arg': JSON.stringify(uploadDropBoxAPIArg),
        'Content-Type': uploadContentType,
        'Authorization': `Bearer ${CryptoJS.AES.decrypt(accessToken, Cypress.env('secret')).toString(CryptoJS.enc.Utf8)}`
      },
      body: "Hello from Cypress!!!",
      failOnStatusCode: false
    };
    cy.request(options)
    .as('upload')
    cy.get('@upload')
    .then(response => {
      expect(response.status).to.be.equal(404)
    })
  })
  it('Should check impossibility to check uploaded file\'s metadata with wrong endpoint', () => {
    var options = {
      method: 'POST',
      url: `${Cypress.env('authEndpoint')}/files/get_metadat`,
      headers: {
        'Content-Type': ContentTypeHeader,
        'Authorization': `Bearer ${CryptoJS.AES.decrypt(accessToken, Cypress.env('secret')).toString(CryptoJS.enc.Utf8)}`
      },
      body: JSON.stringify({
        path: path,
        include_media_info: false,
        include_deleted: false,
        include_has_explicit_shared_members: false
      }),
      failOnStatusCode: false
    };
    cy.request(options)
    .as('metadataCheck')
    cy.get('@metadataCheck')
    .then(response => {
      expect(response.status).to.be.equal(400)
    })
  })
  it('Should check impossibility to delete uploaded file with wrong endpoint', () => {
    var options = {
      method: 'POST',
      url: `${Cypress.env('authEndpoint')}/files/delete_v1`,
      headers: {
        'Content-Type': ContentTypeHeader,
        'Authorization': `Bearer ${CryptoJS.AES.decrypt(accessToken, Cypress.env('secret')).toString(CryptoJS.enc.Utf8)}`
      },
      body: JSON.stringify({
        path: '/text.txt'
      }),
      failOnStatusCode: false
    };
    cy.request(options)
    .as('delete')
    cy.get('@delete')
    .then(response => {
      expect(response.status).to.be.equal(400)
    })
  })
  it('Should check impossibility to check uploaded file\'s metadata with wrong body value', () => {
    var options = {
      method: 'POST',
      url: `${Cypress.env('authEndpoint')}/files/get_metadata`,
      headers: {
        'Content-Type': ContentTypeHeader,
        'Authorization': `Bearer ${CryptoJS.AES.decrypt(accessToken, Cypress.env('secret')).toString(CryptoJS.enc.Utf8)}`
      },
      body: JSON.stringify({
        path: wrongPath,
        include_media_info: false,
        include_deleted: false,
        include_has_explicit_shared_members: false
      }),
      failOnStatusCode: false
    };
    cy.request(options)
    .as('metadataCheck')
    cy.get('@metadataCheck')
    .then(response => {
      expect(response.status).to.be.equal(409)
      expect(response.body).to.have.keys(errorResponse);
    })
  })
  it('Should check impossibility to delete uploaded file with wrong body value', () => {
    var options = {
      method: 'POST',
      url: `${Cypress.env('authEndpoint')}/files/delete_v2`,
      headers: {
        'Content-Type': ContentTypeHeader,
        'Authorization': `Bearer ${CryptoJS.AES.decrypt(accessToken, Cypress.env('secret')).toString(CryptoJS.enc.Utf8)}`
      },
      body: JSON.stringify({
        path: wrongPath
      }),
      failOnStatusCode: false
    };
    cy.request(options)
    .as('delete')
    cy.get('@delete')
    .then(response => {
      expect(response.status).to.be.equal(409)
      expect(response.body).to.have.keys(errorResponse);
    })
  })
  it('Should repeat delete uploaded file and check error code is 409', () => {
    var options = {
      method: 'POST',
      url: `${Cypress.env('authEndpoint')}/files/delete_v2`,
      headers: {
        'Content-Type': ContentTypeHeader,
        'Authorization': `Bearer ${CryptoJS.AES.decrypt(accessToken, Cypress.env('secret')).toString(CryptoJS.enc.Utf8)}`
      },
      body: JSON.stringify({
        path: path
      }),
      failOnStatusCode: false
    };
    cy.request(options)
    .as('delete')
    cy.get('@delete')
    .then(response => {
      expect(response.status).to.be.equal(409)
      expect(response.body).to.have.keys(errorResponse);
    })
  })
})