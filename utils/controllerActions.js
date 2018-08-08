
const observerOptions = {
    childList: true,
};

export class controllerActions {

    constructor (element, activeController) {
        this.isInHand = false;
        this.el = element;
        this.scene = null;
        this.activeController = activeController;
        this.observer = this.buildObserver(this.el);
        this.bindController(this.activeController);
    }

    buildObserver(element) {
        return (
            new MutationObserver((event) => {
                console.log("element: ", element, typeof(element));
                if (this.isInHand) {
                    element.setAttribute('position', '0 0 0');
                }
                else {
                    console.log("this.activeController: ", this.activeController, typeof(this.activeController));
                    // el.setAttribute('position',)
                }
            })
        );
    }

    bindController(activeController) {
        this.observer.observe(activeController, observerOptions);
    }

    drag() {
        this.activeController.appendChild(this.el);
        this.isInHand = true;
    }

    drop() {
        this.scene = document.querySelector('#scene');
        this.scene.appendChild(this.el);
        this.isInHand = false;
    }

}