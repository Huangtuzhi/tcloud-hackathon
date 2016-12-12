//app.js
const AV = require('./utils/av-weapp.js');
AV.init({ 
 // appId: "ByV3HX4yH6tmel62fYYXGKhn-gzGzoHsz", 
 // appKey: "xu6VO09QgrRCrWyU7L07NF5y",
  appId: "jMvIJ1BTsoci4fcKkaqLfhUK-gzGzoHsz", 
  appKey: "AYl7WSLG9l38nHQfcM2iQcXN",
});
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getOpenIdData:function(cb){
    var that = this
    //调用登录接口
      wx.login({
        success: function (res) {
          that.globalData.code = res.code
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: "wx6224eb*********",
              secret: "879b58fc64bc5**************",
              js_code: res.code,
              grant_type: "authorization_code"
            },
            success: function (res) {
              // console.log(res["data"]["openid"])
              that.globalData.openid = res["data"]["openid"]
              cb(that.globalData.openid)
            },
            fail: function() {
              console.log("request error")
            }
          })
        }
      })
  },
  globalData:{
    userInfo:null,
    code: null,
    openid: null,
  }
})
