capivara.component('my-component', {
    template: `        
        <h1>Olá sr(a) [[ $ctrl.nome ]]</h1>
    `,
    controller: function () {
        let $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.numberOne = 50;
            $ctrl.numberTwo = 80;
            $ctrl.blue = "blue";
            $ctrl.nome = "CapivaraJS";
        };

    }
});