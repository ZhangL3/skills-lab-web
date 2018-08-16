
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
        this.observer = this.buildObserver(this.el);
        this.bindController(this.activeController);
        this.positionX = positionX;
        this.positionY = positionY;
        this.positionZ = positionZ;
    }

    buildObserver(element) {
        return (
            new MutationObserver((event) => {
                let nodeAdded = event[0].addedNodes[0] === element;
                let nodeRemoved = event[0].removedNodes[0] === element;
                if (nodeAdded) {
                    element.setAttribute('position', `${this.positionX} ${this.positionY} ${this.positionZ}`);
                    element.setAttribute('visible', true);
                    if (this.addedScale > 0) {
                        element.setAttribute('scale', `${this.addedScale} ${this.addedScale} ${this.addedScale}`);
                    }
                }
                if (nodeRemoved) {
                    if (!element) {
                        return fasle;
                    }
                    element.setAttribute('visible', true);
                    let activePosition = this.activeController.getAttribute('position');
                    element.setAttribute('position', `${activePosition.x} ${activePosition.y + 0.04} ${activePosition.z}`);
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
        console.log("drag:", this.el);
        this.activeController.appendChild(this.el);
    }

    drop() {
        console.log("drop:", this.el);
        this.scene = document.querySelector('#allThings');
        this.scene.appendChild(this.el);
    }

}