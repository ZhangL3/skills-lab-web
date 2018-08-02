import $ from 'jquery';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';

let hookBoxes;

export default AFRAME.registerComponent('portfolio_check_vive', {

    init: function(){

        // boxName = document.querySelector("#boxName");
        // boxDrug = document.querySelector("#boxDrug");
        // boxDose = document.querySelector("#boxDose");
        // boxIV = document.querySelector("#boxIV");
        // boxCF = document.querySelector("#boxCF");
        //
        // hookBoxes.appendChild(boxName);
        // hookBoxes.appendChild(boxDrug);
        // hookBoxes.appendChild(boxDose);
        // hookBoxes.appendChild(boxIV);
        // hookBoxes.appendChild(boxCF);
        
        hookBoxes=$('.hookBox');

    },

});

function toggleHookBox(hookBox){

    const id = hookBox.getAttribute('id');

    switch(id){

        case "boxName":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'name'], true);
            break;
        case "boxDrug":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'drug'], true);
            break;
        case "boxDose":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'dose'], true);
            break;
        case "boxIV":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'IV'], true);
            break;
        case "boxCF":
            stateIndex.setIn(['portfolio', 'checkPortfolio', 'CF'], true);
            break;
        default:
            break;
    }
}

export function handleControllerNotifyPortfolioCheckVive( triggerEvent ) {

    $(hookBoxes).each((index, hookBox)=>{
        getWorldBound.apply(hookBox);
        if(isEmitted(hookBox, triggerEvent.position)){
            console.log("toggle hookBox: ", hookBox);
            toggleHookBox(hookBox);
        }
    });
}