# Unitimmer
> an anniversary app based on vue
>
> 一个基于Uniapp和Vue.js纪念日app

#### 技术栈

* 前端
  * Vue.js
  * Uniapp
  * CSS/HTML
* 后端
  * Node.js
  * Mysql
  * Linux服务器搭建

#### 功能介绍 

##### 纪念日计数

<img src="https://github.com/LiuTianjie/unitimmer/blob/master/index.gif" style="width:40%;height:auto"/>

* 使用原始JavaScript的Date对象，获取毫秒数后经过计算获取时间并显示
* 每日一句关于爱情的古诗，目前手动更新，日后计划爬取所有的诗句，随机显示

##### 菜品识别

<img src="https://github.com/LiuTianjie/unitimmer/blob/master/IMG_1829.jpg" style="width:40%;height:auto"/>

* 使用百度api，识别多达数百种菜品并显示名称、热量、准确率，计划加入制作方法
* 图片base64转码

百度的菜品识别api接受图片的base64转码，这里将其封装在根目录的convert.js中

使用方法：

```javascript
var after_base64=''	
import {
		pathToBase64,
	} from '../../convert.js';
base64=pathToBase64(image_path);
after_base64 = base64.substring(22)
```

注意：转码后带有前缀，使用时应去掉，这里使用substring( )方法

* 百度api没有JavaScript的接口，这里自己写了一个

```javascript
getfood(imgbase64) {
  var tk = '';
  console.log('resquesting...');
  uni.request({
    url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=xxxx&client_secret=xxxx',
    //这里使用你自己申请的client_id和client_secret
    header: {
      'Content-Type': 'Access-Control-Allow-Origin',
    },
    success: (res) => {
      this.token = res.data.access_token;
      tk = res.data.access_token;
      uni.request({
        url: 'https://aip.baidubce.com/rest/2.0/image-classify/v2/dish?access_token=' + tk,//百度api接口地址
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        }, //测试通过
        data: {
          'image': imgbase64,
        },
        //测试通过
        success: (res) => {
          this.checkingname = '名称：' + res.data.result[0].name;
          this.checkingdetail='热量：' + res.data.result[0].calorie + '卡路里 准确率：' + res.data
            .result[0].probability;
        },
        fail: (res) => {
          this.checkingname ='未能识别！';
          this.checkingdetail='没有更多信息！';
        }
      });
    }
  });
},
```

##### 日记打卡界面

<img src="https://github.com/LiuTianjie/unitimmer/blob/master/submit.gif" style="width:40%;height:auto"/>

* 权限说明

> 由于只想让自己和女票使用，所以在submit的提交按钮和ListCard的删除按钮处添加了用户名核对

* 组件放在component文件夹中，均为自己纯手写

  * ListCard.vue

    * > 卡片式布局包含头像、昵称、打卡时间、内容、编辑、点赞、删除

  * submit.vue

    * > 图片上传至七牛云，后台文件放在server/testdb.js中包含了sql数据库连接和操作，以及七牛云token的获取，注意这部分内容是部署在后端服务器的，编译小程序时可以删除

  * pop_layer.vue

    * > 弹出式浮层设计，不用跳转至其他页面

#### 联系我

由于本人时间精力有限，页面布局都从简处理，逻辑写好了，只能说是能用，不丑，但还有很多想要完善的地方，比如权限管理、美术设计、css/js的优化和归一化管理、后端SQL的安全部署......欢迎大家fork一起完善

28719976@qq.com



