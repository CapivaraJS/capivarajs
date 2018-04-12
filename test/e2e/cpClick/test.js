module.exports = {
	'cpClick': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpClick/template.html')
			.waitForElementVisible('button', 10000)
			.pause(1000)
			.assert.containsText('button', 'Click me')
			.click('button')
			.pause(1000)
			.assert.containsText('button', 'Clicked') 
			.pause(1000)
			.end();
	}
};