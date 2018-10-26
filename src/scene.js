import $ from "jquery";
import {matchBrowser, controller} from '../utils/controllerManage';

let sceneEl;

AFRAME.registerComponent('scene', {
    init: function () {
        sceneEl = this.el;
        matchBrowser();
    }
});
