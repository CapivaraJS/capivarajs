const timer = 2500
const wait = 1000

module.exports = {
  after: browser => {
    console.log('Closing down...')
    browser.end()
  },

  'should be able to init a session': browser => {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', timer);
  },

  'should be able to see body': browser => {
    browser.assert.elementPresent('body');
  },

  'should be equal to https://www.google.fr/': browser => {
    browser.assert.urlEquals('https://www.google.fr/');
  },
}
