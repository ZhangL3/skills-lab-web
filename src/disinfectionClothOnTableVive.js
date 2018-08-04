import $ from 'jquery';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import controllerStateIndex from '../utils/controllerState';
import { checkIsCapOpen } from "./clothBottleCapOpen";

let clothInBottle;
let clothOnTable;

let activeController;
let timeInterval;

AFRAME.registerComponent('disinfection_cloth_on_table_vive', {

    init: function(){
        clothInBottle = document.querySelector('#clothInBottle');

        console.log("clothInBottle: ", clothInBottle, typeof(clothInBottle));

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

function dragInHand(targetParent=null, scale='1 1 1', position='0 0 0') {

    let activePosition = activeController.getAttribute('position');

    clothOnTable.setAttribute('visible', true);

    timeInterval = setInterval(() => {
        clothOnTable.setAttribute('position', `${activePosition.x} ${activePosition.y + 0.04} ${activePosition.z}`);

    }, 40);
}

function drop() {
    clearInterval(timeInterval);
}