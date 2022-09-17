<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="240px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="高管人员信息新增">
          <yu-xform-group :column="2">
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
            <yu-xform-item label="同业客户编号" ctype="input" placeholder="同业客户编号" name="inbankCusId" disabled hidden></yu-xform-item>
            <yu-xform-item label="高管类别" ctype="select" rules="required" disabled data-code="STD_ZB_INTBANK_MRG_CLS" placeholder="高管类别" name="mrgCls" hidden></yu-xform-item>
            <yu-xform-item label="实际控制人/控股方" ctype="select" rules="required" data-code="STD_TYPE_CONTROLLER" placeholder="实际控制人/控股方" name="typeController" hidden></yu-xform-item>
            <yu-xform-item label="实际控制人名称" ctype="input" placeholder="实际控制人名称" name="mrgName" rules="required"></yu-xform-item>
            <yu-xform-item label="实际控制人/控股方证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="实际控制人/控股方证件类型" name="mrgCertType" hidden></yu-xform-item>
            <yu-xform-item label="实际控制人/控股方证件号码" ctype="input" placeholder="实际控制人/控股方证件号码" name="mrgCertCode" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="实际控制人/控股方证件失效日期" ctype="datepicker" rules="required" placeholder="实际控制人/控股方证件失效日期" name="expDateManageCert" hidden></yu-xform-item>
            <yu-xform-item label="实际控制人性质" ctype="select" rules="required" placeholder="实际控制人性质" data-code="STD_ZB_HOLD_TYPE" name="holdType"></yu-xform-item>
            <yu-xform-item label="实际控制人持股比例" ctype="yu-num" placeholder="实际控制人持股比例" name="shdPerc" sign="%" :multiple="100" rules="required"></yu-xform-item>
            <yu-xform-item label="主联系人电话" ctype="input" placeholder="主联系人电话" name="linkmanPhone" hidden></yu-xform-item>
            <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="resiAddr" hidden></yu-xform-item>
            <yu-xform-item label="资料管理" ctype="input" placeholder="资料管理" name="dataManagement" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('STD_TYPE_CONTROLLER');
import mixinForm from '@/utils/mixins/mixin-form';
// import { validator } from '@/utils/validate';
export default{
  props: {
    operate: String
  },
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusintbankmgr/update',
      addUrl: this.$backend.cmisCus + '/api/cusintbankmgr/create',
      formdata: {},
      formType: 'edit',
      dicOptions: {mrgClsOptions: [{key: '1', value: '法定代表人'}, {key: '2', value: '控制人'}, {key: '3', value: '经办人'}, {key: '4', value: '受益人'}], typeControllerOptions: [{key: '1', value: '实际控制人'}, {key: '2', value: '控股方'}] },
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    // uuid后台可以自动生成
    // execBillCardDefaultValueFormula: function () {
    //   this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
    // }
  }
};
</script>
