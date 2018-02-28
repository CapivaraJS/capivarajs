export interface ComponentConfig {
    template: string;
    controller: any,
    bindings: Array<string>,
    functions: Array<any>,
    constants: Array<string>
}