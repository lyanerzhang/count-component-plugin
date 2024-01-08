# stats-component-plugin

组件使用情况统计

## 安装
```
npm i stats-component-plugin

```
## 使用
```
// vue.config.js
const StatsComponentPlugin = require("stats-component-plugin")

plugins.push(
    new StatsComponentPlugin({
        comNames: CxComNames, // 组件名白名单
        isStatsComUsage: true // 是否输出组件使用次数统计
    })
)
```