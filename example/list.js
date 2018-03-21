
capivara.component('my-component', {
    template: `        
        
        <h1 cp-class="$ctrl.getClasses($ctrl.isPlayer)">Teste</h1>

        <h1 cp-style="$ctrl.getStyle()">Teste</h1>

        <button cp-click="$ctrl.teste()">Teste</button>

    `,
    controller: function (scope) {
        let $ctrl = this;
        
        $ctrl.$onInit = function(){
            $ctrl.isPlayer = false; 
        }

        $ctrl.teste = function(){
            $ctrl.isPlayer = !$ctrl.isPlayer;
        }

        $ctrl.getClasses = (value) => {
            return {
                'democlass' : value
            }
        }

        $ctrl.getStyle = () => {
            return {
                'background' : 'red'
            }
        }

    }
});