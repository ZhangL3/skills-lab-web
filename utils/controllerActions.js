import { getWordPosition } from "./getWorldPositionAndBound";

const observerOptions = {
    childList: true,
};

export class controllerActions {

    constructor (element, activeController, addedScale = -1, removedScale = -1, positionX = 0, positionY = 0, positionZ = 0) {
        this.el = element;
        this.scene = null;
        this.activeController = activeController;
        this.addedScale = addedScale;
        this.removedScale = removedScale;
        this.positionX = positionX;
        this.positionY = positionY;
        this.positionZ = positionZ;

        this.observer = this.buildObserver(this.el);
        this.bindController(this.activeController);
    }

    buildObserver(element) {
        return (
            new MutationObserver((event) => {
                console.log("event: ", event, typeof(event));
                let nodeAdded = event[0].addedNodes[0] === element;
                for (let i = 0; i < event.length; i++) {
                        nodeAdded = event[i].addedNodes[0] === element;
                }


                let nodeRemoved = event[0].removedNodes[0] === element;
                for (let i = 0; i < event.length; i++) {
                    nodeRemoved = event[i].removedNodes[0] === element;
                }

                if (nodeAdded) {

                    if (!element) {
                        return false;
                    }
                    // test setTimeout 1sec ok, 0.5 sec not. 0.7 sec not. 1 sed ok
                    setTimeout(()=>{
                    element.setAttribute('position', `${this.positionX} ${this.positionY} ${this.positionZ}`);
                    }, 1000);
                    element.setAttribute('position', `${this.positionX} ${this.positionY} ${this.positionZ}`);

                    console.log("set position finish:", element);
                    element.setAttribute('visible', true);
                    if (this.addedScale > 0) {
                        element.setAttribute('scale', `${this.addedScale} ${this.addedScale} ${this.addedScale}`);
                    }
                }
                else if (nodeRemoved) {
                    if (!element) {
                        return fasle;
                    }
                    element.setAttribute('visible', true);
                    // let activePosition = this.activeController.getAttribute('position');
                    let activePosition = getWordPosition(this.activeController);
                    element.setAttribute('position', `${activePosition.x} ${activePosition.y} ${activePosition.z}`);
                    if (this.removedScale > 0) {
                        element.setAttribute('scale', `${this.removedScale} ${this.removedScale} ${this.removedScale}`);
                    }
                }
            })
        );
    }

    bindController(activeController) {
        this.observer.observe(activeController, observerOptions);
    }

    drag() {
        // use fragment to accelerate the modify of DOM
        const fragment = document.createDocumentFragment();
        fragment.appendChild(this.el);
        this.activeController.appendChild(fragment);
    }

    drop() {
        console.log("drop:", this.el);
        this.scene = document.querySelector('#allThings');
        this.scene.appendChild(this.el);
    }

}