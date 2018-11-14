import $ from 'jquery';
import { detectCollision } from '../utils/isEmitted';

const allDrawersHandles = [];
let allDrawersElements;

export default AFRAME.registerComponent('drawer_open_with_handle',{

    init: function (){
        allDrawersHandles.push(this.el);
        allDrawersElements=$('.drawer');
    }
});

/**
 * Trigger click event of drawer with handle
 *
 * @param triggerEvent
 */
export function handleControllerNotifyCabinetDrawer( triggerEvent ) {
    allDrawersHandles.forEach((drawerHandle)=>{
        if(detectCollision(drawerHandle, triggerEvent.activeController)){
            $(drawerHandle).parent().trigger('click');
        }
    });
}
