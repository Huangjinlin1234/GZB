<template>
  <div id="assignEditCard">
    <div id="assignEditCardContent">
      <yu-xform ref="refForm"  label-width="140px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="assignAppSerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonSelectFn" width="900" height="600" pagePath="cusmanage/biz_rights_assign/cusSelectIndex" title="客户信息"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" placeholder="证件类型" name="certType" rules="required" data-code="STD_ZB_CERT_TYP" disabled></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrgName" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="业务权分配理由" ctype="textarea" :autosize="{ minRows: 3}" name="bizRightsDivisResn" rules="required" placeholder="业务权分配理由" colspan="24"></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="applyDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="分配状态" ctype="select" name="divisState" disabled hidden data-code="STD_CUS_DIVIS_STATE" placeholder="分配状态"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="timepicker" name="updateTime" value-format="yyyy-MM-dd" disabled hidden placeholder="修改时间"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最后修改日期"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_CUS_DIVIS_STATE,STD_ZB_CERT_TYP');
export default {
  name: 'D1ABillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusbizassignapp/update',
      addUrl: this.$backend.cmisCus + '/api/cusbizassignapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: { },
      File: {}
    };
  },
  mounted () {
    this.execBillCardDefaultValueFormula();
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
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
    },
    /**
     * 参照公共的确认事件
     */
    commonSelectFn: function (data, mapping) {
      if(!this.validateRoleFn(data.managerId)){
        this.$xutils.showMsgBox('提示', '只能选择客户经理自己名下的客户进行业务权分配', 400, 300);
        return;
      }
      // 将表格的数据，赋值给表单字段
      this.formdata.certType = data.certType;
      this.formdata.belgOrg = data.managerBrId;
      this.formdata.cusId = data.cusId;
      this.formdata.managerIdName = data.managerIdName;
      this.formdata.cusName = data.cusName;
      this.formdata.certCode = data.certCode;
      this.formdata.managerId = data.managerId;
      this.formdata.belgOrgName = data.managerBrIdName;
    },
    validateRoleFn: function (managerId) {
      let flag = true;
      const _this = this;
      const loginCode = _this.$xutils.getLoginUserInfo().loginCode;
      if (loginCode !== managerId) {
          flag = false;
      }
      return flag;
    }
  }
};
</script>
