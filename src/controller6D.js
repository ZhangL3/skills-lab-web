import $ from 'jquery';

import Observable from '../utils/observable';
import { getWordPosition } from "../utils/getWorldPositionAndBound";
import {haveSthInHand} from "./controllerHand";

import { handleControllerNotifyCupboardDoor } from './doorOpen';
import { handleControllerNotifyCabinetDrawer } from './drawerOpenWithHandle';
import { handleControllerNotifyPortfolio, handleControllerPressPortfolio, handleControllerReleasePortfolio} from './portfolio';
import { handleControllerNotifyToggleBoxPortfolioCheck } from './toggleBoxPortfolioCheck';
import { handleControllerNotifyToggleBoxPortfolio, handleControllerReleaseToggleBoxPortfolio } from './toggleBoxPortfolio';
import { handleControllerNotifyHandDisinfection } from './handDisinfection';
import { handleControllerNotifyGlove } from './glove';
import { handleControllerNotifyClothInBottle } from './clothBottleCapVive';
import { handleControllerNotifyClothOnTable } from './disinfectionClothOnTableVive';
import { handleControllerNotifyToggleBoxDeskDisinfection } from './toggleBoxDeskDisinfection';
import { handleControllerNotifyToggleBoxTrashCan } from './toggleBoxTrashCan';
import { handleControllerNotifyBottleNacl500Vive, handleControllerPressBottleNacl500Vive, handleControllerReleaseBottleNacl500Vive } from './bottleNacl500Vive';
import { handleControllerNotifyToggleBoxNacl500OnDesk, handleControllerReleaseToggleBoxNacl500OnDesk} from './toggleBoxNacl500OnDesk';
import { handleControllerNotifyToggleBoxNacl500Label } from './toggleBoxNacl500Label';
import { handleControllerNotifyToggleBoxNacl500Cap, handleControllerPressToggleBoxNacl500Cap } from './toggleBoxNacl500Cap';
import { handleControllerPressBottleNacl500CapVive, handleControllerReleaseBottleNacl500CapVive } from './bottleNacl500CapVive';

import { handleControllerNotifyToggleBoxNacl500Liquid } from './toggleBoxNacl500Liquid';
import { handleControllerNotifyWasteBinCap } from './wasteBinCapOpen';
import { handleControllerNotifyToggleBoxWasteBin, handleControllerReleaseToggleBoxWasteBin } from './toggleBoxWasteBin';
import { handleControllerNotifyInfusionSetInPack, handleControllerPressInfusionSetInPack, handleControllerReleaseInfusionSetInPack } from './infusionSetInPackVive';
import { handleControllerNotifyToggleBoxInfusionSetInPack } from './toggleBoxInfusionSetInPack';
import { handleControllerNotifyToggleBoxInfusionSetOnDesk, handleControllerReleaseToggleBoxInfusionSetOnDesk } from './toggleBoxInfusionSetOnDesk';
import { handleControllerNotifyInfusionSetOpen } from './infusionSetOpenVive';
import { handleControllerNotifyToggleBoxInfusionSetCap } from './toggleBoxInfusionSetOpenWheel';
import { handleControllerNotifyInfusionSetCap } from './infusionSetCapVive';
import { handleControllerNotifyToggleBoxNacl500Hanged } from './toggleBoxNacl500Hanged';
import { handleControllerNotifyToggleBoxInfusionSetHangedChamber } from './toggleBoxInfusionSetHangedChamber';
import { handleControllerNotifyToggleBoxInfusionSetHangedWheel } from './toggleBoxInfusionSetHangedWheel';
import { handleControllerNotifyInfusionSetHangedFilledVive } from './infusionSetHangedFilledVive';
import { handleControllerNotifyNameLabelStamperVive } from './nameLabelStamperVive';
import { handleControllerNotifyToggleBoxNacl500NameLabel } from './toggleBoxNacl500NameLabel';
import { handleControllerNotifyToggleBoxNameLabelEmpty } from './toggleBoxNameLabelEmpty';
import { handleControllerNotifyToggleBoxSelectSection } from './toggleBoxSelectSection';
import { handleControllerNotifyControllerHand,handleControllerPressControllerHand, handleControllerReleaseControllerHand } from './controllerHand';
import { handleControllerNotifyIndicatorBox } from './indicatorBox';
import { handleControllerNotifyPortfolioCheckVive } from './portfolioCheckVive';
import { handleControllerNotifyNacl500LabelCheckVive } from './nacl500LabelCheckVive';
import { handleControllerNotifyNacl500LiquidCheckVive } from './nacl500LiquidCheckVive';
import { handleControllerNotifyNacl500CapCheckVive } from './nacl500CapCheckVive';
import { handleControllerNotifyInfusionSetInPackCheckVive } from './infusionSetInPackCheckVive';
import { handleControllerNotifyNacl500DoorOpen } from './nacl500DoorOpen';

