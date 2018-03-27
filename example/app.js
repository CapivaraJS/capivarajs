capivara.controller(document.body, function() {
    const $ctrl = this;

    $ctrl.getClass = () => {
        return {
            'demo' : $ctrl.active
        }
    }

    $ctrl.toogle = () => {
        $ctrl.active = !$ctrl.active;
    }
    
    $ctrl.teste = () => {
        console.log($ctrl)
    }

});