capivara.controller(document.body, function() {
    const $ctrl = this;

    $ctrl.$onInit = () => {
        $ctrl.nome = 'Mateus Miranda';
        capivara.componentBuilder('meuMarcador').build();
    }

    $ctrl.clicar = () => {
        $ctrl.nome = 'Felipe sabadini';
    }

});