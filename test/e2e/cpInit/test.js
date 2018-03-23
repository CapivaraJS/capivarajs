module.exports = {  
    "cpInit": function(browser){
        browser.resizeWindow(1920, 1080);
        browser
            .url('http://localhost:1111/test/e2e/cpInit/template.html')
            .waitForElementVisible('h1', 10000)
            .pause(1000)
            .getText('h1', function(result){
                if(result.value == 'CpInit Test'){
                    browser.pause(4000)
                    .getText('h1', function(result){
                        if(result.value == 'CpInit complete'){
                            console.log('Passou no teste')
                            browser.pause(1000)
                        }else{
                            console.log('Falhou!!!')
                            browser.pause(1000)
                            browser.waitForElementVisible('div',10)
                            
                        }
                    })
                }
            })
            browser.end()
    }  
}