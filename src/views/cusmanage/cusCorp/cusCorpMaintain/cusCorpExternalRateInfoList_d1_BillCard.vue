<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" :disabled="viewType=='VIEW'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="信用等级（外部）" ctype="select" data-code="STD_ZB_EVAL_RST" placeholder="信用等级（外部）" name="creditLevelOuter"></yu-xform-item>
            <yu-xform-item label="评定日期（外部）" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="评定日期（外部）" name="evalDate"></yu-xform-item>
            <yu-xform-item label="评定机构（外部）" ctype="input" placeholder="评定机构（外部）" name="evalOrgId"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    cusCorp: Object,
    dialogId: String,
    viewType: String
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.AfterInit();
    }
  },
  mounted () {
    this.AfterInit();
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuscorp/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    AfterInit () {
      var _this = this;
      if (_this.cusCorp) {
        _this.formdata.creditLevelOuter = _this.cusCorp.creditLevelOuter;
        _this.formdata.evalDate = _this.cusCorp.evalDate;
        _this.formdata.evalOrgId = _this.cusCorp.evalOrgId;
      }
    }
  }
};
</script>
