import $ from 'jquery';

import Observable from '../utils/observable';

import { handleControllerNotifyCupboardDoor } from './doorOpen';
import { handleControllerNotifyCabinetDrawer } from './drawerOpenWithHandle';
import { handleControllerNotifyPortfolio } from './portfolio';
import { handleControllerNotifyPortfolioCheckVive } from './toggleBoxPortfolioCheck';
import { handleControllerNotifyToggleBoxPortfolio } from './toggleBoxPortfolio';
import { handleControllerNotifyHandDisinfection } from './handDisinfection';
import { handleControllerNotifyGlove } from './glove';
import { handleControllerNotifyClothInBottle } from './clothBottleCapVive';
import { handleControllerNotifyClothOnTable } from './disinfectionClothOnTableVive';
import { handleControllerNotifyToggleBoxDesk } from './toggleBoxDesk';
import { handleControllerNotifyToggleBoxTrashCan } from './toggleBoxTrashCan';
import { handleControllerNotifyBottleNacl500Vive } from './bottleNacl500Vive';
import { handleControllerNotifyToggleBoxNacl500OnDesk } from './toggleBoxNacl500OnDesk';
import { handleControllerNotifyToggleBoxNacl500Label } from './toggleBoxNacl500Label';
import { handleControllerNotifyToggleBoxNacl500Cap } from './toggleBoxNacl500Cap';

export default AFRAME.registerComponent('debug_tool', {

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
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxDesk);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxTrashCan);
        this.viveObserver.subscribe(handleControllerNotifyBottleNacl500Vive);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500OnDesk);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500Label);
        this.viveObserver.subscribe(handleControllerNotifyToggleBoxNacl500Cap);

        $(this.el).on('triggerdown', () => {

            console.log("triggerDown");
            
            const triggerPosition = this.el.getAttribute('position');

            const triggerEvent = {
                eventName: 'triggerDown',
                position: triggerPosition,
                activeController: this.el
            };

            this.viveObserver.notify(triggerEvent);

        });
    }
});


