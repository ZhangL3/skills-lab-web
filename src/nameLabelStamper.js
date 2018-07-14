import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import { nameLabel } from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';

let element;
let nameLabelEmpty;
let nameLabelWrote;

let currentState;

let moveable = true;

export default AFRAME.registerComponent('name_label_stamper', {

    init: function(){
        // shallow copy
        element = this.el;

        nameLabelEmpty = $('#nameLabelEmpty');
        nameLabelWrote = $('#nameLabelWrote');

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        // $(this.el).on('click', () => {
        //     handleClickStickerStamper();
        // });

        nameLabelEmpty.on('click', () => {
            console.log("lick nameLabelEmpty");
            handleClickNameLabelEmpty();
        });

        nameLabelWrote.on('click', () => {
           handleClickNameLabelWrote();
        });
    }
});

const schema = {
    nameLabelInFrontOfCameraPosition: '0.013 1.039 -0.8',
    nameLabelInFrontOfCameraRotation: '0 0 0',
    nameLabelOnBottlePosition: '0.842 1.354 -0.504',
    nameLabelOnBottleRotation: '0 -20.478 0',
    dur : 500,
};

function takeEmptyNameLabel () {
    console.log("takeEmptyNameLabel");
    moveable = false;
    aAnimationWrapper(
        nameLabelEmpty, '', 'position', '', schema.nameLabelInFrontOfCameraPosition, schema.dur,
        '', true, 'forwards'
    );
    aAnimationWrapper(
        nameLabelEmpty, '', 'rotation', '', schema.nameLabelInFrontOfCameraRotation, schema.dur,
        '', true, 'forwards'
    );

    setTimeout(() => {moveable=true}, schema.dur);
}

function fillNameLabel() {
    console.log("fillNameLabel");
    nameLabelEmpty.remove();
    nameLabelWrote.attr('visible', true);
}

function stickNameLabel() {
    console.log("stickNameLabel");
    aAnimationWrapper(
        nameLabelWrote, '', 'position', '', schema.nameLabelOnBottlePosition, schema.dur,
        '', true, 'forwards'
    );
    aAnimationWrapper(
        nameLabelWrote, '', 'rotation', '', schema.nameLabelOnBottleRotation, schema.dur,
        '', true, 'forwards'
    );
}

function handleClickStickerStamper () {
    if (// for product remove comment
        // stateIndex.getIn(['infusionSet','fixed']) === true &&
        stateIndex.getIn(['nameLabel', 'position']) === nameLabel.position.IN_BOX
    ) {
        stateIndex.setIn(['nameLabel', 'position'], nameLabel.position.IN_HAND);
    }
}

function handleClickNameLabelEmpty() {
    if (// for product remove comment
    // stateIndex.getIn(['infusionSet','finish']) === true &&
    stateIndex.getIn(['nameLabel', 'position']) === nameLabel.position.IN_BOX && moveable
    ) {
        stateIndex.setIn(['nameLabel', 'position'], nameLabel.position.IN_HAND);
    }
    else if (
        stateIndex.getIn(['nameLabel', 'position']) === nameLabel.position.IN_HAND &&
        stateIndex.getIn(['nameLabel', 'labelFilled']) === false
    ) {
        stateIndex.setIn(['nameLabel', 'labelFilled'], true);
    }
}

function handleClickNameLabelWrote() {
    if (
        stateIndex.getIn(['nameLabel', 'labelFilled']) === true &&
        stateIndex.getIn(['nameLabel', 'position']) === nameLabel.position.IN_HAND
    ) {
        stateIndex.setIn(['nameLabel', 'position'], nameLabel.position.ON_BOTTLE);
        stateIndex.setIn(['nameLabel', 'finish'], true);
    }
}

export function handleNotifyNameLabel(nextState) {

    if(stateIndex.getIn(['nameLabel', 'finish'])) {
        return false;
    }

    if(// for product remove comment
        // nextState.infusionSet.fixed === true &&
        currentState.nameLabel.position === nameLabel.position.IN_BOX &&
        nextState.nameLabel.position === nameLabel.position.IN_HAND
    ) {
        takeEmptyNameLabel();
    }
    else if (
        currentState.nameLabel.position === nameLabel.position.IN_HAND &&
        currentState.nameLabel.labelFilled === false &&
        nextState.nameLabel.labelFilled === true
    ) {
        fillNameLabel();
    }
    else if (
        currentState.nameLabel.position === nameLabel.position.IN_HAND &&
        currentState.nameLabel.labelFilled === true &&
        nextState.nameLabel.position === nameLabel.position.ON_BOTTLE
    ) {
        stickNameLabel();
    }
    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

