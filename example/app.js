capivara.component('my-component', {
    template: '<div></div>',
    constants: ['titulo'],
    controller: function(scope){

        scope.$onInit = function(){
            console.log(scope.$constants.titulo);
        };

    }
})


capivara.componentBuilder('meuMarcador')
        .constants({
            titulo: 'Meu incrível titulo'
        })
        .build();