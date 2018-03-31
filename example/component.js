capivara.component('my-component', {
	template: `
	<div>
		<h1 cp-repeat="person in $ctrl.persons">[[person.name]]</h1>
	</div>
	`
});