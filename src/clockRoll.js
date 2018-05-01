export default AFRAME.registerComponent('clock_hand_roll',{
    schema:{
        type:'string', default: "secondClockHand"
    },

    tick: function(time, timeDelta){

        const oTime= new Date();
        let curTime;

        if(this.data === "secondClockHand" ){
            curTime = oTime.getSeconds();
        }else if(this.data === "minuteClockHand"){
            curTime = oTime.getMinutes();
        }else if(this.data === "hourClockHand"){
            curTime = oTime.getHours();
        }else {
            alert("invalid input!");
        }

        setClockHandPosition(this.el, curTime, this.data);
    }
});


/**
 * set the position of clock hands
 *
 * @param el
 * @param curTime
 * @param typeOfClockHand
 */
const setClockHandPosition = (el, curTime, typeOfClockHand) => {
    let gradForOneSec;
    let gradRoll;
    let rotationArray;

    if(typeOfClockHand === "secondClockHand" || typeOfClockHand === "minuteClockHand"){
        gradForOneSec = 360 / 60;
    }else if(typeOfClockHand === "hourClockHand"){
        gradForOneSec = 360 / 12;
    }

    gradRoll = curTime * gradForOneSec;

    //The value of rotation is a object
    rotationArray = { x: -gradRoll, y: 0, z: 0 };
    el.setAttribute("rotation", rotationArray);
};

