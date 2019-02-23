// public/components/list/list.js
import { router } from '../../../assets/js/wxUntil.js';
import behavior from '../../../utils/behavior.js'
Component({
  options: {
    multipleSlots: true
  },

  behaviors: [behavior],

  properties: {
    type: {
      type: Boolean,
      value: true
    },
    router: String,
    query: Object,
    // 是否显示底边线 -- none 为不显示
    border: String,
    cellType: String,
    // switch
    switchChecked: Boolean,
    // input 框属性
    placeholder: String,
    value: String
  },
  methods: {
    // 路由跳转
    handelClick (e) {
      if (!this.data.router) return;
      this.triggerEvent('router', {
        ...this.returnPro(),
      });
      router(this.data.router, this.data.query);
    },
    handleSwitch (e) {
      this.triggerEvent('change', {
        value: e.detail.value,
        ...this.returnPro(),
      })
    },
    handleInputChange (e) {
      this.triggerEvent('input', {
        value: e.detail.value,
        ...this.returnPro(),
      })
    }
  }
})
