import $ from 'jquery';

import aAnimationWrapper from '../utils/aAnimationWrapper';
import stateIndex from './state';
import { infusionSet } from '../utils/constants';
import { moveWithDrawer } from './infusionSet';

export default AFRAME.registerComponent('drawer_open_with_infusion_set',{
    schema: {
        open : {default: '1.8 0 0.1'},
        close : {default: '0 0 0.1'},
        dur : {default: 500},
    },

    init: function (){
        const { close, open, dur }= this.data;

        const drawerWithInfusionSet = $("#drawerWithCutlery");

        // Create event and add this event to infusionSetInPack, to move infusionSetInPack with drawer
        $.event.trigger({
            type: "infusionSetMoveWithDrawer"
        });

        drawerWithInfusionSet.on('infusionSetMoveWithDrawer', moveWithDrawer);

        drawerWithInfusionSet.on('click', () => {
            if (stateIndex.getIn(['infusionSet','position']) === infusionSet.position.IN_DRAWER) {
                drawerWithInfusionSet.trigger('infusionSetMoveWithDrawer');
            }
        });

        // Add open and close animation of drawer
        aAnimationWrapper(this.el, 'click', 'position', close, open, dur, 'alternate', false, 'forwards');

    }
});


