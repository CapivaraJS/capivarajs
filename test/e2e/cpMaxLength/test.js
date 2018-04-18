module.exports = {
	'cpMaxLength': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpMaxLength/template.html')
			.waitForElementVisible('input', 10000)
			.pause(1000)
			.assert.containsText('p', 'Capivara')
			.setValue('input', ' JS')
			.pause(1500)
			.assert.containsText('p', 'Capivara J')
			.end();	
	}
};
