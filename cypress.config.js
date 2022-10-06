const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      token: 'U2FsdGVkX19c203FkK4qnTbW7TQWTxiOKXhavSNR/xmHF8/eAIhmxG59+l96R9cBjA3ePEX+gwd778XeF7n5lrRzF+rSOViDw62ix+7nWJKFLO3FhgSuFKjdcBMkqJo1',
      authTokenUrl: 'https://api.dropbox.com/oauth2/token',
      secret: 'super555SecretPass=-msd,',
      authEndpoint: 'https://api.dropboxapi.com/2',
      filesEndpoint: 'https://content.dropboxapi.com/2',
      appKey: 'a7c7fflsxxus9n0',
      appSecret: 'yc9q84x3d4swx3m',
      appAuth: 'Basic YTdjN2ZmbHN4eHVzOW4wOnljOXE4NHgzZDRzd3gzbQ=='
    },
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true
  },
  video: false,
  screenshotOnRunFailure: false
});
