// public/components/province/province.js
import behavior from "../../../utils/behavior.js";
import fetch from "../../../assets/js/fetch/fetch";

const env_provice = 'Login/getProvince';
const env_city = 'Login/getCity';
const env_area = 'Login/getCity';

Component({

  behaviors: [behavior],

  properties: {
    // 直接展示的省市区
    proviceText: String,
    cityText: String,
    areaText: String,

    listName: String,
    // 省市区层级
    zIndex: {
      type: String,
      value: 3
    }
  },
  
  data: {
    isShowFirst: false,

    provice: [],
    city: [],
    area: [],
    // 省,市,区 - 索引值
    index: [0, 0, 0]
  },

  ready() {
    // 如果传入了默认展示的 省 市 区 将 isShowFirst 设置为 true
    this.setData({
      isShowFirst: this.data.proviceText && this.data.cityText && this.data.areaText
    })
    this._getProvice()
  },
  
  methods: {
    handleChange (e) {
      // 一旦自己选择 就将 isShowFirst 设置为 false
      this.data.isShowFirst = false
      
      const _index = e.detail.value;
      const target = e.target.dataset.target; 

      const change = (() => {
        return {
          "provice": target === 'provice',
          "city": target === 'city',
          "area": target === 'area'
        }
      })()

      if (change.provice) {
        this.data.index = [ _index, 0, 0 ];
        this._getCity();
      }
      if (change.city) {
        this.data.index[1] = _index;
        this._getArea();
      }
      if (change.area) {
        this.data.index[2] = _index;

        this.trigger('info', {
          provice: this.data.provice[this.data.index[0]],
          city: this.data.city[this.data.index[1]],
          area: this.data.area[this.data.index[2]],
          list: this.data[this.data.listName] || []
        })
      }

      this.setData({
        index: this.data.index
      });
    },
    // 获取省份列表
    _getProvice () {
      fetch(env_provice).then(res => {
        if (res.code === 1) {
          this.setData({
            provice: res.data
          })

          // 如果首次加载, 省份默认选中第一项, 自动获取城市列表
          if (this.data.index[0] === 0) this._getCity();
        }
      })
    },
    // 获取城市列表
    _getCity () {
      const pro_id = this.data.provice[this.data.index[0]].id;
      const id = this.data.isShowFirst && this.data.proviceText && this.getCityInfoByName(this.data.provice, this.data.proviceText, 0)['id'] || pro_id;
      const data = { id };

      fetch(env_city, data, 'GET').then(res => {
        // 每次清空区域列表
        if (this.data.area) this.setData({ area: [] });
        this.setData({
          city: res.data
        });
        this._getArea();
      })
    },
    // 获取区域列表
    _getArea () {
      const city_id = this.data.city[this.data.index[1]].id;
      const id = this.data.isShowFirst && this.data.cityText && this.getCityInfoByName(this.data.city, this.data.cityText, 1)['id'] || city_id;

      const data = { id };

      fetch(env_area, data, 'GET').then(res => {
        this.setData({
          area: res.data
        })

        this.getCityInfoByName(this.data.area, this.data.areaText, 2)
        // TODO 向父组件提交事件, 返回相关信息
        this.trigger('info', {
          provice: this.data.provice[this.data.index[0]],
          city: this.data.city[this.data.index[1]],
          area: this.data.area[this.data.index[2]],
          list: this.data[this.data.listName] || []
        });
      })
    },
    // 根据 (名称 || id) 获取当前的城市信息信息
    getCityInfoByName(arr, name, _index) {
      if (arguments.length === 1 && typeof arr === 'number') return arr;

      const [filter] = [
        typeof name === 'number' ? 'id' : 'name'
      ];

      return (arr.filter((item, index) => {
        if (item[filter] === name) {
          this.data.index[_index] = index
          this.setData({
            index: this.data.index
          })
        }
        return item[filter] === name
      }))[0]
    }
  }
})
