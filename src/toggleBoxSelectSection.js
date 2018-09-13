import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setVisibleFalse, setVisibleTrue} from "../utils/setVisible";

let toggleBoxSection1;
let toggleBoxSection2;
let toggleBoxSection3;
let toggleBoxSection4;
let toggleBoxSection5;
let toggleBoxSection6;

let currentControllerState;


export default AFRAME.registerComponent('toggle_box_select_section', {

    init: function(){

        toggleBoxSection1 = document.querySelector('#toggleBoxSection1');
        toggleBoxSection2 = document.querySelector('#toggleBoxSection2');
        toggleBoxSection3 = document.querySelector('#toggleBoxSection3');
        toggleBoxSection4 = document.querySelector('#toggleBoxSection4');
        toggleBoxSection5 = document.querySelector('#toggleBoxSection5');
        toggleBoxSection6 = document.querySelector('#toggleBoxSection6');

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

export function handleControllerNotifyToggleBoxSelectSection( triggerEvent ) {

    getWorldBound(toggleBoxSection1);
    getWorldBound(toggleBoxSection2);
    getWorldBound(toggleBoxSection3);
    getWorldBound(toggleBoxSection4);
    getWorldBound(toggleBoxSection5);
    getWorldBound(toggleBoxSection6);

    if (isEmitted(toggleBoxSection1, triggerEvent.position)) {
        stateIndex.selectSection(1);
    }
    else if (isEmitted(toggleBoxSection2, triggerEvent.position)) {
        stateIndex.selectSection(2);
    }
    else if (isEmitted(toggleBoxSection3, triggerEvent.position)) {
        stateIndex.selectSection(3);
    }
    else if (isEmitted(toggleBoxSection4, triggerEvent.position)) {
        stateIndex.selectSection(4);
    }
    else if (isEmitted(toggleBoxSection5, triggerEvent.position)) {
        stateIndex.selectSection(5);
    }
    else if (isEmitted(toggleBoxSection6, triggerEvent.position)) {
        stateIndex.selectSection(6);
    }
}

