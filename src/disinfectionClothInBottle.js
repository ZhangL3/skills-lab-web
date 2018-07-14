import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';

let element;
let currentState;
let disinfectionClothOnTable;

export default AFRAME.registerComponent('disinfection_cloth_in_bottle', {

    init: function(){
        // shallow copy
        element = this.el;
        // Here must use querySelector, not JQuery selector.
        disinfectionClothOnTable = document.querySelector('#clothOnTable');

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        $(this.el).on('click', () => {
            handleClickClothInBottle();
        });
    }
});

const schema = {
    inCan : '-0.053 0.599 0.145',
    outOfCan: '0.016 1.772 -0.225',
    outOfCanRotation: '2.406 -174.065 -2.521',
    onDeskPosition:'1.391 0.178 -0.438',
    onDeskRotation:'-59.065 -30.040 -50.817',
    dur: 500
};

function putOnTable(){
    console.log("put on table: ");
    aAnimationWrapper(
        element, '', 'position', schema.inCan, schema.outOfCan, schema.dur,
        '', true, 'forwards'
    );

    const t = setTimeout(()=>{
        aAnimationWrapper(
            element, '', 'position', schema.outOfCan, schema.onDeskPosition, schema.dur,
            '', true, 'forwards'
        );
        aAnimationWrapper(
            element, '', 'rotation', '', schema.onDeskRotation, schema.dur,
            '', true, 'forwards'
        );

        setTimeout(() => {
            $(element).attr('visible', false);
            $(disinfectionClothOnTable).attr('visible', true);
        }, schema.dur);
    }, schema.dur);
}

function handleClickClothInBottle () {
    if (stateIndex.getIn(['tableDisinfection','hasCloth']) === false
        // TODO: for product uncomment
        // && stateIndex.getIn(['tableDisinfection','hasGlove']) === true
    ) {
        stateIndex.setIn(['tableDisinfection','hasCloth'], true);
    }
    else {
        console.log("has no glove: ");
    }
}

export function handleNotifyClothInBottle(nextState) {

    if(stateIndex.getIn(['tableDisinfection', 'finish'])) {
        return false;
    }

    if (
        currentState.tableDisinfection.hasCloth === false &&
        nextState.tableDisinfection.hasCloth === true
    ) {
        putOnTable();
    }

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

