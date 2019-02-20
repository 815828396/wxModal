// public/components/message/message.js
let defaultData = {
  content: '',
  type: 'default',
  duration: 2,
  visible: false
};
let time = null;
Component({
  properties: {
  },

  data: {
    ...defaultData
  },
  methods: {
    show (options) {
      const { type = 'default', duration = 2 } = options;

      this.setData({
        ...options,
        type,
        duration,
        visible: true
      })

      const _duration = this.data.duration * 1000;

      if (time) clearTimeout(time)
      time = setTimeout(() => {
        this.hide();
        time = null;
      }, _duration)
    },
    hide () {
      this.setData({
        ...defaultData
      })
    }
  }
})
