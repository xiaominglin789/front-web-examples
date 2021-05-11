# image-lazyload 图片懒加载
懒加载是一种网页性能优化的方式，它能极大的提升用户体验。就比如说图片，图片一直是影响网页性能的主要元凶，现在一张图片超过几兆已经是很经常的事了。如果每次进入页面就请求所有的图片资源，那么可能等图片加载出来用户也早就走了。所以，我们需要懒加载，进入页面的时候，只请求可视区域的图片资源。


### 步骤:
1.先不给<img>标签赋src属性。
2.可视区域滚过的高度才设置<img>的src属性。

- 关键: 
1.可视区滚动高度与标签高度的判定。
2.设置过属性的<img>标签,移除"data-img"标记。


### 参数:
1.`获取屏幕可视区的高度`:
window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

2.`获取滚动时到顶部的高度`：
document.documentElement.scrollTop || document.body.scrollTop

3.`html-img标签相对于文档顶部的高度`
var img = document.querySelector("img");
var imgOffset = img.offsetTop;
```javascript
function lazyLoad(imgs) {
    var H = document.documentElement.clientHeight;//获取可视区域高度
    var S = document.documentElement.scrollTop || document.body.scrollTop;
    for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].offsetTop < H + S) {
            imgs[i].src = imgs[i].getAttribute('data-src');
        }
    }
}

// 监听 window.onload => 初始化事件
// 监听 window.onscroll => 滚动事件
window.onload = window.onscroll = function () { //onscroll()在滚动条滚动的时候触发
    lazyLoad(imgs);
}
```














