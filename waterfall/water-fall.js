/** 自定义瀑布流插件 */
;(function(doc, win) {
    /**
     * es5 创建类的形式: 原型对象
     * @param {Object} options { parentClasName: 图片列表的外层父容器的唯一className,
     *                           boxTag: 每个图片的父容器的classTag,用于遍历动态设置宽高
     *                           column: 列数，默认 3,
     *                           gap: 列间隔,默认 0px,
     *                         }
     */
    var Waterfall = function(options) {
        this.parentEl = doc.getElementsByClassName(options.parentClasName)[0];
        if (!this.parentEl) {
            throw new Error("不存在： " + options.parentEl + " 节点");
        }
        this.boxTag = options.boxTag || 'div';

        this.column = options.column || 3;
        this.gap = options.gap|| 0;

        // 计算每个子容器的平均宽度
        this.itemWidth = ((this.parentEl.offsetWidth) - this.gap * (this.column-1)) / this.column;
        // 高度集合
        this.heightArray = [];
        
        this.init();
    }

    /** 初始化 */
    Waterfall.prototype.init = function(){
        this.render();
    }

    /** 渲染 */
    Waterfall.prototype.render = function() {
        var tempItem = null;
        var that = this;
        var boxEls = getBoxDomList(this.parentEl, this.boxTag);
        if (!boxEls.length) {
            throw new Error(this.boxTag + "标签不存在");
        }

        for(var i=0; i<boxEls.length; i++) {
            ;(function(i) {
                tempItem = boxEls[i];
                tempItem.style.width = that.itemWidth + "px";
                // 第一排，水平布局
                if (i < that.column) {
                    // console.log(tempItem.offsetWidth);
                    that.heightArray.push(0);
                    that.setImgBoxPosition(tempItem, i);
                } else {
                    console.log(that.heightArray);
                    var obj = getArrayMin(that.heightArray);
                    if (obj.index > -1) {
                        // 取出值最小的下标
                        that.setImgBoxPosition(tempItem, obj.index);
                        // 更改最小值 = 原值+新值
                        console.log("头上的高度: ", that.heightArray[obj.index], " 自身的高度： ", tempItem.offsetHeight);
                        that.heightArray[obj.index] = that.heightArray[obj.index] + tempItem.offsetHeight;
                    }
                }
            })(i);
        }

        // 操作外层父容器-总高度（保障父容器最终高度正常）
        this.parentEl.style.height = Math.max.apply(null, this.heightArray) + "px";
    }

    /**
     * 设置img-box的绝对定位
     * @param {*} dom 要设置的元素
     * @param {*} i 要设置的位置下标
     */
    Waterfall.prototype.setImgBoxPosition = function(dom, i) {
        // 
        console.log("高度: ", dom.offsetHeight, " i: ", i);
        // 
        dom.style.top = this.heightArray[i] + "px";
        dom.style.left = i * (this.gap + this.itemWidth) + "px";
    }

    /** 获取数组中最小的值 n列 [a,b,c，...] => 用于每次将`新数`替换掉`最小值所在的列的值` */
    function getArrayMin(arr) {
        var min = null;
        var index = -1;

        min = Math.min.apply(null, arr);
        index = arr.indexOf(min);

        return {
            min,
            index,
        };
    }

    /** 返回指定tag标签的dom集合 */
    function getBoxDomList(parentEl, boxTag) {
        if (!parentEl || !boxTag) return [];
        var result = parentEl.getElementsByTagName(boxTag);
        console.log("result ", result);
        return result;
    }

    win.Waterfall = Waterfall;
})(document, window);