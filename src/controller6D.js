import $ from 'jquery';

import Observable from '../utils/observable';
import { getWordPosition } from "../utils/getWorldPositionAndBound";
import {haveSthInHand} from "./controllerHand";
import {playSubmitSound, playTeleportSound, playDropSound, playTeleportReleaseSound} from "./submitSound";

import { handleControllerNotifyCupboardDoor } from './doorOpen';
import { handleControllerNotifyCabinetDrawer } from './drawerOpenWithHandle';
import { handleControllerPressPortfolio, handleControllerReleasePortfolio} from './portfolio';
import { handleControllerReleaseToggleBoxPortfolio } from './toggleBoxPortfolio';
import { handleControllerNotifyHandDisinfection } from './handDisinfection';
import { handleControllerNotifyGlove } from './glove';
import { handleControllerNotifyClothInBottle } from './clothBottleCapVive';
import { handleControllerPressClothOnTable, handleControllerReleaseClothOnTable } from './disinfectionClothOnTableVive';
import { handleControllerReleaseToggleBoxTrashCan } from './toggleBoxTrashCan';
import { handleControllerPressBottleNacl500Vive, handleControllerReleaseBottleNacl500Vive } from './bottleNacl500Vive';
import { handleControllerReleaseToggleBoxNacl500OnDesk} from './toggleBoxNacl500OnDesk';
import { handleControllerReleaseToggleBoxNacl500Cap } from './toggleBoxNacl500Cap';
import { handleControllerPressBottleNacl500CapVive, handleControllerReleaseBottleNacl500CapVive } from './bottleNacl500CapVive';
import { handleControllerNotifyWasteBinCap } from './wasteBinCapOpen';
import { handleControllerReleaseToggleBoxWasteBin } from './toggleBoxWasteBin';
import { handleControllerPressInfusionSetInPack, handleControllerReleaseInfusionSetInPack } from './infusionSetInPackVive';
import { handleControllerReleaseToggleBoxInfusionSetOnDesk } from './toggleBoxInfusionSetOnDesk';
import { handleControllerPressInfusionSetOpen, handleControllerReleaseInfusionSetOpen } from './infusionSetOpenVive';
import { handleControllerNotifyToggleBoxInfusionSetCap } from './toggleBoxInfusionSetOpenWheel';
import { handleControllerPressInfusionSetCap, handleControllerReleaseInfusionSetCap } from './infusionSetCapVive';
import { handleControllerReleaseToggleBoxNacl500Hanged } from './toggleBoxNacl500Hanged';
import { handleControllerNotifyToggleBoxInfusionSetHangedChamber } from './toggleBoxInfusionSetHangedChamber';
import { handleControllerNotifyToggleBoxInfusionSetHangedWheel } from './toggleBoxInfusionSetHangedWheel';
import { handleControllerNotifyInfusionSetHangedFilledVive } from './infusionSetHangedFilledVive';
import { handleControllerPressNameLabelStamperVive, handleControllerReleaseNameLabelStamperVive } from './nameLabelStamperVive';
import { handleControllerReleaseToggleBoxNacl500NameLabel } from './toggleBoxNacl500NameLabel';
import { handleControllerNotifyToggleBoxNameLabelEmpty } from './toggleBoxNameLabelEmpty';
import { handleControllerNotifyToggleBoxSelectSection } from './toggleBoxSelectSection';
import { handleControllerPressControllerHand, handleControllerReleaseControllerHand } from './controllerHand';
import { handleControllerNotifyIndicatorBox } from './indicatorBox';
import { handleControllerNotifyPortfolioCheckVive } from './portfolioCheckVive';
import { handleControllerNotifyNacl500LabelCheckVive } from './nacl500LabelCheckVive';
import { handleControllerNotifyNacl500LiquidCheckVive } from './nacl500LiquidCheckVive';
import { handleControllerNotifyNacl500CapCheckVive } from './nacl500CapCheckVive';
import { handleControllerNotifyInfusionSetInPackCheckVive } from './infusionSetInPackCheckVive';
import { handleControllerReleaseNameLabelFilledVive, handleControllerPressNameLabelFilledVive } from './nameLabelFilledVive';
import { handleControllerNotifyToggleBoxPageBack } from './pageBack';

