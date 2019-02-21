// pages/progress/progress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    progress: ''
  },
  onLoad: function (options) {

  },
  click () {
    this.setData({
      type: 'normal',
      progress: '60'
    })
  }
})