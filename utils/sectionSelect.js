import * as constants from './constants';

export const section0 = {
    wasteBinCapOpen: false,
    portfolio: {
        position: constants.portfolio.position.ON_TABLE, // 'on-table' || 'in-hand'
        checkPortfolio: {
            name: false,
            drug: false,
            dose: false,
            IV: false,
            CF: false,
        },
        checkFinish: false,
        finish: false,
    },
    tableDisinfection:{
        hasGlove: false,
        hasCloth: false,
        disinfectionFinish: false,
        finish: false,
    },
    handDisinfection: {
        disinfecting: false,
        finish: false,
    },
    bottlePrepare: {
        position: constants.bottle.position.IN_CUPBOARD, // 'in-cupboard' || 'in-hand' || 'on-table' || 'hanged'
        checkBottle: {
            front: false,
            back: false,
            top: false,
        },
        withCap: true,
        // withInfusionSet: false,
        finish: false,
    },
    infusionSet: {
        position: constants.infusionSet.position.IN_DRAWER, // 'in-drawer' || 'in-hand' || 'on-table' || 'in-bottle'
        inPack: true,
        checkSet: {
            label: false,
        },
        rollerClapOpen: true,
        withCap: true,
        chamberFilled:false,
        tubeFilled: false,
        fixed: false,
    },
    nameLabel: {
        position: constants.nameLabel.position.IN_BOX, // 'in-box' || 'in-hand' || 'on-bottle'
        labelFilled: false,
    },
    showResult: {
        time: '0:00',
        hintTimes: 0,
    },
    hint: 'If ready, please check the portfolio at first.'
};