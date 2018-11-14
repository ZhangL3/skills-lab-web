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
        // Store current state
        currentState = _.cloneDeep(stateIndex.getState());
    },
});

/**
 * Handle notify of hint in state changed
 *
 * @param nextState
 */
export function handleNotifyTipsTextEdit(nextState) {
    if (nextState.hint !== currentState.hint) {
        element.setAttribute('value', `${nextState.hint}`);
    }

    currentState = _.cloneDeep(stateIndex.getState());
}
