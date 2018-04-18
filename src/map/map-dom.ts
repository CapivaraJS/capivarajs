import * as _ from 'lodash';
import { Common } from '../common';
import { Constants } from '../constants';
import { CPBlur } from './directive/cp-blur';
import { CPClass } from './directive/cp-class';
import { CPClick } from './directive/cp-click';
import { CPDisabled } from './directive/cp-disabled';
import { CPElse } from './directive/cp-else';
import { CPElseIf } from './directive/cp-else-if';
import { CPFocus } from './directive/cp-focus';
import { CPHide } from './directive/cp-hide';
import { CPIf } from './directive/cp-if';
import { CPInit } from './directive/cp-init';
import { CPKey } from './directive/cp-key';
import { CPMax } from './directive/cp-max';
import { CPMin } from './directive/cp-min';
import { CPModel } from './directive/cp-model';
import { CPRepeat } from './directive/cp-repeat';
import { CPShow } from './directive/cp-show';
import { CPSrc } from './directive/cp-src';
import { CPStep } from './directive/cp-step';
import { CPStyle } from './directive/cp-style';

export class MapDom {

    /**
     * Elemento principal que está aplicado o escopo
     */
    private readonly element: HTMLElement;

    private directives = {
        /**
         * Mapa de atributos com os elementos que os observam.
         */
        cpModelsElements: {},
        /**
         * Array com os ng repeat
         */
        cpModels: [],
        repeats: [],
        cpShows: [],
        cpIfs: [],
        cpElses: [],
        cpElseIfs: [],
        cpStyles: [],
        cpClasses: [],
        cpClicks: [],
        cpInits: [],
        cpSrcs: [],
        cpKeys: [],
        cpMins: [],
        cpMaxs: [],
        cpSteps: [],
        cpDisables: [],
        cpFocus: [],
        cpHide: [],
        cpBlur: [],
    };

    private readonly regexInterpolation;

    /**
     * @description variavel boleana que define se o HTML está renderizado na página.
     */
    private renderedView: boolean;

    constructor(_element: HTMLElement) {
        this.element = _element;
        this.regexInterpolation = new RegExp(/({{).*?(}})/g);
        this.setRenderedView(false);
        if (this.element) { this.$addScope(); }
    }

    /**
     * @method void Percorre os elementos filhos do elemento principal criando os binds.
     */
    public $addScope() {
        this.createDirectives(this.element);
        const recursiveBind = (element) => {
            Array.from(element.children).forEach((child: any) => {
                child[Constants.SCOPE_ATTRIBUTE_NAME] = Common.getScope(this.element);
                this.createDirectives(child);
                if (child.children) { recursiveBind(child); }
            });
        };
        recursiveBind(this.element);
        this.$directivesInit();
    }

    private setRenderedView(value: boolean) {
        this.renderedView = value;
    }

    public $directivesInit() {
        Common.getScope(this.element).$on('$onInit', () => {
            Object.keys(this.directives).forEach((key) => {
                const directives = this.directives[key];
                if (Array.isArray(directives)) {
                    directives.forEach((directive) => {
                        directive.create();
                    });
                }
            });
            this.$viewInit();
        });
    }

    private $viewInit() {
        this.setRenderedView(true);
        if (this.element['$instance']) {
            const ctrl = Common.getScope(this.element).scope[this.element['$instance'].config.controllerAs];
            if (ctrl && ctrl['$onViewInit']) {
                ctrl['$onViewInit']();
            }
        }
    }

    /**
     * @method void Cria uma nova instancia de bind de acordo com o atributo declarado no elemento child.
     * @param child Elemento que utiliza algum tipo de bind.
     */
    public createDirectives(child) {
        if (child.hasAttribute(Constants.MODEL_ATTRIBUTE_NAME)) { this.createCPModel(child); }
        if (child.hasAttribute(Constants.CLICK_ATTRIBUTE_NAME)) { this.createCPClick(child); }
        if (child.hasAttribute(Constants.REPEAT_ATTRIBUTE_NAME)) { this.createCPRepeat(child); }
        if (child.hasAttribute(Constants.SHOW_ATTRIBUTE_NAME)) { this.createCPShow(child); }
        if (child.hasAttribute(Constants.IF_ATTRIBUTE_NAME)) { this.createCPIf(child); }
        if (child.hasAttribute(Constants.ELSE_ATTRIBUTE_NAME)) { this.createCPElse(child); }
        if (child.hasAttribute(Constants.ELSE_IF_ATTRIBUTE_NAME)) { this.createCPElseIf(child); }
        if (child.hasAttribute(Constants.INIT_ATTRIBUTE_NAME)) { this.createCPInit(child); }
        if (child.hasAttribute(Constants.STYLE_ATTRIBUTE_NAME)) { this.createCPStyle(child); }
        if (child.hasAttribute(Constants.CLASS_ATTRIBUTE_NAME)) { this.createCPClass(child); }
        if (child.hasAttribute(Constants.SRC_ATTRIBUTE_NAME)) { this.createCPSrc(child); }
        if (child.hasAttributeStartingWith(Constants.KEY_ATTRIBUTE_NAME)) { this.createCPKey(child); }
        if (child.hasAttribute(Constants.MIN_ATTRIBUTE_NAME)) { this.createCPMin(child); }
        if (child.hasAttribute(Constants.MAX_ATTRIBUTE_NAME)) { this.createCPMax(child); }
        if (child.hasAttribute(Constants.STEP_ATTRIBUTE_NAME)) { this.createCPStep(child); }
        if (child.hasAttribute(Constants.DISABLE_ATTRIBUTE_NAME)) { this.createCPDisabled(child); }
        if (child.hasAttribute(Constants.FOCUS_ATTRIBUTE_NAME)) { this.createCPFocus(child); }
        if (child.hasAttribute(Constants.HIDE_ATTRIBUTE_NAME)) { this.createCPHide(child); }
        if (child.hasAttribute(Constants.BLUR_ATTRIBUTE_NAME)) { this.createCPBlur(child); }
    }

