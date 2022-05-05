export const makeEvent = target => eventName => callbackFunction => target.addEventListener(eventName, callbackFunction);
export const modifyCss = target => styleName => value => target.style[styleName] = value;
export const scrollEndCheck = event => {
    const { target: { offsetHeight, scrollTop, scrollHeight } } = event;
    const isScrollEnd = (offsetHeight + scrollTop === scrollHeight);
    return isScrollEnd;
}