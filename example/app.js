capivara.controller(document.body, function() {
	const $ctrl = this;
	$ctrl.isActive = false;
	$ctrl.src = 'https://avatars1.githubusercontent.com/u/33517395?s=200&v=4';

	$ctrl.click = () => {
		$ctrl.src = 'https://picsum.photos/200/300/?random&d='+new Date().getTime();
	};

	$ctrl.items = [
		"Mateus",
		"Felipe"
	];

	$ctrl.$onInit = function(){
		capivara.componentBuilder('demo').build();
	}

});