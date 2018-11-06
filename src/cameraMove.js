import aAnimationWrapper from '../utils/aAnimationWrapper';
import stateIndex from './state';
import * as constants from '../utils/constants';
import $ from 'jquery';

const timeToStay = 5000;
const moveTime = 500;
let cameraPosition;
let cameraMoved = false;
// Objects lead to move the camera in flat mode
let nacl500Bottle;
let infusionSetOpen;
let infusionSetHanged;
let infusionSetHangedFilled;
let handDisinfectionHandle;

const positionVar = {
    origin: {name: 'ORIGIN', position: '0 1 -0.4'},
    nacl500Bottle: {name:'NACL_500_BOTTLE', position:'-0.3 1.5 -0.5'},
    infusionSetOpen: {name:'INFUSION_SET_OPEN', position:'-0.055 0.810 -0.634'},
    infusionSetHanged: {name:'INFUSION_SET_Hanged', position:'0.670 1.100 -0.502'},
    handDisinfectionHandle: {name:'DISPENSER_HANDLE', position:'-1.3 1 -0.4'}
};

AFRAME.registerComponent('camera-move', {

    schema: {
        disable: {type: 'boolean', default: false}
    },

    init: function () {
        let data = this.data;
        const el = this.el;

        if (data.disable) {
            return false;
        }

        console.log("Should not shown if disable true");

        cameraPosition = positionVar.origin.name;
        nacl500Bottle = document.querySelector('#nacl500Bottle');
        infusionSetOpen = document.querySelector('#infusionSetOpen');
        infusionSetHanged = document.querySelector('#infusionSetHanged');
        infusionSetHangedFilled = document.querySelector('#infusionSetHangedFilled');
        handDisinfectionHandle = document.querySelector('#handDisinfectionHandle');
        let timer;

        //test

        // move to cupboard
        nacl500Bottle.addEventListener('raycaster-intersected', ()=> {
            this.moveToCupboardAndBack(el, data.disable)
        });

        // move to cabinet
        infusionSetOpen.addEventListener('raycaster-intersected', ()=> {
            this.moveToCabinetAndBack(el, data.disable)
        });

        // move to holder
        infusionSetHanged.addEventListener('raycaster-intersected', ()=> {
            this.moveToHolderAndBack(el, data.disable)
        });

        // move to holder
        infusionSetHangedFilled.addEventListener('raycaster-intersected', ()=> {
            this.moveToHolderAndBack(el, data.disable)
        });

        // move to hand disinfection
        handDisinfectionHandle.addEventListener('raycaster-intersected', ()=> {
            this.moveToHandDisinfectionAndBack(el, data.disable)
        });
    },

    update: function (oldData) {
        let data = this.data;
        let el = this.el;

        if (data.disable) {
            // Remove raycaster-intersected listener
            nacl500Bottle = document.querySelector('#nacl500Bottle');
            infusionSetOpen = document.querySelector('#infusionSetOpen');
            infusionSetHanged = document.querySelector('#infusionSetHanged');
            infusionSetHangedFilled = document.querySelector('#infusionSetHangedFilled');
            handDisinfectionHandle = document.querySelector('#handDisinfectionHandle');

            // move to cupboard
            nacl500Bottle.removeEventListener('raycaster-intersected', this.moveToCupboardAndBack);

            // move to cabinet
            infusionSetOpen.removeEventListener('raycaster-intersected', this.moveToCabinetAndBack);

            // move to holder
            infusionSetHanged.removeEventListener('raycaster-intersected', this.moveToHolderAndBack);

            // move to holder
            infusionSetHangedFilled.removeEventListener('raycaster-intersected', this.moveToHolderAndBack);

            // move to hand disinfection
            handDisinfectionHandle.removeEventListener('raycaster-intersected', this.moveToHandDisinfectionAndBack);
        }

    },

    moveToCupboardAndBack: function(el, disable) {
        console.log("disable: ", disable, typeof(disable));
        if(cameraMoved || disable) {
            return false;
        }
        if (
            stateIndex.get('started')
            && stateIndex.getIn(['bottlePrepare', 'position']) === constants.bottle.position.IN_CUPBOARD
            && cameraPosition === positionVar.origin.name
        ) {
            this.moveToBottle(el);
            let timer = setTimeout(()=>{
                this.backToOrigin(el);
            }, timeToStay);
        }
    },

    moveToCabinetAndBack: function (el, disable) {
        if(cameraMoved || disable) {
            return false;
        }
        if (
            stateIndex.getIn(['infusionSet', 'position']) === constants.infusionSet.position.ON_TABLE
            && (
                stateIndex.getIn(['infusionSet', 'withCap'])
                || stateIndex.getIn(['infusionSet', 'rollerClapOpen'])
            )
            && cameraPosition === positionVar.origin.name
        ) {
            this.moveToInfusionSetOpen(el);
            let timer = setTimeout(()=>{
                this.backToOrigin(el);
            }, timeToStay);
        }
    },

    moveToHolderAndBack: function (el, disable) {
        if(cameraMoved || disable) {
            return false;
        }
        if (
            stateIndex.getIn(['bottlePrepare', 'position']) === constants.bottle.position.HANGED
            && cameraPosition === positionVar.origin.name
        ) {
            this.moveToInfusionSetHanged(el);
            let timer = setTimeout(()=>{
                this.backToOrigin(el);
            }, timeToStay);
        }
    },

    moveToHandDisinfectionAndBack: function (el, disable) {
        if(cameraMoved || disable) {
            return false;
        }
        if (
            (stateIndex.getIn(['handDisinfection', 'finish']) === 0
                && stateIndex.getIn(['portfolio', 'finish']))
            ||
            (stateIndex.getIn(['handDisinfection', 'finish']) === 1
                && stateIndex.getIn(['tableDisinfection', 'finish']))
            && cameraPosition === positionVar.origin.name
        ) {
            this.moveToHandDisinfection(el);
            let timer = setTimeout(()=>{
                this.backToOrigin(el);
            }, timeToStay);
        }
    },

    backToOrigin: function(el) {
        aAnimationWrapper(el, '', 'position', '', positionVar.origin.position, moveTime, '', true, 'forwards');
        cameraPosition = positionVar.origin.name;
        cameraMoved = false;
    },

    moveToBottle: function (el) {
        aAnimationWrapper(el, '', 'position', '', positionVar.nacl500Bottle.position, moveTime, '', true, 'forwards');
        cameraPosition = positionVar.nacl500Bottle.name;
        cameraMoved = true;
    },

    moveToInfusionSetOpen: function (el) {
        aAnimationWrapper(el, '', 'position', '', positionVar.infusionSetOpen.position, moveTime, '', true, 'forwards');
        cameraPosition = positionVar.infusionSetOpen.name;
        cameraMoved = true;
    },

    moveToInfusionSetHanged: function (el) {
        aAnimationWrapper(el, '', 'position', '', positionVar.infusionSetHanged.position, moveTime, '', true, 'forwards');
        cameraPosition = positionVar.infusionSetHanged.name;
        cameraMoved = true;
    },

    moveToHandDisinfection: function (el) {
        aAnimationWrapper(el, '', 'position', '', positionVar.handDisinfectionHandle.position, moveTime, '', true, 'forwards');
        cameraPosition = positionVar.handDisinfectionHandle.name;
        cameraMoved = true;
    }
});