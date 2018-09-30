import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import controllerStateIndex from '../utils/controllerState';

let controllerRightHand;
let controllerLeftHand;

let controllerRight;
let controllerLeft;

const opacityByGrasping = 0.2;
const opacityValue = 1;
const originalHandColor = { r: 0.5843137502670288, g: 0.5843137502670288, b: 0.5843137502670288 };
const handWithGloveColor = {r:0, g:0, b:0.5};
const defaultAlphaTest = 0.1;

export default AFRAME.registerComponent('controller_hand', {

    init: function(){
        // shallow copy
        controllerRightHand = document.querySelector('#rightHand');
        controllerLeftHand = document.querySelector('#leftHand');

        controllerRight = document.querySelector('#viveControllerRight');
        controllerLeft = document.querySelector('#viveControllerLeft');

        // right hand
        $(controllerRightHand).on('click', () => {
            controllerRightHand.setAttribute("animation-mixer", "loop: once");
            if (haveSthInHand(controllerRight).length > 0) {
                if ( haveSthInHand(controllerRight)[0] === 'clothOnTable' ) {
                    setHandMaterial(controllerRightHand, opacityByGrasping, defaultAlphaTest, true, handWithGloveColor);
                } else {
                    setHandMaterial(controllerRightHand, opacityByGrasping);
                }
            } else {
                // have nothing in hand, not transparent
                controllerRightHand.removeAttribute("material");
                setHandMaterial(controllerRightHand, opacityValue, defaultAlphaTest, true, originalHandColor);
            }

            if (controllerStateIndex.getControllerState('hasGloveRight')) {
                setHandMaterial(controllerRightHand, opacityByGrasping, defaultAlphaTest, true, handWithGloveColor);
            }
        });

        controllerRightHand.addEventListener('animation-finished', ()=>{
            controllerRightHand.removeAttribute("animation-mixer");
        });

        // left hand
        $(controllerLeftHand).on('click', () => {
            controllerLeftHand.setAttribute("animation-mixer", "loop: once");

            if (haveSthInHand(controllerLeft).length > 0) {
                if (haveSthInHand(controllerLeft)[0] === 'clothOnTable') {
                    setHandMaterial(controllerLeftHand, opacityByGrasping, defaultAlphaTest, true, handWithGloveColor);
                }
                else {
                    setHandMaterial(controllerLeftHand, opacityByGrasping);
                }
            } else {
                // have nothing in hand, not transparent
                controllerLeftHand.removeAttribute("material");
                setHandMaterial(controllerLeftHand, opacityValue, defaultAlphaTest, true, originalHandColor);
            }

            if (controllerStateIndex.getControllerState('hasGloveLeft')) {
                setHandMaterial(controllerLeftHand, opacityByGrasping, defaultAlphaTest, true, handWithGloveColor);
            }
        });

        controllerLeftHand.addEventListener('animation-finished', ()=>{
            controllerLeftHand.removeAttribute("animation-mixer");
        });
    }
})

function setHandMaterial(handElement, opacity, alphaTest=0.1, depthTest=true, color) {

    const mesh = handElement.getObject3D('mesh'); // For hand, the result is undefined
    if (!mesh) { return; }
    mesh.traverse(function (node) {
        if (node.isMesh) {
            node.material.opacity = opacity;
            node.material.transparent = opacity < 1.0;
            node.material.needsUpdate = true;
            node.material.alphaTest = alphaTest;
            node.material.depthTest = depthTest;
            if (color) {
                node.material.color = color;
            }
        }
    });
}

export function setBothHandOpacity() {
    controllerLeftHand.removeAttribute("material");
    setHandMaterial(controllerLeftHand, opacityValue, defaultAlphaTest, true, originalHandColor);
    controllerRightHand.removeAttribute("material");
    setHandMaterial(controllerRightHand, opacityValue, defaultAlphaTest, true, originalHandColor);
}

export function haveSthInHand(controllerElement){
    const children = controllerElement.childNodes;
    const objectsInHand = [];
    for (let i=0; i<children.length; i++) {
        if (
            children[i].nodeType === 1 // nodeType === 1: element
            && children[i].getAttribute('id') !== 'leftHand'
            && children[i].getAttribute('id') !== 'rightHand'
            && children[i].getAttribute('id') !== 'leftHandIndicator'
            && children[i].getAttribute('id') !== 'rightHandIndicator'
            && children[i].getAttribute('visible')
        ) {
            objectsInHand.push(children[i].getAttribute('id'));
        }
    }
    return objectsInHand;
}

export function handleNotifyControllerHand(nextState) {

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyControllerHand ( triggerEvent ) {
    if (triggerEvent.activeController.getAttribute('id')==='viveControllerRight') {
        $(controllerRightHand).trigger('click');
    }
    else if (triggerEvent.activeController.getAttribute('id')==='viveControllerLeft') {
        $(controllerLeftHand).trigger('click');
    }
}

export function handleControllerStateNotifyControllerHand (nextControllerState) {


    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}



