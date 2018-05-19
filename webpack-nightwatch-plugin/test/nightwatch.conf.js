var selenium = require('selenium-server-standalone-jar');
var chromedriver = require('chromedriver');

module.exports = {
  src_folders: ['ui'],
  output_folder: 'reports',
  selenium: {
    start_process: true,
    server_path: selenium.path,
    log_path: 'reports',
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path,
      'webdriver.ie.driver': ''
    }
  },
  test_settings: {
    default: {
      launch_url: 'https://google.fr/',
      selenium_port: 4444,
      selenium_host: 'localhost',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      },
    }
  },
  "chrome" : {
    "desiredCapabilities" : {
      "browserName" : "chrome",
      "chromeOptions" : {
        "args" : [
          "use-fake-device-for-media-stream",
          "use-fake-ui-for-media-stream"
        ]
      }
    }
  }
};
