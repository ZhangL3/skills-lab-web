import $ from 'jquery';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import { setVisibleTrue, setVisibleFalse } from "../utils/setVisible";
import { is5RChecked } from './portfolio';

let element;

export default AFRAME.registerComponent('toggle_box_portfolio', {

    init: function(){

        element = this.el;

        // console.log("init toggle box portfolio: ", element);

    },

});

function showToggleBoxPortfolio () {
    $(element).attr('visible', true);
}

function hideToggleBoxPortfolio () {
    $(element).attr('visible', false);
}

export function handleControllerNotifyToggleBoxPortfolio( triggerEvent ) {

    // console.log("toggleBoxPortfolio.triggerEvent", triggerEvent);
    // console.log("toggleBoxPortfolio.element", element);

    if (stateIndex.getIn(['portfolio', 'finish'])) {
        return false;
    }

    const portfolioChecked = controllerStateIndex.getControllerState('portfolioInHand') && is5RChecked();

    if(portfolioChecked && !stateIndex.getIn(['portfolio', 'finish'])) {
        $(element).attr('material', "color:#00ffff; transparent: true; opacity: 0.5")
    }

    // getWorldBound(element);

    if(detectCollision(element, triggerEvent.activeController)){

        let activeControllerId = triggerEvent.activeController.getAttribute('id');
        if (activeControllerId === controllerStateIndex.getControllerState('portfolioInHand'))
        if(portfolioChecked) {
            stateIndex.setIn(['portfolio', 'finish'], true);
            controllerStateIndex.setControllerState('portfolioInHand', null);
        }
    }
}

export function handleControllerStateNotifyToggleBoxPortfolio (nextControllerState) {
    // console.log("handleControllerStateNotifyToggleBoxPortfolio", nextControllerState);
    if (nextControllerState.portfolioInHand) {
        // showToggleBoxPortfolio();
        setVisibleTrue(element);
    }
    else {
        // hideToggleBoxPortfolio();
        setVisibleFalse(element);
    }
}


