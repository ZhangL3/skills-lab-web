import $ from 'jquery';

import Observable from '../utils/observable';

import { handleControllerNotifyCupboardDoor } from './doorOpen';
import { handleControllerNotifyCabinetDrawer } from './drawerOpenWithHandle';
import { handleControllerNotifyPortfolio } from './portfolio';

export default AFRAME.registerComponent('debug_tool', {

    init: function(){

        this.viveObserver = new Observable();

        // Add function from observers
        this.viveObserver.subscribe(handleControllerNotifyCupboardDoor);
        this.viveObserver.subscribe(handleControllerNotifyCabinetDrawer);
        this.viveObserver.subscribe(handleControllerNotifyPortfolio);

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


