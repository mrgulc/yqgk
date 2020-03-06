// components/mc-ipt/mc-ipt.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleData(e) {
      this.triggerEvent('tempinput', e.detail.value)
    }
  }
})
