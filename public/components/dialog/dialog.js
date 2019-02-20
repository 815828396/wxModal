// public/dialog/dialog.js
Component({
  properties: {
    imgsrc: {
      type: String,
      value: ''
    },
    btnText: {
      type: String,
      value: '确定'
    },
    showClose: {
      type: Boolean,
      value: true
    },
    data: {
      type: Object,
      value: {}
    }
  },

  data: {

  },

  methods: {
    click: function () {
      this.triggerEvent('btnClick', this.data.data)
    }
  }
})
