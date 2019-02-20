// public/date/date.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    target: String, /** 当前 日期 picker 所属名称 */

    start: String, /** 开始日期的 start 年月日 */
    end: String, /** 结束日期的 end 年月日 */

    date: { /** 存放日期值 */
      type: Object,
      value: {
        startValue: '开始日期',
        endValue: '结束日期'
      }
    }
  },

  data: {
  },

  methods: {
    /** 点击picker 函数 */
    bindDateChange: function (e) {
      let { value } = e.detail;
      let { datename, target } = e.target.dataset;
      /** 修改日起值 */
      if (datename === 'start') {
        Object.assign(this.data.date, { startValue: value })
      }
      if (datename === 'end') {
        Object.assign(this.data.date, { endValue: value  })
      }
      this.setData({
        date: this.data.date
      })
      /** 返回 选择完成函数，并返回 日期值 */
      this.triggerEvent('changeOk', this.data);
    }
  }
})
