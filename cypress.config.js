const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      DropBoxToken: 'irLf86TRJK8AAAAAAAAAAYUnhi_wCxqdctVwZ_1EWZNMKyfiU9ARf1Z1tBkL4H6-',
      authTokenUrl: 'https://api.dropbox.com/oauth2/token',
      secret: 'super555SecretPass=-msd,',
      authEndpoint: 'https://api.dropboxapi.com/2',
      filesEndpoint: 'https://content.dropboxapi.com/2',
      appKey: 'a7c7fflsxxus9n0',
      appSecret: 'yc9q84x3d4swx3m',
      appAuth: 'Basic YTdjN2ZmbHN4eHVzOW4wOnljOXE4NHgzZDRzd3gzbQ=='
    },
    setupNodeEvents(on, config) {
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
