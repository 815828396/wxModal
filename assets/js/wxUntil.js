import { qs } from './util'
/** 解决小程序使用 async  */
import regeneratorRuntime  from './regenerator-runtime/runtime'

/**
 * 获取 单个或多个标签 selector 元素属性信息
 * @param {String} property 需要获取的属性, 当传入 {} 空对象时， 返回所有属性
 * @param  {...any} args 获取的 标签元素ID
 */
export let getSelectorAttr = ({property: ARG_property = {}}, ...args) => {
  /** if have the Property */
  if (Object.keys(ARG_property).length !== 0) {
    const perty = ['height', 'width', 'top', 'left', 'right', 'bottom', 'dataset', 'id'].indexOf(ARG_property)
    if (perty < 0) throw new Error('first Arguments 请输入相应的属性值 { property: height, width, top, left, right, bottom, dataset, id }')
  }
  if (args.length === 0) console.warn('未传入任何 ID 元素,无法获取对应属性')
  return new Promise(resolve => {
    let result = [];
    let _selarr = [...new Set(args)].map(el => wx.createSelectorQuery().select(el).boundingClientRect())
    let _length = _selarr.length
    _selarr.forEach((_selec, _i) => {
      _selec.exec(res => {
        try {
          if (Object.keys(ARG_property).length !== 0) result.push(res[0][ARG_property])
          /** Dont have the Property , Return all Property */
          else result.push(res[0])
        } catch (err) {
          console.warn('getSelectorAttr 参数中 可能传入不存在的 id 元素,请检查')
        }
        if (_i === _length - 1) resolve(result.length === 1 ? result[0] : result)
      })
    })
  })
}

/**
 * 设置 scroll view 中目标元素固定位置
 * 需要安装 https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js 插件使用 async
 * @param {element} ARG_interfere 单个干扰元素,如果没有传入 默认 90 rpx 一个 tabbar 高度
 * @param {...any} args 多个干扰元素
 */
export let setScrollViewFixedTop = async function (ARG_interfere = 90, ...args) {
  let interfereHeight = 0
  // 采用默认 90 rpx
  if (typeof ARG_interfere === 'number' && args.length === 0)
    interfereHeight = ARG_interfere
  // 传入一个干扰元素 ID
  else if (ARG_interfere && args.length === 0)
    interfereHeight = await getSelectorAttr({ property: 'height' }, ARG_interfere)
  // 传入了多个干扰元素 ID
  else if (args.length > 0)
    interfereHeight = await getSelectorAttr({ property: 'height' }, ARG_interfere, ...args)

  /** 获取的是一个数组,求和 */
  if (Array.isArray(interfereHeight))
    interfereHeight = interfereHeight.reduce((p, n) => p + n)

  let { height: clientHeight } = await screenHeight()

  // if (this.__proto__) {}

  /** interferHeight: 干扰元素高度, clientHeight： 屏幕高度 */
  return { interfereHeight, clientHeight }
}

/**
 * 获取屏幕属性信息
 * 返回属性单位值 为 PX, 可根据返回的 dpr 自行改变 相应数值
 */
export let screenHeight = () => {
  return new Promise(resolve => {
    wx.getSystemInfo({
      success: res => {
        let { windowWidth: width, windowHeight: height } = res
        let dpr = (750 / width)
        resolve({ height, width, dpr })
      }
    })
  })
}
/**
 * 路由跳转
 * @param {String} ARG_path 跳转地址
 * @param {Object} ARG_query 跳转参数
 * @param {...any} suc 判断是否传入 成功 回调函数 或者 延迟跳转
 */
export let router = (ARG_path, ARG_query = {}, suc = '') => {
  let success,
      delay = 100
  if (!ARG_path) throw new Error('ARG_path: 请传入 path')

  if (typeof suc === 'function') success = suc
  else if (typeof suc === 'number') delay = suc

  let _path = qs.stringify(ARG_path, ARG_query)
  setTimeout(() => {
    wx.navigateTo({ url: _path, success: _ => success && success(_) })
  }, delay)
}
/** 本地缓存处理, 全部为 同步处理， 异步处理自行调用 wx API */
export let localstorage = {
  _get: key => wx.getStorageSync(key),
  _set: (key, value) => wx.setStorageSync(key, typeof value === 'object' ? JSON.stringify(value) : value),
  _remove: key =>  wx.removeStorageSync(key),
  _clear: _ => wx.clearStorageSync()
}
/** wx : 弱提示 */
export let alert = {
  _showToast: function ({ title = '', icon = 'none', duration = 3000 } = {}) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration
    })
  },
  _showModal: function (title, content, { confirm, cancel = '' }, ...arg) {
    let { confirmText } = arg;
    wx.showModal({
      title: title,
      content: content,
      confirmText: confirmText || '确认',
      success: res => {
        console.log(res);
        if (res.confirm) { confirm && confirm() }
        if (res.cancel) { cancel && cancel() }
      }
    })
  }
}
