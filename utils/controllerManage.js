import $ from 'jquery';
import controllerStateIndex from './controllerState';


import { supportedController } from "./constants";

let haveEvents = 'ongamepadconnected' in window;
let controllers = {};
export let controller;
export let device = null;

let cursor;
let allThings;

// getInfor();

function initEnterVRMode() {
    document.querySelector('a-scene').addEventListener('enter-vr', function () {
        if (!controller){
            console.log("ENTERED VR");
            matchSamsungBrowser();
        }

    });
}

export function matchBrowser() {
    const browser = getInfor();
    if (
        browser.indexOf('SamsungBrowser') > 0
        || browser.indexOf('OculusBrowser') > 0
    ) {
        initEnterVRMode();
    }
}

function connectHandler(e) {
    controller = e.gamepad.id;
    controllerStateIndex.setControllerState('connectedController', controller);
    console.log("controller: ", controller, typeof(controller));

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

    removeCursor();
    showGearController();
    disableCameraAutoMove();
    adjustAllThingsScale('1.2 1.2 1.2');
    adjustCameraRigPosition('0 -0.3 -0.15');
    adjustCameraPosition('0 0 -0.1');
    adjustGearControllerPosition('0 0.3 0');
}

function matchViveController() {

    console.log("match vive");
    removeCursor();
    disableCameraAutoMove();
    removeGearVRController();
    showViveControllers();
    adjustAllThingsScale('1.3 1.3 1.3');
    // adjustAllThingsPosition('0 1 0'); // problem by dropping down, dropped from too high
    adjustCameraRigPosition('0 -0.1 0');
    adjustViveControllerScale('1.3 1.3 1.3');
}

function matchNoController() {
    console.log("match no controller");
}

export  function matchSamsungBrowser() {
    device = "GearVRWithoutController";
    adjustAllThingsScale('3.5 3.5 3.5');
    adjustCameraRigPosition('0 1.85 -0.5');
    adjustCursorPosition('0 0 -1');
    adjustCursorGeometry('primitive: ring; radiusInner: 0.007; radiusOuter: 0.0125');
}

function removeCursor() {
    const cursor = document.querySelector("#cursor");
    $(cursor).remove();
    console.log("cursor removed");
}

function removeGearVRController() {
    const gearController = document.querySelector("#gearController");
    $(gearController).remove();

}

function showViveControllers() {
    const leftController = document.querySelector('#viveControllerLeft');
    const rightController = document.querySelector('#viveControllerRight');

    leftController.setAttribute('visible', true);
    rightController.setAttribute('visible', true);
}

function showGearController() {
    const gearController = document.querySelector('#gearController');

    gearController.setAttribute('visible', true);
}

function adjustAllThingsPosition(position) {
    const allThings = document.querySelector("#allThings");
    $(allThings).attr("position", position);
}

function adjustAllThingsScale(scale) {
    const allThings = document.querySelector("#allThings");
    $(allThings).attr("scale", scale);
}

export function adjustCameraRigPosition(position) {
    const cameraRig = document.querySelector("#cameraRig");
    $(cameraRig).attr('position', position);
}

function adjustCameraPosition(position) {
    const camera = document.querySelector("#camera");
    $(camera).attr('position', position);
}

function adjustGearControllerPosition(position) {
    const gearController = document.querySelector('#gearController');
    gearController.setAttribute('position', position)
}

function adjustViveControllerScale(scale) {
    const viveControllerLeft = document.querySelector('#viveControllerLeft');
    const viveControllerRight = document.querySelector('#viveControllerRight');
    viveControllerLeft.setAttribute('scale', scale);
    viveControllerRight.setAttribute('scale', scale);
}

function adjustCursorPosition(position) {
    const cursor = document.querySelector('#cursor');
    cursor.setAttribute('position', position);
}

function adjustCursorGeometry(geometry) {
    const cursor = document.querySelector('#cursor');
    cursor.setAttribute('geometry', geometry);

}

function disableCameraAutoMove() {
    let cameraRig = document.querySelector('#cameraRig');
    cameraRig.setAttribute('camera-move', 'disable: true');
}

export function getActiveController() {
    return controller;
}

export function getInfor() {
    console.log('getInfor', navigator.userAgent, typeof(navigator.userAgent));
    return(navigator.userAgent);
}


window.addEventListener("gamepadconnected", connectHandler);
window.addEventListener("gamepaddisconnected", disconnectHandler);
