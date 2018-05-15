module.exports = {
	'cpHide': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpHide/template.html')
			.waitForElementVisible('div', 10000)
			.pause(1000)
			.expect.element('div').to.have.css('display').which.contains('');
		browser
			.setValue('input', 'red')
			.pause(1000)
			.expect.element('div').to.have.css('display').which.contains('none');
		browser
			.pause(500)
			.end();
	}
};