module.exports = {
	'cpElseIf': function (browser) {
		browser.resizeWindow(1920, 1080);
		browser
			.url('http://localhost:1111/test/e2e/cpElseIf/template.html')
			.waitForElementVisible('button', 10000)
			.pause(1000)
			.getText('button', function (result) {
				if (result.value === 'Click to Sum') {
					browser.click('button')
						.pause(1000)
						.getText('button', function (result2) {
							if (result2.value === 'Click to Sum')
								browser.click('button')
									.pause(1000)
									.getText('h1', function (result3) {
										if (result3.value === 'H1 with ELSE IF has the sum equal to 3.') {
											browser.pause(1000);
											console.log('Accepted on the test!');
										} else {
											browser.pause(1000);
											console.log('Rejected on the test!!!');
											browser.waitForElementVisible('div', 10);
										}
									});
						});
				}
			});
		browser.end();
	}
};