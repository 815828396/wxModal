import behavior from "../../../utils/behavior";

const CHILD_URL = '../swiper-item/swiper-item';

// public/components/swiper/swiper.js
Component({

  options: {
    multipleSlots: true
  },

  externalClasses: ['swiper-class'],

  relations: {
    [CHILD_URL]: {
      type: 'child'
    }
  },

  behaviors: [behavior],

  properties: {

  },
  ready () {
    console.log(this.getChildComponents(CHILD_URL))
  },
  data: {

  },
  methods: {

  }
})
