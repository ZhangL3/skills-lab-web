import {haveSthInHand} from "./controllerHand";
import {objectInHandPosition} from "../utils/controllerActions";

let leftHandIndicator;
let viveControllerLeft;
let rightHandIndicator;
let viveControllerRight;

AFRAME.registerComponent('indicator-box', {
    init: function () {
        leftHandIndicator = document.querySelector('#leftHandIndicator');
        viveControllerLeft = document.querySelector('#viveControllerLeft');
        rightHandIndicator = document.querySelector('#rightHandIndicator');
        viveControllerRight = document.querySelector('#viveControllerRight');
    }
});

function setSthInHandPosition(indicatorBox, position) {
    indicatorBox.setAttribute('position', position);
}

function setNthInHandPosition(indicatorBox) {
    indicatorBox.setAttribute('position', '0 0 0');
}

export function handleControllerNotifyIndicatorBox ( triggerEvent ) {
    adjustPositionOfIndicator();

    // wait for element moving of cloth on table
    setTimeout(()=> {
        adjustPositionOfIndicator();
    }, 200);

}

function adjustPositionOfIndicator() {
    if (haveSthInHand(viveControllerLeft).length > 0) {
        setSthInHandPosition(leftHandIndicator, objectInHandPosition);
    }
    else {
        setNthInHandPosition(leftHandIndicator);
    }

    if(haveSthInHand(viveControllerRight).length > 0) {
        setSthInHandPosition(rightHandIndicator, objectInHandPosition);
    }
    else {
        setNthInHandPosition(rightHandIndicator);
    }
}


