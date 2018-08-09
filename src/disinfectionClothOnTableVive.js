import $ from 'jquery';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import controllerStateIndex from '../utils/controllerState';
import { checkIsCapOpen } from "./clothBottleCapOpen";
import { controllerActions } from "../utils/controllerActions";
import {setVisibleTrue} from "../utils/setVisible";


let clothInBottle;
let clothOnTable;

let activeController;
let timeInterval;
let controllerActivities;


AFRAME.registerComponent('disinfection_cloth_on_table_vive', {

    init: function(){
        clothInBottle = document.querySelector('#clothInBottle');

        controllerActivities = null;

        clothOnTable = this.el;

        $(clothOnTable).on('drop', () => {
            drop();
        })
    }
});

export function handleControllerNotifyClothOnTable ( triggerEvent ) {
    getWorldBound(clothInBottle);
    activeController = triggerEvent.activeController;

    if (checkIsCapOpen() && isEmitted(clothInBottle, triggerEvent.position)) {
        dragInHand();
        controllerStateIndex.setControllerState('hasDisinfectionCloth', true);
    }
}

function dragInHand() {
    controllerActivities = new controllerActions(clothOnTable, activeController);
    controllerActivities.drag();
}

function drop() {
    controllerActivities = new controllerActions(clothOnTable, activeController);
    controllerActivities.drop();
}