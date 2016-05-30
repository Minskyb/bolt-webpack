#bolt-webpack
一个模块化开发框架，借助于 webpack 打包工具，使前端代码遵循 commonjs 规则。
##目录介绍

|--- bolt：一个独立的自主开发的 jquery 插件和 css 代码库。提供一些 web 前端中的共性需求支持。和本项目是共生状态，需在项目的进程中不断完善。
|--- node_modules：第三方插件库由 npm 管理。
|--- dist：项目打包后输出文件目录。
|--- src
   |--- abstract：框架基本抽象类
   |--- components：基本组件集合包括基本组件和组合组件。
   |--- entry：项目打包入口文件地址。
   |--- images：项目本地图片地址。
   |--- less：项目特有样式文件目录
   |--- libs：其它第三方不满足 commonjs 规范的插件
   |--- util：工具库

##项目全局依赖
项目全局依赖：git、grunt、webpack、node。

- Git、node 安装：下载一个 windows 版傻瓜式安装即可。
- grunt、webpack 安装：在 window dos 下运行：npm install grunt webpack –g

##执行
 依赖包安装：`npm install`

 执行：`npm run dev`

 ##打包

 执行：`npm run dev`