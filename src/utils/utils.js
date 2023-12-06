export function throttle(fn, delay) {
    let lastFn
    let lastRan

    return function () {
        const context = this
        const args = arguments
        if (!lastRan) {
            fn.apply(context, args)
            lastRan = Date.now()
        } else {
            clearTimeout(lastFn)
            lastFn = setTimeout(function () {
                if (Date.now() - lastRan >= delay) {
                    fn.apply(context, args)
                    lastRan = Date.now()
                }
            }, delay - (Date.now() - lastRan))
        }
    }
}
