# PKHeX Web 中文版

[PKHeX](https://github.com/kwsch/PKHeX) 的浏览器版本，带中英文双语界面。本项目是
[PKHeX.Everywhere](https://github.com/arleypadua/PKHeX.Everywhere) 的**非官方中文分支**，只保留 Web 应用。

- 在线使用：<https://klx1204.github.io/pkhex-web-cn/>
- 上游项目：<https://github.com/arleypadua/PKHeX.Everywhere>

存档只在浏览器里解析，不上传、不写服务器。所有编辑都在本机完成。

## 支持的游戏

支持 [PKHeX](https://github.com/kwsch/PKHeX) 能打开的存档，从红/绿到朱/紫。

以下改版的存档也可以打开（实验性，请务必备份）：

- Pokémon Unbound
- Pokémon Radical Red
- Emerald Imperium
- Pokémon Emerald Legacy
- Pokémon Heart & Soul

## 与上游的差异

- 中英文双语界面，默认跟随浏览器语言
- 宝可梦、道具、招式、特性、性格、形态、地点等名称使用 PKHeX 官方简体中文资源
- 合法性报告本地化
- 新的界面主题（浅色 / 深色）
- 移除 AdSense、Google Analytics、Sentry
- 适配 GitHub Pages 子路径部署（`/pkhex-web-cn/`）

## 跟随上游更新

本仓库每天通过 `.github/workflows/sync-upstream.yml` 自动合并
`arleypadua/PKHeX.Everywhere` 的 `main` 分支，并开一个 PR。合并前会执行构建、CodeGen 重建、类型检查和单测。
有冲突时会开 issue 提示手动处理。

翻译键使用英文原文，所以上游新增的文案会自动回落英文，不会让页面崩掉。

## 本地开发

```bash
git submodule update --init --recursive
cd src/PKHeX.Web.React
npm ci
npm run dev
```

需要 .NET 10 SDK（版本见 `global.json`）和 Node 22+。

## 构建

```bash
cd src/PKHeX.Web.React
npm run build
```

部署到 GitHub Pages 时使用子路径：

```bash
BASE_PATH=/pkhex-web-cn/ npm run build:web
```

## 许可证

GPL-3.0-or-later，与 [PKHeX.Core](https://github.com/kwsch/PKHeX) 和上游项目一致。
本分支对上游的修改说明见 [NOTICE](./NOTICE)。上游版权归其作者所有，本项目与 PKHeX 官方无隶属关系。
