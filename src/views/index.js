const { createSSRApp } = require("vue");
const { renderToString } = require("vue/server-renderer");
const CSS = "./index.css"

module.exports = async function render (data) {
  console.log("CSS", CSS)
  const { coverageRate, name } = data
  const vueApp = createSSRApp({
    data: () => ({
      coverageRate,
      name
    }),
    template: `
      <div>组件库: {{ name }}</div>
      <div>页面使用覆盖率 {{ coverageRate }}</div>
      <div>组件使用情况</div>
      <div :class="">
        <div class="dataHead">
          <div>组件名称</div>
          <div>使用次数</div>
          <div>组件名称</div>
        </div>
        <div class="dataTable">
          <div class="dataItem">
            <span>cxS</span>
            <span>33</span>
            <span>20%</span>
          </div>
        </div>
      </div>
    `
  })
  return await renderToString(vueApp).then((html) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vue SSR Example</title>
        </head>
        <body>
          <div id="app">${html}</div>
        </body>
      </html>
    `
  })
}