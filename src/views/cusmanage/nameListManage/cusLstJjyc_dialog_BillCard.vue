<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent"
        :utrace="utrace"
        u-pk-value="cusjjyc_form"
        :trace-server-name="this.$backend.appOcaService"
        ukey-field="serno"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="select" name="cusType" rules="required" disabled data-code="STD_ZB_CUS_TYP" placeholder="客户类型" ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'managerBrId':'belgOrg','cusId':'cusId','cusName':'cusName','cusType':'cusType','managerId':'managerId'}" width="1200" height="600" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="客户选取" :disabled="formType==='details'"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="依存客户编号" ctype="yu-xcustom-ref" placeholder="依存客户编号" name="depCusNo" @select-fn="commonSelectFn" :mapping="{'cusId':'depCusNo','cusName':'depCusName'}" width="1200" height="600" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="依存客户名称" ctype="input" placeholder="依存客户名称" name="depCusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="经济依存客户识别因素" ctype="radio" :utrace="true" name="ecoDepCusDistFactor" rules="required" data-code="STD_LST_JJYC_CUS_DIST_FACTOR" placeholder="经济依存客户识别因素" colspan="24"></yu-xform-item>
          <yu-xform-item label="情况说明" ctype="textarea" :utrace="true" name="caseMome" rules="required" placeholder="情况说明" colspan="24"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" name="status" disabled hidden data-code="STD_ZB_STATUS" placeholder="状态" ></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden ></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden ></yu-xform-item>
          <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled hidden ></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden ></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden ></yu-xform-item>
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
      menuId: tab.meta.id,
      updateUrl: this.$backend.cmisCus + '/api/cuslstjjyc/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstjjyc/',
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
      var _this = this;
      this.$nextTick(() => {
        _this.formdata.serno = _this.$xutils.getSEQFromServer('MD_SERNO');
        _this.formdata.status = '1';
        _this.formdata.inputId = _this.userCode;
        _this.formdata.inputBrId = _this.org.code;
        _this.formdata.inputDate = dateFormat(new Date(), '{y}-{m}-{d}');
      });
    },
    afterSaveSuccess () {
      this.$refs.refForm.saveUTrace(this.formdatautrace);
      this.$utils.clone(this.formdata, this.formdatautrace);
    }
  }
};
</script>
