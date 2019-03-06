// public/components/province/province.js
import behavior from "../../../utils/behavior.js";
import fetch from "../../../assets/js/fetch/fetch";

const env_provice = 'Authority/getPro';
const env_city = 'Authority/getCity';
const env_area = 'Authority/getCity';

Component({

  behaviors: [behavior],

  properties: {
    proviceText: String,
    // 省市区层级
    zIndex: {
      type: String,
      value: 3
    }
  },
  
  data: {
    provice: [],
    city: [],
    area: [],
    // 省,市,区 - 索引值
    index: [0, 0, 0]
  },

  ready () {
    this._getProvice()
  },
  
  methods: {
    handleChange (e) {
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
          area: this.data.area[this.data.index[2]]
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
    _getCity (provice) {
      const pro_id = this.data.provice[this.data.index[0]].id;
      const id = provice && this.getCityInfoByName(this.data.provice, provice)['id'] || pro_id;
      const data = { id };

      fetch(env_city, data).then(res => {
        // 每次清空区域列表
        if (this.data.area) this.setData({ area: [] });
        this.setData({
          city: res.data
        });
        this._getArea();
      })
    },
    // 获取区域列表
    _getArea (city) {
      const city_id = this.data.city[this.data.index[1]].id;
      const id = city && this.getCityInfoByName(this.data.city, city)['id'] || city_id;

      const data = { id };

      fetch(env_area, data).then(res => {
        this.setData({
          area: res.data
        })

        // TODO 向父组件提交事件, 返回相关信息
        this.trigger('info', {
          provice: this.data.provice[this.data.index[0]],
          city: this.data.city[this.data.index[1]],
          area: this.data.area[this.data.index[2]]
        });
      })
    },
    // 根据 (名称 || id) 获取当前的城市信息信息
    getCityInfoByName (arr, name) {
      if (arguments.length === 1 && typeof arr === 'number') return arr;

      const [ filter ] = [ 
        typeof name === 'number' ? 'id' : 'name'
      ];
  
      return (arr.filter((item, index) => {
        return item[filter] === name
      }))[0]
    }
  }
})
