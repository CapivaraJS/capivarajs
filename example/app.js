capivara.controller(document.body, function () {
	const $ctrl = this;

	$ctrl.pessoa = {
		nome: 'Mateus'
	};

	$ctrl.onEnter = function(evt){
		evt.stopPropagation();
		console.log('Apertou a tecla ENTER', evt);
	};

	$ctrl.onKey = function(evt){
		console.log(evt);
	}

});