<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" disabled></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" disabled></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="压降计划概览" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="本年度计划总压降金额（万元）" ctype="input" placeholder="本年度计划总压降金额（万元）" name="planAmt" disabled></yu-xform-item>
            <yu-xform-item label="压降年度" ctype="input" placeholder="压降年度" name="pressureDropYearly" disabled></yu-xform-item>
            <yu-xform-item label="风险缓释措施" ctype="input" placeholder="风险缓释措施" name="riskRelieveStep" disabled :colspan="24"></yu-xform-item>
            <yu-xform-item label="其他说明" ctype="input" placeholder="其他说明" name="otherMemo" disabled :colspan="24"></yu-xform-item>
            <yu-xform-item label="名单流水号" ctype="input" placeholder="名单流水号" name="listSerno" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default {
  name: 'd1_A_BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstdedkkh/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstdedkkh/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
    }
  },
  methods: {},
}
</script>