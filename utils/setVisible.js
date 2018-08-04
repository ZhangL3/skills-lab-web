import $ from 'jquery';

export function setVisibleTrue(element) {
    $(element).attr('visible', true);
}

export function setVisibleFalse(element) {
    $(element).attr('visible', false);
}