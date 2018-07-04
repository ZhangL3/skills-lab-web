import aAnimationWrapper from '../utils/aAnimationWrapper';

export default AFRAME.registerComponent('drawer_open',{
    schema: {
        open : {default: '1.8 0 0.1'},
        close : {default: '0 0 0.1'},
        dur : {default: 300},

    },
    init: function (){
        const { close, open, dur }= this.data;

        // Add open and close animation of drawer
        aAnimationWrapper(this.el, 'click', 'position', close, open, dur, 'alternate', false, 'forwards');

    }
});