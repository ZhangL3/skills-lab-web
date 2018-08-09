import $ from 'jquery';
import { controllerActions } from "../utils/controllerActions";

export default AFRAME.registerComponent('glove_in_hand', {

    init: function(){
        // shallow copy
        const el = this.el;

        const leftController = document.querySelector('#gloveLeft');
        const rightController = document.querySelector('#gloveRight');

        $(el).on('drag', () => {
            $(el).attr('visible', true);
        });

        $(el).on('drop', (event, data) => {

           if (el.getAttribute('id') === 'gloveLeft') {
               drop(el, leftController);
           }
           else if (el.getAttribute('id') === 'gloveRight') {
               drop(el, rightController);
           }
        });
    },
});

function drop(element, activeController) {
    let controllerActivities = new controllerActions(element, activeController);
    controllerActivities.drop();
}



