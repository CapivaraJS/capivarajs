export class RepeatController {
    constructor(private $scope, private $element) { }

    private $onViewInit() {
        setTimeout(() => this.$element.style.display = '', 100);
    }

}
