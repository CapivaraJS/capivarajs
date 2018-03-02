capivara.component('my-component', {
    template: `        
        
        <h1> [[ $ctrl.numberOne + $ctrl.numberTwo ]] </h1>

        <br/>

        <h1> [[ $ctrl.numberOne + ((10 * $ctrl.numberTwo) / 25) ]] </h1>
        
    `,
    controller: function (scope) {
        let $ctrl = this;
        
        $ctrl.numberOne = 70;
        $ctrl.numberTwo = 80;

    }
});