module.exports = {
	'cpElseIf': function (browser) {
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpElseIf/template.html')
			.waitForElementVisible('button', 10000)
			.pause(1000)
			.assert.containsText('h1','H1 with ELSE has the sum equal to 1.')
			.click('button')
			.pause(1000)
			.assert.containsText('h1', 'H1 with IF has the sum equal to 2.')
			.click('button')
			.pause(1000)
			.assert.containsText('h1', 'H1 with ELSE IF has the sum equal to 3.')
			.pause(1000)
			.end();
	}
};