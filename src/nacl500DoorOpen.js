import aAnimationWrapper from '../utils/aAnimationWrapper';
import statIndex from './state';

let element;
export let canTakeBottle = false;

export default AFRAME.registerComponent('nacl500_door_open', {

    init: function () {
        element = this.el;

        this.el.addEventListener('click', () => {
            convertNacl500DoorOpen();
        });
    }
});

function convertNacl500DoorOpen() {
    statIndex.set('nacl500DoorOpen', !statIndex.get('nacl500DoorOpen'));
}

const schema = {
    open: '0 -90 0',
    close: '0 0 0',
    dur : 500,
};

export function handleNotifyNacl500DoorOpen(nextState) {
    if (nextState.nacl500DoorOpen) {
        aAnimationWrapper(element, '', 'rotation', '', schema.open, schema.dur, '', true, 'forwards');
        setTimeout(()=>{
            canTakeBottle = true;
        }, schema.dur);
    }
    else {
        aAnimationWrapper(element, '', 'rotation', '', schema.close, schema.dur, '', true, 'forwards');
        setTimeout(()=>{
            canTakeBottle = false;
        }, schema.dur);
    }
}
