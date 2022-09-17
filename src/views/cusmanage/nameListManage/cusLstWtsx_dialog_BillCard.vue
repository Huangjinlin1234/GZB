<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent"
      :utrace="utrace"
        u-pk-value="cuslstwtsx_form"
        :trace-server-name="this.$backend.appOcaService"
        ukey-field="serno"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="select" name="cusType"  data-code="STD_ZB_CUS_TYP" disabled placeholder="客户类型" ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'managerBrIdName':'belgOrgName','cusId':'cusId','cusName':'cusName','cusType':'cusType','managerIdName':'managerIdName','managerId':'managerId','managerBrId':'belgOrg'}" width="1200" height="600" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="导入模式" ctype="select" utrace name="importMode" data-code="STD_LST_WTSX_IMPORT_MODE" placeholder="导入模式" disabled></yu-xform-item>
          <yu-xform-item label="导入原因" ctype="select" utrace name="importResn" rules="required" data-code="STD_LST_WTSX_IMPORT_REASON" placeholder="导入原因" ></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrgName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" name="status" hidden data-code="STD_ZB_STATUS" placeholder="状态" ></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="退出审批状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="退出审批状态"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">提交</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { mapState } from 'vuex';
import { dateFormat } from '@/utils';
import { sessionStore } from 'xy-utils';
yufp.lookup.reg('STD_ZB_CUS_CATALOG,STD_ZB_CUS_TYP,STD_ZB_STATUS,STD_LST_WTSX_IMPORT_MODE,STD_LST_WTSX_IMPORT_REASON,STD_ZB_APPR_STATUS');
export default {
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      utrace: true,
      formdatautrace: {},
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'cuslstwtsx',
      updateUrl: this.$backend.cmisCus + '/api/cuslstwtsx/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstwtsx/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  // vuex中存储数据获取：
  computed: {
    ...mapState({
      userInfo: state => state.oauth.userName,
      userCode: state => state.oauth.userCode,
      org: state => state.oauth.org
    })
  },

  methods: {
    execBillCardDefaultValueFormula () {
      this.$nextTick(() => {
        this.formdata.status = '1';
        this.formdata.serno = this.$xutils.getSEQFromServer('MD_SERNO');
        this.formdata.inputId = this.userCode;// 登记人编号
        this.formdata.inputBrId = this.org.code;// 登记机构编号
        this.formdata.inputIdName = this.$xutils.getDefaultformulaData('$LoginUserName');// 登记人名称
        this.formdata.inputBrIdName = this.$xutils.getDefaultformulaData('$LoginOrgName');// 登记机构名称
        this.formdata.importMode = '01';// 人工维护
        this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
      });
    },
    afterSaveSuccess () {
      this.$refs.refForm.saveUTrace(this.formdatautrace);
      this.$utils.clone(this.formdata, this.formdatautrace);
    }
  }
};
</script>