<!--
    @created by
    @updated by
    @updated by
    @description 影像系统公共页面
    @params
      authority：权限按钮控制，默认没有任何权限；每个权限用分号;隔开【import导入影像】【delImg删除图像】【insert插入影像】【scan扫描】【replace替换】【copy复制】【cut剪切】【download下载】【setValidDate设置有效期】【approve审批】【takePic拍摄】【reuse复用】
      s：1-采集 2-查看；默认2
      para：top_outsystem_code: 必填，第三方系统业务类型根节点编码；outsystem_code: 第三方系统业务类型子节点编码，该节点填写，只能查看所列节点的影像；不填写，显示所有根节点下的子节点；index: 索引信息json串 索引信息，key:字段Code，value:传入的值，key值为小写。
  -->
<template>
    <div>
      <iframe :src="imageSrc" frameborder="0" :style="commonStyle" scrolling="yes"></iframe>
    </div>
</template>
<script>
export default {
  name: 'ImageSystem',
  props: {
    s: {
      type: String,
      default: '1'
    },
    authority: String,
    para: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      // topOutsystemCode: 'CMIS',
      // imageLoginUrl: this.$backend.cmisCus + '/api/image/getImageSysToken',
      imageSrcUrl: this.$backend.cmisCus + '/api/image/getImageSrc',
      // prefixUrl: 'http://10.28.122.198/image.html?',
      imageSrc: '',
      commonStyle: {
        width: '100%',
        height: (yufp.frame.size().height - 55) + 'px',
        border: 0
      }
    };
  },
  methods: {
    // imageLogin () {
    //   this.$request({
    //     method: 'POST',
    //     url: this.imageLoginUrl,
    //     data: {
    //       username: 'admin',
    //       password: 'f6fdffe48c908deb0f4c3bd36c032e72'
    //     }
    //   }).then((response) => {
    //     // 处理请求成功的情况
    //     console.log(response);
    //     if (response.code == '200') {
    //       this.getImageSrc(response.data.data.Authorization);
    //     } else {
    //       this.$message({type: 'error', message: '影像系统登录失败！'});
    //     }
    //   });
    // },
    getImageSrc () {
      let reqData = {
        // prefixUrl: this.prefixUrl, // URL前缀，示例http://10.28.122.198/image.html
        para: this.para || this.getFactory().contextData.img_para,
        // authorization: tokenVal, // Token值
        s: this.s,
        authority: this.authority || this.getFactory().contextData.img_authority
      };
      this.$request({
        method: 'POST',
        url: this.imageSrcUrl,
        data: reqData
      }).then((response) => {
        // 处理请求成功的情况
        if (response.code == '0') {
          this.imageSrc = window.encodeURI(response.data);
        } else {
          this.$message({type: 'error', message: '影像系统地址获取失败！'});
        }
      });
    }

  },
  created () {
    this.getImageSrc();
    // console.log('=======================>>>>', this.para);
  },
  mounted () {

  }
};
</script>