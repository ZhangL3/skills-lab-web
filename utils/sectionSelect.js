import * as constants from './constants';

export const section0 = {
    wasteBinCapOpen: false,
    trashCanCapOpen: false,
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
        disinfected: false,
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
        finish: false,
    },
    nameLabel: {
        position: constants.nameLabel.position.IN_BOX, // 'in-box' || 'in-hand' || 'on-bottle'
        labelFilled: false,
        finish: false,
    },
    showResult: {
        time: '0:00',
        hintTimes: 0,
    },
    hint: 'Please check the portfolio at first.',
    sectionSelected: 0,
    started: false
};

export const section1 = {
    wasteBinCapOpen: false,
    trashCanCapOpen: false,
    portfolio: {
        position: constants.portfolio.position.ON_TABLE, // 'on-table' || 'in-hand'
        checkPortfolio: {
            name: true,
            drug: true,
            dose: true,
            IV: true,
            CF: true,
        },
        checkFinish: true,
        finish: true,
    },
    tableDisinfection:{
        hasGlove: false,
        hasCloth: false,
        disinfectionFinish: false,
        finish: false,
    },
    handDisinfection: {
        disinfecting: false,
        disinfected: false,
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
        finish: false,
    },
    nameLabel: {
        position: constants.nameLabel.position.IN_BOX, // 'in-box' || 'in-hand' || 'on-bottle'
        labelFilled: false,
        finish: false,
    },
    showResult: {
        time: '0:00',
        hintTimes: 0,
    },
    hint: 'Please disinfect the work desk at first.',
    sectionSelected: 1,
    started: false
};

export const section2 = {
    wasteBinCapOpen: false,
    trashCanCapOpen: false,
    portfolio: {
        position: constants.portfolio.position.ON_TABLE, // 'on-table' || 'in-hand'
        checkPortfolio: {
            name: true,
            drug: true,
            dose: true,
            IV: true,
            CF: true,
        },
        checkFinish: true,
        finish: true,
    },
    tableDisinfection:{
        hasGlove: true,
        hasCloth: true,
        disinfectionFinish: true,
        finish: true,
    },
    handDisinfection: {
        disinfecting: false,
        disinfected: false,
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
        finish: false,
    },
    nameLabel: {
        position: constants.nameLabel.position.IN_BOX, // 'in-box' || 'in-hand' || 'on-bottle'
        labelFilled: false,
        finish: false,
    },
    showResult: {
        time: '0:00',
        hintTimes: 0,
    },
    hint: 'Please disinfect hands at first.',
    sectionSelected: 2,
    started: false
};

export const section3 = {
    wasteBinCapOpen: false,
    trashCanCapOpen: false,
    portfolio: {
        position: constants.portfolio.position.ON_TABLE, // 'on-table' || 'in-hand'
        checkPortfolio: {
            name: true,
            drug: true,
            dose: true,
            IV: true,
            CF: true,
        },
        checkFinish: true,
        finish: true,
    },
    tableDisinfection:{
        hasGlove: true,
        hasCloth: true,
        disinfectionFinish: true,
        finish: true,
    },
    handDisinfection: {
        disinfecting: true,
        disinfected: true,
        finish: true,
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
        finish: false,
    },
    nameLabel: {
        position: constants.nameLabel.position.IN_BOX, // 'in-box' || 'in-hand' || 'on-bottle'
        labelFilled: false,
        finish: false,
    },
    showResult: {
        time: '0:00',
        hintTimes: 0,
    },
    hint: 'Please prepare infusion bottle at first.',
    sectionSelected: 3,
    started: false
};

