<template>
  <div id="d1_1_BillCard">
    <div id="d1_1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent"
      :utrace="utrace"
        u-pk-value="cuslstwtsx_form"
        trace-server-name="/yusp-app-oca"
        ukey-field="serno"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="select" placeholder="客户类型" name="cusType"  data-code="STD_ZB_CUS_TYP" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="导入模式" ctype="select" utrace name="importMode" disabled data-code="STD_LST_WTSX_IMPORT_MODE" placeholder="导入模式" :colspan="12"></yu-xform-item>
          <yu-xform-item label="导入原因" ctype="select" utrace name="importResn" disabled data-code="STD_LST_WTSX_IMPORT_REASON" placeholder="导入原因" :colspan="12"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" disabled :colspan="12" hidden></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" disabled :colspan="12" hidden></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrgName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled :colspan="12" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled :colspan="12" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled :colspan="12"></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" name="status" disabled hidden data-code="STD_ZB_STATUS" placeholder="状态" :colspan="12"></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden :colspan="12"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { sessionStore } from 'xy-utils';
yufp.lookup.reg('STD_ZB_CUS_CATALOG,STD_ZB_CUS_TYP,STD_ZB_STATUS,STD_LST_WTSX_IMPORT_MODE,STD_LST_WTSX_IMPORT_REASON,STD_ZB_APPR_STATUS');
export default{
  name: 'D11BillCard',
  mixins: [mixinForm],
  data: function () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      utrace: false,
      formdatautrace: {},
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'cuslstwtsxdetail',
      updateUrl: this.$backend.cmisCus + '/api/cuslstwtsx/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstwtsx/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.belgOrg = this.$xutils.getDefaultformulaData('$LoginOrgName');//所属机构编号
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginUserName');//登记人编号
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgName');//登记机构编号
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');//登记日期
      this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');//登记人名称
      this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');//登记机构名称

    }
  }
};
</script>