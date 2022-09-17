<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType=='details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pk"></yu-xform-item>
          <yu-xform-item label="批量申请流水号" ctype="input" placeholder="批量申请流水号" name="batchSerno"></yu-xform-item>
          <yu-xform-item label="押品编号" ctype="input" placeholder="押品编号" name="guarNo"></yu-xform-item>
          <yu-xform-item label="押品所有人编号" ctype="input" placeholder="押品所有人编号" name="guarCusId"></yu-xform-item>
          <yu-xform-item label="押品所有人名称" ctype="input" placeholder="押品所有人名称" name="guarCusName"></yu-xform-item>
          <yu-xform-item label="我行确认价值" ctype="input" placeholder="我行确认价值" name="evalValue"></yu-xform-item>
          <yu-xform-item label="确认价值币种" ctype="select" name="evalCurType" data-code="STD_ZB_CUR_TYP" placeholder="确认价值币种"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinUtils from '@/utils/mixins/mixin-utils'
export default{
  name: "d1_BillCard",
  mixins:[mixinUtils],
  data: function () {
    return {
      updateUrl: this.$backend.cmisEval + "/api/guarevalbatchrevalrel/update",
      addUrl: this.$backend.cmisEval + "/api/guarevalbatchrevalrel/",
      getUrl: this.$backend.cmisEval + "/api/guarevalbatchrevalrel/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
  }
}
</script>