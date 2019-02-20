// public/components/list/columnsUl/columns-ul.js
import behavior from '../../../../utils/behavior'
Component({
  behaviors: [behavior],
  relations: {
    // 注意 relations 组件路径, 是文件的相对路径, 而不是 组件引用时候的 DOM 数路径
    '../columnsLi/columns-li': {
      type: 'child',
      linked (target) {
        // console.log(target)
      }
    }
  },
  properties: {

  },
  ready () {
    this.as()
    console.log(this.getRelationNodes('../columnsLi/columns-li'))
  },
  data: {

  },
  methods: {

  }
})
