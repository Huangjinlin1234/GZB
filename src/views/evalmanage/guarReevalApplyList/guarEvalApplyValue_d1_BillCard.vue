<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :show-message="!ctl.viewOnly" :hide-required-asterisk="ctl.viewOnly">
        <yu-xform-group :column="3">
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="evalAppSerno" disabled hidden></yu-xform-item>
          <yu-xform-item label="押品编号" ctype="input" placeholder="押品编号" name="guarNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="评估方式" ctype="select" name="evalWay" disabled hidden data-code="STD_ZB_EVAL_INOUT_TYPE" placeholder="评估方式"></yu-xform-item>
          <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputIdName" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="经办日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled hidden placeholder="经办日期"></yu-xform-item>
          <yu-xform-item label="所有人名称" ctype="input" placeholder="所有人名称" name="guarCusName" disabled hidden></yu-xform-item>
          <yu-xform-item label="所有人编号" ctype="input" placeholder="所有人编号" name="guarCusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrName" disabled hidden></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="identyValueCurType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="认定价值" @blur="identyValueChange" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" :min="0" placeholder="认定价值" name="identyValue" rules="required" :precision="2"></yu-xform-item>
          <yu-xform-item label="折算人民币价值" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" :min="0" placeholder="折算人民币价值" name="identyValueCny" rules="required" :precision="2"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" name="approveStatus" disabled hidden data-code="STD_ZB_APP_ST" placeholder="申请状态"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
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
import { validator } from "@/utils/validate";
export default {
  name: "d1_BillCard",
  mixins: [mixinUtils],
  data: function() {
    return {
      ctl: {
        viewOnly: false
      },
      updateUrl: this.$backend.cmisEval + "/api/guarevalapp/update",
      updateUrl2: this.$backend.cmisEval + "/api/guarevalapp/update2",
      addUrl: this.$backend.cmisEval + "/api/guarevalapp/",
      getUrl: this.$backend.cmisEval + "/api/guarevalapp/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  watch: {
    "formdata.identyValueCurType": function(newVal, oldVal) {
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
      this.formdata.inputDate = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
      this.formdata.identyValueCurType = "CNY";
    },
    identyValueChange() {
      if (this.formdata.identyValue == null || this.formdata.identyValue == "") {
        return;
      }
      this.curTypeChangeFn(this.formdata.identyValueCurType);
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
        //查询汇率失败的场景，设置币种以及汇率为默认的人民币
        this.$message({
          message: rtnData.rtnMsg,
          type: "error"
        });
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
      const identyValue = this.formdata.identyValue;
      if (identyValue != "" && identyValue != "") {
        this.formdata.identyValueCny = curTypeRatio * identyValue;
      }
      //seRiskOpenAmtByChange();
    }
  }
};
</script>
