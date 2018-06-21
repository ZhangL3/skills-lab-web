import $ from 'jquery';
import Observable from '../utils/observable';
import * as constants from '../utils/constants';

import { handleNotifyPortfolio } from "./portfolio";


const initState = {
    portfolio: {
        position: constants.portfolio.position.ON_TABLE, // 'on-table' || 'in-hand'
        checkPortfolio: {
            R1: false,
            R2: false,
            R3: false,
            R4: false,
            R5: false,
        },
        finish: false,
    },
    tableDisinfection:{
        hasGlove: false,
        hasCloth: false,
        disinfected: false,
    },
    handDisinfection: false,
    bottlePrepare: {
        position: 'in-cupboard', // 'in-cupboard' || 'in-hand' || 'on-table' || 'hanged'
        checkBottle: {
            front: false,
            back: false,
            top: false,
        },
        withCap: true,
    },
    infusionSet: {
        position: 'in-drawer', // 'in-drawer' || 'in-hand' || 'on-table' || 'in-bottle'
        checkSet: {
            label: false,
        },
        rollerClapOpen: false,
        withCap: true,
        dripChamber:false,
        tubeEmpty: false,
        fixed: false,
    },
    nameLabel: {
        position: 'in-box', // 'in-box' || 'in-hand' || 'on-bottle'
        labelFilled: false,
    },
    showResult: {
        time: '0:00',
        hintTimes: 0,
    },
    hint: 'If ready, please check the portfolio at first.'
};

let state;

export default class stateIndex {

    static init() {
        state = initState;
        this.headingsObserver = new Observable();
        // Add function from observers
        this.headingsObserver.subscribe(handleNotifyPortfolio);
    }

    /**
     * Get all state.
     *
     * @returns {*}
     */
    static getState () {
        return state;
    }

    /**
     * Get the value of the prop in state.
     *
     * @param propString
     * @returns {*}
     */
    static get (propString) {
        return state[propString];
    }

    /**
     * Get the value of the props in state in deep. Type of param should be array.
     *
     * @param propsArray
     * @returns {*}
     */
    static getIn (propsArray) {
        const lengthOfProps = propsArray.length;
        let result = state[propsArray[0]];
        if (lengthOfProps===1) {
            return result;
        }
        else {
            for(let i = 1; i < lengthOfProps; i++) {
                result = result[propsArray[i]];
            }
        }
        return result;
    }

    /**
     * Set the prop as the given value.
     *
     * @param propString
     * @param value
     */
    static set (propString, value) {
        state[propString] = value;
        this.headingsObserver.notify(state);
    }

    /**
     * Set the value of the props in state in deep. Type of first param should be array.
     *
     * @param propsArray
     * @param value
     */
    // TODO: Ugly function, must to be rewrite
    static setIn(propsArray, value) {
        const lengthOfProps = propsArray.length;

        // why state here already changed
        // console.log('before.setIn.state:', state);

        switch (lengthOfProps) {
            case 1:
                state[propsArray[0]] = value;
                break;
            case 2:
                state[propsArray[0]][propsArray[1]] = value;
                break;
            case 3:
                state[propsArray[0]][propsArray[1]][propsArray[2]] = value;
                break;
            case 4:
                state[propsArray[0]][propsArray[1]][propsArray[2]][propsArray[3]] = value;
                break;
        }

        this.headingsObserver.notify(state);
    }
}
