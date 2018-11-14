import { getWordPosition } from "./getWorldPositionAndBound";

const observerOptions = {
    childList: true,
};

const scaleOfAllThings = 1.3;
const adjustmentSizeScale = 1 / scaleOfAllThings;
const defaultValues = {
    addedScale: -1,
    removedScale: -1,
    positionX: 0,
    positionY: 0,
    positionZ: 0
};
export const objectInHandPosition = {
    x: defaultValues.positionX * adjustmentSizeScale,
    y: defaultValues.positionY * adjustmentSizeScale,
    z: defaultValues.positionZ * adjustmentSizeScale
};

/**
 * A tool, used to modify DOM with MutationObserver.
 * Cause of the lang duration of DOM modify for model element,
 * the attributes of element would be changed after
 * getting the event from the MutationObserver
 */
export class controllerActions {

    constructor (element, activeController, addedScale = defaultValues.addedScale,
                 removedScale = defaultValues.removedScale, positionX = defaultValues.positionX,
                 positionY = defaultValues.positionY, positionZ = defaultValues.positionZ) {
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
        this.scene = document.querySelector('#allThings');
        this.scene.appendChild(this.el);
    }

}
