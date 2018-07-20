import $ from 'jquery';

import { supportedController } from "./constants";

let haveEvents = 'ongamepadconnected' in window;
let controllers = {};
let controller;

let cursor;

function connectHandler(e) {
    controller = e.gamepad.id;
    console.log("connectHandler: ", controller);

    switch (controller) {
        case supportedController.geaVRController:
            matchGearVRController();
            break;
        case supportedController.ViveController:
            matchViveController();
            break;
        default:
            matchNoController();
    }
    addGamePad(e.gamepad);
}

function addGamePad(gamePad) {
    controllers[gamePad.index] = gamePad;
    console.log("addGamePad: ",gamePad.id);
    cursor = document.querySelector("#cursor");
    console.log("cursor: ", cursor, typeof(cursor));
}

function disconnectHandler(e) {
    removeGamePad(e.gamepad);
}

function removeGamePad(gamePad) {
    delete controllers[gamePad.index];
}

function matchGearVRController() {
    console.log("match Gear VR");
}

function matchViveController() {
    console.log("match vive");
}

function matchNoController() {
    console.log("match no controller");
}

function removeCursor() {
    cursor = document.querySelector("#cursor");
    $(cursor).remove();
    console.log("cursor removed");
}

// function updateStatus() {
//     if (!haveEvents) {
//         scanGamePads();
//     }
//
//     var i = 0;
//     var j;
//
//     for (j in controllers) {
//         var controller = controllers[j];
//         var d = document.getElementById("controller" + j);
//         var buttons = d.getElementsByClassName("button");
//
//         for (i = 0; i < controller.buttons.length; i++) {
//             var b = buttons[i];
//             var val = controller.buttons[i];
//             var pressed = val == 1.0;
//             if (typeof(val) == "object") {
//                 pressed = val.pressed;
//                 val = val.value;
//             }
//
//             var pct = Math.round(val * 100) + "%";
//             b.style.backgroundSize = pct + " " + pct;
//
//             if (pressed) {
//                 b.className = "button pressed";
//             } else {
//                 b.className = "button";
//             }
//         }
//
//         var axes = d.getElementsByClassName("axis");
//         for (i = 0; i < controller.axes.length; i++) {
//             var a = axes[i];
//             a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
//             a.setAttribute("value", controller.axes[i] + 1);
//         }
//     }
//
//     requestAnimationFrame(updateStatus);
// }

// function scanGamePads() {
//     let gamePads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
//     for (var i = 0; i < gamePads.length; i++) {
//         if (gamePads[i]) {
//             if (gamePads[i].index in controllers) {
//                 controllers[gamePads[i].index] = gamePads[i];
//             } else {
//                 addGamePad(gamePads[i]);
//             }
//         }
//     }
//     // console.log("controllers: ", controllers, typeof(controllers));
// }


window.addEventListener("gamepadconnected", connectHandler);
window.addEventListener("gamepaddisconnected", disconnectHandler);

// if (!haveEvents) {
//     // console.log("setInterval to scanGamePads");
//     setInterval(scanGamePads, 500);
// }