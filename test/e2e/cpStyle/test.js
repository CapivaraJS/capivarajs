module.exports = {
    "cpStyle": function (browser) {
        browser.resizeWindow(1920, 1080);
        browser
            .url('http://localhost:1111/test/e2e/cpStyle/template.html')
            .waitForElementVisible('h1', 10000);
        browser.assert.cssProperty('h1', 'background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box');
        browser
            .pause(1000)
            .click('button[id="btn1"]')
            .pause(1000);
        browser.assert.cssProperty('p[id="p1"]', 'background', 'rgb(0, 0, 255) none repeat scroll 0% 0% / auto padding-box border-box');
        console.log('Passou teste 1!');
        browser.pause(1000);
        browser.assert.cssProperty('p[id="p1"]', 'background', 'rgb(0, 0, 255) none repeat scroll 0% 0% / auto padding-box border-box');
        browser
            .pause(1000)
            .click('button[id="btn2"]')
            .pause(1000);
        browser.assert.cssProperty('p[id="p1"]', 'background', 'rgb(128, 128, 128) none repeat scroll 0% 0% / auto padding-box border-box');
        console.log('Passou teste 2!');
        browser
            .pause(3000)
            .end();
    }
};