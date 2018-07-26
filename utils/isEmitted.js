import $ from 'jquery';

export function isEmitted(element, triggerPosition) {
    const el = $(element);

    const maxX = Number(el.attr('worldboundmaxx'));
    const maxY = Number(el.attr('worldboundmaxy'));
    const maxZ = Number(el.attr('worldboundmaxz'));

    const minX = Number(el.attr('worldboundminx'));
    const minY = Number(el.attr('worldboundminy'));
    const minZ = Number(el.attr('worldboundminz'));

    if (triggerPosition.x > maxX || triggerPosition.x < minX) {
        console.log("x wrong");
        return false;
    }

    if (triggerPosition.y > maxY || triggerPosition.y < minY) {
        console.log("y wrong");
        return false;
    }

    if (triggerPosition.z > maxZ || triggerPosition.z < minZ) {
        console.log("z wrong");
        return false;
    }

    return true;
}