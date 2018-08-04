import aAnimationWrapper from '../utils/aAnimationWrapper';

let isCapOpen;

AFRAME.registerComponent('cloth_bottle_cap_open', {
    schema:{
        close :   {default: '0 0 0'},
        open : {default: '60 0 0'},
        dur : {default: 500},
    },

    init: function(){
        isCapOpen = false;

        const { close, open, dur } = this.data;

        aAnimationWrapper(this.el, 'click', 'rotation', close, open, dur, 'alternate', false, 'forwards');
        this.el.addEventListener('click', () => {
           isCapOpen = !isCapOpen;
           console.log("isCapOpen: ", isCapOpen, typeof(isCapOpen));
        });

    }
});

export function checkIsCapOpen() {
    return isCapOpen;
}