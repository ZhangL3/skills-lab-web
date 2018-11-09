import aAnimationWrapper from '../utils/aAnimationWrapper';

export default AFRAME.registerComponent('drawer_open',{
    schema: {
        open : {default: '1.8 0.105 0.116'},
        close : {default: '0 0.105 0.116'},
        dur : {default: 600},

    },
    init: function (){
        const { close, open, dur }= this.data;

        // Add open and close animation of drawer
        aAnimationWrapper(this.el, 'click', 'position', close, open, dur, 'alternate', false, 'forwards');

    }
});