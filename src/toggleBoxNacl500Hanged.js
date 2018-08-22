import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;

let currentControllerState;

export default AFRAME.registerComponent('toggle_box_nacl500_hanged', {

    init: function(){

        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyToggleBoxNacl500Hanged( triggerEvent ) {

    if (controllerStateIndex.getControllerState('nacl500Hanged')) {
        return false;
    }

    getWorldBound(element);
    if(!isEmitted(element, triggerEvent.position)) {
        return false;
    }

    if (
        controllerStateIndex.getControllerState('nacl500InHandToStand') === triggerEvent.activeController.getAttribute('id')
        && !controllerStateIndex.getControllerState('nacl500InHandToStand')
        && !stateIndex.getIn(['bottlePrepare', 'finish'])
    ) {
        activeController = triggerEvent.activeController;
        controllerStateIndex.setControllerState('nacl500InHandToStand', true);
    }

}

export function handleControllerStateNotifyToggleBoxNacl500Hanged (nextControllerState) {

    if (
        nextControllerState.nacl500InHandToStand
        && !currentControllerState.nacl500InHandToStand
    ) {
        element.setAttribute('visible', true);
    }

    if (
        nextControllerState.nacl500Hanged
        && !currentControllerState.nacl500Hanged
    ) {
        const nacl500Bottle = document.querySelector('#nacl500Bottle');
        // drop bottle to hang
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


