capivara.controller(document.body, function () {
	const $ctrl = this;

	$ctrl.nome = 'Dougrinhas';
	
	$ctrl.mudaonome = function() {
		$ctrl.nome = 'Ronaldo';
	};

});
