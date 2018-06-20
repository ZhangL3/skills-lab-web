import $ from 'jquery';
import stateIndex from './state';

export default AFRAME.registerComponent('portfolio', {
    schema:{
        openPosition : {default: '0 0 0'},
        openRotation : {default: '0 0 0'},
        closePosition :   {default: '0.007 0.019 0'},
        closeRotation : {default: '0 0 -122.728'},
        onTablePosition : {default: '-0.57 0.684 -0.94'},
        onTableRotation : {default: '0 -90 -1.43'},
        inFrontOfEyesPosition : {default: '0 1.109 -0.45'},
        inFrontOfEyesRotation : {default: '0 -90 -70'},
        dur : {default: 500},
    },

    init: function(){
        var data= this.data;
        var el= this.el;

        const {
            openPosition, openRotation, closePosition, closeRotation,
            onTablePosition, onTableRotation, inFrontOfEyesPosition,
            inFrontOfEyesRotation, dur
        } = this.data;

        // components
        // const foregroundOfPortfolio = $('#foregroundOfPortfolio');
        // console.log("foregroundOfPortfolio: ", foregroundOfPortfolio, typeof(foregroundOfPortfolio));
        // foregroundOfPortfolio.on('click',function(){console.log("click");})

        $(this.el).on('click', () => {stateIndex.set('handDisinfection', true)});

        // var foregroundOfPortfolio = el.querySelector("#foregroundOfPortfolio");
        // var statusIndex=document.querySelector("#statusIndex");
        //
        // var hookname = el.querySelector("#hookname");
        // var hookdrug = el.querySelector("#hookdrug");
        // var hookdose = el.querySelector("#hookdose");
        // var hookiv = el.querySelector("#hookiv");
        // var hookcf = el.querySelector("#hookcf");
        //
        // el.addEventListener('click', function(){
        //     // if portfolio not closed
        //     if (statusIndex.getAttribute("exercisestarted") == "true" && statusIndex.getAttribute("portfoliochecked") == "false"){
        //         // if 5R not checked
        //         if(hookname.getAttribute("checked")=="true" && hookdrug.getAttribute("checked")=="true" && hookdose.getAttribute("checked")=="true" && hookiv.getAttribute("checked")=="true" && hookcf.getAttribute("checked")=="true"
        //         ){
        //             close(foregroundOfPortfolio, data.openPosition, data.closePosition, data.openRotation, data.closeRotation, data.dur);
        //             setOnTable(el, data.inFrontOfEyesPosition, data.onTablePosition, data.inFrontOfEyesRotation, data.onTableRotation, data.dur);
        //             hidehooks(hookname, hookdrug, hookdose, hookiv, hookcf);
        //
        //             statusIndex.setAttribute("portfoliochecked","true");
        //         }
        //     }
        // });

    }
});

// close portfolio
function close(el, openP, closeP, openR, closeR, dur){
    var move = document.createElement("a-animation");
    move.setAttribute("attribute", "position");
    move.setAttribute("from", openP)
    move.setAttribute("to", closeP);
    move.setAttribute("dur", dur);

    el.appendChild(move);

    var move2 = document.createElement("a-animation");
    move2.setAttribute("attribute", "rotation");
    move2.setAttribute("from", openR)
    move2.setAttribute("to", closeR);
    move2.setAttribute("dur", dur);

    el.appendChild(move2);

    var t = setTimeout(function(){
        el.removeChild(move);
        el.removeChild(move2);
    },600);
}

function setOnTable(el, eyesP, tableP, eyesR, tableR, dur){
    var move = document.createElement("a-animation");
    move.setAttribute("attribute", "position");
    move.setAttribute("from", eyesP)
    move.setAttribute("to", tableP);
    move.setAttribute("dur", dur);

    el.appendChild(move);

    var move2 = document.createElement("a-animation");
    move2.setAttribute("attribute", "rotation");
    move2.setAttribute("from", eyesR)
    move2.setAttribute("to", tableR);
    move2.setAttribute("dur", dur);

    el.appendChild(move2);

    var t = setTimeout(function(){
        el.removeChild(move);
        el.removeChild(move2);
    },600);
}

// hide the hooks for 5R
function hidehooks(hookname, hookdrug, hookdose, hookiv, hookcf){
    hookname.setAttribute("visible","false");
    hookdrug.setAttribute("visible","false");
    hookdose.setAttribute("visible","false");
    hookiv.setAttribute("visible","false");
    hookcf.setAttribute("visible","false");
}

export function handleNotifyPortfolio(state) {
    console.log("state: ", state, typeof(state));
};

