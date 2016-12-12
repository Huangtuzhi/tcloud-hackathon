//index.js
//获取应用实例
const AV = require('../../utils/av-weapp.js'); 
var app = getApp()
Page({
  data: {
    userInfo: {},
    openid: "",
    uploadImageURL: "",
    uploadFindPeopleUrl: "",
    position: {},
    missChild: {}
  },
  onLoad: function () {  
    AV.init({ 
      appId: 'ByV3HX4yH6tmel62fYYXGKhn-gzGzoHsz', 
      appKey: 'xu6VO09QgrRCrWyU7L07NF5y', 
      // appId: "jMvIJ1BTsoci4fcKkaqLfhUK-gzGzoHsz", 
      // appKey: "AYl7WSLG9l38nHQfcM2iQcXN",
    });
  }, 
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindPostTap: function() {    
    wx.navigateTo({
      url: '../posts/posts'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    this.getLocation()
    this.getChildData()
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    // app.getOpenIdData(function(openid){
    //   //回调更新数据
    //   that.setData({
    //     openid: openid
    //   })
    // })
  },
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log("正在上传文件...")
        // console.log(tempFilePaths[0]);
        // 上传照片
        new AV.File('file-name', {  
          blob: {  
            uri: tempFilePaths[0],  
          },  
        }).save().then(  
          file => {
                  console.log(file.url())
                  that.setData({
                    uploadImageURL: file.url()
                  })
                  that.sendData()
                }
          ).catch(console.error);
    }})
  },
  getLocation: function() {
    var that = this;
    wx.getLocation({
    type: 'wgs84',
    success: function(res) {
      var position = {}
      position["latitude"] = res.latitude
      position["longitude"] = res.longitude
      var speed = res.speed
      var accuracy = res.accuracy

      that.setData({
        position: position
      })
    }
    })
  },
  sendData: function () {
    var that = this;
    wx.request({
      url: "https://m.gohomehackathon.club/AcceptInfo",
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      method: "POST", 
      data: {
        userInfo: that.data.userInfo,
        uploadImageURL: that.data.uploadImageURL,
        position: that.data.position,
      },
      success: function (res) {
        console.log("send data ok")
      },
      fail: function() {
        console.log("request error")
      }
    })
  },
  chooseFindPeopleImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log("正在上传文件...")
        // console.log(tempFilePaths[0]);
        // 上传照片
        new AV.File('file-name', {  
          blob: {  
            uri: tempFilePaths[0],  
          },  
        }).save().then(  
          file => {
                  console.log(file.url())
                  that.setData({
                    uploadFindPeopleUrl: file.url()
                  })
                  that.sendFindPeopleData()
                }
          ).catch(console.error);
    }})
  },
  sendFindPeopleData: function () {
    var that = this;
    wx.request({
      url: "https://m.gohomehackathon.club/AcceptMissInfo",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      method: "POST", 
      data: {
        userInfo: that.data.userInfo,
        uploadFindPeopleUrl: that.data.uploadFindPeopleUrl,
        position: that.data.position,
      },
      success: function (res) {
        console.log("send data ok")
      },
      fail: function() {
        console.log("request error")
      }
    })
  },
  getChildData: function() {
    var that = this;
    wx.request({
      url: "https://m.gohomehackathon.club/GetMissingPeopleList",
      data: {
      },
      success: function (res) {
        console.log("Get Post data")
        var posts = [];
        for (var i in res.data) {
            posts.push(res.data[i])
        }
        console.log(posts)
        that.setData(
        {
          missChild: posts,
        })
      },
      fail: function() {
        console.log("request error")
      }
    })
  }

})
