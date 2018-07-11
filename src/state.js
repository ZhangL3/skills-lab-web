import Observable from '../utils/observable';

import * as sectionSelect from '../utils/sectionSelect';

import { handleNotifyPortfolio } from './portfolio';
import { handleNotifyPortfolioCheck } from './portfolioCheck';
import { handleNotifyGlove } from './glove';
import { handleNotifyClothInBottle } from "./disinfectionClothInBottle";
import { handleNotifyClothOnTable } from "./disinfectionClothOnTable";
import { handleNotifyHandDisinfection } from "./handDisinfection";
import { handleNotifyBottle } from "./bottleNacl500";
import { handleNotifyWasteBinCap } from "./wasteBinCapOpen";
import { handleNotifyInfusionSet } from "./infusionSet";
import { handleNotifyNameLabel } from "./nameLabelStamper";

let state;

export default class stateIndex {

    static init() {
        state = sectionSelect.section0;

        this.headingsObserver = new Observable();
        // Add function from observers
        this.headingsObserver.subscribe(handleNotifyPortfolio);
        this.headingsObserver.subscribe(handleNotifyPortfolioCheck);
        this.headingsObserver.subscribe(handleNotifyGlove);
        this.headingsObserver.subscribe(handleNotifyClothInBottle);
        this.headingsObserver.subscribe(handleNotifyClothOnTable);
        this.headingsObserver.subscribe(handleNotifyHandDisinfection);
        this.headingsObserver.subscribe(handleNotifyBottle);
        this.headingsObserver.subscribe(handleNotifyWasteBinCap);
        this.headingsObserver.subscribe(handleNotifyInfusionSet);
        this.headingsObserver.subscribe(handleNotifyNameLabel);
    }

    static selectSection (section) {
        switch (section) {
            case 0: state = sectionSelect.section0;
                break;

            default: state = sectionSelect.section0;
        }
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

        console.log('state: ', stateIndex.getState());
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

        // why state already changed here, before switch???
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


        console.log('state: ', stateIndex.getState());

    }
}
