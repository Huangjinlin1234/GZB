<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :show-message="!ctl.viewOnly" :hide-required-asterisk="ctl.viewOnly">
        <yu-xform-group :column="3">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" disabled hidden></yu-xform-item>
          <yu-xform-item label="押品编号" ctype="input" placeholder="押品编号" name="guarNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="evalCurType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="确认价值币种"></yu-xform-item>
          <yu-xform-item label="确认价值" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" @blur="evalValueChange" placeholder="确认价值" name="evalValue" rules="required" :precision="2" :min="0"></yu-xform-item>
          <yu-xform-item label="我行认定价值" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" placeholder="我行认定价值" name="evalValueCny" rules="required" :precision="2" :min="0"></yu-xform-item>
          <yu-xform-item label="评估方式" ctype="select" name="evalWay" disabled hidden data-code="STD_ZB_EVAL_INOUT_TYPE" placeholder="评估方式"></yu-xform-item>
          <yu-xform-item label="经办人名称" ctype="input" placeholder="经办人名称" name="inureIdName" disabled hidden></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled hidden placeholder="经办日期"></yu-xform-item>
          <yu-xform-item label="所有人名称" ctype="input" placeholder="所有人名称" name="guarCusName" disabled hidden></yu-xform-item>
          <yu-xform-item label="所有人编号" ctype="input" placeholder="所有人编号" name="guarCusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrName" disabled hidden></yu-xform-item>
          <yu-xform-item label="经办人编码" ctype="input" placeholder="经办人编码" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="审批状态" ctype="select" name="wfApprStatus" disabled hidden data-code="STD_ZB_APP_ST" placeholder="审批状态"></yu-xform-item>
          <yu-xform-item label="重估类型" ctype="input" placeholder="重估类型" name="reevalType" disabled hidden></yu-xform-item>
          <yu-xform-item label="价值确认日期" ctype="input" placeholder="价值确认日期" name="evalDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="认定岗确认价值" ctype="input" placeholder="认定岗确认价值" name="finalEvalValue" disabled hidden></yu-xform-item>
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
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  name: "d1_BillCard",
  mixins: [mixinUtils],
  data: function() {
    return {
      ctl: {
        viewOnly: false
      },
      updateUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/update",
      updateUrl2: this.$backend.cmisEval + "/api/guarevalreevalapply/update2",
      addUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/",
      getUrl: this.$backend.cmisEval + "/api/guarevalreevalapply/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  watch: {
    "formdata.evalCurType": function(newVal, oldVal) {
      if (newVal == oldVal || newVal == "" || newVal == null) {
        return;
      }
      this.curTypeChangeFn(newVal);
    }
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
      this.formdata.evalCurType = "CNY";
      this.formdata.inputDate = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
      this.formdata.inputBrName = this.$xutils.getLoginUserInfo().org.name;
      this.formdata.wfApprStatus = "000";
      this.formdata.approveStatus = "000";
    },
    evalValueChange() {
      if (this.formdata.evalValue == null || this.formdata.evalValue == "") {
        return;
      }
      this.curTypeChangeFn(this.formdata.evalCurType);
    },
    //币种变化时触发方法
    curTypeChangeFn(newVal) {
      if (this.getFactory().contextData.op == "VIEW") {
        return;
      }
      let rtnData = this.getRatioByCurType(newVal);
      rtnData = rtnData.data || {};
      let curTypeRatio = 1; //默认为人民币，汇率默认为1
      if (rtnData.rtnCode != "000000") {
        this.$message({
          message: rtnData.rtnMsg,
          type: "error"
        });
        //查询汇率失败的场景，设置币种以及汇率为默认的人民币
        this.setAppRateAmtByAppAmtAppRate(curTypeRatio);
      } else {
        curTypeRatio = rtnData.midRemit;
        //申请币种变化时，触发申请金额变化时的方法
        this.setAppRateAmtByAppAmtAppRate(curTypeRatio);
      }
    },

    //币种变化触发后端查询接口,查询汇率
    getRatioByCurType(newVal) {
      const cfgExchgRateDto = {
        origiCurType: newVal,
        compCurType: "CNY"
      };
      let returnData = {};
      this.$request({
        async: false,
        method: "post",
        url: this.$backend.cmisCfg + "/api/cfgexchgrate/queryRatioByCurType",
        data: JSON.stringify(this.$xutils.toUpperCase(cfgExchgRateDto, true)),
        success: (response, status, xhr) => {
          returnData = response;
        }
      });
      return returnData;
    },

    //申请金额/汇率变更时设置申请折算金额
    setAppRateAmtByAppAmtAppRate(curTypeRatio) {
      const evalValue = this.formdata.evalValue;
      if (evalValue != "" && evalValue != "") {
        this.formdata.evalValueCny = curTypeRatio * evalValue;
      }
      //seRiskOpenAmtByChange();
    }
  }
};
</script>
