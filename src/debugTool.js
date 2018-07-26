import $ from 'jquery';

import Observable from '../utils/observable';

import { handleControllerNotifyCupboardDoor } from './doorOpen';

let element;

export default AFRAME.registerComponent('debug_tool', {

    init: function(){
        // shallow copy
        element = this.el;

        this.viveObserver = new Observable();

        // Add function from observers
        this.viveObserver.subscribe(handleControllerNotifyCupboardDoor);

        $(this.el).on('triggerdown', () => {

            const triggerPosition = this.el.getAttribute('position');

            const triggerEvent = { eventName: 'triggerDown', position: triggerPosition };

            this.viveObserver.notify(triggerEvent);

        });
    }
});


