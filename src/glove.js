import $ from 'jquery';

import stateIndex from './state';
import { detectCollision } from "../utils/isEmitted";
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
        const el = this.el;
        gloveInFrontOfCamera = document.querySelector('#gloveInFrontOfCamera');
        gloveL = $('#gloveL');
        gloveM = $('#gloveM');
        gloveS = $('#gloveS');
        gloveLeft = $('#gloveLeft');
        gloveRight = $('#gloveRight');
        let activeController = null;

        $(el).on('click', () => {
            handleClickGlove();
        });

        $(el).on('controllerEmit', (event, data) => {
            if(
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
            }

        })
    },
});

function handleClickGlove () {
    if (
        stateIndex.getIn(['handDisinfection', 'finish']) === 1
    ) {
        stateIndex.setIn(['tableDisinfection', 'hasGlove'], true);
        stateIndex.set('hint', hints.takeDisinfectionCloth);
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



