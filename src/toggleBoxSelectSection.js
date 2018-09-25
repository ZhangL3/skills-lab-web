import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setVisibleFalse, setVisibleTrue} from "../utils/setVisible";

let section;

let toggleBoxSection1;
let toggleBoxSection2;
let toggleBoxSection3;
let toggleBoxSection4;
let toggleBoxSection5;
let toggleBoxSection6;
let toggleBoxSection7;

let currentControllerState;


export default AFRAME.registerComponent('toggle_box_select_section', {

    init: function(){

        // section = document.querySelector('#section');
        section = this.el;

        toggleBoxSection1 = document.querySelector('#toggleBoxSection1');
        toggleBoxSection2 = document.querySelector('#toggleBoxSection2');
        toggleBoxSection3 = document.querySelector('#toggleBoxSection3');
        toggleBoxSection4 = document.querySelector('#toggleBoxSection4');
        toggleBoxSection5 = document.querySelector('#toggleBoxSection5');
        toggleBoxSection6 = document.querySelector('#toggleBoxSection6');
        toggleBoxSection7 = document.querySelector('#toggleBoxSection7');

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

    },

});

export function handleNotifyToggleBoxSelectSection(nextState) {
    if (nextState.started) {
        section.setAttribute('visible', false);
    }
}

export function handleControllerNotifyToggleBoxSelectSection( triggerEvent ) {

    getWorldBound(toggleBoxSection1);
    getWorldBound(toggleBoxSection2);
    getWorldBound(toggleBoxSection3);
    getWorldBound(toggleBoxSection4);
    getWorldBound(toggleBoxSection5);
    getWorldBound(toggleBoxSection6);
    getWorldBound(toggleBoxSection7);

    if (isEmitted(toggleBoxSection1, triggerEvent.position)) {
        stateIndex.selectSection(1);
        stateIndex.set('started', true);
    }
    else if (isEmitted(toggleBoxSection2, triggerEvent.position)) {
        stateIndex.selectSection(2);
        stateIndex.set('started', true);
    }
    else if (isEmitted(toggleBoxSection3, triggerEvent.position)) {
        stateIndex.selectSection(3);
        stateIndex.set('started', true);
    }
    else if (isEmitted(toggleBoxSection4, triggerEvent.position)) {
        stateIndex.selectSection(4);
        stateIndex.set('started', true);
    }
    else if (isEmitted(toggleBoxSection5, triggerEvent.position)) {
        stateIndex.selectSection(5);
        stateIndex.set('started', true);
    }
    else if (isEmitted(toggleBoxSection6, triggerEvent.position)) {
        stateIndex.selectSection(6);
        stateIndex.set('started', true);
    }
    else if (isEmitted(toggleBoxSection7, triggerEvent.position)) {
        stateIndex.selectSection(7);
        stateIndex.set('started', true);
    }
}


