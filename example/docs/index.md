---
category: Components
order: 0
type: 基础
title: Button
subtitle: 按钮
---

按钮用于开始一个即时操作。

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。在 kui 中我们提供了五种按钮。

- 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- 默认（次要）按钮：操作级别次于主按钮的行动点。
- 幽灵按钮：用于没有主次之分的一组行动点。
- 文本按钮：用于最次级的行动点。
- 链接按钮：用于作为外链的行动点。

## API

| 属性     | 说明                                                 | 类型            | 默认值   | 可选值                                   | 版本   |
| -------- | ---------------------------------------------------- | --------------- | -------- | ---------------------------------------- | ------ |
| block    | 开启该属性按钮将撑满父元素                           | boolean         | `false`  | `true` `false`                           | 0.0.17 |
| bordered | 是否带边框                                           | boolean         | `true`   | `true` `false`                           | 0.0.17 |
| disabled | 按钮禁用状态                                         | boolean         | `false`  | `true` `false`                           | 0.0.17 |
| ghost    | 幽灵属性，使按钮背景透明                             | boolean         | `false`  | `true` `false`                           | 0.0.17 |
| href     | 点击跳转的地址,指定此属性 button 的行为和 a 链接一致 | string          | `-`      | `-`                                      | 0.0.17 |
| loading  | 按钮加载状态（加载中的按钮将不能触发点击事件）       | boolean         | `false`  | `true` `false`                           | 0.0.17 |
| shape    | 按钮形状                                             | string          | `''`     | `''` `circle` `round`                    | 0.0.17 |
| size     | 按钮尺寸                                             | string          | `middle` | `small` `middle` `large`                 | 0.0.17 |
| target   | 相当于 a 链接的 target 属性，href 存在时生效         | string          | `-`      | `-`                                      | 0.0.17 |
| type     | 按钮类型                                             | string          | `second` | `second` `primary` `ghost` `link` `text` | 0.0.17 |
| onClick  | 点击按钮时的回调                                     | (event) => void | `-`      | `-`                                      | 0.0.17 |
| htmlType | 设置 button 原生的 type 值                           | string          | `-`      | `submit` `button` `reset`                | 0.0.17 |
