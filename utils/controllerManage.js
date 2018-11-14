import $ from 'jquery';
import controllerStateIndex from './controllerState';
import {supportedController} from "./constants";

let controllers = {};
export let controller;
export let device = null;

/**
 * Handel event enter-vr
 */
function initEnterVRMode() {
    document.querySelector('a-scene').addEventListener('enter-vr', function () {
        if (!controller){
            matchGearVRWithoutController();
        }
    });
}

/**
 * Identify the browser.
 * Handle Samsung Browser and Oculus Browser
 */
export function matchBrowser() {
    const browser = getInfor();
    if (
        browser.indexOf('SamsungBrowser') > 0
        || browser.indexOf('OculusBrowser') > 0
    ) {
        initEnterVRMode();
    }
}

/**
 * Identify the connected controller
 *
 * @param e
 */
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

/**
 * Handle disconnection of controllers
 *
 * @param e
 */
function disconnectHandler(e) {
    removeGamePad(e.gamepad);
}


/**
 * Add game pad to controller list
 *
 * @param gamePad
 */
function addGamePad(gamePad) {
    controllers[gamePad.index] = gamePad;
}

/**
 * Remove game pad from controller list
 *
 * @param gamePad
 */
function removeGamePad(gamePad) {
    delete controllers[gamePad.index];
}

/**
 * Adjust the scene for Gear VR with controller
 */
function matchGearVRController() {
    removeCursor();
    showGearController();
    disableCameraAutoMove();
    adjustAllThingsScale('1.2 1.2 1.2');
    adjustCameraRigPosition('0 -0.3 -0.15');
    adjustCameraPosition('0 0 -0.1');
    adjustGearControllerPosition('0 0.3 0');
}

/**
 * Adjust the scene for HTV Vive
 */
function matchViveController() {
    removeCursor();
    disableCameraAutoMove();
    removeGearVRController();
    showViveControllers();
    adjustAllThingsScale('1.3 1.3 1.3');
    adjustCameraRigPosition('0 -0.1 0');
    adjustViveControllerScale('1.3 1.3 1.3');
}

/**
 * Handle connection of not supported controller
 */
function matchNoController() {
    console.log("Sorry, your controllers are still not supported");
}

/**
 * Adjust the scene for browser in Gear VR without controller
 */
export  function matchGearVRWithoutController() {
    device = "GearVRWithoutController";
    adjustAllThingsScale('3.5 3.5 3.5');
    adjustCameraRigPosition('0 1.85 -0.5');
    adjustCursorPosition('0 0 -1');
    adjustCursorGeometry('primitive: ring; radiusInner: 0.007; radiusOuter: 0.0125');
}

/**
 * Remove the cursor element from the scene
 */
function removeCursor() {
    const cursor = document.querySelector("#cursor");
    $(cursor).remove();
}

/**
 * Remove the Gear VR controller element from the scene
 */
function removeGearVRController() {
    const gearController = document.querySelector("#gearController");
    $(gearController).remove();

}

/**
 * Show HTC Vive controller in the scene
 */
function showViveControllers() {
    const leftController = document.querySelector('#viveControllerLeft');
    const rightController = document.querySelector('#viveControllerRight');
    leftController.setAttribute('visible', true);
    rightController.setAttribute('visible', true);
}

/**
 * Show Gear VR controller in the scene
 */
function showGearController() {
    const gearController = document.querySelector('#gearController');
    gearController.setAttribute('visible', true);
}

/**
 * Adjust the position of the room in the scene
 *
 * @param position
 */
function adjustAllThingsPosition(position) {
    const allThings = document.querySelector("#allThings");
    $(allThings).attr("position", position);
}

/**
 * Adjust the scale of all objects in the room
 *
 * @param scale
 */
function adjustAllThingsScale(scale) {
    const allThings = document.querySelector("#allThings");
    $(allThings).attr("scale", scale);
}

/**
 * Adjust the position of camera group (camera, controllers)
 *
 * @param position
 */
export function adjustCameraRigPosition(position) {
    const cameraRig = document.querySelector("#cameraRig");
    $(cameraRig).attr('position', position);
}

/**
 * Adjust the position of camera
 *
 * @param position
 */
function adjustCameraPosition(position) {
    const camera = document.querySelector("#camera");
    $(camera).attr('position', position);
}

/**
 * Adjust the position of the Gear VR controller relative to camera
 *
 * @param position
 */
function adjustGearControllerPosition(position) {
    const gearController = document.querySelector('#gearController');
    gearController.setAttribute('position', position)
}

/**
 * Adjust the scale of the HTC Vive controller
 *
 * @param scale
 */
function adjustViveControllerScale(scale) {
    const viveControllerLeft = document.querySelector('#viveControllerLeft');
    const viveControllerRight = document.querySelector('#viveControllerRight');
    viveControllerLeft.setAttribute('scale', scale);
    viveControllerRight.setAttribute('scale', scale);
}

/**
 * Adjust the position of cursor relative to camera
 *
 * @param position
 */
function adjustCursorPosition(position) {
    const cursor = document.querySelector('#cursor');
    cursor.setAttribute('position', position);
}

/**
 * Adjust the geometry of cursor
 *
 * @param geometry
 */
function adjustCursorGeometry(geometry) {
    const cursor = document.querySelector('#cursor');
    cursor.setAttribute('geometry', geometry);

}

/**
 * Disable the auto movement of camera
 */
function disableCameraAutoMove() {
    let cameraRig = document.querySelector('#cameraRig');
    cameraRig.setAttribute('camera-move', 'disable: true');
}

/**
 * Get the active controller
 *
 * @returns {*}
 */
export function getActiveController() {
    return controller;
}

/**
 * Get information of browser
 *
 * @returns {string}
 */
export function getInfor() {
    return(navigator.userAgent);
}

/**
 * Listen the event of gamepadconnected and gamepaddisconnected
 */
window.addEventListener("gamepadconnected", connectHandler);
window.addEventListener("gamepaddisconnected", disconnectHandler);
