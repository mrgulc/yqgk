// miniprogram/pages/qrcode/qrcode.js
const computedBehavior= require('miniprogram-computed')
import { default as Notify }  from '@vant/weapp/notify/notify'
const app = getApp()
Page({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
   qrCodeData: {},
   qrCodeText: '',
   qrCodeType: '',
   imgSrc: '',
   temp: '',
  },

  watch: {
    'qrCodeData.ddColor'(newVal) {
      let imgSrc = `../../assets/qrcode/${newVal}.png`
      let qrCodeText
      let qrCodeType
      switch(newVal) {
        case 'green':
          qrCodeText = '绿码'
          qrCodeType = '绿码通行'
          break
        case 'yellow':
          qrCodeText = '黄码'
          qrCodeType = '黄码不可通行'
          break
        case 'red':
          qrCodeText = '红码不可通行'
          qrCodeType = '红码'
          break
        default:
          qrCodeText = '其他'
          qrCodeType = '其他'
      }
      this.setData({
        imgSrc: imgSrc,
        qrCodeText: qrCodeText,
        qrCodeType: qrCodeType
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const qrCodeData = app.globalData.qrCodeData
    this.setData({
      qrCodeData: qrCodeData
    })
  },
  tempinput(e) {
   this.setData({
     temp: e.detail
   })
  },
  handleTap() {
    var qrCodeData = this.data.qrCodeData
    var locationInfo = app.globalData.locationInfo
    wx.cloud.callFunction({
      name: 'saveInfo',
      data: {
        name: qrCodeData.name,
        gender: qrCodeData.gender,
        ages: qrCodeData.ages,
        idCard: qrCodeData.idCard,
        phone: qrCodeData.phone,
        ddQrcode: qrCodeData.ddQrcode,
        ddColor: qrCodeData.ddColor,
        addr: locationInfo.title,
        detailAddr: locationInfo.address,
        temp: this.data.temp
      },
      success: res => {
        console.log('----------------', res)
        if(res.result.code === 0 ){
          wx.showToast({
            title: '保存成功',
            duration: 500,
            success: () => {
              setTimeout(() => {
                wx.navigateBack({
                  detal: 1
                })
              }, 500)
            }
          })
        }else {
          wx.showToast({
            title: '保存失败',
          })
        }
      }
    })
  }
})