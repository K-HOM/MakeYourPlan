// pages/movielist/movielist.js
let i = 1; 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    joke: []
  },
post: function() {
  web-D
},
getData: function() {
  wx.showLoading({
    title: '加载中',
  })
  wx.cloud.callFunction({
    name: 'movielist',
    data: {
      page: i,
      key: '9324712a9c6ab1bdbed9e2e2a5bf3311'
    }
  }).then(res => {
    console.log(res)
    wx.hideLoading();
    this.setData({  
        joke: this.data.joke.concat(JSON.parse(res.result).result.data)
    })
    console.log(res)
  }).catch(err => {
    console.error(err)
  })
},
detail: function(event) {
  wx.navigateTo({
    url: `../news/news?title=${this.data.joke[event.currentTarget.dataset.handle].title}&image=${this.data.joke[event.currentTarget.dataset.handle].thumbnail_pic_s}&image02=${this.data.joke[event.currentTarget.dataset.handle].thumbnail_pic_s02}&image03=${this.data.joke[event.currentTarget.dataset.handle].thumbnail_pic_s03}&date=${this.data.joke[event.currentTarget.dataset.handle].date}`,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
    i++;
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})