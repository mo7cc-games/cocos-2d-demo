# AGENTS.md

## 项目简介

这是一个基于 `VitePress` 打造的个人博客应用。用于记录 和 存放 学习笔记、日记、常用脚本等内容。大部分的内容都是采用 Markdown 格式编写，方便阅读和维护。

日常会使用 Obsidian 进行内容的编写和管理，最后由 `VitePress` 进行渲染和发布。

`assets` 目录存放静态资源，如图片、模板、临时文件等。
`diary` 目录存放日记内容。
`docs` 目录则是 `VitePress` 的项目源码目录，用于生成网站和对外发布的文章，也是主要的文档和笔记存放目录。
`drawing` 目录是流程图，思维导图的默认存储目录。
`private` 目录存放一些不对外公开的隐私内容。
`script` 目录存放一些常用的脚本文件。
`weekly` 周记内容。

## 开发规范

- 代码风格工具: Prettier + ESLint
- 命名规范: 驼峰命名

## 常用命令

本仓库不使用 npm 或者 node ，本仓库主要使用 bun 作为包管理工具和运行环境。

```bash
# 安装依赖
bun install

# 启动开发服务器
bun run dev

# 构建生产版本
bun run build

```
