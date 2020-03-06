const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationInfo: {},
    userInfo: {},
    customUserInfo: {},
    showGender: false, // 性别 actionSheet
    actionsGender: [
      {name: "男", value: 1},
      {name: "女", value: 0}
    ],
    showBirth: false,
    currentDate: new Date().getTime()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    const userInfo = {
      avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK5EwbjvPTqZoVsH3FnzVuJbtxmlGsVJWJISR2mRCeRubZyDD2omatK3ic70oOplDWJRKBd7iblOuCQ/132",
      city: "",
      country: "Christmas Island",
      gender: 1,
      language: "zh_CN",
      nickName: "快乐小阿掌",
      province: ""
    }
    // const userInfo = app.globalData.userInfo

    this.setData({
      userInfo: userInfo,
      customUserInfo: userInfo
    })
  },
  onShow() {
    this.getTabBar().init()
    const locationInfo = app.globalData.locationInfo
    this.setData({
      locationInfo: locationInfo
    })
  },
  genderTap() {
    this.setData({
      showGender: !this.data.showGender
    })
  },
  genderSelect(e) {
    this.setData({
      'customUserInfo.gender': e.detail.value
    })
    this.genderTap()
  },
  birthTap() {
    this.setData({
      showBirth: !this.data.showBirth
    })
  },
  birthConfirmTap(e) {
    this.setData({
      'customUserInfo.birthday': e.detail
    })
    this.birthTap()
  },
  phoneInput(e) {
    this.setData({
      'customUserInfo.phone': e.detail
    })
  },
  emailInput(e) {
    this.setData({
      'customUserInfo.email': e.email
    })
  },
  addrFieldTab(e) {
    wx.navigateTo({
      url: '/pages/location/location',
    })
  },
})