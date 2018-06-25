import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';

let element;

let gloveImage;

export default AFRAME.registerComponent('glove', {

    init: function(){
        // shallow copy
        element = this.el;
        gloveImage = document.querySelector('#gloveImage');

        $(this.el).on('click', () => {
            handleClickGlove();
        });
    }
});

function handleClickGlove () {
    if (stateIndex.getIn(['portfolio', 'finish'])  === true){
        stateIndex.setIn(['tableDisinfection', 'hasGlove'], true);
    }
    else {
        console.log("portfolio not finish: ");
    }
}

function showGloveImage() {
    $(gloveImage).attr('visible', 'true');
}

function hideGloveImage() {
    $(gloveImage).attr('visible', 'false');
}

export function handleNotifyGlove(nextState) {
    const { hasGlove, finish } = nextState.tableDisinfection;
    // console.log("hasGlove: ", hasGlove, typeof(hasGlove));
    // console.log("finish: ", finish, typeof(finish));

    /*if(!hasGlove && !finish) {
        showGloveImage();
    }
    else if (finish) {
        hideGloveImage();
    }*/
}

