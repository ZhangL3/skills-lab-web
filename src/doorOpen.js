import $ from 'jquery';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted } from '../utils/isEmitted';

const allDoors = [];
let allDoorsElements;

export default AFRAME.registerComponent('door_open', {
    schema: {
        open : {default: '0 -90 0'},
        close :   {default: '0 0 0'},
        dur : {default: 300},
    },

    init: function () {
        allDoors.push(this.el);

        allDoorsElements = $('.cupboardDoor');

        const { close, open, dur }= this.data;

        this.el.addEventListener('click', () => {
            // twoCabinets.components.sound.playSound();
        });

        // Add open and close animation of drawer
        aAnimationWrapper(this.el, 'click', 'rotation', close, open, dur, 'alternate', false, 'forwards');

    }
});

/**
 * Handle the notify form controller
 *
 * @param triggerEvent
 */
export function handleControllerNotifyCupboardDoor ( triggerEvent ) {

    allDoors.forEach((door)=>{
       getWorldBound(door);
    });

    allDoorsElements.each((index, doorElement) => {
        if(isEmitted(doorElement, triggerEvent.position)){
            doorElement.emit('click');
        }
    });
}