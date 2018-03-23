module.exports = {  
    "cpClass": function(browser){
        browser.resizeWindow(1920, 1080);
        browser
            .url('http://localhost:1111/test/e2e/cpClass/template.html')
            .waitForElementVisible('p', 10000)
            .pause(1000)
            .click('button')
            .pause(1500)
            .isVisible('p.democlass', function(result){
                console.log('Passou no teste!')
                browser
                .pause(1000)
                .end()
            })
            
    }  
}