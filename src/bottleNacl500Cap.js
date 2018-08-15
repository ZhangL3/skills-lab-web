import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setVisibleFalse, setVisibleTrue} from "../utils/setVisible";
import { controllerActions } from "../utils/controllerActions";

let element;
// let bottleNacl500Cap;

let currentControllerState;
let activeController;

export default AFRAME.registerComponent('bottle_nacl500_cap', {

    init: function(){

        element = this.el;
        // bottleNacl500Cap = document.querySelector('#nacl500Cap');
        activeController = null;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(element).on('drop', (event, actController) => {
            activeController = actController;
            drop();
        });
    }
});

function drop() {
    let controllerActivities = new controllerActions(element, activeController, -1, 0.1);
    controllerActivities.drop();
}

export function handleControllerNotifyBottleNacl500Cap( triggerEvent ) {


}

export function handleControllerStateNotifyBottleNacl500Cap (nextControllerState) {


    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


