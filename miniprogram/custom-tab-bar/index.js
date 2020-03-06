Component({
  data: {
    active: 0,
    list: [
      {
        icon: 'home-o',
        text: '主页',
        url: '/pages/home/home'
      },
      {
        icon: 'setting-o',
        text: '设置',
        url: '/pages/profile/profile'
      }
    ]
  },
  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
})