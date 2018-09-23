import $ from 'jquery';
import _ from 'lodash';

import stateIndex from '../src/state';

let element;
let currentState;

export default AFRAME.registerComponent('tips_text_edit', {

    schema: {
        text: {type: 'string', default: 'If ready, click the portfolio to begin.\\n Or select a chapter to begin.'}
    },

    init: function(){
        element = this.el;
        // deep copy
        currentState = _.cloneDeep(stateIndex.getState());
    },

    // update: function () {
    //     const el = this.el;
    //     const data = this.data;
    //
    //     el.setAttribute('value', data.text);
    // }
});

function trimText(text) {

}

export function handleNotifyTipsTextEdit(nextState) {
    if (nextState.hint !== currentState.hint) {
        element.setAttribute('value', `${nextState.hint}`);
    }

    // deep copy
    currentState = _.cloneDeep(stateIndex.getState());
}

export function handleControllerNotifyTipsTextEdit( triggerEvent ) {

}
