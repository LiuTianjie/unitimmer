<template name="ListCard">
	<view class="card">
		<view style="display: flex;flex-direction: column;margin:10upx 0upx 0upx 20upx;">
			<view style="display: flex;flex-direction: row">
				<image class="user" :src="photo" mode="aspectFill"></image>
				<p style="margin-left:10upx;font-size: 28upx;">{{nickname}}</p>
			</view>
			<p style="font-size: 22upx;margin-left: 90upx;margin-top:-40upx;color: grey;">{{creatTime}}</p>
			<image class="cardimg" :src="img" mode="aspectFill" @tap="preview()"></image>
		</view>
		<view style=" z-index: 1;">
			<view class="text-area">{{content}}</view>
			<image src="https://images.nickname4th.vip/edit.png" mode="aspectFill"></image>
			<image src="https://images.nickname4th.vip/good.png" mode="aspectFill"></image>
			<image src="https://images.nickname4th.vip/del.png" mode="aspectFill" @tap="del();"></image>
		</view>
	</view>
</template>
<script>
	export default {
		name: "ListCard",
		props: [
			'img',
			'content',
			'creatTime',
			'nickname',
			'photo',
		],
		data() {
			return {

			}
		},
		methods: {
			del() {
				var that = this;
				uni.showModal({
					title: '😭确认删除？',
					content: '删除了就没有了哦~',
					success: function(res) {
						if (res.confirm) {
							wx.request({
								url: '',
								method: 'POST',
								data: {
									// name: 'lll',
									unitime: that.creatTime,
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								success(res) {
									that.display();
									uni.showToast({
										title: '删除成功！',
										duration: 500
									});
									// console.log('success');
									// console.log(res.data.data);
								}
							})
							console.log('用户点击确定');
						} else if (res.cancel) {
							uni.showToast({
								title: '已取消！',
								duration: 500
							});
							console.log('用户点击取消');
						}
					}
				});

			},
			display() {
				this.$emit("display");
			},
			preview() {
				if (this.img == "") {
					uni.showModal({
							title: '~404~',
							content: '该日记没有图片哦~',
							showCancel:false,
							success: function(res) {}
						});}
						else {
							uni.previewImage({
								urls: [this.img],
							});
						}
					}
				}
			}
</script>
<style>
	.card {
		margin: 20upx 0upx 35upx 35upx;
		width: 660upx;
		height: 300upx;
		background: rgba(255, 255, 255, .75);
		border-radius: 10upx;
		box-shadow: 3upx 3upx 2upx 2upx #AAAAAA;
		display: flex;
		flex-direction: row;
	}

	.card>view:nth-child(2)>image {
		margin-top: 10upx;
		margin-left: 52upx;
		width: 40upx;
		height: 40upx;
	}

	.user {
		width: 80upx;
		height: 80upx;
		box-shadow: 5upx 5upx 5upx #AAAAAA;
		border-radius: 5upx;
	}

	.cardimg {
		margin-top: 20upx;
		border-radius: 8upx;
		width: 300upx;
		height: 180upx;
		box-shadow: 5upx 5upx 5upx #AAAAAA;
	}

	.text-area {
		padding-top: 10upx;
		padding-left: 10upx;
		text-align: left;
		margin-top: 20upx;
		margin-left: 20upx;
		width: 300upx;
		height: 200upx;
		font-size: 30upx;
		border: 3upx dashed #000000;
		border-radius: 8upx;
		border-shadow: 5upx -5upx 5upx rgba(235, 235, 240);
		font-family: KaiTi;
	}
</style>
