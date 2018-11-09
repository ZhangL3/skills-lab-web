import {playSubmitSound} from "./submitSound";

export default AFRAME.registerComponent('cursor-submit', {
    /**
     *  By clicking change the color of cursor to red.
     */
    init: function () {
        const el = this.el;
        el.addEventListener('click', (event) => {
            this.el.setAttribute('material', 'color', 'red');
            playSubmitSound();

            setTimeout(() => {
                this.el.setAttribute('material', 'color', 'black');
            }, 300);
        })
    }
});