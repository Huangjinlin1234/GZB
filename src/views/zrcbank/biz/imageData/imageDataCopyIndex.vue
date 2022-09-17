<template>
    <div>
      <imageSystem :authority="authority" :s="imageType" :para="imageBizParam"  :isWindow="1"></imageSystem>
    </div>
</template>
<script>
import imageSystem from '@/views/imageManage/imageSystem';
export default {
  components: {
    imageSystem
  },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      imageType: '1',
      authority: 'download',
      imageBizParam: [
        {
          // TODO 根据实际业务场景修正
          top_outsystem_code: '',
          outsystem_code: '',
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
    let _this = this;
    let obj;
    debugger
    const loginUser = _this.$xutils.getLoginUserInfo();
    let orgCode = loginUser.orgCode;
    if (this.getFactory().contextData.instanceInfo) {
      obj = this.getFactory().contextData.instanceInfo.param;
      let instanceObj = this.getFactory().contextData.instanceInfo;
      if (instanceObj.nodeName !== null && instanceObj.nodeName.match(/资料扫描岗/)) {
        this.authority = 'import;insert;download;scan;delImg;approve';
      }
      if (instanceObj.nodeSign && instanceObj.nodeSign != ""){
        let imageJson = JSON.parse(instanceObj.nodeSign);
        this.authority = this.nodeAuthority(imageJson.image);
      }
    } else if (this.getFactory().contextData.topOutsystemCodeCopy) {
      obj = this.getFactory().contextData;
      // 影像权限控制
      if (obj.op == 'VIEW') {
        // this.imageType = obj.imageType;
        this.authority = 'download;approve';
      } else {
        // 特殊情况（村镇 客户经理可以上传影像）
        if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
          this.authority = 'import;insert;download;scan;delImg;approve';
        }
      }
    } else if (_this.$route.meta.params) {
      obj = _this.$route.meta.params;
      // 影像权限控制
      if (obj.op == 'VIEW') {
        // this.imageType = obj.imageType;
        this.authority = 'download;approve';
      } else {
        // 特殊情况（村镇 客户经理可以上传影像）
        if (orgCode.startsWith('80') || orgCode.startsWith('81')) {
          this.authority = 'import;insert;download;scan;delImg;approve';
        }
      }
    }

    if (obj.topOutsystemCodeCopy) {
      this.imageBizParam[0].top_outsystem_code = obj.topOutsystemCodeCopy;
    }
    if (obj.outsystemCodeCopy) {
      this.imageBizParam[0].outsystem_code = obj.outsystemCodeCopy;
    }
    //  修改影像的传参(标准用法)
    if (obj.imageCopyParams) {
      this.imageBizParam[0].index.docid = obj.imageCopyParams.docid;
      this.imageBizParam[0].index.contid = obj.imageCopyParams.contid;
      this.imageBizParam[0].index.businessid = obj.imageCopyParams.businessid;
    } else {
      if (obj.imageSernoCopy) {
        // 传参影像流水号
        this.imageBizParam[0].index.docid = obj.pvpSerno;
        this.imageBizParam[0].index.contid = obj.imageSernoCopy;
        this.imageBizParam[0].index.businessid = obj.pvpSerno;
      } else if (obj.pvpSerno) {
        // 出账申请流水号
        this.imageBizParam[0].index.docid = obj.pvpSerno;
        this.imageBizParam[0].index.contid = obj.contNo;
        this.imageBizParam[0].index.businessid = obj.pvpSerno;
      } else if (obj.grpSerno) {
        // 集团授信申请流水号
        this.imageBizParam[0].index.docid = obj.grpSerno;
        this.imageBizParam[0].index.contid = obj.contNo;
        this.imageBizParam[0].index.businessid = obj.grpSerno;
      } else if (obj.biz_serno) {
        // 集团授信申请流水号
        this.imageBizParam[0].index.docid = obj.biz_serno;
        this.imageBizParam[0].index.contid = obj.contNo;
        this.imageBizParam[0].index.businessid = obj.biz_serno;
      } else if (obj.iqpSerno) {
        // 合同申请流水号
        this.imageBizParam[0].index.docid = obj.iqpSerno;
        this.imageBizParam[0].index.contid = obj.contNo;
        this.imageBizParam[0].index.businessid = obj.iqpSerno;
      } else if (obj.serno) {
        // 合同申请流水号
        this.imageBizParam[0].index.docid = obj.serno;
        this.imageBizParam[0].index.contid = obj.contNo;
        this.imageBizParam[0].index.businessid = obj.serno;
      } else if (obj.bizId) {
        // 出账申请流水号
        this.imageBizParam[0].index.docid = obj.bizId;
        this.imageBizParam[0].index.contid = obj.contNo;
        this.imageBizParam[0].index.businessid = obj.bizId;
      }
    }
  },
  mounted () {
    // this.AfterInit()

  },
  methods: {
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