import aAnimationWrapper from '../utils/aAnimationWrapper';

export default AFRAME.registerComponent('door_open', {
    schema: {
        open : {default: '0 -90 0'},
        close :   {default: '0 0 0'},
        dur : {default: 300},
    },

    init: function () {
        const { close, open, dur }= this.data;
        // const twoCupboards = document.querySelector("#twoCupboards");

        this.el.addEventListener('click', () => {
            // twoCabinets.components.sound.playSound();
        });

        // Add open and close animation of drawer
        aAnimationWrapper(this.el, 'click', 'rotation', close, open, dur, 'alternate', false, 'forwards');

    }
});