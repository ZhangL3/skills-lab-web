import $ from 'jquery';

import stateIndex from './state';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import hints from '../utils/hints';

let element;

export default AFRAME.registerComponent('disinfection_cloth_on_table', {
    init: function(){
        element = this.el;
        $(this.el).on('click', () => {
            handleClickClothOnTable();
        });
    }
});

const schema = {
    moveBegin : '0 0.681 -0.81',
    moveEnd : '-0.39 0.685 -0.81',
    overCan : '-0.89 0.685 -0.81',
    inCan : '-0.89 0.1 -0.81',
    dur : 500,
    disinfectionRepeat: 3,
};

function disinfection () {
    aAnimationWrapper(
        element, '', 'position', '', schema.moveEnd, schema.dur,
        'alternate', true, 'forwards', schema.disinfectionRepeat, 'ease'
    );
}

function putInTrashCan () {
    aAnimationWrapper(
        element, '', 'position', '', schema.overCan, schema.dur,
        '', true, 'forwards'
    );
    setTimeout(()=>{
        aAnimationWrapper(
            element, '', 'position', '', schema.inCan, schema.dur,
            '', true, 'forwards'
        );
        stateIndex.setIn(['tableDisinfection', 'finish'], true);
    }, schema.dur)
}

function handleClickClothOnTable () {
    if (
        stateIndex.getIn(['tableDisinfection', 'hasCloth']) === true &&
        stateIndex.getIn(['tableDisinfection', 'disinfectionFinish']) === false &&
        stateIndex.getIn(['tableDisinfection', 'finish']) === false
    ) {
        stateIndex.setIn(['tableDisinfection', 'disinfectionFinish'], true);
        stateIndex.set('hint', hints.handDisinfection);
    }
}

export function handleNotifyClothOnTable(nextState) {
    if(stateIndex.getIn(['tableDisinfection', 'finish'])) {
        return false;
    }

    if (nextState.tableDisinfection.hasCloth === true &&
        nextState.tableDisinfection.disinfectionFinish === true &&
        nextState.tableDisinfection.finish === false
    ) {
        disinfection();
        setTimeout(()=>{
            putInTrashCan();
        }, schema.dur * (schema.disinfectionRepeat + 1));
    }
}

