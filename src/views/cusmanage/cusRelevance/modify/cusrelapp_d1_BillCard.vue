<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="关联编号" ctype="input" placeholder="关联编号" name="correNo" hidden></yu-xform-item>
          <yu-xform-item label="关联成员客户编号" ctype="yu-xcustom-ref" name="correMemCusNo" placeholder="关联成员客户编号" @select-fn="commonSelectFn" :mapping="{'certType':'correMemCertType','cusId':'correMemCusNo','cusName':'correMemCusName','certCode':'correMemCertNo'}" width="800" height="500" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="自定义参照Title"></yu-xform-item>
          <yu-xform-item label="关联成员客户名称" ctype="input" placeholder="关联成员客户名称" name="correMemCusName" disabled></yu-xform-item>
          <yu-xform-item label="关联成员证件类型" ctype="select" name="correMemCertType" disabled data-code="STD_ZB_CERT_TYP" placeholder="关联成员证件类型"></yu-xform-item>
          <yu-xform-item label="关联成员证件号码" ctype="input" placeholder="关联成员证件号码" name="correMemCertNo" disabled></yu-xform-item>
          <yu-xform-item label="关联关系类型" ctype="select" name="correRelaType" data-code="STD_CORRE_RELA_TYPE" placeholder="关联关系类型"></yu-xform-item>
          <yu-xform-item label="数据来源" ctype="select" name="dataSour" data-code="STD_ZB_DATA_SOUR" placeholder="数据来源"></yu-xform-item>
          <yu-xform-item label="关联关系说明" ctype="textarea" name="correRelaExpl" placeholder="关联关系说明"></yu-xform-item>
          <yu-xform-item label="变更类型" ctype="input" placeholder="变更类型" name="modifyType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="udpId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="udpBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="udpDate" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('baocun')">保存</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusrelcusmemapp/update',
      addUrl: this.$backend.cmisCus + '/api/cusrelcusmemapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginUserName');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
    }
  }
};
</script>
