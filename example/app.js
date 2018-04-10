capivara.controller(document.body, function(){
	const $ctrl = this;

	$ctrl.pessoa = {
		nome: 'Mateus'
	};

	$ctrl.onEnter = function(evt){
		console.log('Apertou a tecla ENTER', evt);
	};

	$ctrl.onCtrl = function(evt){
		console.log('Apertou a tecla onCtrl', evt);
	};

});