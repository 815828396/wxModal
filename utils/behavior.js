export default Behavior({
  methods: {
    // 获取页面数据, 默认当前页(0 || 1)  上一页(2) 依次累加
    getPage (current = 0) {
      const pages = getCurrentPages();
      return pages[pages.length - (current ? current : 1)]
    }
  }
})
