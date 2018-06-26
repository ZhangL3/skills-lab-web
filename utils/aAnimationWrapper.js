import $ from 'jquery';

/**
 * Wrap <a-animation> tag as a function.
 *
 * @param el
 * @param begin
 * @param attribute
 * @param from
 * @param to
 * @param dur
 * @param direction
 * @param remove
 * @param fill
 * @param repeat
 * @param easing
 */
const aAnimationWrapper = (el, begin, attribute, from, to, dur, direction='',
                           remove=false, fill='none', repeat=0, easing='ease') => {
    const move=document.createElement("a-animation");
    move.setAttribute("begin",begin);
    move.setAttribute("attribute", attribute);
    move.setAttribute("from", from);
    move.setAttribute("to", to);
    move.setAttribute("dur", dur);
    move.setAttribute("direction", direction);
    move.setAttribute("fill", fill);
    move.setAttribute("repeat", repeat);
    move.setAttribute("easing", easing);

    if (!el.append) {
        el.appendChild(move);
    }
    // support of JQuery
    else {
        el.append(move);
    }

    if (remove) {
        if (repeat) {
            setTimeout(()=>{
                $(move).remove();
            }, dur * (repeat + 1));
        }
        else {
            setTimeout(()=>{
                $(move).remove();
            }, dur);
        }
    }
};

export default aAnimationWrapper;