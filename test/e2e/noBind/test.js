module.exports = {
    'noBind': function (browser) {
        browser
            .resizeWindow(1920, 1080)
            .url('http://localhost:1111/test/e2e/noBind/template.html')
            .pause(1000)
            .waitForElementVisible('div', 10000)
            .pause(1000)
            .assert.containsText('div h2', '[[2+2]]')
            .assert.containsText('h1', '4')
            .end();
    }
};