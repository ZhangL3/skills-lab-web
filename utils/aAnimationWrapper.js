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
 */
const aAnimationWrapper = (el, begin, attribute, from, to, dur, direction='', remove=false, fill='none') => {
    const move=document.createElement("a-animation");
    move.setAttribute("begin",begin);
    move.setAttribute("attribute", attribute);
    move.setAttribute("from", from);
    move.setAttribute("to", to);
    move.setAttribute("dur", dur);
    move.setAttribute("direction", direction);
    move.setAttribute("fill", fill);

    if (!el.append) {
        el.appendChild(move);
        el.removeChild(move)
    }

    el.append(move);

    if (remove) {
        setTimeout(()=>{
            $(move).remove();
        }, dur);
    }
};

export default aAnimationWrapper;