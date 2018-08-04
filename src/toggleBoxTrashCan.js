import $ from 'jquery';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setVisibleFalse} from "../utils/setVisible";

let element;

let clothOnTable;

export default AFRAME.registerComponent('toggle_box_trash_can', {

    init: function(){

        element = this.el;
        clothOnTable = document.querySelector('#clothOnTable');

    },

});

const schema = {
    inCan : '-0.89 0.1 -0.81',
    dur : 500,
};

function dropGloveCloth() {
    $(clothOnTable).trigger('drop');

    if(clothOnTable) {
        aAnimationWrapper(clothOnTable, '', 'position', '', schema.inCan, schema.dur, '',true , 'forwards');
    }
}

export function handleControllerNotifyToggleBoxTrashCan( triggerEvent ) {

    if(controllerStateIndex.getControllerState('deskDisinfection')) {

        getWorldBound(element);

        if(isEmitted(element, triggerEvent.position)){

            controllerStateIndex.setControllerState('deskDisinfectionAllFinish', true);

        }
    }
}

export function handleControllerStateNotifyToggleBoxTrashCan (nextControllerState) {
    console.log("handleControllerStateNotifyToggleBoxTrashCan: ", nextControllerState);
    if (nextControllerState.deskDisinfection) {
        $(element).attr('material', "color:#00ffff; transparent: true; opacity: 0.5");
    }

    if(nextControllerState.deskDisinfectionAllFinish) {
        dropGloveCloth();
        setVisibleFalse(element);
    }
}


