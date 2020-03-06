const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
const app = getApp()
const computedBehavior = require('miniprogram-computed')


var qqmapsdk;

Page({
  behaviors: [computedBehavior],

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    sugAddrs: [],
    index: 1,
  },
  watch: {
    title(newVal) {
      this.setData({
        sugAddrs: []
      })
      this.getSearch()
    }
  },
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'TE3BZ-KCKLO-3IYW7-SKG4A-RTCI6-4GFDD'
    })
    this.setData({
      title: app.globalData.locationInfo.title
    })
  },
  getSearch() {
    qqmapsdk.search({
      keyword: this.data.title,
      page_index: this.data.index,
      success: res => {
        console.log(res)
        this.setData({
          sugAddrs: this.data.sugAddrs.concat(res.data)
        })
      }
    })
  }, 

  handlePoiTap(e) {
    const dataset = e.currentTarget.dataset
    this.setData({
      title: dataset.title
    })
    app.globalData.locationInfo['title'] = dataset.title
    app.globalData.locationInfo['address'] = dataset.address
    app.globalData.locationInfo['lat'] = dataset.location.lat
    app.globalData.locationInfo['lng'] = dataset.location.lng

    wx.navigateBack({
      delta: 1
    })
  },
  handlescrolltolower(e) {
    this.setData({
      index: this.data.index+1
    })
    this.getSearch()
  },
  bindAddrSearch(e) {
    this.setData({
      title: e.detail
    })
  }
})