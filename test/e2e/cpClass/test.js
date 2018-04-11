module.exports = {
	'cpClass': function (browser) {
		browser.resizeWindow(1920, 1080);
		browser
			.url('http://localhost:1111/test/e2e/cpClass/template.html')
			.waitForElementVisible('body', 10000)
			.waitForElementVisible('p#p1', 10000)
			.pause(1000)
			.click('button#btn1')
			.pause(1500)
			.isVisible('p#p1.democlass', function () {
				console.log('Accepted on the p1 test!');
			})
			.waitForElementVisible('p#p2', 10000)
			.pause(1000)
			.click('button#btn2')
			.pause(1500)
			.isVisible('p#p2.democlass2', function () {
				console.log('Accepted on the p2 test!');
				browser
					.pause(1000)
					.end();
			});
	}
};