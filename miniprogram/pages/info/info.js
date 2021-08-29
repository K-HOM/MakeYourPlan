// pages/info/info.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImage: true,
    logstatus: false,
    openId: '',
    images: [],
    imageSrc: '',
    fileIDs: [],
    userName: '',
    date: '',
    value: '',
    timer: '',
    planName: '',
    setPlan: [],
    setDate: [],
    result: [],
    checked: [],
    show: false
  },

  inputPlan: function(event) {
    let pn = event.detail;
    this.setData({
      planName: pn
    })
  },

  addPlan: function() {
    let plan = this.data.setPlan;
    let pn = this.data.planName;
    let userdate = this.data.date;
    if(plan.indexOf(pn) === -1) {
      this.setData({
        setPlan: this.data.setPlan.concat(pn),
        setDate: this.data.setDate.concat(userdate)
      })
    }
   
  },

  toLogin: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  showPopup() {
    this.setData({ show1: true });
  },

  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
    this.setData({ show1: false });
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },

  selectBox: function(event) {
    console.log(event.detail)
    this.setData({
      result: event.detail
    })
  },

  toggle(event) {
    const { index } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${index}`);
    checkbox.toggle();
  },

  noop: function() {

  },

  delBox: function() {
    let date = this.data.setDate;
    let plan = this.data.setPlan;
    let select = this.data.result;
    let sp = [];
    let sd = [];
    let arr = [];
    for(let i=0; i < select.length; i++) {
      arr.push(plan.indexOf(select[i].toString()))
    };
    const pl = plan.length;
    const len = arr.length;
    for(let i=0; i < len; i++) {
      let k = i
      if(i > 0) {
        plan.splice(arr[k]-i,1);
        date.splice(arr[k]-i,1);
        this.data.setPlan = [];
        this.setData({
          setPlan: plan
        })
      } else {
        plan.splice(arr[k],1);
        date.splice(arr[k],1);
        this.data.setPlan = [];
        this.setData({
          setPlan: plan
        })
      }
      console.log(plan,date)
    };
  },

  uploadImage: function() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera']
    }).then(res => {
      const tempFilePath = res.tempFilePaths
      this.setData({
        images: this.data.images.concat(tempFilePath)
      })
      const promiseArr = []
      for(let i = 0; i < this.data.images.length; i++) {
        promiseArr.push(new Promise((resolve,reject) => {
          let item = this.data.images[i];
          let suffix = /\.\w+$/.exec(item)[0];
          wx.cloud.uploadFile({
            cloudPath: new Date().getTime() + suffix,
            filePath: item,
            success: res => {
              console.log(res.fileID);
              this.setData({
                fileIDs: res.fileID
              });
              resolve();
            },
            fail: console.error
          })
        }))
      }
      Promise.all(promiseArr).then(res => {
        db.collection('login').add({
          data: {
            fileId: this.data.fileIDs
          }
        }).then(res => {
          wx.showToast({
            title: '上传成功',
          }).catch(err => {
            console.log(err)
          })
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'getOpenId'
    }).then(res => {
      if(res !== null) {
        this.setData({
          openid: true
        })
      } else {
        this.setData({
          openId: false
        })
      }
    }),
    db.collection('login').get().then(res => {
      if(res.data[0][2] !== null) {
        this.setData({
          headImage: false,
          imageSrc: res.data[0].fileId
        })
      } else {
        this.setData({
          headImage: true
        })
      }
    }).catch(err => {
      console.log(err)
    }),
    wx.login({
      timeout: 0,
    })
  },

  chooseBox: function(event) {
    this.setData({
      checked: event.detail
    })
    console.log(this.data.checked)
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