export const section4 = {
    wasteBinCapOpen: false,
    trashCanCapOpen: false,
    portfolio: {
        position: constants.portfolio.position.ON_TABLE, // 'on-table' || 'in-hand'
        checkPortfolio: {
            name: true,
            drug: true,
            dose: true,
            IV: true,
            CF: true,
        },
        checkFinish: true,
        finish: true,
    },
    tableDisinfection:{
        hasGlove: true,
        hasCloth: true,
        disinfectionFinish: true,
        finish: true,
    },
    handDisinfection: {
        disinfecting: true,
        disinfected: true,
        finish: true,
    },
    bottlePrepare: {
        position: constants.bottle.position.ON_TABLE, // 'in-cupboard' || 'in-hand' || 'on-table' || 'hanged'
        checkBottle: {
            front: true,
            back: true,
            top: true,
        },
        withCap: false,
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
        finish: false,
    },
    nameLabel: {
        position: constants.nameLabel.position.IN_BOX, // 'in-box' || 'in-hand' || 'on-bottle'
        labelFilled: false,
        finish: false,
    },
    showResult: {
        time: '0:00',
        hintTimes: 0,
    },
    hint: 'Please prepare infusion set at first.',
    sectionSelected: 4,
    started: false
};

export const section5 = {
    wasteBinCapOpen: false,
    trashCanCapOpen: false,
    portfolio: {
        position: constants.portfolio.position.ON_TABLE, // 'on-table' || 'in-hand'
        checkPortfolio: {
            name: true,
            drug: true,
            dose: true,
            IV: true,
            CF: true,
        },
        checkFinish: true,
        finish: true,
    },
    tableDisinfection:{
        hasGlove: true,
        hasCloth: true,
        disinfectionFinish: true,
        finish: true,
    },
    handDisinfection: {
        disinfecting: true,
        disinfected: true,
        finish: true,
    },
    bottlePrepare: {
        position: constants.bottle.position.ON_TABLE, // 'in-cupboard' || 'in-hand' || 'on-table' || 'hanged'
        checkBottle: {
            front: true,
            back: true,
            top: true,
        },
        withCap: false,
        // withInfusionSet: false,
        finish: false,
    },
    infusionSet: {
        position: constants.infusionSet.position.ON_TABLE, // 'in-drawer' || 'in-hand' || 'on-table' || 'in-bottle'
        inPack: false,
        checkSet: {
            label: false,
        },
        rollerClapOpen: false,
        withCap: false,
        chamberFilled:false,
        tubeFilled: false,
        fixed: false,
        finish: false,
    },
    nameLabel: {
        position: constants.nameLabel.position.IN_BOX, // 'in-box' || 'in-hand' || 'on-bottle'
        labelFilled: false,
        finish: false,
    },
    showResult: {
        time: '0:00',
        hintTimes: 0,
    },
        hint: 'Please prepare for infusion',
    sectionSelected: 5,
    started: false
};

export const section6 = {
    wasteBinCapOpen: false,
    trashCanCapOpen: false,
    portfolio: {
        position: constants.portfolio.position.ON_TABLE, // 'on-table' || 'in-hand'
        checkPortfolio: {
            name: true,
            drug: true,
            dose: true,
            IV: true,
            CF: true,
        },
        checkFinish: true,
        finish: true,
    },
    tableDisinfection:{
        hasGlove: true,
        hasCloth: true,
        disinfectionFinish: true,
        finish: true,
    },
    handDisinfection: {
        disinfecting: true,
        disinfected: true,
        finish: true,
    },
    bottlePrepare: {
        position: constants.bottle.position.ON_TABLE, // 'in-cupboard' || 'in-hand' || 'on-table' || 'hanged'
        checkBottle: {
            front: true,
            back: true,
            top: true,
        },
        withCap: false,
        // withInfusionSet: false,
        finish: true,
    },
    infusionSet: {
        position: constants.infusionSet.position.HANGED, // 'in-drawer' || 'in-hand' || 'on-table' || 'in-bottle'
        inPack: false,
        checkSet: {
            label: false,
        },
        rollerClapOpen: true,
        withCap: false,
        chamberFilled:true,
        tubeFilled: true,
        fixed: true,
        finish: true,
    },
    nameLabel: {
        position: constants.nameLabel.position.IN_BOX, // 'in-box' || 'in-hand' || 'on-bottle'
        labelFilled: false,
        finish: false,
    },
    showResult: {
        time: '0:00',
        hintTimes: 0,
    },
    hint: 'Please paste the name label.',
    sectionSelected: 6,
    started: false
};
