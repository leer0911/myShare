const { ccclass, property } = cc._decorator;
import Global from './Global';

@ccclass
export default class Helloworld extends cc.Component {
  @property
  text: string = 'hello';

  onLoad() {
    Global.backNode = this.node;
  }
  start() {
    // init logic
    console.log(this);
  }
}