    public reloadElementChildes(element, initialScope) {
        if (element.children) {
            Array.from(element.children).forEach((child: any) => {
                const childScope = Common.getScope(child);
                if (childScope && childScope.mapDom && childScope.id !== initialScope.id) {
                    childScope.mapDom.reloadDirectives();
                }
                this.reloadElementChildes(child, initialScope);
            });
        }
    }

    public reloadDirectives() {
        // Update input values
        Object.keys(this.directives.cpModelsElements)
            .forEach((key) => {
                this.directives.cpModelsElements[key]
                    .forEach((bind) => bind.applyModelInValue());
            });
        // Update cp repeats
        this.directives.repeats.forEach((repeat) => repeat.applyLoop());

        // Update cp show
        this.directives.cpShows.forEach((cpShow) => cpShow.init());

        // Update cp if
        this.directives.cpIfs.forEach((cpIf) => cpIf.init());

        // Update cp else-if
        this.directives.cpElseIfs.forEach((cpElseIf) => cpElseIf.init());

        // Update cp else
        this.directives.cpElses.forEach((cpElse) => cpElse.init());

        // Update cp style
        this.directives.cpStyles.forEach((cpStyle) => cpStyle.init());

        // Update cp class
        this.directives.cpClasses.forEach((cpClass) => cpClass.init());

        // Update cp src
        this.directives.cpSrcs.forEach((cpSrc) => cpSrc.init());

        // Update cp key
        this.directives.cpKeys.forEach((cpKey) => cpKey.init());

        // Update cp min
        this.directives.cpMins.forEach((cpMin) => cpMin.init());

        // Update cp min
        this.directives.cpMaxs.forEach((cpMax) => cpMax.init());

        // Update cp step
        this.directives.cpSteps.forEach((cpStep) => cpStep.init());

        // Update cp disable
        this.directives.cpDisables.forEach((cpDisable) => cpDisable.init());

        // Update cp focus
        this.directives.cpFocus.forEach((cpFocus) => cpFocus.init());

        // Update cp hide
        this.directives.cpHide.forEach((cpHide) => cpHide.init());

        // Update cp blur
        this.directives.cpBlur.forEach((cpBlur) => cpBlur.init());

        this.processInterpolation(this.element);
    }

    /**
     * @method void Atualiza os valores dos elementos HTML de acordo com o atributo que está sendo observado.
     */
    public reload() {
        if (!this.renderedView) { return; }
        this.reloadDirectives();
        this.reloadElementChildes(this.element, Common.getScope(this.element));
    }

    /**
     * @description Percorre os elementos para processar os interpolations.
     * @param element
     */
    public processInterpolation(element) {
        Array.from(element.childNodes).forEach((childNode: any) => {
            this.interpolation(childNode);
        });
    }

    public static removeWordFromStr(str, word) {
        return (str + '').replace(new RegExp(`\\s+${word}\\s+|${word}\\s+|\\s+${word}|${word}$`, 'gi'), '');
    }

    public getInterpolationValue(content, childNode, prefix?) {
        let evalValue = Common.evalInContext(content.trim().startsWith(':') ? content.trim().slice(1) : content, Common.getScopeParent(childNode), prefix);
        evalValue = MapDom.removeWordFromStr(evalValue, 'null');
        evalValue = MapDom.removeWordFromStr(evalValue, 'undefined');
        evalValue = MapDom.removeWordFromStr(evalValue, 'NaN');
        evalValue = evalValue !== undefined ? evalValue : '';
        return evalValue;
    }

