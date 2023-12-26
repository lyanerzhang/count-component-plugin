const express = require('express')
const render = require("../views/index")
let port = 8000

const app = express()

const server = function(stats, options) {
  console.log("stats", stats)
  // const { coverageRate } = stats
  // const { name } = options
  app.get("/", (req, res) => {
    render({...stats, ...options}).then((html) => {
      res.send(html)
    })
  })
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
  // 配置模板引擎
  // app.set('view engine', 'ejs')

  // app.set('views', path.resolve(__dirname, '../views')) // 设置视图目录

  // app.get('/', function(req, res) {
  //   res.send('hello world')
  //   res.render("index", { ...stats })
  // })

  // const server = http.createServer(app)
  // server.listen(port)
  // server.on('listening', () => {
  //   console.log(`Server is running at http://localhost:${port}`)
  //   open(`http://localhost:${port}`)
  // })
}
server({}, {})
module.exports = server