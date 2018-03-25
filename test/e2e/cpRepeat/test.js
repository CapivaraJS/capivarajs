module.exports = {
	'cpRepeat': function (browser) {
		browser.resizeWindow(1920, 1080);
		browser
			.url('http://localhost:1111/test/e2e/cpRepeat/template.html')
			.waitForElementVisible('button', 10000)
			.pause(1000)
			.getText('button', function (result) {
				if (result.value === 'Add Anna') {
					browser.click('button')
						.pause(1000);
					browser.getText('li:nth-child(3) p', function(result) {
						if( result.value === 'Anna'){
							console.log('Passou no teste');
							browser
								.pause(1000)
								.end();
						} else {
							console.log('Falhou no Teste')
								.waitForElementVisible('div', 10);
						}
					});
				}
			});
		browser.end();
	}
};