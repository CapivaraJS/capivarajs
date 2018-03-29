capivara.controller(document.body, function() {
	const $ctrl = this;
	$ctrl.isActive = false;

	$ctrl.click = () => {
		$ctrl.isActive = !$ctrl.isActive;
	};

	$ctrl.$onInit = () => {
		console.log(document.body.childNodes);
	};
});