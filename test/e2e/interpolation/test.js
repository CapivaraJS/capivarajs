module.exports = {
    'interpolation': function (browser) {
        browser
            .resizeWindow(1920, 1080)
            .url('http://localhost:1111/test/e2e/interpolation/template.html')
            .pause(1000)
            .waitForElementVisible('h1', 10000)
            .pause(1000)
            .click('button')
            .pause(1000)
            .assert.containsText('h1', 'felipe2')
            .assert.containsText('h2', 'felipe')
            .end();
    }
};