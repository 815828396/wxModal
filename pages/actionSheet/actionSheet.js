// pages/actionSheet/actionSheet.js
import { $Message } from '../../utils/base.js';
Page({

  data: {
    isShow: false,
    actions: [
      {title: '保存', Fn: 'asd'},
      {title: '分享', disabled: true},
      {title: '查看服务区域'},
    ]
  },
  onLoad: function (options) {

  },
  cancel () {
    $Message({
      content: '用户已取消'
    })
  },
  asd ({ dataset }) {
    console.log(dataset)
  },
  tapname () {
    this.setData({isShow: true})
  }
})