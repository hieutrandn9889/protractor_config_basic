var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['nonAngular_C2.js'],
  onPrepare: function () {
    // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'reports/screenshots'
    }).getJasmine2Reporter());
    // website k phai angular C1
    browser.ignoreSynchronization = true
  },
   // Using headless Chrome
   capabilities: {
    browserName: 'chrome',
  
    chromeOptions: {
       args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
     }
  },
  // Using headless Firefox
  capabilities: {
    browserName: 'firefox',
    
    'moz:firefoxOptions': {
       args: [ "--headless" ]
     }
  }
};