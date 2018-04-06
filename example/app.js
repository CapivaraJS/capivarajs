capivara.controller(document.body, function(){
	const $ctrl = this;

	$ctrl.pessoa = {
		nome: 'Mateus'
	};

	$ctrl.click = function(){
		console.log($ctrl.pessoa);
	};

	$ctrl.n1 = 30;
	$ctrl.n2 = 10;


	capivara.componentBuilder('demo')
		.context($ctrl)
		.bindings({
			pessoa: 'pessoa'
		})
		.build();

});