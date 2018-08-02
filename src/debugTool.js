import $ from 'jquery';

import Observable from '../utils/observable';

import { handleControllerNotifyCupboardDoor } from './doorOpen';
import { handleControllerNotifyCabinetDrawer } from './drawerOpenWithHandle';
import { handleControllerNotifyPortfolio } from './portfolio';
import { handleControllerNotifyPortfolioCheckVive } from './toggleBoxPortfolioCheck';
import { handleControllerNotifyToggleBoxPortfolio } from './toggleBoxPortfolio';
import { handleControllerNotifyHandDisinfection } from './handDisinfection';

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


