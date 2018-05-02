import aAnimationWrapper from '../utils/aAnimationWrapper';

AFRAME.registerComponent('waste_bin_cap_open', {
    schema:{
        open : {default: '0 0 -45'},
        close :   {default: '0 0 0'},
        dur : {default: 300},
    },

    init: function(){
        const { open, close, dur } = this.data;

        aAnimationWrapper(this.el, 'click', 'rotation', close, open, dur, 'alternate', false, 'forwards');

    }
});