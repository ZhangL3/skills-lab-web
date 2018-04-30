export default AFRAME.registerComponent('cursor-submit', {
    init: function () {
        var el=this.el;
        this.el.addEventListener('click', function (evt) {
            el.setAttribute('material', 'color', 'red');
            setTimeout(function(){
                el.setAttribute('material', 'color', 'black');
            },300);
        });
    }

    // init: () => {
    //     this.el.addEventListener('click', (event) => {
    //         el.setAttribute('material', 'color', 'red');
    //         setTimeout(() => {
    //             el.setAttribute('material', 'color', 'black');
    //         }, 300)
    //     })
    // }
});