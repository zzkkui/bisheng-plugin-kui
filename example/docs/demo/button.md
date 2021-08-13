---
title: 按钮
order: 2
---

按钮有五种风格：主要按钮、次要按钮、幽灵按钮、链接按钮、文本按钮（默认为次要按钮）

```jsx
import { Button } from "antd";

() => (
  <div className="button-basic-warpper">
    <Button type="primary">主要按钮</Button>
    <Button type="ghost" className="button-basic-left">
      幽灵按钮
    </Button>
    <Button type="link" className="button-basic-left">
      link
    </Button>
    <Button type="text" className="button-basic-left">
      text
    </Button>
  </div>
);
```

```css
.button-basic-warpper {
  background: #fff;
  width: 400px;
}
.button-basic-left {
  margin-left: 10px;
}
```
