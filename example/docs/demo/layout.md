---
order: 4
iframe: 360
title: 固定头部
---

一般用于固定顶部导航，方便页面切换。

```jsx
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

const Demo = () => {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div
          className="logo"
          style={{
            float: "left",
            width: 120,
            height: 20,
            margin: "16px 24px 16px 0",
            background: "rgba(0, 0, 0, 0.1)",
          }}
        />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 35px", marginTop: 64 }}
      >
        <div className="site-layout-breadcrumb" style={{ margin: "16px 0" }}>
          Home / List / <span style={{ color: "#000" }}>App</span>
        </div>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380, backgroundColor: "#fff" }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>KUI ©2021 Created by KUX</Footer>
    </Layout>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
