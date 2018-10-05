import statIndes from './state';
import controllerStateIndex from '../utils/controllerState';
import {is5RChecked} from "./portfolio";

let element;
let portfolioChecked = false;
let currentState;
let currentControllerState;

AFRAME.registerComponent('raycaster_vive', {

    init: function () {
        element = this.el;

        // deep copy
        currentState = _.cloneDeep;

        // deep copy
        currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());

        element.addEventListener('raycaster-intersection', (event) => {
            this.changLineColor('green');
        });

        element.addEventListener('raycaster-intersection-cleared', (event) => {
           this.changLineColor('red');
        });

    },

    changLineColor: function (color) {
        element.setAttribute('line', `color: ${color}`);
    }

});

export function handleNotifyRaycasterVive(nextState) {

    portfolioChecked = is5RChecked();

    if (portfolioChecked) {
        element.setAttribute('visible', false);
    }


    // deep copy
    currentState = _.cloneDeep
}

export function handleControllerStateNotifyRaycasterVive (nextControllerState) {

    if (
        nextControllerState.portfolioInHand
        && !currentControllerState.portfolioInHand
    ) {
        element.setAttribute('visible', true);
    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}