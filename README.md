# Ressa-Web

Ressa 官网：产品介绍、隐私政策与服务条款。纯 HTML / CSS / JavaScript，无构建步骤。

## 本地预览

```bash
python3 -m http.server 8742
```

打开 http://127.0.0.1:8742 。中英文按浏览器语言选择，也可手动切换，偏好保存在 `localStorage` 的 `ressa-lang` 中。

## 页面与交互

- 首页使用 Figma 原始导出图展示产品，首屏支持免费版 / Pro 图片切换。
- 网站不模拟相机、补光、缩放或定格行为。图片中的控件是产品预览，不是网页按钮。
- 灯光区展示真实亮度、光色控件与自定义选色器；细节区展示 Pro 完整界面。
- 定格使用三步文字说明。当前 Figma 中没有对应的最新定格状态，不拼造界面图。
- GSAP 页面动效尊重 `prefers-reduced-motion`；无 JavaScript 时仍可阅读完整内容和免费版预览。
- 应用当前处于 TestFlight 内测，申请按钮通过邮件联系开发者，不表示已有 App Store 下载入口。

## 图片来源

全部产品预览来自 [Ressa Figma](https://www.figma.com/design/SlrIW0EFCV6ESx4LgZqPaq/Ressa)，于 2026-10-13 通过 `download_assets` 导出并保存到本地。没有修改设计原图中的人像、文案或控件，也没有在运行时引用 Figma 临时链接。

| 本地文件（assets/img/product/） | Figma 节点 | 页面用途 | 原始尺寸 |
| --- | --- | --- | --- |
| free-mirror.png | 57:24 | 首屏免费版、分享卡片 | 402 × 874 |
| pro-mirror.png | 59:78 | 首屏 Pro、细节区 | 402 × 874 |
| mirror-detail.png | 57:31 | 镜面局部 | 373 × 434 |
| brightness.png | 57:38 | 亮度控件 | 370 × 58 |
| light-colors.png | 57:50 | 自然 / 暖光 / 日光 / 自定义选项 | 370 × 101 |
| custom-picker.png | 113:499 | 自定义选色器 | 402 × 874 |

界面按原始比例显示；人像是设计中的示例，不是实际用户影像或手机摄像头实时输出。Figma 选色器使用系统风格，实际系统界面随 iOS 版本变化。最新应用已包含 Freeze，而所用 Figma 主界面尚未绘制该按钮，因此预览标注为界面预览，不宣称为运行时截图。

## 内容事实来源

相关应用在 `../../Ressa`，产品文档在 `../../RessaDocs`：

- `../../Ressa/README.md`：功能、权限、免费 / Pro 边界。
- `../../Ressa/Docs/UI_IMPLEMENTATION.md`：最新相机控制、1× 默认裁切方式与 Figma 映射。
- `../../Ressa/Docs/FREEZE_IMPLEMENTATION.md`：定格保持当前倍率、临时内存画面、恢复与清除规则。
- `../../Ressa/Docs/PURCHASE_IMPLEMENTATION.md`：内购行为。Pro 三档：$0.99/月、$3.99/六个月订阅与 $5.99 终身买断，均标为美元参考价，正式价格以应用内显示为准。

2026-10-13 改版同时删除了原来“1× 无裁切”“定格自动跳到 3×”等不准确表述 / 演示，并重写中英文营销文案。法律页面只同步了页脚品牌文案和样式版本，没有修改法律条文。

## 上线前

1. App Store 上线后，将首页 5 个 `mailto:dev.chua@gmail.com?subject=Ressa%20TestFlight%20beta` 入口换为正式下载链接，同步内测文案与 FAQ。
2. 确认当地价格，更新参考价格说明。
3. `assets/img/_og-card.html` 是分享图源文件，用浏览器按 1200 × 630 导出 `assets/img/og.jpg`。产品图为本地相对路径。
4. 更换资源时递增 CSS / JS 查询版本号；当前首页为 `v=2`。

验证截图、原始文件备份位于 `output/`，不属于发布内容。支持与反馈：dev.chua@gmail.com。
