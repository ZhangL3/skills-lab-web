import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';

let section;
let section1;
let section2;
let section3;
let section4;
let section5;
let section6;
let section7;

export default AFRAME.registerComponent('section_selection', {

    init: function(){
        section = this.el;

        section1 = $("#section1");
        section2 = $("#section2");
        section3 = $("#section3");
        section4 = $("#section4");
        section5 = $("#section5");
        section6 = $("#section6");
        section7 = $("#section7");

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

        section7.on('click', () => {
            stateIndex.selectSection(7);
            stateIndex.set('started', true);
        });
    }
});

export function handleNotifySectionSelection(nextState) {
    if (nextState.started) {
        section.setAttribute('visible', false);
    }
}
