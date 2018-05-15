module.exports = {
	'cpSrc': function (browser) {
		browser.resizeWindow(1920, 1080);
		browser
			.url('http://localhost:1111/test/e2e/cpSrc/template.html')
			.pause(1500)
			.waitForElementVisible('img[src="https://avatars1.githubusercontent.com/u/33517395?s=200&v=4"]', 3000)
			.pause(1000)
			.click('button[cp-click="$ctrl.click()"]')
			.pause(5000)
			.waitForElementVisible('img[src="https://bit.ly/2pTjZnU"]', 20000)
			.pause(3000)
			.end();
	}
};