    /**
     * @description Função que modifica o texto da interpolação pelo determinado valor.
     * @param childNode
     */
    public interpolation(childNode) {
        if (childNode.nodeName === '#text' && !Common.parentHasIgnore(childNode)) {
            childNode.$immutableInterpolation = childNode.$immutableInterpolation || false;
            if (childNode.$immutableInterpolation) { return; }
            childNode.originalValue = childNode.originalValue || childNode.nodeValue;
            let nodeModified = childNode.originalValue, str = childNode.originalValue;
            str = window['capivara'].replaceAll(str, Constants.START_INTERPOLATION, '{{');
            str = window['capivara'].replaceAll(str, Constants.END_INTERPOLATION, '}}');

            (str.match(this.regexInterpolation) || []).forEach((key) => {
                const content = key.replace('{{', '').replace('}}', '');
                if (!childNode.$immutableInterpolation) {
                    try {
                        const evalValue = this.getInterpolationValue(content, childNode);
                        key = window['capivara'].replaceAll(key, '{{', Constants.START_INTERPOLATION);
                        key = window['capivara'].replaceAll(key, '}}', Constants.END_INTERPOLATION);
                        nodeModified = nodeModified.replace(key, evalValue);
                        childNode.nodeValue = nodeModified;
                    } catch (e) { }
                }
                if (content.trim().startsWith(':') && !childNode.$immutableInterpolation) {
                    childNode.$immutableInterpolation = true;
                }
            });

            childNode.nodeValue = childNode.nodeValue.replace(this.regexInterpolation, '');
            this.alternativeInterpolation(childNode);

        }
        if (childNode.childNodes) {
            this.processInterpolation(childNode);
        }
    }

    public alternativeInterpolation(childNode) {
        if (!childNode.$immutableInterpolation) {
            let nodeModified = childNode.originalValue;
            (nodeModified.match(/\${.+?\}/g) || []).forEach((key) => {
                const content = key.replace('${', '').replace('}', '');
                try {
                    const evalValue = this.getInterpolationValue(content, childNode, '$ctrl');
                    console.log(evalValue);
                    nodeModified = nodeModified.replace(key, evalValue);
                    childNode.nodeValue = nodeModified;
                } catch (e) { }
            });
        }
    }

    /**
     * @method void Retorna um mapa de atributos e elementos escutando alterações desse atributo.
     */
    public getCpModels() {
        return this.directives.cpModels;
    }

    /**
     * @method void Adiciona um tipo de bind em um mapa, esse bind possui um elemento HTML que será atualizado quando o valor do atributo for alterado.
     * @param capivaraBind Tipo de bind que será monitorado.
     */
    public addCpModels(capivaraBind) {
        this.directives.cpModelsElements[capivaraBind.attribute] = this.directives.cpModels[capivaraBind.attribute] || [];
        this.directives.cpModelsElements[capivaraBind.attribute].push(capivaraBind);
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind de model
     */
    public createCPModel(child) {
        this.directives.cpModels.push(new CPModel(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind de click
     */
    public createCPClick(child) {
        this.directives.cpClicks.push(new CPClick(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind de show
     */
    public createCPShow(child) {
        this.directives.cpShows.push(new CPShow(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind do if
     */
    public createCPIf(child) {
        this.directives.cpIfs.push(new CPIf(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind do else
     */
    public createCPElse(child) {
        this.directives.cpElses.push(new CPElse(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind do else if
     */
    public createCPElseIf(child) {
        this.directives.cpElseIfs.push(new CPElseIf(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind de repeat.
     */
    public createCPRepeat(child) {
        this.directives.repeats.push(new CPRepeat(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind do init.
     */
    public createCPInit(child) {
        this.directives.cpInits.push(new CPInit(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind do style.
     */
    public createCPStyle(child) {
        this.directives.cpStyles.push(new CPStyle(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind do class.
     */
    public createCPClass(child) {
        this.directives.cpClasses.push(new CPClass(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind do key.
     */
    public createCPSrc(child) {
        this.directives.cpSrcs.push(new CPSrc(child, this));
    }

    /**
     *
     * @param child Elemento que está sendo criado o bind do key.
     */
    public createCPKey(child) {
        this.directives.cpKeys.push(new CPKey(child, this));
    }

    /**
    * @param child Elemento que está sendo criado o bind do min.
    */
    public createCPMin(child) {
        this.directives.cpMins.push(new CPMin(child, this));
    }

    /**
     * @param child Elemento que está sendo criado o bind do max.
     */
    public createCPMax(child) {
        this.directives.cpMaxs.push(new CPMax(child, this));
    }

    /**
     * @param child Elemento que está sendo criado o bind do step.
     */
    public createCPStep(child) {
        this.directives.cpSteps.push(new CPStep(child, this));
    }

    /**
     * @param child Elemento que está sendo criado o bind do disable.
     */
    public createCPDisabled(child) {
        this.directives.cpDisables.push(new CPDisabled(child, this));
    }

    /**
     * @param child Elemento que está sendo criado o bind do focus.
     */
    public createCPFocus(child) {
        this.directives.cpFocus.push(new CPFocus(child, this));
    }

    /**
     * @param child Elemento que está sendo criado o bind do hide.
     */
    public createCPHide(child) {
        this.directives.cpHide.push(new CPHide(child, this));
    }

    /**
     * @param child Elemento que está sendo criado o bind do blur.
     */
    public createCPBlur(child) {
        this.directives.cpBlur.push(new CPBlur(child, this));

    }
}
