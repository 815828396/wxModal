// public/components/modal/modal.js
Component({
  properties: {
    title: String,
    cancel: String,
    confirm: String,
    border: {
      type: Boolean,
      value: true
    }
  },

  data: {

  },

  methods: {
    handleConfirm (e) {
      this.triggerEvent('confirm')
    },
    handleCancel () {
      this.triggerEvent('cancel')
    }
  }
})
