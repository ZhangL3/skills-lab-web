import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import { isBottleChecked } from "./bottleNacl500Vive";
import { controllerActions } from "../utils/controllerActions";

let element;
let bottleNacl500Cap;

let currentControllerState;
let activeController;
const bottleNacl500Scale = 0.1;


export default AFRAME.registerComponent('toggle_box_nach500_cap', {

    init: function(){

        element = this.el;
        bottleNacl500Cap = document.querySelector('#nacl500Cap');

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyToggleBoxNacl500Cap( triggerEvent ) {
    //test
    activeController = triggerEvent.activeController;
    controllerStateIndex.setControllerState('nacl500CapChecked', true);
    //test end

    if (!controllerStateIndex.getControllerState('nacl500CapChecked')) {
        if(controllerStateIndex.getControllerState('nacl500InHandToDesk')) {
            getWorldBound(element);
            if(isEmitted(element, triggerEvent.position)){
                activeController = triggerEvent.activeController;
                controllerStateIndex.setControllerState('nacl500CapChecked', true);
            }
        }
    }
}

export function handleControllerStateNotifyToggleBoxNacl500Cap (nextControllerState) {

    //test
    dragInHand();
    //test end

    if (isBottleChecked()
        && nextControllerState.nacl500OnDesk
        && nextControllerState.bottleNacl500CapInHand
        && !nextControllerState.bottleOpened
    ) {
        controllerStateIndex.setControllerState('bottleNacl500CapInHand', true);
        dragInHand();
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function dragInHand() {
    if (!activeController) {
        return false;
    }
    let controllerActivities = new controllerActions(bottleNacl500Cap, activeController, bottleNacl500Scale);
    controllerActivities.drag();
}


