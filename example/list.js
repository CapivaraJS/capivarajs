capivara
    .component('my-component', {
        template: `
            <h1>Bem-vindo ao nosso super site</h1>
        `,
        constants: ['titulo'],
        controller: function(scope){

            scope.$onInit = function(){
                console.log(scope.$constants.titulo);
            }

        }
    });
