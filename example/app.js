capivara.controller(document.body, function() {
    const $ctrl = this;

    $ctrl.$onInit = () => {
        // capivara.componentBuilder('meuMarcador').build();
        $ctrl.componentName = 'Mateus Miranda';
        $ctrl.teste2 = 'de Almeida';
    }

    $ctrl.toogleMessage = () => {
        $ctrl.visibleMessage = !$ctrl.visibleMessage;
    }

});