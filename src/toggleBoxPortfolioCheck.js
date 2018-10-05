import $ from 'jquery';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';

import {canCheckPortfolio} from "./portfolio";

let hookToggleBoxes;

export default AFRAME.registerComponent('toggle_box_portfolio_check', {

    init: function(){

        console.log("init toggle box porfolio check");
        
        hookToggleBoxes=$('.hookToggleBox');
    },
});

function toggleHookBox(hookToggleBox){

    const id = hookToggleBox.getAttribute('id');

    switch(id){

        case "toggleBoxName":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'name'], true);
            break;
        case "toggleBoxDrug":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'drug'], true);
            break;
        case "toggleBoxDose":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'dose'], true);
            break;
        case "toggleBoxIV":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'IV'], true);
            break;
        case "toggleBoxCF":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'CF'], true);
            break;
        default:
            break;
    }
}

export function handleControllerNotifyToggleBoxPortfolioCheck(triggerEvent ) {

    if (
        stateIndex.getIn(['portfolio', 'checkFinish'])
        || !canCheckPortfolio
    ) {
       return false;
    }

    $(hookToggleBoxes).each((index, hookToggleBox)=>{
        getWorldBound(hookToggleBox);
        if(isEmitted(hookToggleBox, triggerEvent.position)){
            if(controllerStateIndex.getControllerState('portfolioInHand')) {
                toggleHookBox(hookToggleBox);
            }
        }
    });
}