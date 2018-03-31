capivara.controller(document.body, function() {
	const $ctrl = this;
	$ctrl.isActive = false;
	$ctrl.src = 'https://avatars1.githubusercontent.com/u/33517395?s=200&v=4';

	$ctrl.click = () => {
		$ctrl.src = 'https://bit.ly/2pTjZnU';
	};
});