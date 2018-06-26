import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';

let element;
let currentState;

export default AFRAME.registerComponent('disinfection_cloth_on_table', {

    init: function(){
        // shallow copy
        element = this.el;

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        $(this.el).on('click', () => {
            handleClickClothOnTable();
        });
    }
});

const schema = {
    moveBegin : '0 0.681 -0.81',
    moveEnd : '-0.39 0.681 -0.81',
    overCan : '-0.89 0.681 -0.81',
    inCan : '-0.89 0.1 -0.81',
    dur : 500,
};

function disinfection () {
    console.log("table disinfection: ");
    aAnimationWrapper(
        element, '', 'position', '', schema.moveEnd, schema.dur,
        'alternate', true, 'forwards', 3, 'ease'
    );
}

function putInTrashCan () {

}

function handleClickClothOnTable () {
    if (stateIndex.getIn(['tableDisinfection', 'hasCloth']) === true &&
        stateIndex.getIn(['tableDisinfection', 'disinfectionFinish']) === false) {
        stateIndex.setIn(['tableDisinfection', 'disinfectionFinish'], true)
    }

}

export function handleNotifyClothOnTable(nextState) {
    if (nextState.tableDisinfection.hasCloth === true &&
        nextState.tableDisinfection.disinfectionFinish === true
        // currentState.tableDisinfection.disinfectionFinish === false
    ) {
        disinfection();
    }

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

