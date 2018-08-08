import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import controllerStateIndex from '../utils/controllerState';


// let element;
let gloveL;
let gloveM;
let gloveS;
let gloveLeft;
let gloveRight;


let gloveInFrontOfCamera;

export default AFRAME.registerComponent('glove', {

    init: function(){
        // shallow copy
        const el = this.el;
        gloveInFrontOfCamera = document.querySelector('#gloveInFrontOfCamera');
        gloveL = $('#gloveL');
        gloveM = $('#gloveM');
        gloveS = $('#gloveS');
        gloveLeft = $('#gloveLeft');
        gloveRight = $('#gloveRight');
        let activeController = null;
        let timeInterval = null;


        $(el).on('click', () => {
            handleClickGlove();
        });

        $(el).on('controllerEmit', (event, data) => {
            getWorldBound(el);

            if(isEmitted(el, data.position)) {
                // show glove
                activeController = data.activeController;

                if(activeController.getAttribute('id') == 'viveControllerLeft') {
                    console.log("show glove left!");
                    gloveLeft.attr('visible', true);
                    controllerStateIndex.setControllerState('hasGloveLeft', true);
                }
                else if (activeController.getAttribute('id') == 'viveControllerRight') {
                    console.log("show glove right!");
                    gloveRight.attr('visible', true);
                    controllerStateIndex.setControllerState('hasGloveRight', true);
                }
            }

        })
    },
});

function handleClickGlove () {
    if (stateIndex.getIn(['portfolio', 'finish'])  === true){
        stateIndex.setIn(['tableDisinfection', 'hasGlove'], true);
    }
    else {
        console.log("portfolio not finish: ");
    }
}

function showGloveInFrontOfCamera() {
    $(gloveInFrontOfCamera).attr('visible', 'true');
}

function hideGloveInFrontOfCamera() {
    $(gloveInFrontOfCamera).attr('visible', 'false');
}

export function handleNotifyGlove(nextState) {
    const { hasGlove, finish } = nextState.tableDisinfection;

    if(!hasGlove && !finish) {
        showGloveInFrontOfCamera();
    }
    else if (finish) {
        hideGloveInFrontOfCamera();
    }
}



export function handleControllerNotifyGlove ( triggerEvent ) {
    gloveL.trigger('controllerEmit', [triggerEvent]);
    gloveM.trigger('controllerEmit', [triggerEvent]);
    gloveS.trigger('controllerEmit', [triggerEvent]);
}

export function handleControllerStateNotifyGlove (nextControllerState) {

}

/*function dragInHand(targetParent=null, scale='1 1 1', position='0 0 0') {

    let activePosition = activeController.getAttribute('position');


    timeInterval = setInterval(() => {
        element.setAttribute('position', `${activePosition.x} ${activePosition.y + 0.04} ${activePosition.z}`);

    }, 40);

}

function drop(element) {
    clearInterval(timeInterval);
    element.setAttribute('position', schema.positionAfterCheckVive);
}*/


