// pages/register/register.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userPassword: '',
    userPasswordCf: '',
    userPhone: '',
    ifConfirm: true,
    passwordError: '',
    userNameError: '',
    reject: '',
    countNumber: 60
  },

  inputUserName: function(event) {
    let un = event.detail;
    this.setData({
      userName: un
    });
  },

  inputPassword: function(event) {
    let password = event.detail;
    this.setData({
      userPassword: password
    })
  },

  cfPassword: function(event) {
    let cfpassword = event.detail;
    this.setData({
      userPasswordCf: cfpassword
    })
  },

  inputPhone: function(event) {
    let pn = event.detail;
    this.setData({
      userPhone: pn
    })
  },

  register: function() {
    const sn = this.data.userName;
    const up = this.data.userPassword;
    const cf = this.data.userPasswordCf;
    const up1 = this.data.userPhone;
    console.log(sn, up, cf, up1)
  },

  confirm: function() {
    let num = this.data.countNumber;
    let timer = setInterval(() => {
      num -= 1;
      this.setData({
        countNumber: num
      })
      if(num <= 1) {
        clearInterval(timer);
        this.setData({
          countNumber: 60
        })
      }
    }, 1000)
  },

  register: function() {
    try {
      db.collection('login').where({
        loginAccount: this.data.userName
      }).get().then(res => {
        console.log(res.data.length)
        if(res.data.length > 0) {
          this.setData({
            userNameError: '账号已被注册',
          });
        } else {
          this.setData({
            reject: 0
          })
        }
        
       
      }).catch(err => {
        console.log(err)
      })
      setTimeout(() => {
        if(this.data.reject === 0) {
          db.collection('login').add({
            data: {
              loginAccount: this.data.userName,
              loginPassword: this.data.userPassword,
              phone: this.data.userPhone,
              plan: [],
              planDate: []
            }
          }).then(res => {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 3000
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 0,
              })
            },3000)
          }).catch()
        }
      }, 1000)
    } catch (error) {
      
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setInterval(() => {
      if(this.data.userPassword === this.data.userPasswordCf && this.data.userPassword !== '' && this.data.userName !== '' && this.data.userPhone.length === 11 && this.data.userName.length >= 6) {
        this.setData({
          ifConfirm: false
        })
      } else {
        this.setData({
          ifConfirm: true
        })
      }
    },500);
    setInterval(() => {
      if(this.data.userPassword !== this.data.userPasswordCf && this.data.userPasswordCf !== '') {
        this.setData({
          passwordError: '输入的密码有误'
        })
      } else {
        this.setData({
          passwordError: ''
        })
      }
    }, 500);
    setInterval(() => {
      if(this.data.userName !== '' && this.data.userName.length < 6 || this.data.userName.length > 20) {
        this.setData({
          userNameError: "请输入6-20位字符"
        })
      } else {
        this.setData({
          userNameError: ''
        })
      }
    }, 1000)
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