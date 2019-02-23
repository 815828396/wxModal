// public/components/switchTa/b/switch-tab.js
import {
  screenHeight,
  getScrollViewFixedTop,
  getSelectorAttr
} from '../../../assets/js/wxUntil.js';
Component({
  options: {
    multipleSlots: true
  },

  externalClasses: ['tab-head-class', 'tab-cont-class'],

  properties: {
    tabColumns: Array,
    textLine: {
      type: Boolean,
      value: false
    },
    interHeight: Number,
    tabLoading: Boolean,

    // 自定义tabHead slot内容
    userDefined: Boolean
  },

  data: {
    tabActive: 0,
    scrollHeight: 0,
    isScroll: true
  },

  ready(e) {
    // TODO 可传入干扰元素Id 获取干扰元素高度, 设置scroll-view高度 - 目前默认88 
    getScrollViewFixedTop("#profitHead").then(res => {
      console.log(res)
      const interHeight = res.interfereHeight * res.dpr
      this.setData({
        scrollHeight: res.clientHeight * res.dpr - this.data.interHeight
      })
    })
  },
  methods: {
    tabClick(e) {
      let { index } = e.currentTarget.dataset;
      this.setData({ tabActive: index });
      this.triggerEvent('tabClick', {
        e,
        tabKey: this.data.tabColumns[index].key
      })
    },
    handleLower (e) {
      this.setData({
        tabLoading: true
      })

      // 上拉加载事件
      // key: 当前触底的 container 标识
      // dataset: 自定义属性
      // loading: 加载状态
      this.triggerEvent('lower', {
        key: this.data.tabColumns[this.data.tabActive].key,
        dataset: this.dataset || {},
        loading: this.data.tabLoading
      });
    }
  }
})
