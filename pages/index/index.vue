<template>
  <view class="mainbg">
    <div class="text-container">
      <p>拾忆琪</p>
      <p>一些值得被铭记的时刻</p>
      <p>{{days}}</p>
      <p>即使走的再远，也不会忘记最初的起点</p>
      <p>2019/02/02 戊戌年冬月廿八</p>
      <div class="poem">
        <p>云想衣裳花想容，春风拂槛露华浓。</p>
        <p>————《清平调》·李白</p>
      </div>
    </div>
    <foot>@Nickname4th</foot>
  </view>
</template>
<script>
export default {
  data() {
    return {
      days: ""
    };
  },
  methods: {
    gettime() {
      var date1 = "2019/02/02 00:00:00"; //开始时间
      var date2 = new Date(); //结束时间
      var date3 = date2.getTime() - new Date(date1).getTime(); //时间差的毫秒数
      //计算出相差天数
      var days = Math.floor(date3 / (24 * 3600 * 1000)); //计算出小时数
      var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000)); //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差秒数
      var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000);
      this.days =
        days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
    }
  },
  mounted() {
    setInterval(this.gettime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style>
@import "../../static/css/index.css";
</style>
