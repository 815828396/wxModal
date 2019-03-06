// public/components/uploadImage/upload-image.js
import behavior from '../../../utils/behavior.js';

Component({
  options: {
    multipleSlots: true
  },

  behaviors: [behavior],

  properties: {
    // 默认图片路径
    defaultSrc: {
      type: String,
      value: '../../../assets/images/upload-image.png'
    },
    // 图片尺寸,
    imageSize: {
      type: String,
      value: 'max'
    },
    // 上传图片描述
    label: {
      type: String,
      value: ''
    },
    privewImagePath: {
      type: String,
      value: ''
    },
    // 是否展示可预览按钮
    boost: {
      type: Boolean,
      value: false
    }
  },

  data: {
    //选择的图片路径
    uploadImagePath: ''
  },

  methods: {
    handleChooseImage (e) {
      // if (this.data.privewImagePath) return
      this.chooseImage().then(path => {
        this.setData({ uploadImagePath: path })
        this.trigger('upload', {
          ...this.returnPro(),
          path
        });
      })
    },
    handleImageUp (e) {
      const _privewImg = this.data.uploadImagePath || this.data.privewImagePath

      if (!_privewImg) {
        wx.showToast({ title: '请上传图片', icon: 'none' })
        return
      }

      wx.previewImage({
        current: '0', // 当前显示图片的http链接
        urls: [_privewImg] // 需要预览的图片http链接列表
      })
    },
    chooseImage (opt) {
      return new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success(res) {
            // FIXME 图片大小限制
            if (res.tempFiles[0].size > 1024 * 1024 * 2) {
              wx.showToast({
                title: '当前选择图片过大,请重新选择',
                icon: 'none'
              })
              return;
            }
            resolve(res.tempFilePaths[0])
          }
        })
      })
    }
  }
})
