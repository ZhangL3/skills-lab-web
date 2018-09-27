import $ from 'jquery';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import controllerStateIndex from '../utils/controllerState';
import { checkIsCapOpen } from "./clothBottleCapOpen";
import { controllerActions } from "../utils/controllerActions";
import stateIndex from './state';
import {setVisibleTrue} from "../utils/setVisible";


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
        (controllerStateIndex.getControllerState('hasGloveLeft')
        || controllerStateIndex.getControllerState('hasGloveRight'))
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