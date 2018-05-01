import aAnimationWrapper from '../utils/aAnimationWrapper';

AFRAME.registerComponent('waste_bin_cap_open', {
    schema:{
        open : {default: '0 0 -45'},
        close :   {default: '0 0 0'},
        dur : {default: 300},
    },

    init: function(){
        const data= this.data;
        // var el= this.el;
        //
        // var move = document.createElement("a-animation");
        // move.setAttribute("begin","click");
        // move.setAttribute("attribute", "rotation");
        // move.setAttribute("from", data.close)
        // move.setAttribute("to", data.open);
        // move.setAttribute("dur", data.dur);
        // move.setAttribute("direction", "alternate");
        //
        // el.appendChild(move);

        aAnimationWrapper(this.el, 'click', 'rotation', data.close, data.open, 300, 'alternate', false, 'forwards');

    }
});