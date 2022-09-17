<!--
 * @Author: liut
 * @Date: 2021-07-12 09:20:59
 * @LastEditTime: 2021-07-22 11:13:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yufp2_tran\src\views\evalmanage\guarReevalApplyList\guarEvalApplyUpdate_d1_BillCard.vue
-->
<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" :colspan="8" name="evalAppSerno" disabled></yu-xform-item>

          <yu-xform-item label="押品编号" ctype="input" placeholder="押品编号" :colspan="6" name="guarNo" disabled></yu-xform-item>
          <yu-button :colspan="2" size="small" @click="viewGuar">查看</yu-button>

          <yu-xform-item label="评估方式" ctype="select" name="evalWay" :colspan="8" disabled data-code="STD_ZB_EVAL_INOUT_TYPE" placeholder="评估方式"></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" :colspan="8" name="inputIdName" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" :colspan="8" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" :colspan="8" name="inputBrName" disabled></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="input" name="inputDate" :colspan="8" disabled placeholder="经办日期"></yu-xform-item>
          <!-- <yu-xform-item label="经办日期" ctype="datepicker" name="inputDate" :colspan="8" value-format="yyyy-MM-dd" disabled placeholder="经办日期"></yu-xform-item> -->
          <yu-xform-item label="所有人编号" ctype="input" placeholder="所有人编号" :colspan="8" name="guarCusId" disabled></yu-xform-item>
          <yu-xform-item label="所有人名称" ctype="input" placeholder="所有人名称" :colspan="8" name="guarCusName" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" :colspan="8" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="认定价值币种" ctype="input" placeholder="认定价值币种" :colspan="8" name="identyValueCurType" disabled hidden></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" name="approveStatus" :colspan="8" disabled hidden data-code="STD_ZB_APP_ST" placeholder="申请状态"></yu-xform-item>
          <yu-xform-item label="认定价值" ctype="input" placeholder="认定价值" :colspan="8" name="identyValue" disabled hidden></yu-xform-item>
          <yu-xform-item label="折算人民币价值" ctype="input" placeholder="折算人民币价值" :colspan="8" name="identyValueCny" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" :colspan="8" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" :colspan="8" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" :colspan="8" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" :colspan="8" name="updDate" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_BillCard",
  mixins: [mixinUtils],
  inject: ["viewGuar"],
  data: function() {
    return {
      updateUrl: this.$backend.cmisEval + "/api/guarevalapp/update",
      addUrl: this.$backend.cmisEval + "/api/guarevalapp/",
      getUrl: this.$backend.cmisEval + "/api/guarevalapp/query",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    /***
     * 模板工厂暂存数据
     */
    saveStagFactoryData() {
      return {
        formdata: yufp.clone(this.formdata, {})
      };
    },
    execBillCardDefaultValueFormula: function() {
      // this.formdata.inputDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      // this.formdata.inputDate = this.getFactory().contextData.inputDate === undefined ? this.getFactory().contextData.instanceInfo.startTime : this.getFactory().contextData.inputDate;
      this.formdata.oprType = "01";
    }
  }
};
</script>
