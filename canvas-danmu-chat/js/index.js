/** 弹幕包装类 */
class Danmu {
  constructor(data, preOptions) {
    this.data = data;
    this.preOptions = preOptions;
    this.init();
  }

  __setTextOffsetY() {
    // y: [10 - preHeight];
    this.offsetY = Math.floor(Math.random() * (this.preHeight));
    if (this.offsetY < this.height) {
      this.offsetY = this.height + this.offsetY;
    }
    if (this.offsetY > (this.preHeight - this.height/2)) {
      this.offsetY = this.preHeight - this.height;
    }
  }

  __setTextWidth() {
    let temp = document.createElement("span");
    temp.innerHTML = this.text;
    const _temp = document.body.appendChild(temp);
    _temp.style.fontSize = this.fontSize + "px";
    this.width = _temp.offsetWidth;
    this.height = _temp.offsetHeight;
    document.body.removeChild(_temp);
    // this.width = parseInt(this.ctx.measureText(this.text)["width"])
  }

  /** 弹幕初始化. 设置位置宽高等渲染信息 */
  init() {
    this.text = this.data.text;
    this.runTime = this.data.runTime || this.preOptions?.runTime;
    this.speed =  this.data.speed || this.preOptions.speed;
    this.color = this.data.color || this.preOptions.color;
    this.fontSize = this.data.fontSize || this.preOptions.fontSize;
    this.offsetX = this.preOptions.width;
    this.preHeight = this.preOptions.height;
    this.ctx = this.preOptions.ctx;

    this.__setTextWidth();
    this.__setTextOffsetY();
  }

  /** 绘制 */
  draw() {
    this.ctx.font = this.fontSize + "px Microsoft Yahei 文泉驿微米黑";
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(this.text, this.offsetX, this.offsetY);
  }
}

/** 弹幕画布 */
class DanmuCanvas {

  constructor(canvas, videa, options) {
    if (canvas === null || videa === null || options === null) {
      return
    }
    if (options.data === null || !Array.isArray(options.data)) {
      return
    }
    this.videa = videa;
    this.options = options;
    this.danmuIsPause = true;
    this.width = canvas.offsetWidth;
    this.height = canvas.offsetHeight;
    this.ctx = canvas.getContext("2d");
    this.resetDanmuPositionFlag = false;

    Object.assign(this, options, {
      runTime: 0,
      speed: 2,
      color: "#fff",
      fontSize: 16
    })

    // 弹幕池
    this.danmuPool = this.createDanmus();
  }

  /** 生成默认弹幕池数据 */
  createDanmus() {
    return this.data.map(el => new Danmu(el, this));
  }

  /**
   * 重排弹幕-不重叠
   * TODO
   * 没思路: 类似瀑布流的方式,根据 runtime和text的宽高 来排好序。记录正确的offset位置
   */
  resetPositionForDanmu() {
    // TODO
  }

  /** 重置渲染 */
  resetRender() {
    this.clearRect();
    let currentVideaTime = this.videa.currentTime;
    this.danmuIsPause = false;

    this.danmuPool.forEach((danmu) => {
      // 先全部恢复可渲染状态
      danmu.stopDrawing = false;
      if (currentVideaTime <= danmu.runTime) {
        // 未播的弹幕,可以重新被初始化
        danmu.initial = false;
      } else {
        // 过时的弹幕, 停止绘制标识=true
        danmu.stopDrawing = true;
      }
    });
  }

  /** 添加新弹幕 */
  addNewDanmu(danmu) {
    if (danmu instanceof Danmu) {
      this.danmuPool.push(danmu);
    } else {
      this.danmuPool.push(new Danmu(danmu, this));
    }
    // TODO
    // 数据同步到服务器上
  }

  /** 清空canvas显示记录 */
  clearRect() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /** 渲染 */
  render() {
    this.clearRect();
    this.drawDanmus();
    if (!this.resetDanmuPositionFlag) {
      this.resetDanmuPositionFlag = true;
    }
    // 播放时递归绘制
    !this.danmuIsPause && requestAnimationFrame(this.render.bind(this));
  }

  /** 绘制弹幕 */
  drawDanmus() {
    // 视频播放的当前时间
    let currentVideaTime = this.videa.currentTime;
    // 比对弹幕的runTime, 时间到了， 且没被渲染过的弹幕 才开始滚入弹幕区
    this.danmuPool.forEach((danmu) => {
      if (!danmu.stopDrawing && currentVideaTime > danmu.runTime) {
        if (!danmu.initial) {
          // 初始化
          danmu.init();
          danmu.initial = true;
        }
        // 执行绘制
        danmu.offsetX -= danmu.speed;
        danmu.draw.apply(danmu);

        if (danmu.offsetX <= danmu.width * -1) {
          // 已经离开弹幕舞台了, 当前弹幕stop属性变成true
          danmu.stopDrawing = true;
        }
      }
    });
  }
}

;(function(doc) {
  const content = doc.querySelector("video");
  const danmu = doc.querySelector("#danmu");
  const inputText = doc.querySelector(".input-text");
  const inputColor = doc.querySelector(".input-color");
  const inputBtn = doc.querySelector(".input-btn");
  const inputOpen = doc.querySelector(".input-open");
  danmu.width = content.offsetWidth;
  danmu.height = content.offsetHeight;

  // test - 测试数据
  let danmuList = [
    {
      text: "00001",
      speed: 2,
      color: "orange",
      runTime: 0,
    },
    {
      text: "00002",
      speed: 2,
      color: "#fff",
      runTime: 1,
    },
    {
      text: "00003",
      speed: 2,
      color: "#fff",
      runTime: 10,
    },
    {
      text: "000014",
      speed: 2,
      color: "#fff",
      runTime: 3,
    },
    {
      text: "0000154",
      speed: 2,
      color: "#fff",
      runTime: 13,
    },
  ];
  for (let index = 0; index < 10; index++) {
    danmuList.push({
      text: "qqqqqqqqqqqq-" + index,
      speed: 2,
      color: "#fff",
      runTime: 0,
    })
  }
  
  // 
  const danmuCanvas = new DanmuCanvas(danmu, content, {
    data: danmuList
  });
  let open = true;
  

  function init() {
    bindEvent();
  }

  function bindEvent() {
    /** 是否开启弹幕 */
    inputOpen.addEventListener("change", (e) => {
      open = !open;
      if(open) {
        danmu.style.display = "block";
      } else {
        danmu.style.display = "none";
      }
    }, false);

    /** 发送弹幕 */
    inputBtn.addEventListener("click", function() {
      const text = inputText.value;
      const color = inputColor.value;

      if (text.trim() === "" || color.trim() === "") return;

      const newDanmu = {
        text,
        color,
        speed: 2,
        runTime: content.currentTime || 0,
      }
      danmuCanvas.addNewDanmu(newDanmu);

      // 清除input内容
      inputText.value = "";
      inputColor.value = "";
    }, false);

    /** content-videa播放、暂停事件控制弹幕 */
    content.addEventListener("play", function() {
      // 播放
      danmuCanvas.danmuIsPause = false;
      danmuCanvas.render();
    }, false);
    content.addEventListener("pause", function() {
      // 暂停
      danmuCanvas.danmuIsPause = true;
    }, false);
    content.addEventListener("ended", function() {
      // 停止
      danmuCanvas.danmuIsPause = true;
    }, false);
    content.addEventListener("seeked", function() {
      // 拖动进度条
      danmuCanvas.resetRender();
    }, false);
    content.addEventListener("error", function() {
      // 发生错误时
      danmuCanvas.danmuIsPause = true;
    }, false);
  }

  init();
})(document);