capivara.controller(document.body, function () {
	const $ctrl = this;

	$ctrl.persons = [
		{ name: 'John' },
		{ name: 'Bob' },
		{ name: 'Anna' },
		{ name: 'Kyle' },
	];
	
	$ctrl.add = function() {
		$ctrl.persons.push({name: 'Carlos'});
		setTimeout(function(){
			console.log(document.getElementById('parentDiv').childElementCount);
		});
	};

});
