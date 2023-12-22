const objArrSort = function (objArr) {
    return Object.fromEntries(Object.entries(objArr).sort(([, a], [, b]) => b - a))
}

exports.objArrSort = objArrSort