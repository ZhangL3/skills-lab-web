import $ from 'jquery';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import {detectCollision, isEmitted} from "../utils/isEmitted";
import controllerStateIndex from '../utils/controllerState';
import { checkIsCapOpen } from "./clothBottleCapOpen";
import { controllerActions } from "../utils/controllerActions";
import stateIndex from './state';
import {setVisibleTrue} from "../utils/setVisible";

import { haveSthInHand } from "./controllerHand";
import dropDown from "../utils/dropDown";
import hints from '../utils/hints';
import hasCollisionWithCabinets from "../utils/hasCollisionWithCabinets";


let clothInBottle;
let clothOnTable;
let toggleBoxTrashCan;
let toggleBoxDeskLeft;
let toggleBoxDeskRight;

let activeController;
let isClothInHand = false;

let isToggleBoxDeskLeftChecked = false;
let isToggleBoxDeskRightChecked = false;
let tmpInterval;

AFRAME.registerComponent('disinfection_cloth_on_table_vive', {

    init: function(){
        clothInBottle = document.querySelector('#clothInBottle');

        clothOnTable = this.el;
        toggleBoxTrashCan = document.querySelector('#toggleBoxTrashCan');
        toggleBoxDeskLeft = document.querySelector('#toggleBoxDeskLeft');
        toggleBoxDeskRight = document.querySelector('#toggleBoxDeskRight');

        $(clothOnTable).on('drop', () => {
            drop();
        });
    }
});

export function handleControllerNotifyClothOnTable ( triggerEvent ) {

    /*if (
        stateIndex.getIn(['tableDisinfection', 'finish'])
        || controllerStateIndex.getControllerState('disinfectionClothInHand')
    ) {
        return false;
    }

    // getWorldBound(clothInBottle);
    activeController = triggerEvent.activeController;
    let activeControllerId = activeController.getAttribute('id');

    if (
        // Must have gloves, before taking disinfection cloth
        (
            activeControllerId
            && controllerStateIndex.getControllerState('hasGloveLeft')
            && controllerStateIndex.getControllerState('hasGloveRight')
            && haveSthInHand(activeController).length === 0
        )
        && checkIsCapOpen()
        // && isEmitted(clothInBottle, triggerEvent.position)
        && detectCollision(clothInBottle, activeController)
    ) {
        console.log("isEmitted(clothInBottle, triggerEvent.position): ", isEmitted(clothInBottle, triggerEvent.position), typeof(isEmitted(clothInBottle, triggerEvent.position)));
        dragInHand();
        controllerStateIndex.setControllerState('disinfectionClothInHand', activeControllerId);
    }*/
}

export function handleControllerPressClothOnTable ( triggerEvent ) {

    if (
        stateIndex.getIn(['tableDisinfection', 'finish'])
    ) {
        return false;
    }

    activeController = triggerEvent.activeController;
    let activeControllerId = activeController.getAttribute('id');

    // Take cloth from bottle
    if (
        // Must have gloves, before taking disinfection cloth
        (
            activeControllerId
            && controllerStateIndex.getControllerState('hasGloveLeft')
            && controllerStateIndex.getControllerState('hasGloveRight')
            && haveSthInHand(activeController).length === 0
        )
        && checkIsCapOpen()
        && detectCollision(clothInBottle, activeController)
        && !controllerStateIndex.getControllerState('isDisinfectionClothHandling')
    ) {
        controllerStateIndex.setControllerState('disinfectionClothInHand', activeControllerId);
        controllerStateIndex.setControllerState('isDisinfectionClothHandling', true);
        // Desk disinfection
        controllerStateIndex.setControllerState('disinfectionClothInHand', activeControllerId);
        tmpInterval = setInterval(() => {
            deskDisinfection();
        }, 500);
        stateIndex.set('hint', hints.deskDisinfection);
    }

    // Pick up cloth
    if (
        detectCollision(clothOnTable, activeController)
        && !controllerStateIndex.getControllerState('disinfectionClothInHand')
        && controllerStateIndex.getControllerState('isDisinfectionClothHandling')
        && !isClothInHand
    ) {
        controllerStateIndex.setControllerState('disinfectionClothInHand', activeControllerId);
        tmpInterval = setInterval(() => {
            deskDisinfection();
        }, 500);
    }
}

export function handleControllerReleaseClothOnTable ( triggerEvent ) {
    if (
        stateIndex.getIn(['tableDisinfection', 'finish'])
    ) {
        return false;
    }

    activeController = triggerEvent.activeController;

    if (
        controllerStateIndex.getControllerState('disinfectionClothInHand') === activeController.getAttribute('id')
        && controllerStateIndex.getControllerState('isDisinfectionClothHandling')
        && isClothInHand
        && !detectCollision(toggleBoxTrashCan, activeController)
        && !hasCollisionWithCabinets(clothOnTable)
    ) {
        controllerStateIndex.setControllerState('disinfectionClothInHand', null);
    }
}

export function handleControllerStateClothOnTable ( nextState ) {
    if (
        stateIndex.getIn(['tableDisinfection', 'finish'])
        || !nextState.isDisinfectionClothHandling
    ) {
        return false;
    }

    // Drag in hand
    if (
        nextState.disinfectionClothInHand
        && !isClothInHand
    ) {
        dragInHand();
        // tmpInterval = setInterval(() => {
        //     if (
        //         deskDisinfection()
        //     ) {
        //         controllerStateIndex.setControllerState('deskDisinfection', true);
        //         clearInterval(tmpInterval);
        //     }
        // }, 10);
    }
    // Drop
    else if (
        !nextState.disinfectionClothInHand
        && isClothInHand
    ) {
        // drop();
        fallDown(clothOnTable);
    }
}

function deskDisinfection() {
    if (
        detectCollision(clothOnTable, toggleBoxDeskLeft)
    ) {
        isToggleBoxDeskLeftChecked = true;
        console.log("isToggleBoxDeskLeftChecked: ", isToggleBoxDeskLeftChecked, typeof(isToggleBoxDeskLeftChecked));
    }
    if (
        detectCollision(clothOnTable, toggleBoxDeskRight)
    ) {
        isToggleBoxDeskRightChecked = true;
        console.log("isToggleBoxDeskRightChecked: ", isToggleBoxDeskRightChecked, typeof(isToggleBoxDeskRightChecked));
    }

    if (
        isToggleBoxDeskLeftChecked
        && isToggleBoxDeskRightChecked
        && !controllerStateIndex.getControllerState('deskDisinfection')
    ) {
        controllerStateIndex.setControllerState('deskDisinfection', true);
        clearInterval(tmpInterval);
    }
}

function dragInHand() {
    let controllerActivities = new controllerActions(clothOnTable, activeController);
    controllerActivities.drag();
    isClothInHand = true;
}

function drop() {
    let controllerActivities = new controllerActions(clothOnTable, activeController);
    controllerActivities.drop();
    isClothInHand = false;
    clearInterval(tmpInterval);
}

function fallDown(cloth) {
    drop();
    setTimeout(()=>{
        dropDown(cloth, 0.05);
    }, 100);
}
