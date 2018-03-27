capivara.controller(document.body, function() {
    const $ctrl = this;

    $ctrl.$onInit = () => {
        $ctrl.numberOne = 90;
        $ctrl.numberTwo = 10;
        // capivara.componentBuilder('meuMarcador').build();
    }

    $ctrl.clicar = (pessoa, pessoa2) => {
        $ctrl.nome = 'Felipe sabadini';
    }

});