export const compose = (...funcs) => {
    if (funcs.length === 0) {
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((acc, next) => {
        return (...args) => {
            const fRes = next(...args);
            return acc(fRes);
        }
    })
}
