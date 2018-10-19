# 界面

## 面板

- 层级管理器
- 资源管理器
- 属性检查器
- 场景编辑器
- 动画编辑器
- 控制台

--

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

--

## 工具

- 移动 修改节点 position (W)
- 旋转 修改节点 rotation (E)
- 缩放 修改节点 scale (R)
- 矩形变换工具 修改节点 size 和 position (T)

--

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

一个节点上只能添加一个渲染组件，渲染组件包括 Sprite（精灵）， Label（文字），Particle（粒子）等。

### 坐标系和节点变换属性

#### Cocos Creator 坐标系

Cocos Creator 的坐标系和 cocos2d-x 引擎坐标系完全一致，而 cocos2d-x 和 OpenGL 坐标系相同，都是起源于笛卡尔坐标系。笛卡尔坐标系中定义右手系原点在左下角，x 向右，y 向上，z 向外，我们使用的坐标系就是笛卡尔右手系。

#### 屏幕坐标系和 cocos2d-x 坐标系

标准屏幕坐标系使用和 OpenGL 不同的坐标系，和 cocos2d-x 坐标系有很大区别。

#### 世界坐标系（World Coordinate）和本地坐标系（Local Coordinate）

世界坐标系也叫做绝对坐标系，在 Cocos Creator 游戏开发中表示场景空间内的统一坐标体系，「世界」就用来表示我们的游戏场景。

本地坐标系也叫相对坐标系，是和节点相关联的坐标系。每个节点都有独立的坐标系，当节点移动或改变方向时，和该节点关联的坐标系将随之移动或改变方向。

Cocos Creator 中的 节点（Node） 之间可以有父子关系的层级结构，我们修改节点的 位置（Position） 属性设定的节点位置是该节点相对于父节点的 本地坐标系 而非世界坐标系。最后在绘制整个场景时 Cocos Creator 会把这些节点的本地坐标映射成世界坐标系坐标。

要确定每个节点坐标系的作用方式，我们还需要了解 锚点 的概念。

#### 锚点（Anchor）

#### 子节点的本地坐标系

锚点（Anchor） 是节点的另一个重要属性，它决定了节点以自身约束框中的哪一个点作为整个节点的位置。我们选中节点后看到变换工具出现的位置就是节点的锚点位置。

锚点位置确定后，所有子节点就会以 锚点所在位置 作为坐标系原点，注意这个行为和 cocos2d-x 引擎中的默认行为不同，是 Cocos Creator 坐标系的特色！
