# 界面

## 面板

- 层级管理器
- 资源管理器
- 属性检查器
- 场景编辑器
- 动画编辑器
- 控制台

## 菜单

- 文件
- 编辑
- 节点
- 组件
- 项目
- 面板
- 布局
- 扩展
- 开发者
- 帮助

## 工具

- 移动 修改节点 position (W)
- 旋转 修改节点 rotation (E)
- 缩放 修改节点 scale (R)
- 矩形变换工具 修改节点 size 和 position (T)

# 资源相关

## 图像资源 (Texture)

### Texture

游戏中绝大部分图像渲染的数据源。

### SpriteFrame

Texture 的子资源，核心渲染组件 Sprite 所使用的资源。

## 图集资源 (Atlas)

图集（Atlas）也称作 Sprite Sheet，是游戏开发中常见的一种美术资源。

Cocos Creator 使用的图集资源由 plist 和 png 文件组成。

### 工具

- [TexturePacker](https://www.codeandweb.com/texturepacker)
- [Zwoptex](https://zwopple.com/zwoptex/)

### 自动图集

Cocos Creator 自带的合图功能，自动图集资源将会以当前文件夹下的所有 SpriteFrame 作为碎图资源。

### 图集打包策略

BestShortSideFit, BestLongSideFit, BestAreaFit, BottomLeftRule, ContactPointRule

## 其他

- 预制资源 (Prefab)
- 艺术数字资源 (LabelAtlas)

## 资源导入导出

Cocos Creator 是专注于内容创作的游戏开发工具，在游戏开发过程中，对于每个项目该项目专用的程序架构和功能以外，我们还会生产大量的场景、角色、动画和 UI 控件等相对独立的元素。对于一个开发团队来说，很多情况下这些内容元素都是可以在一定程度上重复利用的。

## 场景制作

### 节点和组件

Cocos Creator 的工作流程是以组件式开发为核心的，组件式架构也称作 组件-实体系统（或 Entity-Component System），简单的说，就是以组合而非继承的方式进行实体的构建。

在 Cocos Creator 中，节点（Node）是承载组件的实体，我们通过将具有各种功能的 组件（Component） 挂载到节点上，来让节点具有各式各样的表现和功能。

组件上设置好的任何资源，如这里的 SpriteFrame，都会在场景加载时自动同时加载好。你也可以在自定义的组件中声明需要设置和自动加载的资源类型，详见 获取和加载资源。
