# OpenGL 基础

游戏引擎是对底层绘图接口的包装，`cocos2d-x` 也一样。它是对不同平台下 OpenGL 的包装。

OpenGL 全称为 Open Graphics Library，是一个开放的、跨平台的高性能图形接口。

OpenGL ES 则是 OpenGL 在移动设备上的衍生版本，具备与 OpenGL 一致的结构，包含了常用的图形功能。

Cocos2d-x 就是一个基于 OpenGL 的游戏引擎，因此它的绘图部分完全由 OpenGL 实现。

OpenGL 是一个基于 C 语言的三维图形 API，基本功能包含绘制几何图形、变换、着色、光照、贴图等。

除了基本功能，OpenGL 还提供了诸如曲面图元、光栅操作、景深、shader 编程等高级功能。

# MainLoop 在引擎中被调用的流程

Cocos Creator 游戏引擎的入口在 `main.js` 中，它在 `cocos2d-js-min.js` 加载完后会开始运行游戏：`cc.game.run()`。

在 run 方法中，会根据配置进行引擎的准备工作，包括初始化渲染器、全局视图对象 cc.view、导演 cc.director 还有注册系统各类事件等工作。

```js
// CCGame.js
var game = {
  prepare: function() {
    // 初始化渲染器
    this._initRenderer();
    // cc.view 是全局的视图对象。
    cc.view = View ? View._getInstance() : null;
    // 初始化导演类
    cc.director = cc.Director._getInstance();
    // 初始化 OpenGLView
    cc.director.setOpenGLView(cc.view);
    // 注册各类事件
    this._initEvents();
    // 开始运行主循环
    this._runMainLoop();
  },
  run: function() {
    this.prepare();
  }
  //.... 其它方法
};
cc.game = game;
```

```js
// CCGame.js
var game = {
    // ... 其它方法
    // 开始运行游戏
    _runMainLoop: function () {
        var callback, director = cc.director;
        callback = function () {
                self._intervalId = window.requestAnimationFrame(callback);
                // 调用导演类的 mainLoop 方法
                director.mainLoop();
            }
        };
        self._intervalId = window.requestAnimationFrame(callback);
    }
}
cc.game = game;
```

```js
class MyComponent extends cc.Component {
  /** 用于继承的方法 */
  // 当附加到一个激活的节点上或者其节点第一次激活时候调用。onLoad 总是会在任何 start 方法调用前执行，这能用于安排脚本的初始化顺序。
  onLoad() {}
  // 如果该组件第一次启用，则在所有组件的 update 之前调用。通常用于需要在所有组件的 onLoad 初始化完毕后执行的逻辑。
  start() {}
  // 如果该组件启用，则每帧调用 update。
  update(dt) {}
  // 如果该组件启用，则每帧调用 LateUpdate。
  lastUpdate() {}
  // 当该组件被启用，并且它的节点也激活时。
  onEnable() {}
  // 当该组件被禁用或节点变为无效时调用。
  onDisable() {}
  // 当该组件被销毁时调用
  onDestroy() {}
  /** 下面的方法是需要组件自身主动调用的  */
  // 调度一个自定义的回调函数。
  // 如果回调函数已调度，那么将不会重复调度它，只会更新时间间隔参数。
  schedule(callback, interval, repeat, delay) {
    var scheduler = cc.director.getScheduler();
    var paused = scheduler.isTargetPaused(this);
    scheduler.schedule(callback, this, interval, repeat, delay, paused);
  }
  // 调度一个只运行一次的回调函数，可以指定 0 让回调函数在下一帧立即执行或者在一定的延时之后执行。
  scheduleOnce(callback, delay) {
    this.schedule(callback, 0, 0, delay);
  }
  // 取消调度一个自定义的回调函数。
  unschedule(callback) {
    cc.director.getScheduler().unschedule(callback_fn, this);
  }
  // 取消调度所有已调度的回调函数：定制的回调函数以及 'update' 回调函数。动作不受此方法影响。
  unscheduleAllCallbacks() {
    cc.director.getScheduler().unscheduleAllForTarget(this);
  }
}
```

```js
// CCDirector.js
mainLoop() {
    // 计算全局的时间增量，即 dt
    this.calculateDeltaTime();
    // 每个帧的开始时所触发的事件。
    this.emit(cc.Director.EVENT_BEFORE_UPDATE);
    // 对最新加入的组件调用 `start` 方法
    this._compScheduler.startPhase();
    // 调用组件的 `update` 方法
    this._compScheduler.updatePhase(this._deltaTime);
    // 调用调度器的 `update` 方法
    this._scheduler.update(this._deltaTime);
    // 调用组件的 `lateUpdate` 方法
    this._compScheduler.lateUpdatePhase(this._deltaTime);
    // 将在引擎和组件 “update” 逻辑之后所触发的事件。
    this.emit(cc.Director.EVENT_AFTER_UPDATE);
    // 回收内存
    cc.Object._deferredDestroy();
    //
    if (this._nextScene) {
        this.setNextScene();
    }
    // 访问渲染场景树之前所触发的事件。
    this.emit(cc.Director.EVENT_BEFORE_VISIT);
    // 访问渲染场景树
    this._visitScene();
    // 访问渲染场景图之后所触发的事件，渲染队列已准备就绪，但在这一时刻还没有呈现在画布上。
    this.emit(cc.Director.EVENT_AFTER_VISIT);
    // 绘图渲染
    cc.g_NumberOfDraws = 0;
    cc.renderer.clear();
    cc.renderer.rendering(cc._renderContext);
    this._totalFrames++;
    // 渲染过程之后所触发的事件。
    this.emit(cc.Director.EVENT_AFTER_DRAW);
    eventManager.frameUpdateListeners();
}
```

# requestAnimationFrame

`window.requestAnimationFrame()` 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。

该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。
