const fs = require("fs")
const path = require("path")
const { parse } = require("@vue/compiler-sfc")
const { objArrSort } = require("../utils/index")

const scanVuePages = (statsObj, options, module) => {
  const realpath = fs.realpathSync(module.resource)
  if (realpath.includes(options.parentPath)) {
    const relativePath = path.relative(process.cwd(), module.userRequest)
    statsObj.fileComponentUsage[relativePath] = {}
    statisticVueFileComponentUsage(statsObj, options, relativePath, module)
  }
}

const statsComCount = (statsObj, componentName, relativePath) => {
  statsObj.componentUsage[componentName] = (statsObj.componentUsage[componentName] || 0) + 1
  statsObj.fileComponentUsage[relativePath][componentName] =
    (statsObj.fileComponentUsage[relativePath][componentName] || 0) + 1
}

const statisticVueFileComponentUsage = (statsObj, options, relativePath, module) => {
  const source = fs.readFileSync(module.userRequest, "utf-8")
  // 尝试使用@vue/compiler-sfc解析.vue文件
  const { descriptor } = parse(source)
  let templateContent = descriptor && descriptor.template && descriptor.template.content
  let scriptContent = descriptor && descriptor.script && descriptor.script.content
  let scriptSetup = descriptor && descriptor.scriptSetup && descriptor.scriptSetup.content
  let temMatch, funMatch
  while ((temMatch = options.temRegex.exec(templateContent)) !== null) {
    const componentName = temMatch[1]
    statsComCount(statsObj, componentName, relativePath)
  }
  while ((funMatch = options.funRegex.exec(scriptContent || scriptSetup)) !== null) {
    const componentName = funMatch[1]
    statsComCount(statsObj, componentName, relativePath)
  }
}
const outputComUsage = (statsObj, options) => {
  let fileUsageCount = 0
  for (let key in statsObj.fileComponentUsage) {
    for (let comKey in statsObj.fileComponentUsage[key]) {
      if (options.comNames.length && !options.comNames.includes(comKey)) {
        delete statsObj.fileComponentUsage[key][comKey]
      }
    }
    if (Object.keys(statsObj.fileComponentUsage[key]).length) {
      fileUsageCount++
    }
  }
  statsObj.totalPages = Object.keys(statsObj.fileComponentUsage).length
  statsObj.coverageRate = ((fileUsageCount / statsObj.totalPages) * 100).toFixed(2) + "%"
  statsObj.componentUsage = objArrSort(statsObj.componentUsage)
  console.log("--------------------------------------------")
  console.log(`\n${options.name}页面使用覆盖率为：${statsObj.coverageRate}`)
  // 统计各个组件使用情况
  if (options.isStatsComUsage) {
    Object.keys(statsObj.componentUsage).forEach(key => {
      const value = statsObj.componentUsage[key]
      if (options.comNames.length) {
        if (options.comNames.includes(key)) {
          console.log( `\n${key} 组件引用次数 ${value}`)
        }
      } else {
        console.log( `\n${key} 组件引用次数 ${value}`)
      }
    })
  }
}
exports.scanVuePages = scanVuePages
exports.outputComUsage = outputComUsage