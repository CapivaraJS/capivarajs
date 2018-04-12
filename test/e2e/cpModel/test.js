module.exports = {
	'cpModel': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpModel/template.html')
			.waitForElementVisible('p', 10000)
			.pause(1000)
			.assert.containsText('p', 'Capivara') 
			.setValue('input', ' JS')
			.pause(1500)
			.assert.containsText('p', 'Capivara JS')
			.end();	
	}
};
