const HTML_REPORTER = require('protractor-beautiful-reporter');

exports.config = {
  specs: [ './src/specs/**/*.spec.ts'],
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'https://www.westwingnow.de',
  allScriptsTimeout: 60000,
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome',
    /** uncomment below code for headless execution */
    /*
    chromeOptions: {
      args: ['--headless', '--disable-gpu', '--window-size=1920,1080'] // set window-size to your system's display resolution
    }
    */
  },
  params: {
    globalTimeout: 5000
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
  },
  onPrepare: async function() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
      });
      let date = new Date();
      let dateFormat = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
      let reportTime = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
      let TEST_REPORT = './test-reports/' + `${dateFormat}_${reportTime}`;
      let DOC_TITLE = `WestWing || ${dateFormat}_${date.getHours()}:${date.getMinutes()}`;
      await Promise.all([
      jasmine.getEnv().addReporter(new HTML_REPORTER({
          baseDirectory: TEST_REPORT,
          screenshotsSubfolder: 'screenshots',
          jsonsSubfolder: 'jsons',
          takeScreenShotsOnlyForFailedSpecs: false,
          docTitle: DOC_TITLE,
          docName: 'index.html',
      }).getJasmine2Reporter()),
      console.info("The test report folder is available at \'" + TEST_REPORT + "\'"),
      browser.driver.manage().window().maximize(),
    ]);
    browser.ignoreSynchronization = true;
    return browser.get(browser.baseUrl);
  }  
};