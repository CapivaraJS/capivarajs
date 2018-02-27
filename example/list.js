capivara.component('gumga-input', {
    template: `        
        Ola mundo
    `,
    controller: function (scope) {

    }
});


capivara.component('my-component', {
    template: `        
        <div cp-repeat="pessoa in pessoas">
            <gumga-input ></gumga-input>
        </div>
    `,
    controller: function (scope) {
        scope.pessoas = [
            {
                nome: 'Mateus'
            },
            {
                nome: 'João'
            }
        ];

        scope.create = function(){
            capivara.componentBuilder('myInput').build();
        }


    }
});