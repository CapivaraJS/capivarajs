
capivara.component('my-component', {
    template: `        
        
        <h1 cp-class="{ democlass: $ctrl.isPlayer, democlass2: !$ctrl.isPlayer }">Teste</h1>

        <button cp-click="$ctrl.teste()">Teste</button>

    `,
    controller: function (scope) {
        let $ctrl = this;
        
        $ctrl.$onInit = function(){
            $ctrl.isPlayer = true; 
        }

        $ctrl.teste = function(){
            $ctrl.isPlayer = !$ctrl.isPlayer;
        }

    }
});