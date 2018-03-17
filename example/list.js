capivara.component('my-component', {
    template: `        
        
        <h1> [[ $ctrl.numberOne + $ctrl.numberTwo ]] </h1>

        <br/>

        <button class="btn btn-primary" cp-click="$ctrl.clickando()">Click me!</button>
        
    `,
    controller: function (scope) {
        let $ctrl = this;

        $ctrl.numberOne = 70;
        $ctrl.numberTwo = 80;

        $ctrl.clickando = function () {
            capivara.$emit('meuEvento', this, "123Test");
        }

        capivara.$on('meuEvento', function (anyParam) {
            console.log(anyParam)
        });
    }
});