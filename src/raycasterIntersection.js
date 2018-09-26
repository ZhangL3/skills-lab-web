AFRAME.registerComponent('raycaster-intersection', {
    init: function () {
        const el = this.el;
        el.addEventListener('raycaster-intersection', ()=>{
            this.el.setAttribute('material', 'color', 'green');
        });
        el.addEventListener('raycaster-intersection-cleared', ()=>{
            this.el.setAttribute('material', 'color', 'black');
        });
    }
});