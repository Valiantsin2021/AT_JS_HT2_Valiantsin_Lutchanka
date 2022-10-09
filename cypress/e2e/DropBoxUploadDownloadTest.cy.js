const chaiJsonSchema = require('chai-json-schema');
chai.use(chaiJsonSchema);
const { uploadResponseSchema, getMetadataResponseSchema, deleteSchema } = require('../fixtures/schemas');
const { 
  getTokenOptions, 
  checkUserOptions, 
  checkAppOptions, 
  fileUploadOptions, 
  searchUploadedFileOptions, 
  deleteFileOptions,
  wrongPathFileUploadOptions,
  wrongPathSearchFileOptions,
  wrongPathDeletefileOptions,
  wrongBodySearchFileOptions,
  wrongBodyDeleteFileOptions
 } = require('../fixtures/requestOptions.js')
const { Request, Wrongrequest } = require('../fixtures/helper.js') 
const { 
  fileName,
  test,
  metadata,
  uploadResponseLength,
  metadataResponseLength,
  errorResponse,
  } = require('../fixtures/constants')
  let accessToken;
  let metadataValues;
  let uploadResponse;
  let metadataResponse;
  let deleteResponse;
describe('Should test DropBox api with retrieving oauth2 token, uploading the file, checking it metadata and deleting it', () => {
  it('Should successfully retrieve oauth2 authorization token from DropBox API and save it', () => {
  const request = new Request(getTokenOptions);
  cy.request(request)
  .as('token')
  cy.get('@token')
  .then(response => {
    expect(response.status).to.be.equal(200)
    expect(response.body).to.include.key('access_token')
    accessToken = response.body.access_token
  });
  });
  it('Should successfully check user authentication on DropBox', () => {
    const request = new Request(checkUserOptions);
    request.headers.Authorization += ` ${accessToken}`
    cy.request(request)
    .as('userAuth')
    cy.get('@userAuth')
    .then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body.result).to.be.equal(test)
    })  
  })
  it('Should successfully check app authentication on DropBox', () => {
    const request = new Request(checkAppOptions);
    cy.request(request)
    .as('appAuth')
    cy.get('@appAuth')
    .then(response => {
      expect(response.status).to.be.equal(200)
      expect(response.body.result).to.be.equal(test)
    })  
  })
  it('Should successfully upload text file to DropBox via API', () => {
    const request = new Request(fileUploadOptions);
    request.headers.Authorization += ` ${accessToken}`
    cy.request(request)
    .as('upload')
    cy.get('@upload')
    .then(response => {
      expect(response.status).to.be.equal(200)
      uploadResponse = response.body;
      metadataValues = Object.values(response.body)
    })
  })
  describe(`Should perform assertions on 'upload file' response`, () => {
    it(`Validate 'upload file' response body upon the schema`, () => {
      cy.wrap(uploadResponse)
        .then(response => {
          expect(response).to.be.jsonSchema(uploadResponseSchema);
        })
    })
    it(`Check 'upload file' response key 'name' contains value equal '${fileName}'`, () => {
      cy.wrap(uploadResponse)
      .then(response => {
        expect(response.name).to.equal(fileName)
      })
    })
    it(`Check 'upload file' response body length equal ${uploadResponseLength}`, () => {
      cy.wrap(uploadResponse)
      .then(response => {
      expect(Object.keys(response).length).to.equal(uploadResponseLength)
      })
    })
    it(`Check 'upload file' response body keys`, () => {
      cy.wrap(uploadResponse)
      .then(response => {
        metadata.forEach((key,i) => {
          expect(Object.keys(response)[i]).to.equal(key)
        })
      })
    })
  })
  it('Should successfully search for uploaded file and validate it\'s metadata', () => {
    const request = new Request(searchUploadedFileOptions);
    request.headers.Authorization += ` ${accessToken}`
    cy.request(request)
    .as('metadataCheck')
    cy.get('@metadataCheck')
    .then(response => {
      expect(response.status).to.be.equal(200)
      metadataResponse = response.body
    })
  })
  describe(`Should perform assertions on 'search uploaded file metadata' response`, () => { 
    it(`Validate 'file metadata' response body upon the schema`, () => {
      cy.wrap(metadataResponse)
        .then(response => {
          expect(response).to.be.jsonSchema(getMetadataResponseSchema);
        })
    })
    it(`Check 'file metadata' response body length equal ${metadataResponseLength}`, () => {
      cy.wrap(metadataResponse)
      .then(response => {
      expect(Object.keys(response).length).to.equal(metadataResponseLength)
      })
    })
    it(`Check 'file metadata' response body keys values`, () => {
      cy.wrap(metadataResponse)
      .then(response => {
        Object.values(response).slice(1).forEach((el, i) => {
          expect(el).to.equal(metadataValues[i])
        })
      })
    })
  })
  it('Should successfully delete uploaded file', () => {
    const request = new Request(deleteFileOptions);
    request.headers.Authorization += ` ${accessToken}`
    cy.request(request)
    .as('delete')
    cy.get('@delete')
    .then(response => {
      expect(response.status).to.be.equal(200)
      deleteResponse = response.body.metadata
    })
  });
  describe(`Should perform assertions on 'delete file' response`, () => { 
    it(`Validate 'delete file' response body upon the schema`, () => {
      cy.wrap(deleteResponse)
        .then(response => {
          expect(response).to.be.jsonSchema(deleteSchema);
        })
    })
    it(`Check 'delete file' response 'metadata' key has number of keys equal ${metadataResponseLength}`, () => {
      cy.wrap(deleteResponse)
      .then(response => {
      expect(Object.keys(response).length).to.equal(metadataResponseLength)
      })
    })
    it(`Check 'delete file' response 'metadata' keys values`, () => {
      cy.wrap(deleteResponse)
      .then(response => {
        Object.values(response).slice(1).forEach((el, i) => {
          expect(el).to.equal(metadataValues[i])
      })
      })
    })
  })
});
describe('Should perform DropBox API negative tests with wrong endpoints, wrong body values and try to delete already deleted file', () => {
  it('Should check impossibility to upload file to DropBox via API with wrong endpoint', () => {
    const request = new Wrongrequest(wrongPathFileUploadOptions);
    request.headers.Authorization += ` ${accessToken}`
    cy.request(request)
    .as('upload')
    cy.get('@upload')
    .then(response => {
      expect(response.status).to.be.equal(404)
    })
  })
  it('Should check impossibility to check uploaded file\'s metadata with wrong endpoint', () => {
    const request = new Wrongrequest(wrongPathSearchFileOptions);
    request.headers.Authorization += ` ${accessToken}`
    cy.request(request)
    .as('metadataCheck')
    cy.get('@metadataCheck')
    .then(response => {
      expect(response.status).to.be.equal(400)
    })
  })
  it('Should check impossibility to delete uploaded file with wrong endpoint', () => {
    const request = new Wrongrequest(wrongPathDeletefileOptions);
    request.headers.Authorization += ` ${accessToken}`
    cy.request(request)    
    .as('delete')
    cy.get('@delete')
    .then(response => {
      expect(response.status).to.be.equal(400)
    })
  })
  it('Should check impossibility to check uploaded file\'s metadata with wrong body value', () => {
    const request = new Wrongrequest(wrongBodySearchFileOptions);
    request.headers.Authorization += ` ${accessToken}`
    cy.request(request)
    .as('metadataCheck')
    cy.get('@metadataCheck')
    .then(response => {
      expect(response.status).to.be.equal(409)
      expect(response.body).to.have.keys(errorResponse);
    })
  })
  it('Should check impossibility to delete uploaded file with wrong body value', () => {
    const request = new Wrongrequest(wrongBodyDeleteFileOptions);
    request.headers.Authorization += ` ${accessToken}`
    cy.request(request)
    .as('delete')
    cy.get('@delete')
    .then(response => {
      expect(response.status).to.be.equal(409)
      expect(response.body).to.have.keys(errorResponse);
    })
  })
  it('Should repeat delete uploaded file and check error code is 409', () => {
    const request = new Wrongrequest(deleteFileOptions);
    cy.request(request)
    .as('delete')
    cy.get('@delete')
    .then(response => {
      expect(response.status).to.be.equal(409)
      expect(response.body).to.have.keys(errorResponse);
    })
  })
})