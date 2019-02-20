const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/** url 参数转换 */
const qs = {
  stringify: (path, query) => {
    let url = ''
    path = path.lastIndexOf('?') > 0 ? path.substr(0, path.length - 1) : path
    for (let key in query) {
      url += `&${key}=${query[key]}`
    }
    return path + url.replace('&', '?')
  },
  parse: (query) => {
    let obj = {}
    query.match(/([^?=&]+)(=([^&]*))/g).map(item => {
      obj[item.substr(0, item.indexOf('='))] = item.substr(item.indexOf('=') + 1, item.length)
    })
    return obj
  }
}

// Echarts 设置 options
const setEchartOptions = (chart, options) => {
  if (!options) { throw Error('请配置 options 项') };
  chart.setOption(options)
};

module.exports = {
  formatTime,
  qs
}
