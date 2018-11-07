import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from "../utils/isEmitted";
import controllerStateIndex from '../utils/controllerState';
import hints from '../utils/hints';


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
            // getWorldBound(el);

            if(
                // isEmitted(el, data.position)
                detectCollision(el, data.activeController)
            ) {
                // Must check portfolio before taking glove
                if (
                    // stateIndex.getIn(['portfolio', 'finish'])  === true
                    stateIndex.getIn(['handDisinfection', 'finish']) === 1
                    && !stateIndex.getIn(['tableDisinfection', 'finish'])
                ) {
                    // show glove
                    activeController = data.activeController;

                    if(
                        activeController.getAttribute('id') === 'viveControllerLeft'
                    ) {
                        controllerStateIndex.setControllerState('hasGloveLeft', true);
                        if (
                            controllerStateIndex.getControllerState('hasGloveRight')
                        ) {
                            stateIndex.set('hint', hints.takeDisinfectionCloth);
                        }
                    }
                    else if (
                        activeController.getAttribute('id') === 'viveControllerRight'
                    ) {
                        controllerStateIndex.setControllerState('hasGloveRight', true);
                        if (
                            controllerStateIndex.getControllerState('hasGloveLeft')
                        ) {
                            stateIndex.set('hint', hints.takeDisinfectionCloth);
                        }
                    }
                }
                // chang hints
                else {
                        // console.log("portfolio not finish: ");
                    console.log("Disinfect hand at before taking gloves");
                }
            }

        })
    },
});

function handleClickGlove () {
    if (
        // stateIndex.getIn(['portfolio', 'finish'])  === true
        stateIndex.getIn(['handDisinfection', 'finish']) === 1
    ) {
        stateIndex.setIn(['tableDisinfection', 'hasGlove'], true);
        stateIndex.set('hint', hints.takeDisinfectionCloth);
    }
    else {
        // console.log("portfolio not finish: ");
        console.log("Disinfect hand at before taking gloves");
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

    if(hasGlove && !finish) {
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



