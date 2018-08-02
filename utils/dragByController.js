// let timeInterval;

export function dragByController(element, activeController, positionJudgement = '0 0 0') {
    let activePosition = activeController.getAttribute('position');

    setInterval(() => {
        element.setAttribute('position', `${activePosition.x} ${activePosition.y + 0.04} ${activePosition.z}`);

    }, 40);

}

export function drop(timeInterval, element, stopPosition = '') {
    console.log("drop");
    clearInterval(timeInterval);
    if (stopPosition !== '') {
        element.setAttribute('position', stopPosition);
    }
}

function dragInHand(targetParent=null, scale='1 1 1', position='0 0 0') {

    let activePosition = activeController.getAttribute('position');


    timeInterval = setInterval(() => {
        element.setAttribute('position', `${activePosition.x} ${activePosition.y + 0.04} ${activePosition.z}`);

    }, 40);

    // A-Frame 0.8.2 has bug, so not works. If fixed, use this.

    // element.setAttribute('scale', '1 1 1');
    // element.setAttribute('position', '0 0 0 ');

    // console.log("element: ", element, typeof(element));
    // console.log("targetParent: ", targetParent, typeof(targetParent));
    // $(element).attr('position', '0 0 0').appendTo(targetParent);

    // $(element).attr('scale', scale);
    // $(element).attr('position', position);
}

