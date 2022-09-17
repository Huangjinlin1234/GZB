<!--
 * @Author: your name
 * @Date: 2021-07-12 09:20:59
 * @LastEditTime: 2021-07-22 21:14:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \yufp2_tran\src\views\evalmanage\guarReevalApplyList\guarEvalnEvalnfoUpdate_d1_BillCard.vue
-->
<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'view'" v-model="formdata" :rules="formRules" class="long-label">
        <yu-xform-group :column="3">
          <yu-xform-item label="内评流水号" ctype="input" placeholder="内评流水号" name="inEvalSerno" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="evalAppSerno" hidden></yu-xform-item>
          <yu-xform-item :label="labels.evalType" ctype="select" name="evalType" data-code="STD_ZB_EVAL_METHOD" placeholder="初估优先使用方法" colspan="8" disabled></yu-xform-item>
          <yu-xform-item :label="labels.evalMode" ctype="select" name="evalMode" :options="option1" rules="required" placeholder="初估使用的估值方法" :colspan="8"></yu-xform-item>
          <yu-button :colspan="4" size="small" @click="valuation" v-show="formType != 'view'">估值</yu-button>
          <yu-xform-item label="内部评估价值币种" ctype="select" name="evalInCurType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="内部评估价值币种" colspan="8"></yu-xform-item>
          <yu-xform-item label="内部评估价值时间" ctype="datepicker" name="evalInDate" value-format="yyyy-MM-dd" rules="required" placeholder="内部评估价值时间" colspan="8"></yu-xform-item>
          <yu-xform-item label="内部评估价值" ctype="yu-num" number-formatter="0,000.00" :maxlength="16" placeholder="内部评估价值" name="evalInValue" rules="required" colspan="8" disabled :min="0"></yu-xform-item>
          <yu-xform-item label="评估方法选择理由" v-show="formdata.evalType == formdata.evalMode" :rules="formdata.evalType == formdata.evalMode ? 'required' : ''" ctype="textarea" name="evalModeResn" placeholder="评估方法选择理由" :colspan="24" :rows="3" resize="none" maxlength="300"></yu-xform-item>
          <yu-xform-item :label="labels.unuseDefModeResn" v-show="formdata.evalType != formdata.evalMode" :rules="formdata.evalType != formdata.evalMode ? 'required' : ''" ctype="textarea" name="unuseDefModeResn" placeholder="未使用初估优先使用方法原因" :colspan="24" :rows="3" resize="none" maxlength="300"></yu-xform-item>
          <yu-xform-item label="操作类型 " ctype="input" placeholder="操作类型 " name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinUtils from "@/utils/mixins/mixin-utils";
import { validator } from "@/utils/validate";
yufp.lookup.reg("STD_ZB_EVAL_METHOD,STD_ZB_CUR_TYP");
export default {
  name: "d1_BillCard",
  mixins: [mixinUtils],
  inject: ["valuation"],
  data: function() {
    return {
      updateUrl: this.$backend.cmisEval + "/api/guarevalinevalinfo/update",
      addUrl: this.$backend.cmisEval + "/api/guarevalinevalinfo/create",
      getUrl: this.$backend.cmisEval + "/api/guarevalinevalinfo/",
      formdata: {},
      formType: "edit",
      formRules: {},
      option1: [],
      isRequired: false,
      labels: {
        evalType: "初估优先使用方法",
        evalMode: "初估使用的估值方法",
        unuseDefModeResn: "未使用初估优先使用方法原因"
      }
    };
  },
  watch: {
    "formdata.evalMode": function(newVal, oldVal) {
      if (newVal && newVal !== this.formdata.evalType) {
        this.isRequired = true;
      } else {
        this.isRequired = false;
      }
    }
  },
  mounted() {
    const _this = this;
    // 获取暂存数据
    let tempData = this.getStagFactoryData && this.getStagFactoryData();
    let contextData = this.getFactory().contextData;
    let guarNo = contextData.guarNo; //押品编号
    let evalWay = contextData.evalWay; //评估方式
    if (evalWay === "02") {
      // 根据押品编号查询对应担保分类初估使用的估值方法 初估优先使用方法
      this.$request({
        async: true,
        method: "get",
        url: this.$backend.cmisGuar + "/api/guarclassinfo/queryGuarType/" + guarNo
      }).then(response => {
        if (response.code === "0") {
          let evalMethod = response.data.evalMethod;
          let firstEvalMethod = response.data.firstEvalMethod;
          if (contextData.model_group_no === "CMG000135") {
            //重估模板
            evalMethod = response.data.reevalMethod;
            firstEvalMethod = response.data.firstReevalMethod;
            this.labels.evalType = "重估优先使用方法";
            this.labels.evalMode = "重估使用的估值方法";
            this.labels.unuseDefModeResn = "未使用重估优先使用方法原因";
          }
          evalMethod = evalMethod.replaceAll(";", ",");
          firstEvalMethod = firstEvalMethod.replaceAll(";", ",");
          this.formdata.evalType = firstEvalMethod;
          //this.formdata.evalMode = firstEvalMethod;
          this.option1 = this.filterSeleteDictOption("STD_ZB_EVAL_METHOD", evalMethod, "show");
        }
        // 暂存数据恢复
        if (tempData && tempData.formdata && Object.keys(tempData.formdata).length) {
          yufp.clone(tempData.formdata, _this.formdata);
        }
      });
    } else {
      this.option1 = this.filterSeleteDictOption("STD_ZB_EVAL_METHOD", "", "hidden");
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
      this.formdata.evalType = "01";
      this.formdata.evalInCurType = "CNY";
      this.formdata.evalInDate = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
    }
  }
};
</script>
