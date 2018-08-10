import Observable from '../utils/observable';

import { handleControllerStateNotifyPortfolio } from '../src/portfolio';
import { handleControllerStateNotifyToggleBoxPortfolio } from '../src/toggleBoxPortfolio';
import { handleControllerStateNotifyToggleBoxTrashCan } from '../src/toggleBoxTrashCan';
import { handleControllerStateNotifyBottleNacl500Vive } from '../src/bottleNacl500Vive';
import { handleControllerStateNotifyToggleBoxNacl500OnDesk } from '../src/toggleBoxNacl500OnDesk';
import { handleControllerStateNotifyHookNacl500Label } from '../src/hookNacl500Label';
import { handleControllerStateNotifyHookNacl500Cap } from '../src/hookNacl500Cap';

const controllerState = {
    connectedController: '',
    portfolioInHand: false,
    hasGloveLeft: false,
    hasGloveRight: false,
    hasDisinfectionCloth: false,
    deskDisinfection: false,
    deskDisinfectionAllFinish: false,
    nacl500InHandToDesk: false,
    nacl500LabelChecked: false,
    nacl500LiquidChecked: false,
    nacl500CapChecked: false,
    nacl500OnDesk: false
};

export default class controllerStateIndex {

    static initControllerState() {

        this.controllerObserver = new Observable();
        // Add function from observers
        this.controllerObserver.subscribe(handleControllerStateNotifyPortfolio);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxPortfolio);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxTrashCan);
        this.controllerObserver.subscribe(handleControllerStateNotifyBottleNacl500Vive);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxNacl500OnDesk);
        this.controllerObserver.subscribe(handleControllerStateNotifyHookNacl500Label);
        this.controllerObserver.subscribe(handleControllerStateNotifyHookNacl500Cap);

        console.log("controllerState init");

    }

    /**
     * Get all controllerState.
     *
     * @returns {*}
     */
    static getAllControllerState() {
        return controllerState;
    }

    /**
     * Get the value of the prop in controllerState.
     *
     * @param propString
     * @returns {*}
     */
    static getControllerState(propString) {
        return controllerState[propString];
    }

    /**
     * Get the value of the props in controllerState in deep. Type of param should be array.
     *
     * @param propsArray
     * @returns {*}
     */
    static getInControllerState(propsArray) {
        const lengthOfProps = propsArray.length;
        let result = controllerState[propsArray[0]];
        if (lengthOfProps === 1) {
            return result;
        }
        else {
            for (let i = 1; i < lengthOfProps; i++) {
                result = result[propsArray[i]];
            }
        }
        return result;
    }

    /**
     * Set the prop as the given value.
     *
     * @param propString
     * @param value
     */
    static setControllerState(propString, value) {
        controllerState[propString] = value;
        this.controllerObserver.notify(controllerState);
        console.log("setControllerState", propString, value);
    }

    /**
     * Set the value of the props in controllerState in deep. Type of first param should be array.
     *
     * @param propsArray
     * @param value
     */
    // TODO: Ugly function, must to be rewrite
    static setInControllerState(propsArray, value) {
        const lengthOfProps = propsArray.length;

        // why controllerState already changed here, before switch???
        // console.log('before.setIn.controllerState:', controllerState);

        switch (lengthOfProps) {
            case 1:
                controllerState[propsArray[0]] = value;
                break;
            case 2:
                controllerState[propsArray[0]][propsArray[1]] = value;
                break;
            case 3:
                controllerState[propsArray[0]][propsArray[1]][propsArray[2]] = value;
                break;
            case 4:
                controllerState[propsArray[0]][propsArray[1]][propsArray[2]][propsArray[3]] = value;
                break;
        }

        this.controllerObserver.notify(controllerState);

    }

}