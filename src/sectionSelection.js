import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';

let currentState;

let section;

let section1;
let section2;
let section3;
let section4;
let section5;
let section6;

export default AFRAME.registerComponent('section_selection', {

    init: function(){
        // shallow copy
        section = this.el;

        section1 = $("#section1");
        section2 = $("#section2");
        section3 = $("#section3");
        section4 = $("#section4");
        section5 = $("#section5");
        section6 = $("#section6");

        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());

        section1.on('click', () => {
            stateIndex.selectSection(1);
            stateIndex.set('started', true);
        });

        section2.on('click', () => {
            stateIndex.selectSection(2);
            stateIndex.set('started', true);
        });

        section3.on('click', () => {
            stateIndex.selectSection(3);
            stateIndex.set('started', true);
        });

        section4.on('click', () => {
            stateIndex.selectSection(4);
            stateIndex.set('started', true);
        });

        section5.on('click', () => {
            stateIndex.selectSection(5);
            stateIndex.set('started', true);
        });

        section6.on('click', () => {
            stateIndex.selectSection(6);
            stateIndex.set('started', true);
        });
    }
});

export function handleNotifySectionSelection(nextState) {
    if (nextState.started) {
        section.setAttribute('visible', false);
    }
}
