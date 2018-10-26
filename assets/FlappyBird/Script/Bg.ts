const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property
  landMoveSpeed = 10;

  @property(cc.Prefab)
  landPrefab: cc.Prefab = null;

  @property
  bgList: cc.Node[] = [];
  onLoad() {
    this.initLand();
  }
  initLand() {
    let nodeFirst = cc.instantiate(this.landPrefab);
    let nodeSecond = cc.instantiate(this.landPrefab);
    nodeFirst.x = 0;
    nodeSecond.x = nodeSecond.width;
    nodeFirst.setParent(this.node);
    nodeSecond.setParent(this.node);
    this.bgList = [nodeFirst, nodeSecond];
  }
  squeenCheck() {
    if (this.bgList[0].x <= -(this.bgList[0].width - 10)) {
      this.bgList[0].x = this.bgList[0].width;
      this.bgList.push(this.bgList.splice(0, 1)[0]);
    }
  }
  landMove() {
    for (let i = this.bgList.length - 1; i >= 0; i--) {
      this.bgList[i].x -= this.landMoveSpeed;
    }
    this.squeenCheck();
  }
  update(dt) {
    this.landMove();
  }
}
