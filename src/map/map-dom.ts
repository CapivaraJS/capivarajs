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

    constructor(_element: HTMLElement){
        this.element = _element;
        if(this.element) this.createBind();
    }

    /**
     * @method void Percorre os elementos filhos do elemento principal criando os binds.  
     */
    createBind(){
        const recursiveBind = (element) => {
            Array.from(element.children).forEach((child: any) => {
                child[Constants.SCOPE_ATTRIBUTE_NAME] = this.element[Constants.SCOPE_ATTRIBUTE_NAME];
                this.createBindByChildAttribute(child);
                if(child.children) recursiveBind(child);
            });
        }
        recursiveBind(this.element);
    }

    /**
     * @method void Cria uma nova instancia de bind de acordo com o atributo declarado no elemento child. 
     * @param child Elemento que utiliza algum tipo de bind.
     */
    createBindByChildAttribute(child){
        if(child.hasAttribute(Constants.MODEL_ATRIBUTE_NAME))  this.createCPModel(child);
        if(child.hasAttribute(Constants.CLICK_ATRIBUTE_NAME))  this.createCPClick(child);
        if(child.hasAttribute(Constants.REPEAT_ATRIBUTE_NAME)) this.createCPRepeat(child);
    }

    /**
     * @method void Atualiza os valores dos elementos HTML de acordo com o atributo que está sendo observado.
     */
    reloadBind(){
        //Update input values
        Object.keys(this.map)
                .forEach(key => this.map[key]
                .forEach(bind => bind.applyModelInValue()));
        //Update cp repeats
        this.repeats
            .forEach((repeat) => repeat.applyLoop()); 
    }

    /**
     * @method void Retorna um mapa de atributos e elementos escutando alterações desse atributo.
     */
    getMapDom(){
        return this.map;
    }

    /**
     * @method void Adiciona um tipo de bind em um mapa, esse bind possui um elemento HTML que será atualizado quando o valor do atributo for alterado.
     * @param capivaraBind Tipo de bind que será monitorado.
     */
    addElementMap(capivaraBind){
        this.map[capivaraBind.atribute] = this.map[capivaraBind.atribute] || [];
        this.map[capivaraBind.atribute].push(capivaraBind);
    }

    /**
     * 
     * @param child Elemento que está sendo criado o bind de model
     */
    createCPModel(child){
        return new CPModel(child, this);
    }

    /**
     * 
     * @param child Elemento que está sendo criado o bind de click
     */
    createCPClick(child){
        return new CPClick(child, this);
    }

    /**
     * 
     * @param child Elemento que está sendo criado o bind de repeat.
     */
    createCPRepeat(child){
        this.repeats.push(new CPRepeat(child, this));
    }

}