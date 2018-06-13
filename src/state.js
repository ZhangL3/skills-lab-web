import $ from 'jquery';

export default class stateIndex {
    // init state of all objects
    constructor() {
        this.tt = 'AA';
    }

    static showName = () => {
        console.log("this.tt: ", this.tt, typeof(this.tt));
        return this.tt;
    }
}