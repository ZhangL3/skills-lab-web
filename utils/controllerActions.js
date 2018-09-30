import { getWordPosition } from "./getWorldPositionAndBound";

const observerOptions = {
    childList: true,
};

// 1/1.3(scale of allThings) = 0.769
const adjustmentSizeScale = 0.769;

export class controllerActions {

    constructor (element, activeController, addedScale = -1, removedScale = -1, positionX = 0, positionY = 0, positionZ = -0.2) {
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
                // Append element to controller
                let nodeAdded = event[0].addedNodes[0] === element;
                for (let i = 0; i < event.length; i++) {
                        nodeAdded = event[i].addedNodes[0] === element;
                }

                // Remove element from controller
                let nodeRemoved = event[0].removedNodes[0] === element;
                for (let i = 0; i < event.length; i++) {
                    nodeRemoved = event[i].removedNodes[0] === element;
                }

                if (nodeAdded) {

                    if (!element) {
                        return false;
                    }

                    // test setTimeout 1sec ok, 0.5 sec not. 0.7 sec not. 1 sed ok
                    // setTimeout(()=>{
                    //     element.setAttribute('position', `${(this.positionX) * adjustmentSizeScale} ${(this.positionY) * adjustmentSizeScale} ${(this.positionZ) * adjustmentSizeScale}`);
                    // }, 1000);

                    element.setAttribute('position', `${(this.positionX) * adjustmentSizeScale} ${(this.positionY) * adjustmentSizeScale} ${(this.positionZ) * adjustmentSizeScale}`);

                    element.setAttribute('visible', true);

                    if (this.addedScale > 0) {
                        element.setAttribute('scale', `${this.addedScale * adjustmentSizeScale} ${this.addedScale * adjustmentSizeScale} ${this.addedScale * adjustmentSizeScale}`);
                    }
                }
                else if (nodeRemoved) {
                    if (!element) {
                        return fasle;
                    }

                    element.setAttribute('visible', true);
                    // let activePosition = this.activeController.getAttribute('position');
                    // let activePosition = getWordPosition(this.activeController);
                    let activePosition = getWordPosition(element);

                    element.setAttribute('position', `${(activePosition.x + this.positionX) * adjustmentSizeScale} ${(activePosition.y + this.positionY) * adjustmentSizeScale} ${(activePosition.z) * adjustmentSizeScale}`);

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
        // console.log("drop:", this.el);
        this.scene = document.querySelector('#allThings');
        this.scene.appendChild(this.el);
    }

}

function getExtendNewPosition(oldPositionX, oldPositionY, oldPositionZ, extendLength) {

    function getNewPosition(axis) {
        switch (axis) {
            case 'x':
                return oldPositionX + (extendLength * oldPositionX) / Math.sqrt(Math.pow(oldPositionX, 2) + Math.pow(oldPositionY, 2) + Math.pow(oldPositionZ, 2));
                break;
            case 'y':
                return oldPositionY + (extendLength * oldPositionY) / Math.sqrt(Math.pow(oldPositionX, 2) + Math.pow(oldPositionY, 2) + Math.pow(oldPositionZ, 2));
                break;
            case 'z':
                return oldPositionZ + (extendLength * oldPositionZ) / Math.sqrt(Math.pow(oldPositionX, 2) + Math.pow(oldPositionY, 2) + Math.pow(oldPositionZ, 2));
                break;
            default:
                break;
        }
    }

    const x = getNewPosition('x');
    const y = getNewPosition('y');
    const z = getNewPosition('z');

    return {x, y, z};
}
