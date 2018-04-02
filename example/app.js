capivara.controller(document.body, function(){
    const $ctrl = this;

    $ctrl.pessoa = {
        nome: 'Mateus'
    }

    $ctrl.click = function(){
        console.log($ctrl.pessoa);
    }

    capivara.componentBuilder('demo')
        .context($ctrl)
        .bindings({
            pessoa: 'pessoa'
        })
        .build();

});