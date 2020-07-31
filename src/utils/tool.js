export const debounce = (fn,delay) => {
    let timeout = null;
    return function (){
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    }
}
