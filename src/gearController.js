import {playSubmitSound, playDropSound, playTeleportSound, playTeleportReleaseSound} from "./submitSound";

let element;

export default AFRAME.registerComponent('gear_controller', {
    init: function() {
        element = this.el;

        element.addEventListener('triggerdown', () => {
            playSubmitSound();
        });

        element.addEventListener('triggerup', () => {
            playDropSound();
        });

        element.addEventListener('trackpaddown', () =>{
            playTeleportSound();
        });

        element.addEventListener('trackpadup', () =>{
            playTeleportReleaseSound();
        });

    }
});
