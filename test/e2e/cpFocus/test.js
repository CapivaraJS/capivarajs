module.exports = {
    'cpFocus': function(browser){
        browser
            .resizeWindow(1920, 1080)
            .url('http://localhost:1111/test/e2e/cpElseIf/template.html')
    }
}