capivara.component('my-component', {
    template: `        
        <ul>
            <li cp-repeat="pessoa in pessoas">
                [[pessoa.nome]]
            </li>
        </ul>
    `,
    controller: function(scope){

        scope.pessoas = [
            {
                nome: 'João'
            },
            {
                nome: 'Maria'
            }
        ]

    }
});