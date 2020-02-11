<template name="Submit">
	<view class="total">
		<view class="box">
			<textarea class="text-area" placeholder="想说点什么呢..." v-model="content" />
			</view>
		<image class="addinfo" :src="s_image_url" @tap="didPressChooseImage" mode="aspectFill">
			<progress style="margin-left: 38upx;margin-top: -40upx;width: 120upx;" :percent="percent" strock-width="20"></progress>
			<p>{{load}}</p>
		</image>
		<view class="subbutton">
			<image style="width: 70upx;height: 70upx;" src="https://images.nickname4th.vip/no.png" mode="aspectFill" @tap="close();"></image>
			<image style="margin-left: 120upx;width: 70upx;height: 70upx;" src="https://images.nickname4th.vip/yes.png" mode="aspectFill"></image><!-- 提交 -->
		</view>
		<button class="grant" open-type="getUserInfo" @getuserinfo="getuserinfo()"></button>
	</view>
</template>

<script>
	const qiniuUploader = require("../server/upqiniu.js");
	var after_base64 = '';
	// 以下路径需根据项目实际情况填写
	import {
		pathToBase64,
		base64ToPath
	} from '../convert.js';
	import {getTime} from '../gettime.js';
	export default {
		name:"Submmit",
		data() {
			return {
				unitime:'',
				content:'',
				photo_url:'',
				image_url:'',
				s_image_url:'',
				nickname:'',
				token:'',
				load:'',
				percent:0,
			};
		},
			methods: {
					getuserinfo: function(){
						var that =this;
						that.close();
						wx.login({
						  success (res) {
						    if (res.code) {
							  var code = res.code
								wx.getUserInfo({
								  success: function(res) {
									that.nickname=res.userInfo.nickName;
									that.photo_url=res.userInfo.avatarUrl;
									// console.log(res.userInfo);
									that.submit();
								  },
								  fail:res=>{
									  uni.showToast({
									  	title: '打卡失败！请重试！',
									  	duration: 2000
									  });
								      // 获取失败的去引导用户授权 
								   }
								})
						    } else {
						    }
						  }
						});
					},
			// 获取图片信息 
			submit() {
				var that = this;
				uni.showToast({
					title: '打卡成功💯！',
					duration: 2000
				});
				wx.request({
					url: '',
					method: 'POST',
					data: {
						unitime:getTime(),
						content:that.content,
						photo_url:that.photo_url,
						image_url:that.image_url,
						nickname:that.nickname,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success(res) {
						that.display();
						that.content='';
						that.load='';
					}
				})
			},
			close() {
				this.$emit("close");
				this.percent=0;
				this.s_image_url=''
			},
			display(){
				this.$emit("display");
			},	
			didPressChooseImage: function() {
				var that = this;
				// 图片
				wx.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择、摄像头
					success: function(res) {
						var filePath = res.tempFilePaths[0];
						that.s_image_url=res.tempFilePaths[0];
						that.load='正在上传...';
						// 交给七牛上传
						qiniuUploader.upload(filePath, (res) => {
							that.image_url=res.imageURL;
							console.log('file url is: ' + res.fileUrl);
						}, (error) => {
							console.log('error: ' + error);
						}, {
							region: 'SCN',
							domain: 'https://images.nickname4th.vip', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
							key: filePath,
							uptoken: that.token,
							}, (res) => {
								that.percent=res.progress;
								if(that.percent==100){
									that.load='上传完成！'
								}
						}, () => {
							// 取消上传
						}, () => {
							// `before` 上传前执行的操作
						}, (err) => {
							// `complete` 上传接受后执行的操作(无论成功还是失败都执行)
						});
					}
				})
			},
			gettoken(){
				uni.request({
					url: '',
					method: 'GET',
					data: {},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success(res) {
					console.log(res.data)
					}
				})
			},
		},
		
		// onload(){

		// },
		mounted() {
			var that =this;
			var re = '';
			uni.request({
				url: '',
				method: 'GET',
				data: {},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success(res) {
					that.token=res.data;
					console.log(that.token)
				}
			})
		}
		
	}
</script>
<style>
	.total{
		display: flex;
		flex-direction:column;
		text-align: center;
		justify-content: center;
		align-content: center;
		z-index: 9999;
	}
	.box{
		display: flex;
		flex-direction: row;
		top: 0upx;
		left: 0upx;
		width: 100%;
		height: 650upx;
		justify-content: center;
		align-content: center;
		
	}
	.text-area{
		text-align: left;
		top:30upx;
		width: 700upx;
		height: 350upx;
		font-size: 40upx;
		border:1upx solid #888888;
		border-radius: 6upx;
		border-shadow: 5upx 5upx 5upx rgba(235, 235, 240);
	}
	.addinfo{
		 width: 120upx;
		 height: 120upx;
		 margin-top: -250upx;
		 margin-left: 40upx;
		 margin-bottom: 50upx;
	}
	.subbutton{
		width: 100% ;
		height: 75upx;
		border-top:2upx solid #f0f0f0;
	}
	.grant{
		background: rgba(0,0,0,0);margin-bottom: 5upx;margin-top: -70upx;margin-left: 440upx;width: 60upx;height: 60upx;
	}
	button::before{
		border: none;
	}
	button::after{
		border: none;
	}
</style>
