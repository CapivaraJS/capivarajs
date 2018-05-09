module.exports = {
	'cpChange' : function(browser){
		browser
			.resizeWindow(1920, 1080)
			.url('http://localhost:1111/test/e2e/cpChange/template.html')
			.waitForElementVisible('input', 10000)
			.pause(1000)
			.setValue('input[cp-model="$ctrl.var"]', ' world')
			.pause(1000)
			.setValue('input[cp-model="$ctrl.var2"]', ' =)')
			.pause(1000)
			.assert.containsText('#first', '6')
			.assert.containsText('#second', '3')
			.pause(1000)
			.end();
	}
};