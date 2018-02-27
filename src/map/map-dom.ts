import _ from 'lodash';
import { Constants } from '../constants';
import { CPModel } from './directive/cp-model';
import { CPClick } from './directive/cp-click';
import { CPRepeat } from './directive/cp-repeat';
import { CPShow } from './directive/cp-show';
import { CPIf } from "./directive/cp-if";
import { Common } from '../common';

export class MapDom {

    /**
     * Elemento principal que está aplicado o escopo
     */
    private element: HTMLElement;

    /**
     * Mapa de atributos com os elementos que os observam.
     */
    private cpModels = {};

    /**
     * Array com os ng repeat
     */
    private repeats = [];

    private cpShows = [];

    private cpIfs = [];

    private regexInterpolation;

    constructor(_element: HTMLElement) {
        this.element = _element;
        this.regexInterpolation = '({{).*?(}})';
        if (this.element) this.addScope();
    }

    /** 
     * @method void Percorre os elementos filhos do elemento principal criando os binds.  
     */
    addScope() {
        const recursiveBind = (element) => {
            Array.from(element.children).forEach((child: any) => {
                child[Constants.SCOPE_ATTRIBUTE_NAME] = Common.getScope(this.element);
                this.createDirectives(child);
                if (child.children) recursiveBind(child);
            });
        };
        recursiveBind(this.element);
    }

    /** 
     * @method void Cria uma nova instancia de bind de acordo com o atributo declarado no elemento child. 
     * @param child Elemento que utiliza algum tipo de bind.
     */
    createDirectives(child) {
        if (child.hasAttribute(Constants.MODEL_ATTRIBUTE_NAME))  this.createCPModel(child);
        if (child.hasAttribute(Constants.CLICK_ATTRIBUTE_NAME))  this.createCPClick(child);
        if (child.hasAttribute(Constants.REPEAT_ATTRIBUTE_NAME)) this.createCPRepeat(child);
        if (child.hasAttribute(Constants.SHOW_ATTRIBUTE_NAME))   this.createCPShow(child);
        if (child.hasAttribute(Constants.IF_ATTRIBUTE_NAME))     this.createCPIf(child);
    }

    reloadElementChildes(element) {
        if (element.children) {
            Array.from(element.children).forEach((child: any) => {
                let childScope = Common.getScope(child);
                if (childScope && childScope.mapDom) {
                    childScope.mapDom.reloadDirectives();
                    this.reloadElementChildes(child);
                }
            });
        }
    }

    reloadDirectives() {
        //Update input values
        Object.keys(this.cpModels)
            .forEach(key => {
                this.cpModels[key]
                    .forEach(bind => bind.applyModelInValue())
            });
        //Update cp repeats
        this.repeats.forEach((repeat) => repeat.applyLoop());
        
        //Update cp show
        this.cpShows.forEach((cpShow) => cpShow.init());

        //Update cp if
        this.cpIfs.forEach((cpIf) => cpIf.init());

        this.processInterpolation(this.element);
    }

    /** 
     * @method void Atualiza os valores dos elementos HTML de acordo com o atributo que está sendo observado.
     */
    reload() {
        this.reloadElementChildes(this.element);
        this.reloadDirectives();
    }

    /**
     * @description Percorre os elementos para processar os interpolations.
     * @param element 
     */
    processInterpolation(element) {
        Array.from(element.childNodes).forEach((childNode: any) => {
            this.interpolation(childNode);
        });
    }

    /**
     * @description Função que modifica o texto da interpolação pelo determinado valor.
     * @param childNode 
     */
    interpolation(childNode) {
        if (childNode.nodeName == '#text') {
            childNode.originalValue = childNode.originalValue || childNode.nodeValue;
            let nodeModified = childNode.originalValue;

            let str = window['capivara'].replaceAll(childNode.originalValue, Constants.START_INTERPOLATION, '{{');
                str = window['capivara'].replaceAll(str, Constants.END_INTERPOLATION, '}}');
            
            (str.match(this.regexInterpolation) || []).forEach(key => {
                let content = key.replace('{{', '').replace('}}', ''), value = '';
                try {
                    value = Common.evalInContext(content, Common.getScopeParent(childNode)) || '';                    
                } catch (e) {}

                key = window['capivara'].replaceAll(key, '{{', Constants.START_INTERPOLATION);
                key = window['capivara'].replaceAll(key, '}}', Constants.END_INTERPOLATION);

                nodeModified = nodeModified.replace(key, value);
                childNode.nodeValue = nodeModified;

            });

            childNode.nodeValue = childNode.nodeValue.replace(this.regexInterpolation, '');

        }
        if (childNode.childNodes) {
            this.processInterpolation(childNode);
        }
    }

    /**
     * @method void Retorna um mapa de atributos e elementos escutando alterações desse atributo.
     */
    getCpModels() {
        return this.cpModels;
    }

    /**
     * @method void Adiciona um tipo de bind em um mapa, esse bind possui um elemento HTML que será atualizado quando o valor do atributo for alterado.
     * @param capivaraBind Tipo de bind que será monitorado.
     */
    addCpModels(capivaraBind) {
        this.cpModels[capivaraBind.atribute] = this.cpModels[capivaraBind.atribute] || [];
        this.cpModels[capivaraBind.atribute].push(capivaraBind);
    }

    /**
     * 
     * @param child Elemento que está sendo criado o bind de model
     */
    createCPModel(child) {
        return new CPModel(child, this);
    }

    /**
     * 
     * @param child Elemento que está sendo criado o bind de click
     */
    createCPClick(child) {
        return new CPClick(child, this);
    }

    /**
     * 
     * @param child Elemento que está sendo criado o bind de show
     */
    createCPShow(child) {
        this.cpShows.push(new CPShow(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind de if
     */
    createCPIf(child) {
        this.cpIfs.push(new CPIf(child, this));
    }

    /**
     * 
     * @param child Elemento que está sendo criado o bind de repeat.
     */
    createCPRepeat(child) {
        this.repeats.push(new CPRepeat(child, this));
    }

}