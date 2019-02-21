// public/components/progress/progress.js
Component({
  options: {
    multipleSlots: true
  },
  
  externalClasses: ['container-class', 'item-class'],

  properties: {
    title: String,
    desc: String,
    progress: String || Number,
    type: {
      type: String,
      value: 'error'
    }
  },

  data: {
  },

  methods: {

  }
})
