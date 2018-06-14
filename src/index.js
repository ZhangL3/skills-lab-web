import stateIndex from './state';

import * as cursorSubmit from './cursorSubmit';
import * as drawerOpen from './drawerOpen';
import * as doorOpen from './doorOpen';
import * as clockRoll from './clockRoll';
import * as handDisinfection from './handDisinfection';
import * as wasteBinCapOpen from './wasteBinCapOpen';
import * as clothBottleCapOpen from './clothBottleCapOpen';


stateIndex.init();

// let name = stateIndex.showName();
// console.log("name: ", name, typeof(name));
stateIndex.get('portfolio');
stateIndex.getIn(['infusionSet', 'checkSet', 'label']);