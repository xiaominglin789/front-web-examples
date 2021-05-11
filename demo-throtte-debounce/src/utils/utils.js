/**
 * 防抖函数
 * 1.是否首次延迟执行
 * 2.n秒频繁触发事件,计时器会频繁重新开始计时,直到不再触发.函数才执行
 * @param {*} func 函数
 * @param {*} delay 延迟时间, 默认 300ms
 * @param {*} immediately 是否开启立刻执行一次函数, 默认 false
 * @returns 
 */
function debounce(func, delay=300, immediately=false) {
    let timer = null;
    let result = null;
    // 检查函数
    if (typeof func !== 'function') {
        throw new TypeError('func not a function');
    }

    const debouncer = function() {
        if (timer)  clearTimeout(timer);
        
        if (immediately) {
            // 立刻执行
            const exec = !timer;
            // 延迟操作
            timer = setTimeout(() => {
                timer = null;
            }, delay);
            // 立刻执行函数
            if (exec) {
                result = func.apply(this, arguments);
            }
        } else {
            // 正常逻辑
            timer = setTimeout(() => {
                result = func.apply(this, arguments);
            }, delay);
        }
        return result;
    }

    return debouncer;
}

/**
 * 节流函数-定时器
 * 频繁触发事件,间隔时间段内只会执行一次。
 * @param {Function} func 函数
 * @param {Number} delay 延迟时间, 默认 300ms
 */
 function throttle(func, delay = 300) {
    let timer;
    let result = null;
    // 检查函数
    if (typeof func !== 'function') {
        throw new TypeError('func not a function');
    }
    
    return function () {
        let that = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                result = func.apply(that, args);
            }, delay);
        }
        return result
    }
}

/**
 * 节流-时间戳
 * @param {*} func 
 * @param {*} delay 
 */
function throttle(func, delay=300) {
    let previous = 0;
    let result = null;
    if (typeof func !== "function") {
        throw new TypeError("func is not a function.");
    }

    return function() {
        let _this = this;
        let _args = arguments;
        const now = Date.now();

        if (now - previous > delay) {
            result = func.apply(_this, _args);
            previous = now;
        }
        return result;
    }
}

export  {
    debounce,
    throttle
}