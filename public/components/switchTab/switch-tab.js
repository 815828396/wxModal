// public/components/switchTa/b/switch-tab.js
import {
  screenHeight,
  setScrollViewFixedTop,
  getSelectorAttr
} from '../../../assets/js/wxUntil.js';
Component({
  options: {
    multipleSlots: true
  },

  properties: {
    tabColumns: Array,
    textLine: {
      type: Boolean,
      value: false
    }
  },

  data: {
    tabActive: 0,
    scrollHeight: 0,
    isScroll: true,
    tabLoading: false
  },

  ready (e) {
    // setScrollViewFixedTop(200).then(res => {
    //   console.log(res)
    // })
    // return
    screenHeight().then(res => {
      this.setData({
        scrollHeight: res.height * res.dpr - 88
      })
      console.log(res)
    })
  },
  methods: {
    tabClick (e) {
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
      setTimeout(() => {
        this.setData({ tabLoading: false })
      }, 5000)
      console.log(e)
    }
  }
})
