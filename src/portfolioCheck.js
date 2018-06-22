import $ from 'jquery';

import stateIndex from './state';

let element;
let hookName;
let hookDrug;
let hookDose;
let hookIV;
let hookCF;

export default AFRAME.registerComponent('portfoliocheck', {

    init: function(){

        hookName = document.querySelector("#hookName");
        hookDrug = document.querySelector("#hookDrug");
        hookDose = document.querySelector("#hookDose");
        hookIV = document.querySelector("#hookIV");
        hookCF = document.querySelector("#hookCF");

        // shallow copy
        element = this.el;

        $(this.el).on('click', (event) => {
            handleClickPortfolioCheck(event);
        });
    }
});

function handleClickPortfolioCheck(event){

    switch(event.target.id){

        case "transparentName":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'name'], true);
            break;
        case "transparentDrug":
            console.log("drag: ");
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'drug'], true);
            break;
        case "transparentDose":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'dose'], true);
            break;
        case "transparentIV":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'IV'], true);
            break;
        case "transparentCF":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'CF'], true);
            break;
        default:
            break;
    }
}

function showHook (state5R) {
    if (state5R.name === true) {
        $(hookName).attr('visible', 'true');
    }
    if (state5R.drug === true) {
        $(hookDrug).attr('visible', 'true');
    }
    if (state5R.dose === true) {
        $(hookDose).attr('visible', 'true');
    }
    if (state5R.IV === true) {
        $(hookIV).attr('visible', 'true');
    }
    if (state5R.CF === true) {
        $(hookCF).attr('visible', 'true');
    }
}

export function handleNotifyPortfolioCheck(nextState) {
    showHook(nextState.portfolio.checkPortfolio);
}

