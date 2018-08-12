import $ from 'jquery';
import _ from 'lodash';

import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';
import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import {setVisibleFalse, setVisibleTrue} from "../utils/setVisible";

let element;

let clothOnTable;
let gloveInHandLeft;
let gloveInHandRight;

let currentControllerState;


export default AFRAME.registerComponent('toggle_box_trash_can', {

    init: function(){

        element = this.el;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        clothOnTable = document.querySelector('#clothOnTable');
        gloveInHandLeft = document.querySelector('#gloveLeft');
        gloveInHandRight = document.querySelector('#gloveRight');
    },

});

const schema = {
    inCan : '-0.89 0.1 -0.84',
    dur : 500,
};

function dropGloveCloth() {
    $(clothOnTable).trigger('drop');
    $(gloveInHandLeft).trigger('drop');
    $(gloveInHandRight).trigger('drop');

    if(clothOnTable) {
        aAnimationWrapper(clothOnTable, '', 'position', '', schema.inCan, schema.dur, '',true , 'forwards');
    }

    if(gloveInHandLeft) {
        aAnimationWrapper(gloveInHandLeft, '', 'position', '', schema.inCan, schema.dur, '',true , 'forwards');
    }

    if(gloveInHandRight) {
        aAnimationWrapper(gloveInHandRight, '', 'position', '', schema.inCan, schema.dur, '',true , 'forwards');
    }
}

export function handleControllerNotifyToggleBoxTrashCan( triggerEvent ) {

    if(controllerStateIndex.getControllerState('deskDisinfection')) {

        getWorldBound(element);

        if(
            isEmitted(element, triggerEvent.position)
            && triggerEvent.activeController.getAttribute('id') === controllerStateIndex.getControllerState('disinfectionClothInHand')
        ){

            controllerStateIndex.setControllerState('deskDisinfectionAllFinish', true);

        }
    }
}

export function handleControllerStateNotifyToggleBoxTrashCan (nextControllerState) {

    if (nextControllerState.disinfectionClothInHand !== null && currentControllerState.disinfectionClothInHand === null) {
        setVisibleTrue(element);
    }

    if (nextControllerState.deskDisinfection && !currentControllerState.deskDisinfection) {
        $(element).attr('material', "color:#00ffff; transparent: true; opacity: 0.5");
    }

    if(nextControllerState.deskDisinfectionAllFinish && !currentControllerState.deskDisinfectionAllFinish) {
        dropGloveCloth();
        setVisibleFalse(element);
        stateIndex.setIn(['tableDisinfection', 'finish'], true);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}


