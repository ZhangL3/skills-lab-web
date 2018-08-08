
const observerOptions = {
    childList: true,
};

export class controllerActions {

    constructor (element, activeController) {
        this.el = element;
        this.scene = null;
        this.activeController = activeController;
        this.observer = this.buildObserver(this.el);
        this.bindController(this.activeController);
    }

    buildObserver(element) {
        return (
            new MutationObserver((event) => {
                let nodeAdded = event[0].addedNodes.length;
                let nodeRemoved = event[0].removedNodes.length;
                if (nodeAdded) {
                    element.setAttribute('position', '0 0 0');
                }
                if (nodeRemoved) {
                    console.log("this.activeController: ", this.activeController, typeof(this.activeController));
                    let activePosition = this.activeController.getAttribute('position');
                    element.setAttribute('position', `${activePosition.x} ${activePosition.y + 0.04} ${activePosition.z}`);
                }
            })
        );
    }

    bindController(activeController) {
        this.observer.observe(activeController, observerOptions);
    }

    drag() {
        this.activeController.appendChild(this.el);
    }

    drop() {
        this.scene = document.querySelector('#allThings');
        this.scene.appendChild(this.el);
    }

}