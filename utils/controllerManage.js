import $ from 'jquery';
import controllerStateIndex from './controllerState';


import { supportedController } from "./constants";

let haveEvents = 'ongamepadconnected' in window;
let controllers = {};
let controller;

let cursor;
let allThings;

function connectHandler(e) {
    controller = e.gamepad.id;
    controllerStateIndex.setControllerState('connectedController', controller);

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
    removeCursor();
    adjustAllThingsScale('1.2 1.2 1.2');
    adjustAllThingsPosition('0 0 0');
    adjustCameraPosition('0 1 0');
}

function matchNoController() {
    console.log("match no controller");
}

function removeCursor() {
    const cursor = document.querySelector("#cursor");
    $(cursor).remove();
    console.log("cursor removed");
}

function adjustAllThingsPosition(position) {
    const allThings = document.querySelector("#allThings");
    $(allThings).attr("position", position);
}

function adjustAllThingsScale(scale) {
    const allThings = document.querySelector("#allThings");
    $(allThings).attr("scale", scale);
}

function adjustCameraPosition(position) {
    const camera = document.querySelector("#camera");
    $(camera).attr('position', position);
}

export function getActiveController() {
    return controller;
}


window.addEventListener("gamepadconnected", connectHandler);
window.addEventListener("gamepaddisconnected", disconnectHandler);
