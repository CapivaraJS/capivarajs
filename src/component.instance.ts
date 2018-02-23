import { Constants } from './constants';
import WatchJS from 'melanke-watchjs';
import _ from 'lodash';
import { Common } from './common';
import { ComponentConfig } from './component.config';

export class ComponentInstance {

    config: ComponentConfig;
    element: any;
    contextObj;
    componentScope;

    constructor(_element, _config: ComponentConfig) {
        this.element = _element;
        this.config = _config;
        this.element.innerHTML = this.config.template;
        this.registerController();
        Common.getScope(this.element).scope['$bindings']  = {};
        Common.getScope(this.element).scope['$constants'] = {};
        Common.getScope(this.element).scope['$functions'] = {};
    }

    registerController(){
        window['capivara'].controller(this.element, (scope) => {
            this.componentScope = scope;
            if(this.config.controller) this.config.controller(scope);
        });
    }

    /**
     * @description Renderiza o template no elemento.
     */
    build() {
        if(this.componentScope.$onInit) this.componentScope.$onInit();
        /**
         * @description Olhamos o evento global para ser possível desparar o evento destroy nos controllers.
         */
        window['capivara'].$on('DOMNodeRemoved', () => setTimeout(() => { if(!document.body.contains(this.element)) this.destroy(); }, 0));
    }

    /**
     * @description Função executada quando o elemento é destruído do documento.
     */
    destroy(){
        if(this.componentScope.$destroy) this.componentScope.$destroy();
    }


    /**
     * @description
     * @param obj Contexto dos bindings, o contexto é o objeto que possui os valores dos bindings
     */
    context(obj) {
        this.contextObj = obj;
        return this;
    }

    /**
     * @description Cria os bindings que o componente espera.
     * @param _bindings Objeto com o nome dos bindings
     */
    bindings(_bindings = {}) {
        if(!this.contextObj){
            console.error('Bindings ainda não aplicados. Primeiro, é necessário informar o contexto.');
            return this;
        }
        this.config.bindings.forEach(key => {
            if (_bindings[key]) {                
                this.setAtributteValue(_bindings, key);            
                this.createObserverContext(_bindings, key);
                this.createObserverScope(_bindings, key);                
            }
        });
        return this;
    }

     /**
     * @description Observa o componente quando houver alteração é modificado o contexto
     */
    createObserverScope(_bindings, key) {
        WatchJS.watch(Common.getScope(this.element).scope['$bindings'], key,
        () => { 
            _.set(this.contextObj, _bindings[key], Common.getScope(this.element).scope['$bindings'][key]);
        });
    }

    /**
     * @description Observa o contexto, quando houver alteração é modificado no escopo do componente
     */
    createObserverContext(_bindings, key) {
        WatchJS.watch(this.contextObj, this.getFirstAtributte(_bindings, key),
            () => {
                this.setAtributteValue(_bindings, key);
            });
    }

    getFirstAtributte(_bindings, key) {
        return _bindings[key].indexOf('.') != -1 ? _bindings[key].substring(0, _bindings[key].indexOf('.')) : _bindings[key];
    }

    setAtributteValue(_bindings, key) {
        Common.getScope(this.element).scope['$bindings'][key] = _.get(this.contextObj, _bindings[key]);
    }

    /**
     * @description Crie valores sem referências
     * @param _constants Objeto com o nome das constants
     */
    constants(_constants) {
        this.config.constants.forEach(key => {
            if (_constants[key]) {
                Common.getScope(this.element).scope['$constants'][key] = _constants[key];
            }
        });
        return this;
    }

    functions(_functions){
        this.config.functions.forEach(key => {
            if (_functions[key]) {                
                Common.getScope(this.element).scope['$functions'][key] = _functions[key];
            }
        });
        return this;
    }

}