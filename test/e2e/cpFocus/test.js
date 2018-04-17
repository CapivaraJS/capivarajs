module.exports = {
    'cpFocus': function(browser){
        browser
            .resizeWindow(1920, 1080)
            .url('http://localhost:1111/test/e2e/cpFocus/template.html')
            .assert.containsText('h1', 'Input not Focused')
            .pause(1000)
            .click('input')
            .assert.containsText('h1', 'Input focused')
            .pause(500)
            .end()
    }
}