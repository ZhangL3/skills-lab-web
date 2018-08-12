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
let bottleNacl500Cap;

let currentControllerState;


export default AFRAME.registerComponent('bottle_nacl500_cap', {

    init: function(){

        element = this.el;
        bottleNacl500Cap = document.querySelector('#nacl500Cap');

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(element).on('drop', () => {

        })


    },

});

const schema = {

};

function drop() {
    let controllerActivities = new controllerActions(element, )
}

export function handleControllerNotifyBottleNacl500Cap( triggerEvent ) {


}

export function handleControllerStateNotifyBottleNacl500Cap (nextControllerState) {


    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


