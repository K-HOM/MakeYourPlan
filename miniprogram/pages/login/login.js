// pages/login/login.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
    password: ''
  },

  toRegister: function() {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  onAccount: function(event) {
    this.setData({
      account: event.detail
    })
  },

  onPassword: function(event) {
    this.setData({
      password: event.detail
    })
  },

  login: function() {
    let flag;
    db.collection('login').where({
      loginAccount: this.data.account,
      loginPassword: this.data.password
    }).get().then(res => {
      console.log(res)
     if(res.data[0] !== undefined){
       let pages = getCurrentPages();
       let prevPage =pages[pages.length - 2];
       prevPage.setData({
         ifLogin: this.data.account,
         userId:  res.data[0]._id
       })
       wx.navigateBack()
     }}).catch();
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
                                                                                  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})