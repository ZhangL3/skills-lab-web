import $ from 'jquery';

import Observable from '../utils/observable';
import { getWordPosition } from "../utils/getWorldPositionAndBound";

import { handleControllerNotifyCupboardDoor } from './doorOpen';
import { handleControllerNotifyCabinetDrawer } from './drawerOpenWithHandle';
import { handleControllerNotifyPortfolio } from './portfolio';
import { handleControllerNotifyPortfolioCheckVive } from './toggleBoxPortfolioCheck';
import { handleControllerNotifyToggleBoxPortfolio } from './toggleBoxPortfolio';
import { handleControllerNotifyHandDisinfection } from './handDisinfection';
import { handleControllerNotifyGlove } from './glove';
import { handleControllerNotifyClothInBottle } from './clothBottleCapVive';
import { handleControllerNotifyClothOnTable } from './disinfectionClothOnTableVive';
import { handleControllerNotifyToggleBoxDeskDisinfection } from './toggleBoxDeskDisinfection';
import { handleControllerNotifyToggleBoxTrashCan } from './toggleBoxTrashCan';
import { handleControllerNotifyBottleNacl500Vive } from './bottleNacl500Vive';
import { handleControllerNotifyToggleBoxNacl500OnDesk } from './toggleBoxNacl500OnDesk';
import { handleControllerNotifyToggleBoxNacl500Label } from './toggleBoxNacl500Label';
import { handleControllerNotifyToggleBoxNacl500Cap } from './toggleBoxNacl500Cap';
import { handleControllerNotifyToggleBoxNacl500Liquid } from './toggleBoxNacl500Liquid';
import { handleControllerNotifyWasteBinCap } from './wasteBinCapOpen';
import { handleControllerNotifyToggleBoxWasteBin } from './toggleBoxWasteBin';
import { handleControllerNotifyInfusionSetInPack } from './infusionSetInPackVive';
import { handleControllerNotifyToggleBoxInfusionSetInPack } from './toggleBoxInfusionSetInPack';
import { handleControllerNotifyToggleBoxInfusionSetOnDesk } from './toggleBoxInfusionSetOnDesk';
import { handleControllerNotifyInfusionSetOpen } from './infusionSetOpenVive';
import { handleControllerNotifyToggleBoxInfusionSetCap } from './toggleBoxInfusionSetOpenWheel';
import { handleControllerNotifyInfusionSetCap } from './infusionSetCap';
import { handleControllerNotifyToggleBoxNacl500Hanged } from './toggleBoxNacl500Hanged';
import { handleControllerNotifyToggleBoxInfusionSetHangedChamber } from './toggleBoxInfusionSetHangedChamber';

export default AFRAME.registerComponent('controller_6_d', {

    init: function(){

        this.viveObserver = new Observable();

        // Add function from observers
        this.viveObserver.subscribe(handleControllerNotifyCupboardDoor);
        this.viveObserver.subscribe(handleControllerNotifyCabinetDrawer);
        this.viveObserver.subscribe(handleControllerNotifyPortfolio);
        this.viveObserver.subscribe(handleControllerNotifyPortfolioCheckVive);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxPortfolio);
        this.viveObserver.subscribe(handleControllerNotifyHandDisinfection);
        this.viveObserver.subscribe(handleControllerNotifyGlove);
        this.viveObserver.subscribe(handleControllerNotifyClothInBottle);
        this.viveObserver.subscribe(handleControllerNotifyClothOnTable);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxDeskDisinfection);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxTrashCan);
        this.viveObserver.subscribe(handleControllerNotifyBottleNacl500Vive);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500OnDesk);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500Label);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500Cap);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500Liquid);
        this.viveObserver.subscribe(handleControllerNotifyWasteBinCap);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxWasteBin);
        this.viveObserver.subscribe(handleControllerNotifyInfusionSetInPack);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetInPack);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetOnDesk);
        this.viveObserver.subscribe(handleControllerNotifyInfusionSetOpen);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetCap);
        this.viveObserver.subscribe(handleControllerNotifyInfusionSetCap);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500Hanged);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxInfusionSetHangedChamber);

        $(this.el).on('triggerdown', () => {

            console.log("triggerDown");
            
            const triggerPosition = getWordPosition(this.el);

            const triggerEvent = {
                eventName: 'triggerDown',
                position: triggerPosition,
                activeController: this.el
            };

            this.viveObserver.notify(triggerEvent);

        });

        this.el.addEventListener('teleported', (event) => {

        });
    }
});


