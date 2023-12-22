const { createSSRApp } = require("vue");
const { renderToString } = require("vue/server-renderer");

module.exports = async function render (data) {
  console.log("data", data)
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