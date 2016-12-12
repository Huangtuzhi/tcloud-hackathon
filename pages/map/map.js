//posts.js
//获取应用实例
var app = getApp()
Page({
  data: {
    latitude: "22.60",
    longitude: "113.92",
    url: "",
    markers: [{
    latitude: "22.60",
    longitude: "113.92",
    name: '儿童追踪',
    desc: '儿童位置',
  }]
  },
  onLoad: function () {
    // 加载时展示地图
    console.log("map ok")
    this.getLocation(app.globalData.userInfo.nickName)
  },
  getLocation: function (nickname) {
    var that = this;
    wx.request({
      url: "https://m.gohomehackathon.club/PullPossibleList/" + nickname,
      data: {
        // userid: nickname,
      },
      success: function (res) {
        console.log("Get Post data")
        console.log(res.data)
        console.log(res.data.Latitude)
        console.log(res.data.photourl)
        var markers = [ {
          latitude: res.data.Latitude,
          longitude: res.data.Longitude,
          name: '儿童追踪',
          desc: '儿童位置'
        }];
        console.log(markers)
        that.setData(
        {
          latitude: res.data.Latitude,
          longitude: res.data.Longitude,
          url: res.data.photourl,
          markers: markers,
        })
      },
      fail: function() {
        console.log("request error")
      }
    })
  }
})
