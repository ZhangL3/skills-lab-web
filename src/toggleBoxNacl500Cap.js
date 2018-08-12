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
    // activeController = triggerEvent.activeController;
    // controllerStateIndex.setControllerState('nacl500CapChecked', true);
    //test end
    getWorldBound(element);
    if (!isEmitted(element, triggerEvent.position)) {
        return false;
    }

    if (!controllerStateIndex.getControllerState('nacl500CapChecked')) {
        if(controllerStateIndex.getControllerState('nacl500InHandToDesk')) {
            controllerStateIndex.setControllerState('nacl500CapChecked', true);
        }
    }

    if (controllerStateIndex.getControllerState('nacl500OnDesk')
        && controllerStateIndex.getControllerState('bottleNacl500CapInHand') === null
        // && controllerStateIndex.getControllerState('bottleOpened')
    ) {
        activeController = triggerEvent.activeController;
        let activeControllerId = activeController.getAttribute('id');
        controllerStateIndex.setControllerState('bottleNacl500CapInHand', activeControllerId);
    }
}

export function handleControllerStateNotifyToggleBoxNacl500Cap (nextControllerState) {

    //test
    // dragInHand();
    //test end

    if (nextControllerState.bottleNacl500CapInHand !== null
        && currentControllerState.bottleNacl500CapInHand === null
    ) {
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


