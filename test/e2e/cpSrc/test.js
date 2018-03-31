module.exports = {
	'cpSrc': function (browser) {
		browser.resizeWindow(1920, 1080);
		browser
			.url('http://localhost:1111/test/e2e/cpSrc/template.html')
			.waitForElementVisible('img', 3000)
			.pause(1000)
			.source(function (result){
				if(result.value === 'https://avatars1.githubusercontent.com/u/33517395?s=200&v=4') {
					browser.click('button')
						.pause(1000);
					browser
						.pause(1000)
						.source(function () {
							if(result.value === 'https://bit.ly/2pTjZnU') {
								browser.pause(1000);
								console.log('Passou no teste');
							} else {
								browser.pause(1000);
								console.log('Falhou!!!');
								browser.waitForElementVisible('div', 10);
							}
						});
				}
			});
		browser.end();
	}
};