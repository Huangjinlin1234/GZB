<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :default-load="false">
        <yu-xform-group :column="1">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="调查编号" ctype="input" placeholder="调查编号" name="surveySerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="抵质押物编号" ctype="input" placeholder="抵质押物编号" name="pldimnNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="共有人客户编号" ctype="input" placeholder="共有人客户编号" name="commenOwnerCusId" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="1">
          <yu-xform-item label="共有人姓名" ctype="input" placeholder="共有人姓名" name="commenOwnerName" rules="required" colspan="21"></yu-xform-item>
          <yu-xform-item label="" ctype="yu-button" name="btn" label-width="1" @click="customClick('selectCusInfo')" colspan="3">查询</yu-xform-item>
          <yu-xform-item label="共有人证件号码" ctype="input" placeholder="共有人证件号码" name="commenOwnerCertCode" rules="required"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-xdialog :visible.sync="visiableCus" width="500px" title="个人客户快捷创建">
        <yu-xform v-model="dialogData" ref="dialogKH" label-width="120px" related-table-name="refTable" :rules="dialogFormRules" >
          <yu-xform-group :column="1">
            <yu-xform-item label="证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"   disabled></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="cusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div style="text-align:center;">
          <el-button type="primary" @click="customClick('creat')" size="small">创建</el-button>
        </div>
    </yu-xdialog>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtguarecommenownerinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtguarecommenownerinfo/',
      formdata: {},
      formType: 'edit',
      formRules: { commenOwnerCertCode: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}] },
      imageUrls: {},
      File: {},
      visiableCus: false
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
