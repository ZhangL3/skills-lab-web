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

export function showHook () {
    const state5R = stateIndex.getIn(['portfolio', 'checkPortfolio']);
    if (state5R.name === true) {
        $(hookName).attr('visible', 'true');
        setTimeout(()=>{
            $(hookName).attr('visible', 'true');
        }, 100);
    }
    if (state5R.drug === true) {
        $(hookDrug).attr('visible', 'true');
        setTimeout(()=>{
            $(hookDrug).attr('visible', 'true');
        }, 100);
    }
    if (state5R.dose === true) {
        $(hookDose).attr('visible', 'true');
        setTimeout(()=>{
            $(hookDose).attr('visible', 'true');
        }, 100);
    }
    if (state5R.IV === true) {
        $(hookIV).attr('visible', 'true');
        setTimeout(()=>{
            $(hookIV).attr('visible', 'true');
        }, 100);
    }
    if (state5R.CF === true) {
        $(hookCF).attr('visible', 'true');
        setTimeout(()=>{
            $(hookCF).attr('visible', 'true');
        }, 100);
    }
}

export function handleNotifyPortfolioCheck(nextState) {

    if(stateIndex.getIn(['portfolio', 'finish'])) {
        return false;
    }
    showHook();
}

