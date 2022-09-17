<template>
  <!--
    @created by
    @updated by zhoumw
    @description 客户属性
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent"
        :utrace="utrace"
        u-pk-value="cusindiv_form"
        trace-server-name="/yusp-app-oca"
        ukey-field="cusId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save">
        <yu-panel title="客户属性" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="是否强村富民贷款" ctype="select" data-code="STD_ZB_YES_NO" placeholder="是否强村富民贷款" name="isLoan" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="是否小企业客户" ctype="select" utrace :rules="required" data-code="STD_ZB_YES_NO" placeholder="是否小企业客户" name="isSmconCus" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"  disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName"  disabled ></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"  disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName"  disabled ></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate"  disabled ></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId"  disabled hidden></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerIdName"  disabled ></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrId"  disabled hidden></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="managerBrIdName"  disabled ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { sessionStore } from 'xy-utils';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      utrace: true,
      formdatautrace: {},
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'cusIndivAttrInfoIndex',
      updateUrl: this.$backend.cmisCus + '/api/cusindivattr/update',
      addUrl: this.$backend.cmisCus + '/api/cusindivattr/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      disabled: false,
      File: {}
    };
  },
  methods: {
  }
};
</script>