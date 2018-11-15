import $ from 'jquery';
import _ from 'lodash';

import aAnimationWrapper from '../utils/aAnimationWrapper';
import stateIndex from './state';
import { detectCollision } from "../utils/isEmitted";

let element;

export default AFRAME.registerComponent('waste_bin_cap_open', {

    init: function(){
        element = this.el;

        $(this.el).on('click', () => {
            toggleOpenAndClose();
        });
    },
});

const schema = {
    open : '0 0 -45',
    close : '0 0 0',
    dur : 300,
};

function toggleOpenAndClose() {
    stateIndex.set('wasteBinCapOpen', !stateIndex.getState().wasteBinCapOpen);
}

function openCap() {
    aAnimationWrapper(element, '', 'rotation', '', schema.open, schema.dur, '', true, 'forwards');
}

function closeCap() {
    aAnimationWrapper(element, '', 'rotation', '', schema.close, schema.dur, '', true, 'forwards');
}

export function handleNotifyWasteBinCap(nextState) {
    const { wasteBinCapOpen } = nextState;

    if ( wasteBinCapOpen ) {
        openCap();
    }
    else if ( !wasteBinCapOpen ) {
        closeCap();
    }
}

export function handleControllerNotifyWasteBinCap( triggerEvent ) {

    if(!detectCollision(element, triggerEvent.activeController)){
        return false;
    }
    toggleOpenAndClose();
}
