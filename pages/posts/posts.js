//posts.js
//获取应用实例
var app = getApp()
Page({
  data: {
    posts: {},
  },
  onLoad: function () {
    // 加载时更新数据域
    console.log(app.globalData.userInfo.nickName)
    this.getPostData(app.globalData.userInfo.nickName)
  },
  bindMapTap: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  getPostData: function (nickname) {
    var that = this;
    wx.request({
      url: "https://m.gohomehackathon.club/GetMissingInfoByUserId/" + nickname,
      data: {
        // userid: nickname,
      },
      success: function (res) {
        console.log("Get Post data")
        var posts = [];
        console.log(res.data)
        for (var i in res.data) {
            posts.push(res.data[i])
        }
        console.log(posts)
        that.setData(
        {
          posts: posts,
        })
      },
      fail: function() {
        console.log("request error")
      }
    })
  }
})
