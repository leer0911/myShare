// const { ccclass, property } = cc._decorator;

// @ccclass
// export default class NewClass extends cc.Component {
//   @property
//   speed = 10;
//   @property(cc.Node)
//   container: cc.Node = null;

//   bgList: cc.Node[] = [];
//   onLoad() {
//     // let nodeCopy;
//     // const node = this.node as any;

//     // nodeCopy = node;
//     // nodeCopy.parent = node.parent;
//     // nodeCopy.x = node.width;
//     // this.bgList = [node, nodeCopy];
//     // console.log(this.bgList);
//     let node = cc.instantiate(this.node);

//     this.container.addChild(node);
//     console.log(node);
//   }
//   squeenCheck() {
//     if (this.bgList[0].x <= -this.bgList[0].width) {
//       this.bgList[0].x = -this.bgList[0].width;
//       this.bgList.push(this.bgList.splice(0, 1)[0]);
//     }
//   }
//   update(dt) {
//     // for (let i = this.bgList.length - 1; i >= 0; i--) {
//     //   this.bgList[i].x -= this.speed;
//     // }
//     // this.squeenCheck();
//     // this.bgList[0].x -= this.speed;
//   }
// }
