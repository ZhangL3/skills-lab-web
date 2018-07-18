import $ from 'jquery';
import _ from 'lodash';

import stateIndex from './state';
import * as constants from '../utils/constants';
import aAnimationWrapper from '../utils/aAnimationWrapper';

let element;

let gloveImage;

export default AFRAME.registerComponent('debug_tool', {

    init: function(){
        // shallow copy
        element = this.el;

        console.log("vive obj-model: ", this.el.getAttribute('obj-model'));

        $(this.el).on('click', () => {

        });
    }
});


