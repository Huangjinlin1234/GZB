<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId"></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno"></yu-xform-item>
          <yu-xform-item label="关联编号" ctype="input" placeholder="关联编号" name="correNo"></yu-xform-item>
          <yu-xform-item label="关联成员客户编号" ctype="input" placeholder="关联成员客户编号" name="correMemCusNo"></yu-xform-item>
          <yu-xform-item label="关联成员客户名称" ctype="input" placeholder="关联成员客户名称" name="correMemCusName"></yu-xform-item>
          <yu-xform-item label="关联成员证件类型" ctype="select" placeholder="关联成员证件类型" name="correMemCertType" data-code="STD_ZB_CERT_TYP"></yu-xform-item>
          <yu-xform-item label="关联成员证件号码" ctype="input" placeholder="关联成员证件号码" name="correMemCertNo"></yu-xform-item>
          <yu-xform-item label="关联关系类型" ctype="select" placeholder="关联关系类型" name="correRelaType" data-code="STD_CORRE_RELA_TYPE"></yu-xform-item>
          <yu-xform-item label="关联关系说明" ctype="input" placeholder="关联关系说明" name="correRelaExpl"></yu-xform-item>
          <yu-xform-item label="数据来源" ctype="select" placeholder="数据来源" name="dataSour" data-code="STD_ZB_DATA_SOUR"></yu-xform-item>
          <yu-xform-item label="变更类型" ctype="select" placeholder="变更类型" name="modifyType" data-code="STD_CUS_MODIFY_TYPE"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="udpId"></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="udpBrId"></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="udpDate"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" placeholder="操作类型" name="oprType" data-code="STD_ZB_OPR_TYPE"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_CORRE_RELA_TYPE,STD_ZB_DATA_SOUR,STD_CUS_MODIFY_TYPE,STD_ZB_OPR_TYPE');
export default{
  name: 'DialogBillCard',
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
      this.formdata.serno = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