export default AFRAME.registerComponent('controller_6_d', {

    init: function(){

        const el = this.el;

        this.viveObserver = new Observable();
        this.viveObserverPress = new Observable();
        this.viveObserverRelease = new Observable();

        // Add function from observers
        this.viveObserver.subscribe(handleControllerNotifyCupboardDoor);
        this.viveObserver.subscribe(handleControllerNotifyCabinetDrawer);
        // this.viveObserver.subscribe(handleControllerNotifyPortfolio);
        // this.viveObserver.subscribe(handleControllerNotifyToggleBoxPortfolioCheck);
        // this.viveObserver.subscribe(handleControllerNotifyToggleBoxPortfolio);
        this.viveObserver.subscribe(handleControllerNotifyHandDisinfection);
        this.viveObserver.subscribe(handleControllerNotifyGlove);
        this.viveObserver.subscribe(handleControllerNotifyClothInBottle);
        this.viveObserver.subscribe(handleControllerNotifyClothOnTable);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxDeskDisinfection);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxTrashCan);
        // this.viveObserver.subscribe(handleControllerNotifyBottleNacl500Vive);
        // this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500OnDesk);
        // this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500Label);
        // this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500Cap);
        // this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500Liquid);
        this.viveObserver.subscribe(handleControllerNotifyWasteBinCap);
        // this.viveObserver.subscribe(handleControllerNotifyToggleBoxWasteBin);
        // this.viveObserver.subscribe(handleControllerNotifyInfusionSetInPack);
        // this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetInPack);
        // this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetOnDesk);
        this.viveObserver.subscribe(handleControllerNotifyInfusionSetOpen);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetCap);
        this.viveObserver.subscribe(handleControllerNotifyInfusionSetCap);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500Hanged);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetHangedChamber);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetHangedWheel);
        this.viveObserver.subscribe(handleControllerNotifyInfusionSetHangedFilledVive);
        this.viveObserver.subscribe(handleControllerNotifyNameLabelStamperVive);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500NameLabel);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNameLabelEmpty);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxSelectSection);
        this.viveObserver.subscribe(handleControllerNotifyControllerHand);
        this.viveObserver.subscribe(handleControllerNotifyIndicatorBox);
        this.viveObserver.subscribe(handleControllerNotifyPortfolioCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyNacl500LabelCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyNacl500LiquidCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyNacl500CapCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyNacl500CapCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyInfusionSetInPackCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyNacl500DoorOpen);

        this.viveObserverPress.subscribe(handleControllerPressPortfolio);
        this.viveObserverPress.subscribe(handleControllerPressControllerHand);
        this.viveObserverPress.subscribe(handleControllerPressBottleNacl500Vive);
        // this.viveObserverPress.subscribe(handleControllerPressToggleBoxNacl500Cap);
        this.viveObserverPress.subscribe(handleControllerPressBottleNacl500CapVive);
        this.viveObserverPress.subscribe(handleControllerPressInfusionSetInPack);

        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxPortfolio);
        this.viveObserverRelease.subscribe(handleControllerReleasePortfolio);
        this.viveObserverRelease.subscribe(handleControllerReleaseControllerHand);
        this.viveObserverRelease.subscribe(handleControllerPressBottleNacl500Vive);
        this.viveObserverRelease.subscribe(handleControllerReleaseBottleNacl500Vive);
        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxNacl500OnDesk);
        this.viveObserverRelease.subscribe(handleControllerReleaseBottleNacl500CapVive);
        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxWasteBin);
        this.viveObserverRelease.subscribe(handleControllerReleaseInfusionSetInPack);
        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxInfusionSetOnDesk);

        $(el).on('triggerdown', () => {

            console.log("triggerDown: ");

            let handIndicator;
            if (el.getAttribute('id') === 'viveControllerRight') {
                handIndicator=document.querySelector('#rightHandIndicator');
            }
            else if (el.getAttribute('id') === 'viveControllerLeft') {
                handIndicator=document.querySelector('#leftHandIndicator');
            }

            // If object ist not exactly in hand, the trigger position is the location of object
            const triggerPosition = haveSthInHand(el).length > 0 ?
                getWordPosition(handIndicator) : getWordPosition(el);

            const triggerEvent = {
                eventName: 'triggerDown',
                position: triggerPosition,
                activeController: el
            };

            // TODO: active the action triggerdown
            this.viveObserver.notify(triggerEvent);

        });

        $(el).on('triggerdown', () => {
            console.log("trigger pressed!!!");

            let handIndicator;
            if (el.getAttribute('id') === 'viveControllerRight') {
                handIndicator=document.querySelector('#rightHandIndicator');
            }
            else if (el.getAttribute('id') === 'viveControllerLeft') {
                handIndicator=document.querySelector('#leftHandIndicator');
            }

            const triggerPosition = haveSthInHand(el).length > 0 ?
                getWordPosition(handIndicator) : getWordPosition(el);

            const triggerEvent = {
                eventName: 'triggerPress',
                position: triggerPosition,
                activeController: el
            };

            this.viveObserverPress.notify(triggerEvent);
        });

        $(el).on('triggerup', () => {
            console.log("trigger released!!!");

            let handIndicator;
            if (el.getAttribute('id') === 'viveControllerRight') {
                handIndicator=document.querySelector('#rightHandIndicator');
            }
            else if (el.getAttribute('id') === 'viveControllerLeft') {
                handIndicator=document.querySelector('#leftHandIndicator');
            }

            const triggerPosition = haveSthInHand(el).length > 0 ?
                getWordPosition(handIndicator) : getWordPosition(el);

            const triggerEvent = {
                eventName: 'triggerRelease',
                position: triggerPosition,
                activeController: el
            };

            this.viveObserverRelease.notify(triggerEvent);
        });

        el.addEventListener('teleported', (event) => {

        });
    }
});


