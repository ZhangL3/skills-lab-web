import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
// import { dragByController, drop } from "../utils/dragByController";
import { controllerActions } from "../utils/controllerActions";

let element;
let currentState;

let activeController;

let currentControllerState;

let timeInterval;

// MutationObserver
// let observerOptions = {childList: true};
// let observer;
// let isInHand = false;

let controllerActivities;


export default AFRAME.registerComponent('bottle_nacl_500_vive', {

    init: function(){
        // shallow copy
        element = this.el;

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        $(this.el).on('click', () => {
        });

        // MutationObserver
        // observer = new MutationObserver((event) => {
        //     console.log("MutationObserver emit: ", event);
        //     if(isInHand) {
        //         element.setAttribute('position', '0 0 0');
        //     }
        //     else {
        //
        //     }
        // });

        controllerActivities = null;
    }
});

export function handleNotifyBottleNacl500Vive(nextState) {
    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyBottleNacl500Vive ( triggerEvent ) {

    getWorldBound(element);

    if(isEmitted(element, triggerEvent.position)){
        if(triggerEvent.eventName === 'triggerDown') {
            activeController = triggerEvent.activeController;
            controllerStateIndex.setControllerState('nacl500InHand', true);
        }
    }
}

export function handleControllerStateNotifyBottleNacl500Vive (nextControllerState) {
    if (nextControllerState.nacl500InHand && !currentControllerState.nacl500InHand) {


        // console.log("element before: ", element, typeof(element));
        // element.object3D.position.set(0, 0, 0);
        // console.log("element after: ", element, typeof(element));

        dragInHand();

        currentControllerState = _.cloneDeep(nextControllerState);


        //TODO: how adjust the attribute after attaching element to controller element?

        // element.setAttribute('position', '0 0 0');
        // $(element).appendTo(activeController);
        // element.setAttribute('position', '0 0 0');
        // const portfolioElementOnController = document.querySelector('#portfolioBackSiteModel');
        // portfolioElementOnController.setAttribute('position', '0 0 0');



        // A-Frame 0.8.2 has bug, so not works. If fixed, not needed.
        // Seems not works.
        // faceToCamera();
    }
}

function dragInHand() {

    controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drag();


    // isInHand = true;
    // observer.observe(activeController, observerOptions);
    // $(element).appendTo(activeController);

    // let activePosition = activeController.getAttribute('position');
    //
    //
    // timeInterval = setInterval(() => {
    //     element.setAttribute('position', `${activePosition.x} ${activePosition.y + 0.04} ${activePosition.z}`);
    //
    // }, 40);

    // A-Frame 0.8.2 has bug, so not works. If fixed, use this.

    // element.setAttribute('scale', '1 1 1');
    // element.setAttribute('position', '0 0 0 ');

    // console.log("element: ", element, typeof(element));
    // console.log("targetParent: ", targetParent, typeof(targetParent));
    // $(element).attr('position', '0 0 0');
    // element.attributes.position='0 0 0';
    // $(element).prop('attributes', 'newAttr');
    // element.object3D.position.set(0, 0, 0);
    // $(element).attr('position', '0 0 0');

    // $(element).attr('scale', scale);
    // $(element).attr('position', position);
}

function drop() {
    // clearInterval(timeInterval);
    // element.setAttribute('position', schema.positionAfterCheckVive);
    controllerActivities.drop();
}


