## 瀑布流的两种实现
> 这里关于js处理的方案,没有考虑到: 远程请求获取图片列表(分页的情况下)

### css方案(ie兼容问题)
```css
/* 2行代码让标签支持瀑布流 */
ul {
  columns: 3; // 3列, ie9以下不兼容
  column-gap: 1px; // 列与列的间距, ie11以下不兼容
}
img {
  width: 100%;
  height: 100%;
}
```

### es5方案(css绝对定位 + js动态设置top/left)
#### 前置css要求: ul > li > img (div > div > img)
```
ul {
  position: relative;
}
li {
  position: absolute;
}
img {
  width: 100%;
  height: 100%;
}
```

#### js关键点:
前置: 处理好img的预加载/懒加载为前提 => 保证图片加载出来撑开容器的高度
1.根据配置划分: n列
2.获取图片容器的宽度、高度
3.动态配置每个图片容器的top、left
```javascript
// this.heightArray = []; // 动态存n列的图片容器的距离顶部的高度
Waterfall.prototype.setImgBoxPosition = function(dom, i) {
    // 动态设置图片容器的位置
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

// 关键动态设置: 第一排，水平布局
if (i < that.column) {
    // console.log(tempItem.offsetWidth);
    that.heightArray.push(0);
    that.setImgBoxPosition(tempItem, i);
} else {
    // 非第一排
    var obj = getArrayMin(that.heightArray);
    if (obj.index > -1) {
        // 取出值最小值距顶高度的下标
        that.setImgBoxPosition(tempItem, obj.index);
        // 更改原来的最小值距顶高度 = 原值+新值
        that.heightArray[obj.index] = that.heightArray[obj.index] + tempItem.offsetHeight;
    }
}
```
