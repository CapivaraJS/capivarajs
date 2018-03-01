capivara.component('my-component', {
    template: `        
        
        <h1 cp-if="$ctrl.numero == 1">if</h1>
        <h1 cp-else-if="$ctrl.numero == 2">else if 1</h1>
        <h1 cp-else-if="$ctrl.numero == 3">else if 2</h1>
        <h1 cp-else>else</h1>

        <button cp-click="$ctrl.click()">ola</button>
    `,
    controller: function (scope) {
        let $ctrl = this;
        
        $ctrl.numero = 1;

        $ctrl.click = function(){
            $ctrl.numero = $ctrl.numero + 1;
        }

    }
});