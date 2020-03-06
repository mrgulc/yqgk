const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
const {createQueryString} = require('../../utils/utils')
const app = getApp()

var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    userInfo: {},
    hasUserInfo: false,
    locationInfo: {},
    hasLocationInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'TE3BZ-KCKLO-3IYW7-SKG4A-RTCI6-4GFDD'
    });
    this.checkUserInfo()    
  },
  onShow: function() {
    this.getTabBar().init()
    this.checkLocationAuth()
  },
  handleScan() {
    const reg = /qrCode=(\w*)#/
    wx.scanCode({
      success: (res) => {
        wx.showLoading()
        const result = res.result
        const matches_array = result.match(reg)
        const qrCode = matches_array[1]
        wx.cloud.callFunction({
          name: 'qrCode',
          data: {
            qrCode: qrCode
          },  
          success: res=> {
            const result = res.result
            if (result.code === 0) {
              app.globalData.qrCodeData = result.data
              wx.navigateTo({
                url: `/pages/qrcode/qrcode`,
              })
            }else {
              wx.showToast({
                icon: 'none',
                title: '健康码查询失败!',
                mask: true
              })
            }
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      }
    })
  },
  /**
   * 手动点击授权获取用户数据
   */
  getUserInfo(e) {
    app.globalData.userInfo = e.detail
    this.setData({
      userInfo: e.detail,
      hasUserInfo: true
    })
  },
  /**
   * 获取微信用户信息
   */
  checkUserInfo() {
    if (app.globalData.userInfo) { // 没有用户数据
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) { // 1. 用户没有授权 2. 数据没有返回， 设置等数据返回时调用的函数
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  checkLocationAuth() {
    wx.getSetting({
      success: res => {
        /**
         * 无授权:
         *  1. 请求授权
         *  2. 请求location数据
         */
        if (!res.authSetting['scope.userLocation']) { 
          wx.authorize({
            scope: 'scope.userLocation',
            success: res => {
              console.log('用户申请授权', res)
              this.getLocationInfo()
            }
          })
        }else {
          /**
           * 有授权：
           *  1. 查看是否已经请求了location数据
           *  2. 没有则请求location数据
           */
          if (app.globalData.locationInfo) { // 如果有数据，location已经初始化 
            this.setData({
              locationInfo: app.globalData.locationInfo,
              hasLocationInfo: true
            })
          } else {
            this.getLocationInfo()
          }
        }
      }
    })
  },
  getLocationInfo() { // 地址信息都在这里获取
    wx.getLocation({
      success: res => {
        if (!app.globalData.locationInfo) {
          app.globalData.locationInfo = {}
        }
        app.globalData.locationInfo['lat'] = res.latitude
        app.globalData.locationInfo['lng'] = res.longitude
        this.setData({
          ['locationInfo.lat'] : res.latitude,
          ['locationInfo.lng']: res.longitude
        })
        this.reverseGeocoder(res.latitude, res.longitude)
      }
    })
  },
  /**
   * 逆地址解析， 经纬度转地址
   */
  reverseGeocoder(lat, lng) {
    qqmapsdk.reverseGeocoder({
      coord_type: 1, // 坐标系为gps
      location: {
        latitude: lat,
        longitude: lng
      },
      get_poi: 1,
      success: (res => {

        app.globalData.locationInfo['address'] = res.result.pois[0].address
        app.globalData.locationInfo['title'] = res.result.pois[0].title
        this.setData({
          ['locationInfo.address']: res.result.pois[0].address,
          ['locationInfo.title']: res.result.pois[0].title
        })
      })
    })
  },
  handleDetailIpt(e) {
    this.setData({
      ['locationInfo.address']: e.detail.value
    })
    app.globalData.locationInfo['address'] = e.detail.value
  },

  addrFieldTab(e) {
    wx.navigateTo({
      url: '/pages/location/location',
    })
  },
  showToast() {
    wx.showToast({
      title: '保存成功'
    })
  }
})