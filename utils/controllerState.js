import Observable from '../utils/observable';

import { handleControllerStateNotifyPortfolio } from '../src/portfolio';
import { handleControllerStateNotifyToggleBoxPortfolio } from '../src/toggleBoxPortfolio';
import { handleControllerStateNotifyToggleBoxTrashCan } from '../src/toggleBoxTrashCan';
import { handleControllerStateNotifyBottleNacl500Vive } from '../src/bottleNacl500Vive';
import { handleControllerStateNotifyToggleBoxNacl500OnDesk } from '../src/toggleBoxNacl500OnDesk';
import { handleControllerStateNotifyHookNacl500Label } from '../src/hookNacl500Label';
import { handleControllerStateNotifyHookNacl500Cap } from '../src/hookNacl500Cap';
import { handleControllerStateNotifyHookNacl500Liquid } from '../src/hookNacl500Liquid';
import { handleControllerStateNotifyToggleBoxNacl500Cap } from '../src/toggleBoxNacl500Cap';
import { handleControllerStateNotifyToggleBoxWasteBin } from '../src/toggleBoxWasteBin';
import { handleControllerStateNotifyInfusionSetInPack } from '../src/infusionSetInPackVive';
import { handleControllerStateNotifyToggleBoxInfusionSetInPack } from '../src/toggleBoxInfusionSetInPack';
import { handleControllerStateNotifyInfusionSetOpen } from '../src/infusionSetOpenVive';
import { handleControllerStateNotifyToggleBoxInfusionSetOnDesk } from '../src/toggleBoxInfusionSetOnDesk';
import { handleControllerStateNotifyInfusionSetCap } from '../src/infusionSetCapVive';
import { handleControllerStateNotifyToggleBoxNacl500Hanged } from '../src/toggleBoxNacl500Hanged';
import { handleControllerStateNotifyInfusionSetHangedVive } from '../src/infusionSetHangedVive';
import { handleControllerStateNotifyToggleBoxInfusionSetHangedChamber } from '../src/toggleBoxInfusionSetHangedChamber';
import { handleControllerStateNotifyToggleBoxInfusionSetHangedWheel } from '../src/toggleBoxInfusionSetHangedWheel';
import { handleControllerStateNotifyInfusionSetHangedFilledVive } from '../src/infusionSetHangedFilledVive';
import { handleControllerStateNotifyNameLabelStamperVive } from '../src/nameLabelStamperVive';
import { handleControllerStateNotifyToggleBoxNacl500NameLabel } from '../src/toggleBoxNacl500NameLabel';
import { handleControllerStateNotifyToggleBoxNameLabelEmpty } from '../src/toggleBoxNameLabelEmpty';
import { handleControllerStateNotifyRaycasterVive } from '../src/raycasterVive';


const controllerState = {
    connectedController: '',

    isPortfolioHandling: false,
    portfolioInHand: null,

    hasGloveLeft: false,
    hasGloveRight: false,
    disinfectionClothInHand: null,
    deskDisinfection: false,
    deskDisinfectionAllFinish: false,

    nacl500Dragable: true,
    nacl500InHandToDesk: null,
    nacl500LabelChecked: false,
    nacl500LiquidChecked: false,
    nacl500CapChecked: false,
    nacl500OnDesk: false,
    nacl500NoHookAnymore: false,
    bottleNacl500CapInHand: null,
    bottleNacl500CapDroped: false,
    bottleOpened: false,

    infusionSetInPackInHand: null,
    infusionSetChecked: false,
    infusionSetOnDeskOpened: false,
    infusionSetCapInHand: null,
    infusionSetCapOff: false,
    infusionSetOpenInHand: null,
    infusionSetInBottle: false,

    nacl500InHandToStand: null,
    nacl500Hanged: false,
    dripChamberFilled: false,
    infusionSetWheelClosed: false,
    // infusionSetHangedFilled: false,
    tubeFixed: false,

    nameLabelInHand: null,
    nameLabelFilled: false,
    nameLabelPasted: false
};

export function setControllerStateToSection(section) {
    let selectedControllerstate = {

        portfolioInHand: null,

        hasGloveLeft: false,
        hasGloveRight: false,
        disinfectionClothInHand: null,
        deskDisinfection: section >= 3,
        deskDisinfectionAllFinish: section >= 4,

        // important
        nacl500Dragable: section <= 4,

        nacl500InHandToDesk: null,
        nacl500LabelChecked: section >= 5,
        nacl500LiquidChecked: section >= 5,
        nacl500CapChecked: section >= 5,
        nacl500OnDesk: section >= 5,
        nacl500NoHookAnymore: section >= 5,
        bottleNacl500CapInHand: null,
        bottleNacl500CapDroped: section >= 5,
        bottleOpened: false, // seem not needed

        infusionSetInPackInHand: null,
        infusionSetChecked: section >= 6,
        infusionSetOnDeskOpened: section >= 6,
        infusionSetCapInHand: null,
        infusionSetCapOff: section >= 6,
        infusionSetOpenInHand: null,
        infusionSetInBottle: section >= 7,

        nacl500InHandToStand: null,
        nacl500Hanged: section >= 7,
        dripChamberFilled: section >= 7,
        infusionSetWheelClosed: section === 6,
        // infusionSetHangedFilled: section >= 7,
        tubeFixed: section >= 7,

        nameLabelInHand: null,
        nameLabelFilled: section > 7,
        nameLabelPasted: section > 7
    };

    Object.assign(controllerState, selectedControllerstate);
    
    console.log("controllerState: ", controllerState, typeof(controllerState));
}


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
        this.controllerObserver.subscribe(handleControllerStateNotifyHookNacl500Liquid);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxNacl500Cap);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxWasteBin);
        this.controllerObserver.subscribe(handleControllerStateNotifyInfusionSetInPack);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxInfusionSetInPack);
        this.controllerObserver.subscribe(handleControllerStateNotifyInfusionSetOpen);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxInfusionSetOnDesk);
        this.controllerObserver.subscribe(handleControllerStateNotifyInfusionSetCap);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxNacl500Hanged);
        this.controllerObserver.subscribe(handleControllerStateNotifyInfusionSetHangedVive);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxInfusionSetHangedChamber);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxInfusionSetHangedWheel);
        this.controllerObserver.subscribe(handleControllerStateNotifyInfusionSetHangedFilledVive);
        this.controllerObserver.subscribe(handleControllerStateNotifyNameLabelStamperVive);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxNacl500NameLabel);
        this.controllerObserver.subscribe(handleControllerStateNotifyToggleBoxNameLabelEmpty);
        this.controllerObserver.subscribe(handleControllerStateNotifyRaycasterVive);

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
        console.log("controllerState: ", controllerState, typeof(controllerState));
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