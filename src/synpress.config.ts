import { defineConfig } from 'cypress'

export default defineConfig({
  userAgent: "fa-automation",
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: "http://localhost:3000",
    screenshotsFolder: 'report/e2e/screenshots',
    videosFolder: 'report/e2e/videos',
    specPattern: 'src/e2e/specs',
    supportFile: 'src/e2e/support.ts',
    setupNodeEvents(on, config) {
      require('@synthetixio/synpress/plugins')(on, config);
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Faraway Automation Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      reportDir: "report/e2e/mocha-awesome"
    },
    defaultCommandTimeout: 40000
  },
})
