import $ from 'jquery';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import controllerStateIndex from '../utils/controllerState';
import { checkIsCapOpen } from "./clothBottleCapOpen";
import { controllerActions } from "../utils/controllerActions";
import stateIndex from './state';
import {setVisibleTrue} from "../utils/setVisible";

import { haveSthInHand } from "./controllerHand";



let clothInBottle;
let clothOnTable;

let activeController;

AFRAME.registerComponent('disinfection_cloth_on_table_vive', {

    init: function(){
        clothInBottle = document.querySelector('#clothInBottle');

        clothOnTable = this.el;

        $(clothOnTable).on('drop', () => {
            drop();
        })
    }
});

export function handleControllerNotifyClothOnTable ( triggerEvent ) {

    if (
        stateIndex.getIn(['tableDisinfection', 'finish'])
        || controllerStateIndex.getControllerState('disinfectionClothInHand')
    ) {
        return false;
    }

    getWorldBound(clothInBottle);
    activeController = triggerEvent.activeController;
    let activeControllerId = activeController.getAttribute('id');

    if (
        // Must have glove, before taking disinfection cloth
        (
            (
                activeControllerId === 'viveControllerLeft'
                && controllerStateIndex.getControllerState('hasGloveLeft')
                && haveSthInHand(activeController).length === 0
            )
            ||
            (
                activeControllerId === 'viveControllerRight'
                &&controllerStateIndex.getControllerState('hasGloveRight')
                && haveSthInHand(activeController).length === 0
            )
        )
        && checkIsCapOpen()
        && isEmitted(clothInBottle, triggerEvent.position)
    ) {
        console.log("isEmitted(clothInBottle, triggerEvent.position): ", isEmitted(clothInBottle, triggerEvent.position), typeof(isEmitted(clothInBottle, triggerEvent.position)));
        dragInHand();
        controllerStateIndex.setControllerState('disinfectionClothInHand', activeControllerId);
    }
}

function dragInHand() {
    let controllerActivities = new controllerActions(clothOnTable, activeController);
    controllerActivities.drag();
}

function drop() {
    let controllerActivities = new controllerActions(clothOnTable, activeController);
    controllerActivities.drop();
}