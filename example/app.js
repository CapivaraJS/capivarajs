capivara.controller(document.body, function () {
	const $ctrl = this;
	
	$ctrl.data = [
		'Air',
		'Stone',
		'Granite',
		'Polished Granite',
		'Diorite',
		'Andesite',
		'Grass',
		'Dirt',
		'Podzol',
		'Oak Wood Plank',
		'Spruce Wood Plank',
		'Birch Wood Plank',
		'Jungle Wood Plank'
	];

	$ctrl.numero1 = 20;
	$ctrl.numero2 = 20;

	$ctrl.attribute = true;



	$ctrl.mouseenter = function() {
		$ctrl.texto = 'Entrou';
	};

	$ctrl.mouseout = function(){
		$ctrl.texto = 'Saiu';
	};
	
	$ctrl.mudaonome = function() {
		$ctrl.nome = 'Ronaldo';
	};


});
