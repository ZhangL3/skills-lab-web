import controllerStateIndex from '../utils/controllerState';

import {detectCollision} from "../utils/isEmitted";

let element;
let toggleBoxPageBack;

export default AFRAME.registerComponent('page_back', {
    init: function () {
        element = this.el;
        toggleBoxPageBack = document.querySelector('#toggleBoxPageBack');

        element.addEventListener('click', () => {
            goBack();
        });


    }
});

function goBack() {
    window.history.back();
}

export function showPageBackButton() {
    element.setAttribute('visible', true);
}

export function handleNotifyPageBack(nextState) {
    if (!nextState.nameLabel.finish) {
        return false;
    }

    showPageBackButton();
}

export function handleControllerNotifyToggleBoxPageBack( triggerEvent ) {
    if (
        !controllerStateIndex.getControllerState('nameLabelPasted')
        || !detectCollision(element, triggerEvent.activeController)
    ) {
        return false;
    }

    goBack();
}

export function handleControllerStateNotifyToggleBoxPageBack (nextControllerState) {
    if (
        !nextControllerState.nameLabelPasted
    ) {
        return false;
    }

    showPageBackButton();
}


