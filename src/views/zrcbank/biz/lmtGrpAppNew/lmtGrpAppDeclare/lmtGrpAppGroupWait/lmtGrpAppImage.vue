<!--
    @created by
    @updated by
    @updated by
    @description 影像公共页面
    @params
      authority：权限按钮控制，默认没有任何权限；每个权限用分号;隔开【import导入影像】【delImg删除图像】【insert插入影像】【scan扫描】【replace替换】【copy复制】【cut剪切】【download下载】【setValidDate设置有效期】【approve审批】【takePic拍摄】【reuse复用】
      s：1-采集 2-查看；默认2
      para：top_outsystem_code: 必填，第三方系统业务类型根节点编码；outsystem_code: 第三方系统业务类型子节点编码，该节点填写，只能查看所列节点的影像；不填写，显示所有根节点下的子节点；index: 索引信息json串 索引信息，key:字段Code，value:传入的值，key值为小写。
  -->
<template>
  <div>
    <imageSystem ref="image" :authority="authority" :s="imageType" :para="imageBizParam" :isWindow="1"></imageSystem>
  </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';

export default {
  // props: {
  //   pageParams: Object,
  //   dialogId: String
  // },
  components: {
    imageSystem
  },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      authority: 'download;',
      imageType: '1',
      imageBizParam: [
        {
          top_outsystem_code: 'JTSXJBZL',
          index: {
            docid: '',
            contid: '',
            businessid: '',
            custconduct: '',
            operid: '',
            custconductname: '',
            orgid: '',
            custtype: '',
            orgname: '',
            opername: '',
            custid: '',
            maintaindate: '',
            custname: ''
          }
        }
      ],
      nodeSignMap:{
        'a':'import;',
        'b':'delImg;',
        'c':'insert;',
        'd':'scan;',
        'e':'replace;',
        'f':'copy;',
        'g':'cut;',
        'h':'download;',
        'i':'setValidDate;',
        'j':'approve;',
        'k':'takePic;',
        'l':'reuse;'
      }
    };
  },
  created () {
    this.afterInit();
  },
  mounted () {

  },
  methods: {
    // 影像资料
    afterInit () {
      let _this = this;
      let obj;
      this.getFactory().setButtonVisiable('commit', false);
      this.getFactory().setButtonVisiable('save', false);
      this.getFactory().setButtonVisiable('tempSave', false);
      this.getFactory().setButtonVisiable('back', false);
      const loginUser = this.$xutils.getLoginUserInfo();
      let orgCode = loginUser.orgCode;
      if (this.getFactory().contextData.instanceInfo) {
        let instanceObj = this.getFactory().contextData.instanceInfo;
        obj = instanceObj.param;
        if (instanceObj.nodeSign && instanceObj.nodeSign != ""){
          let imageJson = JSON.parse(instanceObj.nodeSign);
          this.authority = this.nodeAuthority(imageJson.image);
        }
      }else if (this.$route.meta.params) {
        obj = _this.$route.meta.params;
        if (this.$route.meta.params.op == 'VIEW' || this.$route.meta.params.op == 'view') {
          this.authority = 'download;';
        }else{
          // 特殊情况（村镇 客户经理可以上传影像）  
          if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
            this.authority = 'import;insert;download;scan;delImg;approve';
          }
          // 特殊情况（小微 在对公授信 客户经理可以上传影像）
          if(loginUser.dutys != null){
            for (let i = 0; i < loginUser.dutys.length; i++) {
              if (loginUser.dutys[i].code == 'XWB01') {
                this.authority = 'import;insert;download;scan;delImg;approve';
              }
            }
          }
        }
      }else {
        obj = _this.getFactory().contextData;
        if (this.getFactory().contextData.op == 'VIEW') {
          this.authority = 'download;';
        }else{
          // 特殊情况（村镇 客户经理可以上传影像）  
          if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
            this.authority = 'import;insert;download;scan;delImg;approve';
          }
          // 特殊情况（小微 在对公授信 客户经理可以上传影像）
          if(loginUser.dutys != null){
            for (let i = 0; i < loginUser.dutys.length; i++) {
              if (loginUser.dutys[i].code == 'XWB01') {
                this.authority = 'import;insert;download;scan;delImg;approve';
              }
            }
          }
        }
      } 
      debugger
      this.imageBizParam[0].index.contid = obj.contNo;
      this.imageBizParam[0].index.custid = obj.cusId;
      this.imageBizParam[0].index.custname = obj.cusName;
      this.imageBizParam[0].index.orgid = loginUser.org.id;
      // 影像目录
      if (obj.topOutsystemCode) {
      this.imageBizParam[0].top_outsystem_code = obj.topOutsystemCode;
      }
      if (obj.outsystemCode) {
        this.imageBizParam[0].outsystem_code = obj.outsystemCode;
      }
      // 影像参数
      if (obj.imageParams) {
        this.imageBizParam[0].index.docid = obj.imageParams.docid;
        this.imageBizParam[0].index.contid = obj.imageParams.contid;
        this.imageBizParam[0].index.businessid = obj.imageParams.businessid;
      }
    },
    showAction () {},
    nodeAuthority: function (str) {
      debugger
      let authorityObj = Array.from(str);
      let authority = '';
      for(let j = 0, len = authorityObj.length;j < len;j++){
        let key = authorityObj[j];
        authority += this.nodeSignMap[key];
      }
      return authority
    }
  }
};
</script>
