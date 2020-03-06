const computedBehavior = require('miniprogram-computed')

Component({
  behaviors: [computedBehavior],
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal) {
        console.log('observer ', newVal, oldVal)
      }
    }
  },
  data: {
    myShow: false,
  },
  watch: {
    show(a, b) {
      console.log('show', a, b)
    }
  },
  methods: {
    getUserInfo(res) {
      console.log(res)
      this.setData({
        show: false
      })
      this.triggerEvent('getUserInfo', res.detail.userInfo)
    }
  }
})
