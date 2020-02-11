<template>
  <view class="container">
    <view class="mainbg"></view>
    <popup-layer ref="popupRef" :direction="'bottom'">
      <Submit v-on:close="close();" v-on:display="disPlay()"></Submit>
    </popup-layer>
    <view class="outlistcard">
      <view class="listcard">
        <ListCard
          v-for="a in arr"
          :photo="a.photo_url"
          :img="a.image_url"
          :content="a.content"
          :key="a.unitime"
          :creatTime="a.unitime"
          :nickname="a.nickname"
          v-on:display="disPlay()"
        ></ListCard>
      </view>
    </view>
    <img
      class="refreshbutton"
      src="../../static/icons/refresh.png"
      mode="aspectFill"
      @tap="disPlay()"
    />
    <img
      class="addbutton"
      src="https://images.nickname4th.vip/addmsg.png"
      mode="aspectFill"
      @tap="show();"
    />
    <p>背景图片来自Bing</p>
  </view>
</template>

<script>
import ListCard from "../../components/listcard.vue";
import Submit from "../../components/submit.vue";
import popupLayer from "../../components/popup-layer.vue";
export default {
  components: {
    popupLayer,
    Submit,
    ListCard
  },
  data() {
    return {
      arr: [],
      boolShow: false
    };
  },
  methods: {
    show() {
      this.$refs.popupRef.show(); // 或者 boolShow = rue
    },
    close() {
      this.$refs.popupRef.close(); // 或者 boolShow = false
    },
    disPlay() {
      let that = this;
      wx.request({
        url: "",
        method: "GET",
        data: {},
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success(res) {
          that.arr = res.data.data; //sql的一条记录
        }
      });
    }
  },
  onLoad() {
    this.disPlay();
  },
  onPullDownRefresh() {
    //监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
    console.log("refesh!");
    this.disPlay();
    setTimeout(function() {
      uni.stopPullDownRefresh(); //停止下拉刷新动画
    }, 1000);
  }
};
</script>

<style>
@import "../../static/css/daily.css";
</style>