export default AFRAME.registerComponent('controller_6_d', {

    init: function(){

        const el = this.el;

        this.viveObserver = new Observable();
        this.viveObserverPress = new Observable();
        this.viveObserverRelease = new Observable();

        // Add function from observers
        this.viveObserver.subscribe(handleControllerNotifyCupboardDoor);
        this.viveObserver.subscribe(handleControllerNotifyCabinetDrawer);
        this.viveObserver.subscribe(handleControllerNotifyHandDisinfection);
        this.viveObserver.subscribe(handleControllerNotifyGlove);
        this.viveObserver.subscribe(handleControllerNotifyClothInBottle);
        this.viveObserver.subscribe(handleControllerNotifyWasteBinCap);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetCap);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetHangedChamber);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetHangedWheel);
        this.viveObserver.subscribe(handleControllerNotifyInfusionSetHangedFilledVive);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNameLabelEmpty);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxSelectSection);
        this.viveObserver.subscribe(handleControllerNotifyIndicatorBox);
        this.viveObserver.subscribe(handleControllerNotifyPortfolioCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyNacl500LabelCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyNacl500LiquidCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyNacl500CapCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyNacl500CapCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyInfusionSetInPackCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxPageBack);

        // Listen to 'triggerdown'
        this.viveObserverPress.subscribe(handleControllerPressPortfolio);
        this.viveObserverPress.subscribe(handleControllerPressControllerHand);
        this.viveObserverPress.subscribe(handleControllerPressBottleNacl500Vive);
        this.viveObserverPress.subscribe(handleControllerPressBottleNacl500CapVive);
        this.viveObserverPress.subscribe(handleControllerPressInfusionSetInPack);
        this.viveObserverPress.subscribe(handleControllerPressInfusionSetCap);
        this.viveObserverPress.subscribe(handleControllerPressInfusionSetOpen);
        this.viveObserverPress.subscribe(handleControllerPressNameLabelStamperVive);
        this.viveObserverPress.subscribe(handleControllerPressNameLabelFilledVive);
        this.viveObserverPress.subscribe(handleControllerPressClothOnTable);

        // listen to 'triggerup'
        this.viveObserverRelease.subscribe(handleControllerReleaseControllerHand);
        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxPortfolio);
        this.viveObserverRelease.subscribe(handleControllerReleasePortfolio);
        this.viveObserverRelease.subscribe(handleControllerReleaseClothOnTable);
        this.viveObserverRelease.subscribe(handleControllerReleaseBottleNacl500Vive);
        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxNacl500OnDesk);
        this.viveObserverRelease.subscribe(handleControllerReleaseBottleNacl500CapVive);
        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxWasteBin);
        this.viveObserverRelease.subscribe(handleControllerReleaseInfusionSetInPack);
        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxInfusionSetOnDesk);
        this.viveObserverRelease.subscribe(handleControllerReleaseInfusionSetCap);
        this.viveObserverRelease.subscribe(handleControllerReleaseInfusionSetOpen);
        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxNacl500Cap);
        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxNacl500Hanged);
        this.viveObserverRelease.subscribe(handleControllerReleaseNameLabelStamperVive);
        this.viveObserverRelease.subscribe(handleControllerReleaseNameLabelFilledVive);
        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxNacl500NameLabel);
        this.viveObserverRelease.subscribe(handleControllerReleaseToggleBoxTrashCan);

        $(el).on('triggerdown', () => {
            playSubmitSound();

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

            // trigger pressed
            this.viveObserverPress.notify(triggerEvent);
            // trigger clicked
            this.viveObserver.notify(triggerEvent);
        });

        $(el).on('triggerup', () => {
            playDropSound();

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

        $(el).on('trackpaddown', () => {
            playTeleportSound();
        });

        $(el).on('trackpadup', () => {
           playTeleportReleaseSound();
        });
    }
});


