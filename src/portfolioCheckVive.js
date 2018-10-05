import $ from 'jquery';
import controllerStateIndex from '../utils/controllerState';
import stateIndex from './state';
import { is5RChecked } from './portfolio';

let transparentName;
let transparentDrug;
let transparentDose;
let transparentIV;
let transparentCF;

let hookName;
let hookDrug;
let hookDose;
let hookIV;
let hookCF;


AFRAME.registerComponent('portfolio_check_vive', {

    init: function () {
        const el = this.el;

        transparentName = document.querySelector('#transparentName');
        transparentDrug = document.querySelector('#transparentDrug');
        transparentDose = document.querySelector('#transparentDose');
        transparentIV = document.querySelector('#transparentIV');
        transparentCF = document.querySelector('#transparentCF');

        hookName = document.querySelector('#hookName');
        hookDrug = document.querySelector('#hookDrug');
        hookDose = document.querySelector('#hookDose');
        hookIV = document.querySelector('#hookIV');
        hookCF = document.querySelector('#hookCF');

        let isStaring = false;

        $(el).on('raycaster-intersected', (event) => {
            if (shouldCheck()) {
                isStaring = true;
                console.log("event: ", event, typeof(event));
            }
        });

        $(el).on('raycaster-intersected-cleared', (event) => {
            if (shouldCheck()) {
                isStaring = false;
                console.log("event clear: ", event, typeof(event));
            }
        });

        $(el).on('controllerClick', () => {
            if (isStaring) {
                setChecked(el);
            }
        })
    }
});

function shouldCheck() {
    if (
        controllerStateIndex.getControllerState('portfolioInHand') === null
        || stateIndex.getIn(['portfolio', 'checkFinish'])
    ) {
        return false;
    }

    return true;
}

function setChecked(el) {
    const elementId = el.getAttribute('id');
    switch (elementId) {
        case 'transparentName':
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'name'], true);
            break;
        case 'transparentDrug':
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'drug'], true);
            break;
        case 'transparentDose':
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'dose'], true);
            break;
        case 'transparentIV':
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'IV'], true);
            break;
        case 'transparentCF':
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'CF'], true);
            break;
        default:
            break;
    }

}

export function handleControllerNotifyPortfolioCheckVive(triggerEvent) {

    if (shouldCheck()) {
        $(transparentName).trigger('controllerClick');
        $(transparentDrug).trigger('controllerClick');
        $(transparentDose).trigger('controllerClick');
        $(transparentIV).trigger('controllerClick');
        $(transparentCF).trigger('controllerClick');
    }
}