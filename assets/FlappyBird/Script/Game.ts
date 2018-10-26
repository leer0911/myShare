const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  home: cc.Node = null;

  @property(cc.Node)
  Guide: cc.Node = null;

  @property(cc.Node)
  end: cc.Node = null;

  @property(cc.Node)
  replay: cc.Node = null;

  @property(cc.Node)
  Bird: cc.Node = null;
  @property(cc.Node)
  pipesNode: cc.Node = null;

  @property(cc.Prefab)
  pipePrefabs: cc.Prefab[] = [];

  @property(cc.Label)
  scoreDisplay: cc.Label = null;

  @property(cc.AudioClip)
  addAudio: cc.AudioClip = null;

  @property
  distance = 100;

  flag = 0;
  Score = 0;
  pipes = [];

  onLoad() {
    let manager = cc.director.getCollisionManager();
    manager.enabled = true;
    cc.director.resume();

    this.home.on('touchstart', () => {
      if (this.flag === 0) {
        this.Guide.active = false;
        this.Bird.active = true;
        this.schedule(this.LoadPipe, 1.5);
        this.schedule(this.check, 1.5);
        this.flag = 1;
      }
    });
    this.replay.on('touchstart', () => {
      cc.director.loadScene('Game');
    });
  }

  LoadPipe() {
    const newpieUp = cc.instantiate(this.pipePrefabs[0]);
    const newpieDown = cc.instantiate(this.pipePrefabs[1]);
    const y = Math.random() * 200;

    this.pipesNode.addChild(newpieUp);
    this.pipesNode.addChild(newpieDown);
    this.pipes.push(newpieUp);
    this.pipes.push(newpieDown);
    newpieUp.setPosition(cc.p(150, 10 + y));
    newpieDown.setPosition(cc.p(150, 10 + y - this.distance));

    // 让柱子移动，之后碰撞检测
    newpieUp.runAction(cc.moveBy(2, cc.p(-330, 0)));
    newpieDown.runAction(cc.moveBy(2, cc.p(-330, 0)));
  }

  addScore() {
    this.Score += 1;
    this.scoreDisplay.string = this.Score.toString();
    cc.audioEngine.play(this.addAudio, false, 1);
  }

  check() {
    for (var i = 0; i < this.pipes.length; i += 2) {
      // 判断小鸟是否顺利通过管道，是则加分
      if (this.pipes[i].x <= -60) {
        this.addScore();
      }
      // 超出屏幕范围的管道，从数组中移除，并从节点上删除
      if (this.pipes[i].x <= -100) {
        this.pipes.splice(i, 2);
      }
    }
  }
}
