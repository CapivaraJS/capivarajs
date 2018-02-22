import _ from 'lodash';
import { Constants } from '../constants';
import { CPModel } from './directive/cp-model';
import { CPClick } from './directive/cp-click';
import { CPRepeat } from './directive/cp-repeat';

export class MapDom {

    /**
     * Elemento principal que está aplicado o escopo
     */
    private element: HTMLElement;

    /**
     * Mapa de atributos com os elementos que os observam.
     */
    private map = {};

    /**
     * Array com os ng repeat
     */
    private repeats = [];

    private regexInterpolation;

    constructor(_element: HTMLElement) {
        this.element = _element;
        this.regexInterpolation = '({{).*?(}})';
        if (this.element) this.createBind();
    }

    /**
     * @method void Percorre os elementos filhos do elemento principal criando os binds.  
     */
    createBind() {
        const recursiveBind = (element) => {
            Array.from(element.children).forEach((child: any) => {
                child[Constants.SCOPE_ATTRIBUTE_NAME] = this.element[Constants.SCOPE_ATTRIBUTE_NAME];
                this.createBindByChildAttribute(child);
                if (child.children) recursiveBind(child);
            });
        }
        recursiveBind(this.element);
    }

    /**
     * @method void Cria uma nova instancia de bind de acordo com o atributo declarado no elemento child. 
     * @param child Elemento que utiliza algum tipo de bind.
     */
    createBindByChildAttribute(child) {
        if (child.hasAttribute(Constants.MODEL_ATRIBUTE_NAME)) this.createCPModel(child);
        if (child.hasAttribute(Constants.CLICK_ATRIBUTE_NAME)) this.createCPClick(child);
        if (child.hasAttribute(Constants.REPEAT_ATRIBUTE_NAME)) this.createCPRepeat(child);
    }

    reloadChilds(element) {
        if (element.children) {
            Array.from(element.children).forEach((child: any) => {
                if (child[Constants.SCOPE_ATTRIBUTE_NAME] && child[Constants.SCOPE_ATTRIBUTE_NAME].mapDom) {
                    child[Constants.SCOPE_ATTRIBUTE_NAME].mapDom.reload();
                    this.reloadChilds(child);
                }
            });
        }
    }

    reload() {
        //Update input values
        Object.keys(this.map)
            .forEach(key => {
                this.map[key]
                    .forEach(bind => bind.applyModelInValue())
            });
        //Update cp repeats
        this.repeats.forEach((repeat) => repeat.applyLoop());

        this.processInterpolation(this.element);
    }

    /**
     * @method void Atualiza os valores dos elementos HTML de acordo com o atributo que está sendo observado.
     */
    reloadBind() {
        this.reloadChilds(this.element);
        this.reload();
    }

    /**
     * @description Executa o eval alterando as propriedades do source para seus determinados valores dentro do contexto.
     * @param source 
     * @param context 
     */
    evalInContext(source, context) {
        if (source) {
            source.split(' ').forEach(word => {
                let firstKey = (word.indexOf('.') != -1 ? word.substring(0, word.indexOf('.')) : word).replace(/ /g, '');
                if (firstKey && word && context && context.hasOwnProperty(firstKey)) {
                    let value = _.get(context, word.replace(/ /g, ''));
                    if (window['capivara'].isString(value)) {
                        source = source.replace(word, value != null ? "'" + value + "'" : null);
                    } else {
                        source = source.replace(word, value != null ? value : null);
                    }
                }
            });
        }
        return eval(source);
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
     * @description percorre os elementos até encontrar um escopo pai. 
     * @param element 
     */
    getScopeParent(element){
        if(element[Constants.SCOPE_ATTRIBUTE_NAME]){
            return element[Constants.SCOPE_ATTRIBUTE_NAME].scope;
        }
        if(element.parentNode){
            return this.getScopeParent(element.parentNode);
        }
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
                    value = this.evalInContext(content, this.getScopeParent(childNode)) || '';                    
                } catch (e) {};

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
    getMapDom() {
        return this.map;
    }

    /**
     * @method void Adiciona um tipo de bind em um mapa, esse bind possui um elemento HTML que será atualizado quando o valor do atributo for alterado.
     * @param capivaraBind Tipo de bind que será monitorado.
     */
    addElementMap(capivaraBind) {
        this.map[capivaraBind.atribute] = this.map[capivaraBind.atribute] || [];
        this.map[capivaraBind.atribute].push(capivaraBind);
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
     * @param child Elemento que está sendo criado o bind de repeat.
     */
    createCPRepeat(child) {
        this.repeats.push(new CPRepeat(child, this));
    }

}