import $ from 'jquery';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import { setVisibleTrue, setVisibleFalse } from "../utils/setVisible";
import { is5RChecked } from './portfolio';

let element;
let portfolioChecked;

export default AFRAME.registerComponent('toggle_box_portfolio', {

    init: function(){
        element = this.el;
    },

});

export function handleNotifyToggleBoxPortfolio() {
    // portfolioChecked = controllerStateIndex.getControllerState('portfolioInHand') && is5RChecked();
    portfolioChecked = is5RChecked();

    if(portfolioChecked && !stateIndex.getIn(['portfolio', 'finish'])) {
        $(element).attr('material', "color:#00ffff; transparent: true; opacity: 0.5")
    }
}

export function handleControllerNotifyToggleBoxPortfolio( triggerEvent ) {

    if (stateIndex.getIn(['portfolio', 'finish'])) {
        return false;
    }

    if(detectCollision(element, triggerEvent.activeController)){

        let activeControllerId = triggerEvent.activeController.getAttribute('id');
        if (activeControllerId === controllerStateIndex.getControllerState('portfolioInHand'))
        if(portfolioChecked) {
            stateIndex.setIn(['portfolio', 'finish'], true);
            controllerStateIndex.setControllerState('portfolioInHand', null);
            controllerStateIndex.setControllerState('isPortfolioHandling', false);
        }
    }
}

export function handleControllerReleaseToggleBoxPortfolio( triggerEvent ) {

    if (
        stateIndex.getIn(['portfolio', 'finish'])
    ) {
        return false;
    }

    if(detectCollision(element, triggerEvent.activeController)){

        let activeControllerId = triggerEvent.activeController.getAttribute('id');
        if (activeControllerId === controllerStateIndex.getControllerState('portfolioInHand'))
            if(portfolioChecked) {
                stateIndex.setIn(['portfolio', 'finish'], true);
                controllerStateIndex.setControllerState('portfolioInHand', null);
                controllerStateIndex.setControllerState('isPortfolioHandling', false);
            }
            else {
                controllerStateIndex.setControllerState('portfolioInHand', null);
            }
    }
}

export function handleControllerStateNotifyToggleBoxPortfolio (nextControllerState) {
    if (nextControllerState.portfolioInHand) {
        setVisibleTrue(element);
    }
    else {
        setVisibleFalse(element);
    }
}


