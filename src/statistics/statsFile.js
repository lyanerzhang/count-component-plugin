const fs = require("fs")
const path = require("path")

// 统计页面总数量
const statsPages = (module) => {
  const realpath = fs.realpathSync(module.resource)
}

exports.statsPages = statsPages