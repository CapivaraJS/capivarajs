module.exports = {
    "cpStyle": function (browser) {
        browser.resizeWindow(1920, 1080);
        browser
            .url('http://localhost:1111/test/e2e/cpStyle/template.html')
            .pause(1000)
            .waitForElementVisible('h1', 10000);
        browser.assert.cssProperty('h1', 'color', 'rgba(0, 128, 0, 1)');
        browser
            .pause(1000)
            .click('button[id="btn1"]')
            .pause(1000);
        browser.assert.cssProperty('h1', 'color', 'rgba(255, 0, 0, 1)');
        // console.log('Passou teste 1!');
        browser
        .pause(1000)
        .getCssProperty("p#p1", "background", function(result) {
            if(result.value.substring(0,result.value.indexOf(')')+1) == 'rgb(0, 0, 255)'){
                browser
                .pause(1000)
                .click('button[id="btn2"]')
                .pause(1000)
                .getCssProperty("p#p1", "background", function(result) {
                    if(result.value.substring(0,result.value.indexOf(')')+1) == 'rgb(128, 128, 128)'){
                        console.log('Passou no teste')
                        browser
                        .pause(1000)
                        .end()
                    }else{
                        console.log('Falhou no Teste')
                        .waitForElementVisible('div', 10)
                    }
                })
            }
        })
    }
            



        // browser.assert.cssProperty('p[id="p1"]', 'background', 'rgb(0, 0, 255)');
        // browser
        //     .pause(1000)
        //     .click('button[id="btn2]')
        //     .pause(1000);
        // browser.assert.cssProperty('p[id="p1"]', "background", "gray");
        // // console.log('Passou teste 2!');
        // browser
        //     .pause(3000)
        //     .end();
    
};