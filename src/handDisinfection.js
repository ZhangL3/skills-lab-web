import aAnimationWrapper from '../utils/aAnimationWrapper';

//TODO: Add this action after creating index of status.

AFRAME.registerComponent('hand_disinfection', {
    schema:{
        open : {default: '0 -0.09 0'},
        close :   {default: '0 0 0'},
        dur : {default: 500},
    },

    init: function(){
        const { open, close, dur }= this.data;
        var el= this.el;
        var handleusing = false;

        var statusIndex = document.querySelector("#statusIndex");

        var clock = document.querySelector("#clock");

        aAnimationWrapper(this.el, 'click', 'position', close, open, dur, '', false, 'backwards' );

        // el.addEventListener('click', function(){
        //     if (statusIndex.getAttribute("exercisestarted") == "true" && statusIndex.getAttribute("tabledesinfection") == "true") {
        //         handleDownUp(el, data.open, data.close);
        //         clock.emit("handwashing");
        //     }
        // });
    }
});
//
// function handleDownUp(el, open, close){
//     handleDown(el, open, close);
//     var t = setTimeout(function(){
//         handleUp(el,open,close);
//     },300);
// }
//
// function handleDown(el, open, close){
//     var move = document.createElement("a-animation");
//     move.setAttribute("begin","0");
//     move.setAttribute("attribute", "position");
//     move.setAttribute("from", close)
//     move.setAttribute("to", open);
//     move.setAttribute("dur", 300);
//
//     el.appendChild(move);
//
//     var t = setTimeout(function(){
//         el.removeChild(move);
//     },600);
// }
//
// function handleUp(el, open, close){
//
//     var move = document.createElement("a-animation");
//     move.setAttribute("begin","0");
//     move.setAttribute("attribute", "position");
//     move.setAttribute("from", open)
//     move.setAttribute("to", close);
//     move.setAttribute("dur", 500);
//
//     el.appendChild(move);
//
//     var t = setTimeout(function(){
//         el.removeChild(move);
//     },600);
// }