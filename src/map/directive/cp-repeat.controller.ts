export class RepeatController {
    constructor(private $scope, private $element) { }

    private $onViewInit() {
        setTimeout(() => {
            if (this.$element && this.$element.style) { this.$element.style.display = ''; }
        }, 100);
    }

}
