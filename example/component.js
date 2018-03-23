capivara.component('my-component', {
    template: `
        <h1 cp-click="$ctrl.hi()"> 
            [[ $ctrl.$constants.nome ]]
        </h1>
    `,
    constants: ['nome'],
    controller: function(scope){
        const $ctrl = this;

        $ctrl.$onInit = function(){
        }

        $ctrl.hi = function(){
            console.log("Hi");
        }

    }
});