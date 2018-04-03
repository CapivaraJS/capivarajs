capivara.controller(document.body, function(){
    const $ctrl = this;

    $ctrl.$onInit = () => {
        $ctrl.pessoas = [
            {
                nome: 'Mateus'
            },
            {
                nome: 'Felipe'
            }
        ]
    };

})