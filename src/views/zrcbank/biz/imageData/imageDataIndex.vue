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
  components: {
    imageSystem
  },
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      authority: 'download',
      imageType: '1',
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
    this.getFactory().setButtonVisiable('commit', false);
    this.getFactory().setButtonVisiable('save', false);
    this.getFactory().setButtonVisiable('tempSave', false);
    this.getFactory().setButtonVisiable('back', false);
    const loginUser = _this.$xutils.getLoginUserInfo();
    let orgCode = loginUser.orgCode;
    debugger;
    if (this.getFactory().contextData.instanceInfo) {
      obj = this.getFactory().contextData.instanceInfo.param;
      let instanceObj = this.getFactory().contextData.instanceInfo;
      if (instanceObj.nodeSign && instanceObj.nodeSign != ""){
        let imageJson = JSON.parse(instanceObj.nodeSign);
        this.authority = this.nodeAuthority(imageJson.image);
      }
    } else if (this.getFactory().contextData.topOutsystemCode) {
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
        if (obj.imageParams && obj.imageParams.authority){
          this.authority = obj.imageParams.authority;
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
        if (obj.imageParams && obj.imageParams.authority){
          this.authority = obj.imageParams.authority;
        }
      }
    }
    if (obj.topOutsystemCode) {
      this.imageBizParam[0].top_outsystem_code = obj.topOutsystemCode;
    }
    if (obj.outsystemCode) {
      this.imageBizParam[0].outsystem_code = obj.outsystemCode;
    }

    this.imageBizParam[0].index.contid = obj.contNo;
    this.imageBizParam[0].index.custid = obj.cusId;
    this.imageBizParam[0].index.custname = obj.cusName;
    this.imageBizParam[0].index.orgid = loginUser.org.id;
    //  修改影像的传参(标准用法)

    if (obj.imageParams) {
      this.imageBizParam[0].index.docid = obj.imageParams.docid;
      this.imageBizParam[0].index.contid = obj.imageParams.contid;
      this.imageBizParam[0].index.businessid = obj.imageParams.businessid;
    } else {
      if (obj.imageSerno) {
        // 传参影像流水号
        this.imageBizParam[0].index.docid = obj.pvpSerno;
        this.imageBizParam[0].index.contid = obj.imageSerno;
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
        this.imageBizParam[0].index.businessid = obj.pvpSerno;
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
