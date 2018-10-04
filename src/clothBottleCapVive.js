import $ from 'jquery';
import { getWorldBound } from "../utils/getWorldPositionAndBound";
import { isEmitted, detectCollision } from "../utils/isEmitted";

let clothBottleCap;

AFRAME.registerComponent('cloth_bottle_cap_vive', {

    init: function(){
        clothBottleCap = $('#clothBottleCap');

        const el = this.el;

        clothBottleCap.on('controllerEmit', (event, triggerEvent) => {
            // getWorldBound(el);
            // if (isEmitted(el, triggerEvent.position)) {
            if (detectCollision(el, triggerEvent.activeController)) {
                $(el).trigger('click');
            }
        });
    }
});

export function handleControllerNotifyClothInBottle ( triggerEvent ) {
    clothBottleCap.trigger('controllerEmit', [triggerEvent]);
}