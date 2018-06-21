import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';

let element;
let currentState;

export default AFRAME.registerComponent('portfolio', {

    init: function(){
        // shallow copy
        element = this.el;

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
        $(this.el).on('click', () => {
            handleClickPortfolio();
        });

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

// const currentState = stateIndex.getState();
// console.log(currentState);

const foregroundOfPortfolio = $('#foregroundOfPortfolio');
const hookName = $('#hookName');
const hookDrug = $('#hookDrug');
const hookDose = $('#hookDose');
const hookIV = $('#hookIV');
const hookCF = $('#hookCF');

const schema = {
    openPosition : '0 0 0',
    openRotation : '0 0 0',
    closePosition :   '0.007 0.019 0',
    closeRotation : '0 0 -122.728',
    onTablePosition : '-0.57 0.684 -0.94',
    onTableRotation : '0 -90 -1.43',
    inFrontOfEyesPosition : '0 1.109 -0.45',
    inFrontOfEyesRotation : '0 -90 -70',
    dur : 500,
};

// open portfolio
function open () {
    aAnimationWrapper(
        foregroundOfPortfolio, 0, 'position', schema.closePosition, schema.openPosition, schema.dur
    );
    aAnimationWrapper(
        foregroundOfPortfolio, 0, 'rotation', schema.closeRotation, schema.openRotation, schema.dur
    );
}

function takeInHand () {
    console.log('element: ', element);
    aAnimationWrapper(
        element, '', 'position', schema.onTablePosition, schema.inFrontOfEyesPosition, schema.dur
    );
    aAnimationWrapper(
        element, '', 'rotation', schema.onTableRotation, schema.inFrontOfEyesRotation, schema.dur
    );
}



// close portfolio
function close () {
    aAnimationWrapper(
        foregroundOfPortfolio, 0, 'position', schema.openPosition, schema.closePosition, schema.dur
    );
    aAnimationWrapper(
        foregroundOfPortfolio, 0, 'rotation', schema.openRotation, schema.closeRotation, schema.dur
    );
}

function setOnTable(){
    aAnimationWrapper(
        element, 0, 'position', schema.inFrontOfEyesPosition, schema.onTablePosition, schema.dur
    );
    aAnimationWrapper(
        element, 0, 'rotation', schema.inFrontOfEyesRotation, schema.onTableRotation, schema.dur
    );
}

function is5RChecked () {
    const status5R = stateIndex.getIn(['portfolio', 'checkPortfolio']);
    const checkValues = Object.values(status5R);
    for(let i = 0; i < checkValues.length; i++) {
        if (checkValues[i] === false) {
           return false;
        }
    }
    return true;
}

function handleClickPortfolio () {

    if (stateIndex.getIn(['portfolio','position']) === constants.portfolio.position.ON_TABLE && !is5RChecked()) {
        stateIndex.setIn(['portfolio', 'position'], constants.portfolio.position.IN_HAND);

    }
    else if (stateIndex.getIn(['portfolio','position']) === constants.portfolio.position.IN_HAND && is5RChecked()) {
        stateIndex.setIn(['portfolio', 'position'], constants.portfolio.position.ON_TABLE);
        stateIndex.setIn(['portfolio', 'finish'], true);

    }
}

// hide the hooks for 5R
function hidehooks(hookname, hookdrug, hookdose, hookiv, hookcf){
    hookname.setAttribute("visible","false");
    hookdrug.setAttribute("visible","false");
    hookdose.setAttribute("visible","false");
    hookiv.setAttribute("visible","false");
    hookcf.setAttribute("visible","false");
}

export function handleNotifyPortfolio(nextState) {
    if(
        (currentState.portfolio.position === constants.portfolio.position.ON_TABLE &&
            nextState.portfolio.position === constants.portfolio.position.IN_HAND) &&
            !is5RChecked()
    ) {
        takeInHand();
        open();
    }
    currentState = nextState;
}

