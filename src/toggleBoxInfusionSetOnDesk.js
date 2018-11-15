import _ from 'lodash';

import { detectCollision } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import {setCanTriggerCapAndWheel} from "./infusionSetOpenVive";
import stateIndex from "./state";
import hints from '../utils/hints';

let element;
let currentControllerState;

export default AFRAME.registerComponent('toggle_box_infusion_set_on_desk', {

    init: function(){

        element = this.el;

        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
    },

});

export function handleControllerReleaseToggleBoxInfusionSetOnDesk ( triggerEvent ) {
    if(
        detectCollision(element, triggerEvent.activeController)
        && triggerEvent.activeController.getAttribute('id') === controllerStateIndex.getControllerState('infusionSetInPackInHand')
        && controllerStateIndex.getControllerState('infusionSetChecked')
    ){
        controllerStateIndex.setControllerState('infusionSetOnDeskOpened', true);
        setTimeout(()=>{
            setCanTriggerCapAndWheel(true);
        }, 500);
        stateIndex.set('hint', hints.closeRoller);
    }
}

export function handleControllerStateNotifyToggleBoxInfusionSetOnDesk (nextControllerState) {
    
    if (
        nextControllerState.infusionSetOnDeskOpened
        && !currentControllerState.infusionSetOnDeskOpened
    ) {
        element.setAttribute('visible', false);
    }
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


