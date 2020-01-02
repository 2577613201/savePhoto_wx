// pages/promotion/share/share.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    saveImgBtn: true,
    openSettingBtn: false,
    copy_writer: '文案',  //分享文案
    share_img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {





  },
  /****保存图片 */
  saveImg: function () {
    let that = this
    wx.getSetting({
      success(res) {
        //未授权 先授权 然后保存
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(re) {
              that.saveToBlum();
              that.setData({
                saveImgBtn: true,
                openSettingBtn: false
              })
            },
            fail() {
              that.setData({
                saveImgBtn: false,
                openSettingBtn: true
              })
            }
          })
        } else {
          //已授 直接调用保存到相册方法
          that.saveToBlum();
          that.setData({
            saveImgBtn: true,
            openSettingBtn: false
          })
        }
      }
    })
  },
  //保存网络图片到相册方法
  saveToBlum: function () {
    wx.downloadFile({
      url: this.data.share_img,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(result) {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          }
        })
      }
    })
  },
  //复制
  copyText: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
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