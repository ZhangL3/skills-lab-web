//TODO: Add this action after creating index of status.

AFRAME.registerComponent('clockclick', {
    init: function () {
        var el= this.el;
        var statusIndex = document.querySelector("#statusIndex");

        el.addEventListener("handwashing",function(ev){
            if(el.querySelector('#plat30')==null){
                var plat30sec=document.createElement("a-gltf-model");

                plat30sec.setAttribute("id","plat30");
                plat30sec.setAttribute("src","#markingnew");
                plat30sec.setAttribute("position", "0.01 0 0");
                plat30sec.setAttribute("rotation", getPlat30Rotation());

                el.appendChild(plat30sec);

                statusIndex.setAttribute("handdesinfection", "true");

                var time30=setTimeout(function(){

                    el.removeChild(el.querySelector('#plat30'));

                },3000);
            }
        });
    }
});


function getPlat30Rotation(){
    var oTime= new Date();
    var curTime=oTime.getSeconds();
    var gradForOneSec=360/60;
    var rotationPosition={x: -(curTime*gradForOneSec), y: 0, z: 0};
    return rotationPosition;
}