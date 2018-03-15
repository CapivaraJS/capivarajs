
capivara.component('my-component', {
    template: `        
        
        <h1 cp-style="color: red"> [[ $ctrl.numberOne + $ctrl.numberTwo ]] </h1>
        <br/>
        <h1 cp-if="true"> [[ $ctrl.numberOne + ((10 * $ctrl.numberTwo) / 25) ]] </h1>
        
    `,
    controller: function (scope) {
        let $ctrl = this;
        
        $ctrl.numberOne = 70;
        $ctrl.numberTwo = 80;
        $ctrl.red = "red";

    }
});