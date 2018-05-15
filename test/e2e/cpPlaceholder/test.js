module.exports = {
	'cpPlaceholder': function(browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpPlaceholder/template.html')
			.pause(1000)
			.expect.element('input').to.have.attribute('placeholder').which.contains('Capivara');
		browser
			.click('button')
			.pause(1000)
			.expect.element('input').to.have.attribute('placeholder').which.contains('CapivaraJS');
		browser.pause(2000);    
	},
};