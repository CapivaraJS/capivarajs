module.exports = {
	'cpKey': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpKey/template.html')
			.waitForElementVisible('input', 10000)
			.pause(1000)
			.setValue('input', ' Capivara')
			.pause(1000)
			.sendKeys('button', browser.Keys.ENTER)
			.assert.containsText('p', 'Mateus Capivara')
			.end();
	}
};
