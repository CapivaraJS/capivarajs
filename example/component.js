capivara.component('my-component', {
    template: `
        <h1 > 
            [[ $ctrl.$constants.nome ]]
        </h1>
    `,
    constants: ['nome'],
    controller: function(scope){
        const $ctrl = this;

        $ctrl.$onInit = function(){
        }

    }
});