<template>
  <div id="app">
    <img src="./assets/logo.png" @click="downloadImg">
    <div style="background:black;">
      <img :src="img1" @click="downloadImg">
    </div>
    <el-dropdown trigger="" ref="dropdown">
      <span class="el-dropdown-link" @click="handleClick">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      img: 'https://img01.kanghehealth.com/static/images/cb/e9/fd/d1/eb4c0d5ea0b34bc49a813abb61dc083d.png',
      img1: ''
    }
  },
  created() {
    let url = location.href
      axios.get('http://120.79.57.19:3336/getSignature?originalUrl=' + url).then((res) => {
        if (res.data.code === 200) {
          let data = res.data
          console.log(data)
          wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.noncestr, // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名
              jsApiList: [
                  'chooseWXPay',
                  'checkJsApi',
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'updateAppMessageShareData',
                  'updateTimelineShareData',
                  'onMenuShareQQ',
                  'onMenuShareWeibo',
                  'onMenuShareQZone',
                  'hideMenuItems',
                  'showMenuItems',
                  'hideAllNonBaseMenuItem',
                  'showAllNonBaseMenuItem',
                  'previewImage',
                  'getLocation'
              ] // 必填，需要使用的JS接口列表
          });
          wx.ready(function () {
              console.log('ready')
              wx.getNetworkType({
                success: function (res) {
                  var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                  alert(networkType)
                }
              });
          });
          wx.error(function(res){
            console.log(res)
          })
        }
      })
    
    axios({
      method:'get',
      url: '/api',
      //headers: {bytes: '0-1000'},
    })
  },
  methods: {
    handleClick() {
      console.log(this.$refs.dropdown)
      if (this.$refs.dropdown.visible) {
          this.$refs.dropdown.hide();
      } else {
          this.$refs.dropdown.show();
      }
    },
    downloadImg() {
      this.convertUrlToBase64(this.img).then((res) => {
        this.img1 = res.dataURL
        let fileName = 'abc.png';
        let blob = new Blob([res.dataURL], { type: 'image/png' }); // !还差一步把base64转ArrayBuffer对象，再转blob
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
      })
    },
    convertUrlToBase64(url) {
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = url;
            img.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
                var dataURL = canvas.toDataURL("image/" + ext);
                var base64 = {
                    dataURL: dataURL,
                    type: "image/" + ext,
                    ext: ext
                };
                resolve(base64);
            };
        });
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
