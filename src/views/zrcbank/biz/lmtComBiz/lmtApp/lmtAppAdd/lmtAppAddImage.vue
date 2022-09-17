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
          top_outsystem_code: 'SXJBZL;JKRZL;DBZL;XMLZL;WTRZL;SXLLPF;XD_FZHYXCL;ZHSXPF',
          // 'outsystem_code': 'ZX_HXD0101',
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
      } else if (this.$route.meta.params) {
        obj = this.$route.meta.params;
        if (obj.op == 'VIEW' || obj.op == 'view') {
          this.authority = 'download;';
        }else{
          // 特殊情况（村镇 客户经理可以上传影像）  
          if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
            this.authority = 'import;insert;download;scan;delImg;approve';
          }
          // 影像权限
          if (obj.imageParams && obj.imageParams.authority){
            this.authority = obj.imageParams.authority;
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
        obj = this.getFactory().contextData;
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
      }else{
        if (obj.ogrigiLmtSerno) {
          // 传参影像流水号
          // this.imageBizParam[0].index.docid =  obj.ogrigiLmtSerno;
          // this.imageBizParam[0].index.contid =  obj.ogrigiLmtSerno;
          this.imageBizParam[0].index.businessid = obj.ogrigiLmtSerno;
        } else if (obj.serno) {
          // 出账申请流水号
          this.imageBizParam[0].index.businessid = obj.serno;
        }
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
