module.exports = {
	'cpMouse': function(browser){
		browser
			.resizeWindow(1920, 1020)
			.url('http://localhost:1111/test/e2e/cpMouse/template.html')
			.waitForElementVisible('input', 5000)
			.moveToElement('input', 10, 10)
			.assert.containsText('h1', 'mousein')
			.pause(1000)
			.moveToElement('body', 100, 100)
			.assert.containsText('h1', 'mouseout')
			.pause(1000)
			.end();
	}
};