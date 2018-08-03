import $ from 'jquery';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from "../utils/isEmitted";
import { controllerStateIndex } from '../utils/controllerState';

let clothInBottle;
let clothOnTable;

let activeController;
let timeInterval;

AFRAME.registerComponent('disinfection_cloth_on_table_vive', {

    init: function(){
        clothInBottle = document.querySelector('#clothInBottle');

        console.log("clothInBottle: ", clothInBottle, typeof(clothInBottle));

        clothOnTable = this.el;
    }
});

export function handleControllerNotifyClothOnTable ( triggerEvent ) {
    getWorldBound(clothInBottle);
    activeController = triggerEvent.activeController;

    if (isEmitted(clothInBottle, triggerEvent.position)) {
        dragInHand();
        controllerStateIndex.setControllerState('hasDisinfectionCloth', true);
    }

}

function dragInHand(targetParent=null, scale='1 1 1', position='0 0 0') {

    let activePosition = activeController.getAttribute('position');

    console.log("activePosition: ", activePosition, typeof(activePosition));

    clothOnTable.setAttribute('visible', true);

    timeInterval = setInterval(() => {
        clothOnTable.setAttribute('position', `${activePosition.x} ${activePosition.y + 0.04} ${activePosition.z}`);

    }, 40);
}

function drop(element) {
    clearInterval(timeInterval);
    element.setAttribute('position', schema.positionAfterCheckVive);
}