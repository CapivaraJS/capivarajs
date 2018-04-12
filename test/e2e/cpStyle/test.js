module.exports = {
	'cpStyle': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpStyle/template.html')
			.pause(1000)
			.waitForElementVisible('h1', 10000)
			.assert.cssProperty('h1', 'color', 'rgba(0, 128, 0, 1)')
			.pause(1000)
			.click('button[id="btn1"]')
			.pause(1000)
			.assert.cssProperty('h1', 'color', 'rgba(255, 0, 0, 1)')
			.pause(1000)
			.expect.element('p#p1').to.have.css('background').which.contains('rgb(0, 0, 255)');
		browser
			.pause(1000)
			.click('button[id="btn2"]')
			.pause(1000)
			.expect.element('p#p1').to.have.css('background').which.contains('rgb(128, 128, 128)');
		browser
			.pause(1000)
			.click('button[id="btn3"]')
			.pause(1000)
			.expect.element('p#p3').to.have.css('background').which.contains('rgb(0, 128, 0)');
		browser
			.pause(1000)
			.end();
	}
};