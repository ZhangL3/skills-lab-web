import $ from 'jquery';

import stateIndex from './state';
import { nameLabel } from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';
import hints from '../utils/hints';

let element;
let nameLabelEmpty;
let nameLabelWrote;
let stickerStamper;
let moveable = true;
let namelabelPosition = nameLabel.position.IN_BOX;
let nameLabelFilled = false;
let nameLabelEmptyInFrontOfCamera;

export default AFRAME.registerComponent('name_label_stamper', {

    init: function(){
        element = this.el;

        nameLabelEmpty = $('#nameLabelEmpty');
        // After taking empty name label, is the click event listener on nameLabelEmpty lost
        // So add a alternatives
        nameLabelEmptyInFrontOfCamera = $('#nameLabelEmptyInFrontOfCamera');
        nameLabelWrote = $('#nameLabelWrote');
        stickerStamper = $('#stickerStamper');

        nameLabelEmpty.on('click', () => {
            handleClickNameLabelEmpty();
        });

        nameLabelEmptyInFrontOfCamera.on('click', () => {
           handleClickNameLabelEmptyInFrontOfCamera();
        });

        stickerStamper.on('click', () => {
            handleClickNameLabelStamper();
        });

        nameLabelWrote.on('click', () => {
           handleClickNameLabelWrote();
        });
    }
});

const schema = {
    nameLabelInFrontOfCameraPosition: '0.013 1.039 -0.7',
    nameLabelInFrontOfCameraRotation: '0 0 0',
    nameLabelOnBottlePosition: '0.834 1.354 -0.504',
    nameLabelOnBottleRotation: '0 -20.478 0',
    nameLabelOnBottleScale: '0.067 0.033 0.050',
    dur : 500,
};

function takeEmptyNameLabel () {
    moveable = false;
    // If move with animation, the click event can not emitted anymore.
    aAnimationWrapper(
        nameLabelEmpty, '', 'position', '', schema.nameLabelInFrontOfCameraPosition, schema.dur,
        '', true, 'forwards'
    );
    aAnimationWrapper(
        nameLabelEmpty, '', 'rotation', '', schema.nameLabelInFrontOfCameraRotation, schema.dur,
        '', true, 'forwards'
    );

    setTimeout(() => {
        moveable=true;
        nameLabelEmpty.remove();
        nameLabelEmptyInFrontOfCamera.attr('visible', true);
    }, schema.dur);
    namelabelPosition = nameLabel.position.IN_HAND;
}

function fillNameLabel() {
    nameLabelEmptyInFrontOfCamera.remove();
    nameLabelWrote.attr('visible', true);
    nameLabelFilled = true;
}

function stickNameLabel() {
    aAnimationWrapper(
        nameLabelWrote, '', 'position', '', schema.nameLabelOnBottlePosition, schema.dur,
        '', true, 'forwards'
    );
    aAnimationWrapper(
        nameLabelWrote, '', 'rotation', '', schema.nameLabelOnBottleRotation, schema.dur,
        '', true, 'forwards'
    );
    nameLabelWrote.attr('scale', schema.nameLabelOnBottleScale);
}

function handleClickNameLabelStamper () {
    if (
        stateIndex.getIn(['infusionSet','finish']) === true &&
        stateIndex.getIn(['nameLabel', 'position']) === nameLabel.position.IN_BOX && moveable
    ) {
        stateIndex.setIn(['nameLabel', 'position'], nameLabel.position.IN_HAND);
        stateIndex.set('hint', hints.fillNameLabel);
    }
}

function handleClickNameLabelEmpty() {
    if (
        stateIndex.getIn(['infusionSet','finish']) === true &&
        stateIndex.getIn(['nameLabel', 'position']) === nameLabel.position.IN_BOX && moveable
    ) {
        stateIndex.setIn(['nameLabel', 'position'], nameLabel.position.IN_HAND);
        stateIndex.set('hint', hints.fillNameLabel);
    }
}

function handleClickNameLabelEmptyInFrontOfCamera() {
    if (
        stateIndex.getIn(['nameLabel', 'position']) === nameLabel.position.IN_HAND &&
        stateIndex.getIn(['nameLabel', 'labelFilled']) === false
    ) {
        stateIndex.setIn(['nameLabel', 'labelFilled'], true);
        stateIndex.set('hint', hints.pasteNameLabel);
    }
}

function handleClickNameLabelWrote() {
    if (
        stateIndex.getIn(['nameLabel', 'labelFilled']) === true &&
        stateIndex.getIn(['nameLabel', 'position']) === nameLabel.position.IN_HAND
    ) {
        stateIndex.setIn(['nameLabel', 'position'], nameLabel.position.ON_BOTTLE);
        stateIndex.setIn(['nameLabel', 'finish'], true);
        stateIndex.set('hint', hints.wellDone);
    }
}

export function handleNotifyNameLabel(nextState) {

    if(stateIndex.getIn(['nameLabel', 'finish'])) {
        return false;
    }

    if(
        namelabelPosition === nameLabel.position.IN_BOX &&
        nextState.nameLabel.position === nameLabel.position.IN_HAND
    ) {
        takeEmptyNameLabel();
    }
    else if (
        namelabelPosition === nameLabel.position.IN_HAND &&
        nameLabelFilled === false &&
        nextState.nameLabel.labelFilled === true
    ) {
        fillNameLabel();
    }
    else if (
        namelabelPosition === nameLabel.position.IN_HAND &&
        nameLabelFilled === true &&
        nextState.nameLabel.position === nameLabel.position.ON_BOTTLE
    ) {
        stickNameLabel();
    }
}

