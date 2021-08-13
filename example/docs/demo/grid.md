---
order: 3
title: 基础栅格
---

从堆叠到水平排列。

使用单一的一组 `Row` 和 `Col` 栅格组件，就可以创建一个基本的栅格系统，所有列（Col）必须放在 `Row` 内。

```jsx
import { Row, Col } from "antd";
const Demo = () => {
  const colStyle = (n) => {
    return {
      margin: "8px 0",
      padding: "16px 0",
      color: "#fff",
      textAlign: "center",
      backgroundColor: n ? "#0092ff" : "rgba(0,146,255,.75)",
    };
  };
  return (
    <div className="layout-basic-warpper">
      <Row>
        <Col span={24}>
          <div style={colStyle(0)}>100%</div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div style={colStyle(0)}>50%</div>
        </Col>
        <Col span={12}>
          <div style={colStyle(1)}>50%</div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div style={colStyle(0)}>33.33%</div>
        </Col>
        <Col span={8}>
          <div style={colStyle(1)}>33.33%</div>
        </Col>
        <Col span={8}>
          <div style={colStyle(0)}>33.33%</div>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <div style={colStyle(0)}>25%</div>
        </Col>
        <Col span={6}>
          <div style={colStyle(1)}>25%</div>
        </Col>
        <Col span={6}>
          <div style={colStyle(0)}>25%</div>
        </Col>
        <Col span={6}>
          <div style={colStyle(1)}>25%</div>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <div style={colStyle(0)}>16.66%</div>
        </Col>
        <Col span={4}>
          <div style={colStyle(1)}>16.66%</div>
        </Col>
        <Col span={4}>
          <div style={colStyle(0)}>16.66%</div>
        </Col>
        <Col span={4}>
          <div style={colStyle(1)}>16.66%</div>
        </Col>
        <Col span={4}>
          <div style={colStyle(0)}>16.66%</div>
        </Col>
        <Col span={4}>
          <div style={colStyle(1)}>16.66%</div>
        </Col>
      </Row>
      <Row>
        <Col span={3}>
          <div style={colStyle(0)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(1)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(0)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(1)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(0)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(1)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(0)}>12.5%</div>
        </Col>
        <Col span={3}>
          <div style={colStyle(1)}>12.5%</div>
        </Col>
      </Row>
    </div>
  );
};

render(<Demo />);
```

```css
.layout-basic-warpper {
  background: #fff;
}
```

<style>
.layout-basic-warpper{
  margin: 0 12px;
}
</style>
