
capivara.component('my-component', {
    template: `        
        <h1 cp-class="$ctrl.getClasses()">Teste</h1>

        <button cp-click="$ctrl.btnClick()">Teste</button>
    `,
    constants: ['h1Class'],
    controller: function (scope) {
        let $ctrl = this;
        
        $ctrl.btnClick = function(){
            $ctrl.isPlayer = !$ctrl.isPlayer;
        }

        $ctrl.getClasses = () => {
            return {
                [scope.$constants.h1Class] : $ctrl.isPlayer
            };
        }

    }
});