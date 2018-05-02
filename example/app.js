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

	$ctrl.nome = 'Dougrinhas';
	
	$ctrl.mudaonome = function() {
		$ctrl.nome = 'Ronaldo';
	};


});
