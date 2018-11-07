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
           this.changLineColor('orange');
        });

    },

    changLineColor: function (color) {
        element.setAttribute('line', `color: ${color}`);
    }

});

export function handleNotifyRaycasterVive(nextState) {

    // portfolio
    portfolioChecked = is5RChecked();
    if (portfolioChecked) {
        element.setAttribute('visible', false);
    }

    // deep copy
    currentState = _.cloneDeep
}

export function handleControllerStateNotifyRaycasterVive (nextControllerState) {

    // portfolio
    if (
        nextControllerState.portfolioInHand
        && !currentControllerState.portfolioInHand
        && !portfolioChecked
    ) {
        element.setAttribute('visible', true);
    }

    // bottle
    if (
        nextControllerState.nacl500InHandToDesk !== null
        &&
        (!nextControllerState.nacl500LabelChecked
            || !nextControllerState.nacl500LiquidChecked
            || !nextControllerState.nacl500CapChecked
        )
    ) {
        element.setAttribute('visible', true);
    }

    if (
        portfolioChecked
    ) {
        if (nextControllerState.infusionSetChecked) {
            if (
                nextControllerState.nacl500LabelChecked
                && nextControllerState.nacl500LiquidChecked
                && nextControllerState.nacl500CapChecked
            ) {
                if(element) {
                    element.setAttribute('visible', false);
                }
            }
        }
        else {
            if (
                nextControllerState.nacl500LabelChecked
                && nextControllerState.nacl500LiquidChecked
                && nextControllerState.nacl500CapChecked
                && nextControllerState.infusionSetInPackInHand === null
            ) {
                if(element) {
                    element.setAttribute('visible', false);
                }
            }
        }
    }

    // infusion set
    if (
        nextControllerState.infusionSetInPackInHand !== null
        && !nextControllerState.infusionSetChecked
    ) {
        element.setAttribute('visible', true);
    }
    if (
        portfolioChecked
    ) {
        if (
            nextControllerState.nacl500LabelChecked
            && nextControllerState.nacl500LiquidChecked
            && nextControllerState.nacl500CapChecked
        ) {
            if (nextControllerState.infusionSetChecked) {
                if(element) {
                    element.setAttribute('visible', false);
                }
            }
        }
        else {
            if (
                nextControllerState.infusionSetChecked
                && nextControllerState.nacl500InHandToDesk === null
            ) {
                if(element) {
                    element.setAttribute('visible', false);
                }
            }
        }


    }

    // deep copy
    currentControllerState = _.cloneDeep(controllerStateIndex.getAllControllerState());
}