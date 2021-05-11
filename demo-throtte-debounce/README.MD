## 工具类函数-防抖/节流

### 防抖
+ 1.是否首次延迟执行
+ 2.n秒频繁触发事件,计时器会频繁重新开始计时
```javascript
function debounce(func, delay=300, immeditely=false){
    let timer;
    let result = null;
    // 检测函数
    if (typeof func !== "function") {
        throw new TypeError("func is not a function.");
    }

    const debouncer = function() {
        if (timer) {
            clearTimeout(timer);
        }
        const _this = this;
        const _args = arguments;

        if (immeditely) {
            const exec = !timer;

            timer = setTimeout(() => {
                timer = null;
            }, delay);

            if (exec) {
                result = func.apply(_this, _args);
            }
        } else {
            timer = setTimeout(()=>{
                result = func.apply(_this, _args);
            }, delay);
        }
        return result;
    }

    return debouncer;
}
```

### 节流-定时器版
+ 频繁触发事件,间隔时间段内只会执行一次。
```javascript
function throttle(func, delay=300) {
    let timer;
    let result = null;
    if (typeof func !== "function") {
        throw new TypeError("func is not a function.");
    }
    return function() {
        let _this = this;
        let _args = arguments;

        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                result = func.apply(_this, _args);
            }, delay);
        }
        return result;
    }
}
```

### 节流-时间戳
```javascript
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
```