<template>
  <div class="container">
    <p>琪琪，来看看你吃的啥？</p>
    <div class="mainbg"></div>
    <div class="display" @click="chooseImage()">
      <image class="upimg" :src="tempFilePaths" mode="aspectFill" />
    </div>
    <p>{{checkingname}}</p>
    <p>{{checkingdetail}}</p>
    <button @click="chooseImage()">选择图片</button>
  </div>
</template>

<script>
var after_base64 = "";
// 以下路径需根据项目实际情况填写
import { pathToBase64, base64ToPath } from "../../convert.js";

export default {
  data() {
    return {
      resdata: "",
      token: "",
      fipth: "",
      tempFilePaths: "",
      checkingname: "",
      checkingdetail: ""
    };
  },
  onLoad() {},
  methods: {
    getfood(imgbase64) {
      var tk = "";
      console.log("resquesting...");
      uni.request({
        url:
          ",
        header: {
          "Content-Type": "Access-Control-Allow-Origin"
        },
        success: res => {
          // console.log(res.data);
          this.token = res.data.access_token;
          tk = res.data.access_token;
          console.log(tk);
          uni.request({
            url:
              "" +
              tk, //仅为示例，并非真实接口地址。
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            }, //测试通过
            data: {
              image: imgbase64
            },
            //测试通过
            success: res => {
              this.checkingname = "名称：" + res.data.result[0].name;
              this.checkingdetail =
                "热量：" +
                res.data.result[0].calorie +
                "卡路里 准确率：" +
                res.data.result[0].probability;
              //console.log(res.data.result[0].name);
            },
            fail: res => {
              this.checkingname = "未能识别！";
              this.checkingdetail = "没有更多信息！";
            }
          });
        }
      });
    },
    chooseImage() {
      var _this = this;
      _this.checkingdetail = "";
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], //从相册选择、摄像头
        success: function(res) {
          _this.tempFilePaths = res.tempFilePaths[0];
          _this.checkingname = "正在识别，请稍候。。。";
          //console.log(_this.tempFilePaths);
          pathToBase64(_this.tempFilePaths)
            .then(base64 => {
              after_base64 = base64.substring(22);
              _this.getfood(after_base64);
              //console.log(after_base64)
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    }
    // 获取图片信息
  }
};
</script>

<style>
@import "../../static/css/searchfood.css";
</style>
