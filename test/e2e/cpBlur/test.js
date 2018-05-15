module.exports = {
	'cpBlur': function(browser){
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpBlur/template.html')
			.assert.containsText('h1', 'False')
			.pause(1000)
			.click('input')
			.click('h1')
			.pause(500)
			.assert.containsText('h1', 'True')
			.pause(500)
			.end();
	}
};