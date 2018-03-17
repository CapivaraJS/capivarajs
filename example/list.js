
capivara.component('my-component', {
    template: `        
        
        <li cp-repeat="pessoa in $ctrl.pessoas" cp-class="{'democlass': pessoa.id == 2}">
            <span>[[pessoa.nome]]</span>
        </li>
    `,
    controller: function (scope) {
        let $ctrl = this;
        
        $ctrl.$onInit = function(){
            $ctrl.pessoas = [
                {
                    nome: 'Mateus',
                    id: 1
                },
                {
                    nome: 'Caio',
                    id: 2
                },
                {
                    nome: 'João',
                    id: 3
                },
                {
                    nome: 'Douglas',
                    id: 4
                },
                {
                    nome: 'Felipe',
                    id: 5
                }
            ];        
        }

    }
});