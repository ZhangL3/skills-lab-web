import $ from 'jquery';
import _ from 'lodash';

import controllerStateIndex from '../utils/controllerState';
import { controllerActions } from "../utils/controllerActions";

let element;
let currentControllerState;
let activeController;

export default AFRAME.registerComponent('bottle_nacl500_cap', {

    init: function(){

        element = this.el;
        activeController = null;

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

export function handleControllerStateNotifyBottleNacl500Cap (nextControllerState) {
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


