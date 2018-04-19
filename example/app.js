capivara.controller(document.body, function () {
	const $ctrl = this;

	$ctrl.text = 'click me';

	$ctrl.doubleClick = () => {
	    $ctrl.text = 'double click me';
	};

});
