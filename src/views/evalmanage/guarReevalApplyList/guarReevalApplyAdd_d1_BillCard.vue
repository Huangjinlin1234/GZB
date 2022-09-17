<!--
 * @Author: liut
 * @Date: 2021-07-12 09:20:59
 * @LastEditTime: 2021-07-23 16:58:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yufp2_tran\src\views\evalmanage\guarReevalApplyList\guarReevalApplyAdd_d1_BillCard.vue
-->
<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" disabled></yu-xform-item>
          <yu-xform-item label="统一押品编号" ctype="yu-xcltrl-base2" name="guarNo" rules="required" placeholder="统一押品编号" @select-fn="commonSelectFn" :mapping="{ guarNo: 'guarNo', guarTypeCdCnname: 'guarTypeCdCnname', guarCusId: 'guarCusId', guarCusName: 'guarCusName', guarTypeCd: 'guarTypeCd' }" width="80%" height="550"></yu-xform-item>
          <yu-xform-item label="押品分类名称" ctype="input" placeholder="押品分类名称" name="guarTypeCdCnname" disabled></yu-xform-item>
          <yu-xform-item label="担保分类代码" ctype="input" placeholder="担保分类代码" name="guarTypeCd" disabled></yu-xform-item>
          <yu-xform-item label="评估方式" ctype="select" name="evalWay" rules="required" data-code="STD_ZB_EVAL_INOUT_TYPE" placeholder="评估方式"></yu-xform-item>
          <yu-xform-item label="数据来源" disabled ctype="select" name="dataSour" rules="required" data-code="STD_ZB_EVE_DATASOUR"></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="经办人名称" ctype="input" placeholder="经办人名称" name="inureIdName" disabled></yu-xform-item>
            <yu-xform-item label="经办人编码" ctype="input" placeholder="经办人编码" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="经办日期" ctype="input" name="inputDate" disabled placeholder="经办日期"></yu-xform-item>
            <!-- <yu-xform-item label="经办日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="经办日期"></yu-xform-item> -->
            <yu-xform-item label="所有人名称" ctype="input" placeholder="所有人名称" name="guarCusName" disabled hidden></yu-xform-item>
            <yu-xform-item label="所有人编号" ctype="input" placeholder="所有人编号" name="guarCusId" disabled hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" name="wfApprStatus" disabled hidden data-code="STD_ZB_APP_ST" placeholder="审批状态"></yu-xform-item>
            <yu-xform-item label="重估类型" ctype="input" placeholder="重估类型" name="reevalType" disabled hidden></yu-xform-item>
            <yu-xform-item label="发起岗确认价值" ctype="input" placeholder="发起岗确认价值" name="evalValue" disabled hidden></yu-xform-item>
            <yu-xform-item label="价值确认日期" ctype="input" placeholder="价值确认日期" name="evalDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="认定岗确认价值" ctype="input" placeholder="认定岗确认价值" name="finalEvalValue" disabled hidden></yu-xform-item>
            <yu-xform-item label="确认价值币种" ctype="input" placeholder="确认价值币种" name="evalCurType" disabled hidden></yu-xform-item>
            <yu-xform-item label="折算人民币价值" ctype="input" placeholder="折算人民币价值" name="evalValueCny" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否延期" ctype="input" placeholder="是否延期" name="isStartReeval" disabled hidden></yu-xform-item>
            <yu-xform-item label="延期重估原因" ctype="input" placeholder="延期重估原因" name="delayReevalResn" disabled hidden></yu-xform-item>
            <yu-xform-item label="延期到期日" ctype="input" placeholder="延期到期日" name="delayReevalDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否特殊流程审批" ctype="input" placeholder="是否特殊流程审批" name="isSpecial" disabled hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="approveStatus" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否超阈值" ctype="input" placeholder="是否超阈值" name="beyond" disabled hidden></yu-xform-item>
            <yu-xform-item label="价值重估岗认定价值" ctype="input" placeholder="价值重估岗认定价值" name="assertValue" disabled hidden></yu-xform-item>
            <yu-xform-item label="浮动比例/差额比率" ctype="input" placeholder="浮动比例/差额比率" name="rate" disabled hidden></yu-xform-item>
            <yu-xform-item label="押品重复抵押类型" ctype="input" placeholder="押品重复抵押类型" name="agaginType" disabled hidden></yu-xform-item>
            <yu-xform-item label="评估方法" ctype="input" placeholder="评估方法" name="evalMethod" disabled hidden></yu-xform-item>
            <yu-xform-item label="评估类型" ctype="input" placeholder="评估类型" name="evalType" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" disabled hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="nextStep" v-norepeat.loading="{timeout:200}">下一步</yu-button>
      <yu-button type="primary" @click="bycancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_BillCard",
  mixins: [mixinUtils],
  inject: ["nextStep", "bycancel"],
  data: function() {
    return {
      updateUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/update",
      addUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      let userInfo = this.$store.state.oauth;
      this.formdata.inureIdName = userInfo.userName;
      this.formdata.inputId = userInfo.loginCode;
      this.formdata.inputBrName = userInfo.org.name;
      this.formdata.inputBrId = userInfo.org.code;
      this.formdata.inputDate = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
      this.formdata.oprType = "01";
      //人工新增
      this.formdata.dataSour = "02";
      this.formdata.updId = userInfo.loginCode;
      this.formdata.updBrId = userInfo.org.code;
      this.formdata.updDate = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
    }
  }
};
</script>
