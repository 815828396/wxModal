export default Behavior({
  properties: {
    target: String,
    dataSet: Object
  },
  data: {
    childComponent: []
  },
  ready () {
  },
  methods: {
    // 返回 组件的 标识名称和自定义对象
    returnPro () {
      return {
        target: this.data.target || '', 
        dataSet: this.data.dataSet || {}
      }
    },
    // 获取页面数据, 默认当前页(0 || 1)  上一页(2) 依次累加
    getPage (current = 0) {
      const pages = getCurrentPages();
      return pages[pages.length - (current ? current : 1)]
    },
    // 获取子组件
    getChildComponents (componentUrl) {
      return this.getRelationNodes(componentUrl);
    },
    // 提交事件
    trigger (event, arg) {
      this.triggerEvent(event, arg)
    }
  }
})
