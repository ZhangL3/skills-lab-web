import $ from 'jquery';

import aAnimationWrapper from '../utils/aAnimationWrapper';
import stateIndex from './state';
import { infusionSet } from '../utils/constants';
import { moveWithDrawer } from './infusionSet';

export let isDrawerOpen = false;

export default AFRAME.registerComponent('drawer_open_with_infusion_set',{

    init: function (){
        const drawerWithInfusionSet = $("#drawerWithCutlery");

        // Create event and add this event to infusionSetInPack, to move infusionSetInPack with drawer
        $.event.trigger({
            type: "infusionSetMoveWithDrawer"
        });

        drawerWithInfusionSet.on('infusionSetMoveWithDrawer', moveWithDrawer);

        drawerWithInfusionSet.on('click', () => {

            if(isDrawerOpen){
                closeDrawer(this.el);
            }
            else if (!isDrawerOpen) {
                openDrawer(this.el);
            }

            if (stateIndex.getIn(['infusionSet','position']) === infusionSet.position.IN_DRAWER) {
                drawerWithInfusionSet.trigger('infusionSetMoveWithDrawer');
            }
            isDrawerOpen = !isDrawerOpen;
        });
    }
});

const schema = {
    open : '1.8 4.1 0.1',
    close : '0 4.1 0.1',
    dur :500
};

function openDrawer(el) {
    aAnimationWrapper(el, '', 'position', '', schema.open, schema.dur, '', true, 'forwards');
}

function closeDrawer(el) {
    aAnimationWrapper(el, '', 'position', '', schema.close, schema.dur, '', true, 'forwards');
}



