import {playSubmitSound} from "./submitSound";

let element;

export default AFRAME.registerComponent('gear_controller', {
    init: function() {
        element = this.el;

        element.addEventListener('triggerdown', () => {
            playSubmitSound();
        })
    }
});
