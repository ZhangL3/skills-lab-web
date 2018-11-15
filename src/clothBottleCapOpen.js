import aAnimationWrapper from '../utils/aAnimationWrapper';
import stateIndex from './state';

let element;
export let canTakeCloth;

AFRAME.registerComponent('cloth_bottle_cap_open', {

    init: function(){
        element = this.el;
        canTakeCloth = false;
        this.el.addEventListener('click', () => {
            stateIndex.set('trashCanCapOpen', !stateIndex.get('trashCanCapOpen'));
        });
    }
});

const schema = {
    close: '0 0 0',
    dur: 500,
    open: '60 0 0'
};

export function handleNotifyClothBottleCapOpen(nextState) {
    if (nextState.trashCanCapOpen) {
        aAnimationWrapper(element, '', 'rotation', '', schema.open, schema.dur, '', true, 'forwards');
        setTimeout(()=>{
            canTakeCloth = true;
        }, 500);
    }
    else {
        aAnimationWrapper(element, '', 'rotation', '', schema.close, schema.dur, '', true, 'forwards');
        setTimeout(()=>{
            canTakeCloth = false;
        }, 500);
    }
}

export function checkIsCapOpen() {
    return canTakeCloth;
}