// public/components/button/button.js
Component({
  properties: {
    type: {
      type: String,
      value: 'primary'
    },
    iconClass: {
      type: String,
      value: 'icon-loading1'
    },
    small: Boolean,
    loading: Boolean
  },

  data: {

  },

  methods: {
    handleClick () {
      this.triggerEvent('click', {
        dataset: this.dataset || {}
      })
    }
  }
})
