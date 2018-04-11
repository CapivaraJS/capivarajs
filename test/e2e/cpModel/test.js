module.exports = {
	'cpModel': function (browser) {
		browser.resizeWindow(1920, 1080);
		browser
			.url('http://localhost:1111/test/e2e/cpModel/template.html')
			.waitForElementVisible('p', 10000)
			.pause(1000)
			.getText('p', function (results) {
				if (results.value === 'Mateus') {
					browser
						.setValue('input', ' Ronaldo')
						.pause(1500)
						.getText('p', function (results) {
							if (results.value === 'Mateus Ronaldo') {
								console.log('Accepted on the test');
								browser
									.pause(1000);
							} else {
								console.log('Rejected on the test');
								browser.
									waitForElementVisible('div', 10);
							}
						});
				}
			});
		browser.end();
	}
};
