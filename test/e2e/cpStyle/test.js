module.exports {
    "cpModel" : function(browser){
        browser.resizeWindow(1920, 1080);
        browser
            .url('http://localhost:1111/test/e2e/cpModel/template.html')
            .waitForElementVisible('h1', 10000)
            browser.assert.cssProperty('h1','background','green')
            browser
            .pause(1000)
            .click('button[id="btn1]')
            .pause(1000)
            browser.assert.cssProperty('p[id="p1"]','background','red')
            console.log('Passou teste 1!')
            .pause(1500)
            browser.assert.cssProperty('p[id="p1"]','background','blue')
            browser
            .pause(1000)
            .click('button[id="btn2]')
            .pause(1000)
            browser.assert.cssProperty('p[id="p1"]',"background","gray")
            console.log('Passou teste 2!')
            .pause(3000)
            .end()

    }
}