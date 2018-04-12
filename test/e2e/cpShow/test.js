module.exports = {
	'cpShow': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpShow/template.html')
			.waitForElementVisible('button', 10000)
			.pause(1000)
			.expect.element('h1').to.have.css('display').which.contains('none');
		browser
			.click('button')
			.pause(1000)
			.expect.element('h1').to.have.css('display').which.contains('');
		browser.end();
	}
};