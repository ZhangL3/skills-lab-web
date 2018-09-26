import aAnimationWrapper from '../utils/aAnimationWrapper';
import stateIndex from './state';
import * as constants from '../utils/constants';

const timeToStay = 5000;
const moveTime = 500;
let cameraPosition;
// Objects lead to move the camera in flat mode
let nacl500Bottle;
let infusionSetOpen;
let infusionSetHanged;
let infusionSetHangedFilled;
let handDisinfectionHandle;

const positionVar = {
    origin: {name: 'ORIGIN', position: '0 1 -0.4'},
    nacl500Bottle: {name:'NACL_500_BOTTLE', position:'-0.3 1.5 -0.5'},
    infusionSetOpen: {name:'INFUSION_SET_OPEN', position:'-0.142 0.827 -0.606'},
    infusionSetHanged: {name:'INFUSION_SET_Hanged', position:'0.468 1.100 -0.4'},
    handDisinfectionHandle: {name:'DISPENSER_HANDLE', position:'-1.3 1 -0.4'}
};



AFRAME.registerComponent('camera-move', {
    init: function () {
        const el = this.el;
        cameraPosition = positionVar.origin.name;
        nacl500Bottle = document.querySelector('#nacl500Bottle');
        infusionSetOpen = document.querySelector('#infusionSetOpen');
        infusionSetHanged = document.querySelector('#infusionSetHanged');
        infusionSetHangedFilled = document.querySelector('#infusionSetHangedFilled');
        handDisinfectionHandle = document.querySelector('#handDisinfectionHandle');
        let timer;
        
        nacl500Bottle.addEventListener('raycaster-intersected', ()=>{
            if (
                stateIndex.getIn(['bottlePrepare', 'position']) === constants.bottle.position.IN_CUPBOARD
                && cameraPosition === positionVar.origin.name
            ) {
                this.moveToBottle(el);
                timer = setTimeout(()=>{
                    this.backToOrigin(el);
                }, timeToStay);
            }
        });

        infusionSetOpen.addEventListener('raycaster-intersected', ()=>{
            if (
                stateIndex.getIn(['infusionSet', 'position']) === constants.infusionSet.position.ON_TABLE
                && cameraPosition === positionVar.origin.name
            ) {
                this.moveToInfusionSetOpen(el);
                timer = setTimeout(()=>{
                    this.backToOrigin(el);
                }, timeToStay);
            }
        });

        infusionSetHanged.addEventListener('raycaster-intersected', ()=>{
            if (
                stateIndex.getIn(['bottlePrepare', 'position']) === constants.bottle.position.HANGED
                && cameraPosition === positionVar.origin.name
            ) {
                this.moveToInfusionSetHanged(el);
                timer = setTimeout(()=>{
                    this.backToOrigin(el);
                }, timeToStay);
            }
        });

        infusionSetHangedFilled.addEventListener('raycaster-intersected', ()=>{
            if (
                stateIndex.getIn(['bottlePrepare', 'position']) === constants.bottle.position.HANGED
                && cameraPosition === positionVar.origin.name
            ) {
                this.moveToInfusionSetHanged(el);
                timer = setTimeout(()=>{
                    this.backToOrigin(el);
                }, timeToStay);
            }
        });

        handDisinfectionHandle.addEventListener('raycaster-intersected', ()=>{
            if (
                (stateIndex.getIn(['handDisinfection', 'finish']) === 0
                    && stateIndex.getIn(['portfolio', 'finish']))
                ||
                (stateIndex.getIn(['handDisinfection', 'finish']) === 1
                    && stateIndex.getIn(['tableDisinfection', 'finish']))
                && cameraPosition === positionVar.origin.name
            ) {
                this.moveToHandDisinfection(el);
                timer = setTimeout(()=>{
                    this.backToOrigin(el);
                }, timeToStay);
            }
        });
    },

    backToOrigin: function(el) {
        aAnimationWrapper(el, '', 'position', '', positionVar.origin.position, moveTime, '', true, 'forwards');
        cameraPosition = positionVar.origin.name;
    },

    moveToBottle: function (el) {
        aAnimationWrapper(el, '', 'position', '', positionVar.nacl500Bottle.position, moveTime, '', true, 'forwards');
        cameraPosition = positionVar.nacl500Bottle.name;
    },

    moveToInfusionSetOpen: function (el) {
        aAnimationWrapper(el, '', 'position', '', positionVar.infusionSetOpen.position, moveTime, '', true, 'forwards');
        cameraPosition = positionVar.infusionSetOpen.name;
    },

    moveToInfusionSetHanged: function (el) {
        aAnimationWrapper(el, '', 'position', '', positionVar.infusionSetHanged.position, moveTime, '', true, 'forwards');
        cameraPosition = positionVar.infusionSetHanged.name;
    },

    moveToHandDisinfection: function (el) {
        aAnimationWrapper(el, '', 'position', '', positionVar.handDisinfectionHandle.position, moveTime, '', true, 'forwards');
        cameraPosition = positionVar.handDisinfectionHandle.name;
    }
});