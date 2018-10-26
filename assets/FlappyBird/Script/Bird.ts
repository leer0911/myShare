import Game from './Game';
import { BestScore } from './BestScore';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.AudioClip)
  jumpAudio: cc.AudioClip = null;
  @property(cc.AudioClip)
  dieAudio: cc.AudioClip = null;

  @property(Game)
  Game: Game = null;

  //最高高度
  @property
  maxHight = 0;

  //地面高度
  @property
  minHight = -130;

  //跳跃高度
  @property
  jumpHeight = 80;

  //重力大小
  @property
  gravity = 3.5;

  //游戏状态
  state = 0;
  Listener = null;
  die = 0;

  init() {
    this.state = 1;
    this.birdFly();

    this.Game.home.on('touchstart', () => {
      if (this.node.y <= 256) {
        this.birdFly();
      }
    });
  }
  birdFly() {
    const jr = cc.spawn(cc.moveBy(0.2, cc.p(0, 80)), cc.rotateTo(0.15, -30));
    const action = cc.sequence(jr, cc.rotateTo(0.25, 30));
    this.node.stopAllActions();
    this.node.runAction(action);
    cc.audioEngine.play(this.jumpAudio, false, 1);
  }

  onLoad() {
    this.init();
  }

  // called every frame, uncomment this function to activate update callback
  update(dt) {
    if (this.node.y > this.minHight && this.state === 1) {
      this.node.y -= this.gravity;
    }
  }

  restatr() {}

  /**
   * 当与其他组件发生碰撞时自动调用
   * other 表示碰撞的另一个组件
   * self  表示本身
   */
  onCollisionEnter(other, self) {
    if (this.die === 0) {
      this.state = 0;
      cc.audioEngine.play(this.dieAudio, false, 1);
      this.Game.pipesNode.removeAllChildren();
      cc.director.pause();
      this.Game.unscheduleAllCallbacks();
      this.Game.end.active = true;
      //   this.BestSc.string = BestScore.HightScore.toString();
      //   this.score.string = this.Game.Score.toString();
      //   this.end.setPosition(0, 50);
      this.die = 1;
    }
  }
}
