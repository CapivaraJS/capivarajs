module.exports = {
	'cp-Double-Click': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpDbClick/template.html')
			.waitForElementVisible('button', 10000)
			.pause(1000)
			.assert.containsText('button', 'Click me')
			.click('button')
			.pause(1000)
			.assert.containsText('button', 'Click me')
			.pause(1000)
			.moveToElement('button', 1, 1)
			.doubleClick()
			.pause(1000)
			.assert.containsText('button', 'Clicked')
			.end();
	}
};