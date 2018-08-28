import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';

let element;

let currentControllerState;


export default AFRAME.registerComponent('toggle_box_nach500_name_label', {

    init: function(){

        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

const schema = {
};

export function handleControllerNotifyToggleBoxNacl500NameLabel( triggerEvent ) {


}

export function handleControllerStateNotifyToggleBoxNacl500NameLabel (nextControllerState) {

    if (
        nextControllerState.nameLabelInHand
        && !currentControllerState.nameLabelInHand
    ) {
        element.setAttribute('visible', true);
    }

    if (
        nextControllerState.nameLabelFilled
        && !currentControllerState.nameLabelFilled
    ) {
        element.setAttribute('material',"color:#00ffff; transparent: true; opacity: 0.5");
    }

    if (
        nextControllerState.nameLabelPasted
    ) {
        element.setAttribute('visible', false);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}

function pastNameLabel () {

}


