<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2" align="left">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="aarAppSerno" disabled rules="required" ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled hidden></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="input" placeholder="证件类型" name="certType" disabled hidden></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="ifcertCode" disabled hidden></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="input" placeholder="申请日期" name="appDate" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="yu-xuser2" name="managerId" rules="required" placeholder="管户客户经理"  @select-fn="commonSelectFn" :mapping="{'loginCode':'managerId','userName':'managerName'}" width="720" height="480"></yu-xform-item>
          <yu-xform-item label="管户机构" ctype="input" placeholder="管户机构" name="belgOrg" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="管户机构" ctype="input" placeholder="管户机构" name="belgOrgName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="业务权申领人机构" ctype="input" placeholder="业务权申领人机构" name="bizRightsAarBrIdOrg" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="业务权申领人机构" ctype="input" placeholder="业务权申领人机构" name="bizRightsAarBrIdOrgName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="业务权申领人" ctype="input" placeholder="业务权申领人" name="bizRightsAarBrId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="业务权申领人" ctype="input" placeholder="业务权申领人" name="bizRightsAarBrIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="管户机构与申领机构关系" ctype="select" rules="required" data-code="STD_ZB_ORG_TYP" placeholder="管户机构与申领机构关系" name="orgRela" ></yu-xform-item>
          <yu-xform-item label="业务权申领理由" ctype="textarea" rules="required" placeholder="业务权申领理由" name="bizRightsArrResn" :autosize="{ minRows: 3}" colspan="24"></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" disabled hidden placeholder="审批状态" name="approveStatus"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="用户名" ctype="input" placeholder="用户名" name="userName" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('ACCOUNT_MANAGER_BR_AAR_ORG_RELA');
export default {
  name: 'D1ABillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusbizaarapp/update',
      addUrl: this.$backend.cmisCus + '/api/cusbizaarapp/',
      formdata: {},
      formRules: { },
      imageUrls: {},
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
      // if(!this.validateRoleFn(data.roleCode)){
      //   this.$xutils.showMsgBox('提示', '综合客户经理及小企业客户经理不允许两两间申领业务权', 400, 300);
      //   return;
      // }
      // 将表格的数据，赋值给表单字段
      this.formdata.managerId = data.loginCode;
      this.formdata.userName = data.userName;
      this.formdata.cusId = data.cusId;
      this.formdata.belgOrg = data.orgId;
      this.formdata.belgOrgName = data.orgName;
    },
    validateRoleFn: function (roleCode) {
      let flag = true;
      const _this = this;
      let roles = _this.$xutils.getLoginUserInfo().roles;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].code == 'R0020' || roles[i].code == 'R0050') {
          if (roleCode.indexOf('R0020') !== -1 || roleCode.indexOf('R0050') !== -1) {
            flag = false;
          }
        }
      }
      return flag;
    }
  }
};
</script>
