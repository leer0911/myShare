const { ccclass, property } = cc._decorator;
import Parent from './Parent';
import Global from './Global';

@ccclass
export default class Child extends Parent {
  @property(cc.Label)
  label: cc.Label = null;

  @property
  child: string = 'child';

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}
  start() {
    console.log(Parent);
    console.log(Global);
    console.log('Child');
    console.log(this);
  }

  // update (dt) {}
}
