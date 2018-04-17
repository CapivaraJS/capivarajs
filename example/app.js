capivara.controller(document.body, function () {
	const $ctrl = this;
	

	$ctrl.teste = function() {
		$ctrl.opened = true;
		console.log('FOCOU!');
	};

	$ctrl.destroi = function() {
		$ctrl.opened = false;
	};

});