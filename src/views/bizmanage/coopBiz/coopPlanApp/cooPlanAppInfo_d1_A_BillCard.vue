<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="200px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="操作类型" ctype="select" name="oprType" rules="required" data-code="STD_COOP_PLAN_OPR_TYPE" placeholder="操作类型" disabled></yu-xform-item>
          </yu-xform-group>
         <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled ></yu-xform-item>
            <yu-xform-item label="合作方类型" ctype="select" name="partnerType" disabled data-code="STD_PARTNER_TYPE" placeholder="合作方类型" ></yu-xform-item>
            <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo" disabled ></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" disabled ></yu-xform-item>
            <yu-xform-item label="合作类型" ctype="select" name="coopType" rules="required" data-code="STD_COOP_TYPE" placeholder="合作类型" ></yu-xform-item>
            <yu-xform-item label="是否全行适用" ctype="select" name="isWholeBankSuit" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否全行适用" @change="clearOrgFn"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1ABillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopplanapp/update',
      addUrl: this.$backend.cmisBiz + '/api/coopplanapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      firstFlag: true //是否刚进入页面，防止clearOrgFn误删
    };
  },
  methods: {
    clearOrgFn(value) {
      if(this.firstFlag){
        this.firstFlag = false;
        return;
      }
      this.$parent.deleteAllOrg4Change(value);
    }
  }
};
</script>
