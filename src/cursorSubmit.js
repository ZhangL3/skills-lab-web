export default AFRAME.registerComponent('cursor-submit', {

    /**
     *  By clicking change the color of cursor to red.
     */
    init: function () {
        this.el.addEventListener('click', (event) => {
            this.el.setAttribute('material', 'color', 'red');
            setTimeout(() => {
                this.el.setAttribute('material', 'color', 'black');
            }, 300);
        })
    }
});