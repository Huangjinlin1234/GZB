/**
 * @created by hanl 2021-06-15
 * @updated by
 * @description
 */
<template>
  <div>
    <yu-panel title="借据信息" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
      </yu-xform>
      <template slot="right">
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" request-type="POST" selection-type="radio"  :base-params="baseParams" :pageable="true" :data-url="dataUrl" :default-load="true" @current-change="initLoanData">
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="拖欠利息" prop="debitInt"></yu-xtable-column>
        <yu-xtable-column label="贷款起始日" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column label="贷款到期日" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="执行年利率" prop="execRateYear"></yu-xtable-column>
        <yu-xtable-column label="五级分类" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
        <yu-xtable-column label="上次分类结果" prop="lastClassRst" data-code="STD_FIVE_CLASS"></yu-xtable-column>
        <yu-xtable-column label="矩阵分类结果" prop="crossResult" data-code="STD_FIVE_CLASS"></yu-xtable-column>
        <yu-xtable-column label="分析状态" prop="analyStatus" data-code="STD_RISK_ANALY_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="贷款情况分析" v-if="!autoFlag" panel-type="simple">
      <yu-xform ref="riskLoanAnalyForm" v-model="loanData" label-width="120px">
          <yu-xform-group :column="1">
            <yu-xform-item label="授信发生后用途是否正常" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_USE_NEG" name="isNormalAftLmt" rules="required" @change="requiredFn"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="实际借款用途" name="factLoanUs" :rules="factLoanUs"></yu-xform-item>
            <yu-xform-item label="是否重组贷款" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_REC_LOAN" name="isRecLoan" rules="required"></yu-xform-item>
            <yu-xform-item label="是否展期" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_EXT_LOAN" name="isExt" rules="required"></yu-xform-item>
            <yu-xform-item label="是否借新还旧" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_REFINANCE" name="isRefinance" rules="required"></yu-xform-item>
            <yu-xform-item label="保全状态" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_PRESERVE_STATE" name="preserveState" rules="required" @change="requiredFn1"></yu-xform-item>
            <yu-xform-item :disabled="viewFlag||approveFlag||assistFlag" ctype="textarea" label="保全情况说明" name="preserveCaseDesc" :rules="preserveCaseDesc"></yu-xform-item>
            <yu-xform-item label="有无影响该笔授信偿还的不利因素" :disabled="viewFlag||approveFlag||assistFlag" ctype="radio" data-code="STD_RISK_REPAY_NEG" name="isNegFactor" rules="required"></yu-xform-item>
            <yu-xform-item label="借据号" name="billNo" hidden="true"></yu-xform-item>
          </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_RISK_USE_NEG,STD_ZB_GUAR_WAY,STD_FIVE_CLASS,STD_RISK_ANALY_STATUS,STD_RISK_REC_LOAN,STD_RISK_EXT_LOAN,STD_RISK_REFINANCE,STD_RISK_PRESERVE_STATE,STD_RISK_REPAY_NEG');
export default {
  name: 'D1BillList',
  mixins: [mixinList],
  data: function () {
    return {
      dataUrl: this.$backend.cmisPsp + '/api/riskdebitinfo/queryList',
      baseParams: {},
      factLoanUs:{},
      preserveCaseDesc:{},
      loanData: {}, // 贷款情况分析
      taskNo: '', // 任务编号
      assistFlag: false, // 是否协查人页面
      approveFlag: false, // 是否审批页面
      autoFlag: false
    };
  },
  created () {
    // 初始化参数
    const _this = this;
    _this.taskNo = this.$parent.$route.params.riskTask.taskNo;
    _this.baseParams = {'condition':{'taskNo': _this.taskNo}};
    _this.init();
  },
  methods: {
    requiredFn(value){
      if(value == '2' || value == '3') {
        this.factLoanUs = {required:true, message:'必填'}
      } else {
        this.factLoanUs = {}
      }
    },
    requiredFn1(value){
      if(value != '1') {
        this.preserveCaseDesc = {required:true, message:'必填'}
      } else {
        this.preserveCaseDesc = {}
      }
    },
    // 初始化数据
    init: function () {
      const _this = this;
      let data = _this.$route.params;
      _this.viewFlag = data.opType === 'view';
    },
    initLoanData (val) {
      console.log(val);
      if (val == undefined) {
        return;
      }
      this.loanData.isNormalAftLmt = val.isNormalAftLmt;
      this.loanData.factLoanUs = val.factLoanUs;
      this.loanData.isRecLoan = val.isRecLoan;
      this.loanData.isExt = val.isExt;
      this.loanData.isRefinance = val.isRefinance;
      this.loanData.preserveState = val.preserveState;
      this.loanData.preserveCaseDesc = val.preserveCaseDesc;
      this.loanData.isNegFactor = val.isNegFactor;
      this.loanData.pkId = val.pkId;
      let billNo = val.billNo;
      const _this = this;
      _this.loanData.billNo = billNo;
      let data = _this.$route.params;
      // 任务编号
      const taskNo = data.riskTask.taskNo;
      let params = {};
      params.taskNo = taskNo;
      params.billNo = billNo;
      // 通过任务编号和借据号获取贷款信息
      _this.$xutils.request({
        // 异步请求
        async: true,
        url: _this.$backend.cmisPsp + '/api/riskloananaly/querySingle',
        data: JSON.stringify(_this.$xutils.toUpperCase(params, true)),
        success: (response, status, xhr) => {
          if (response.code == '0') {
            // 解析返回值
            const data = response.data;
            if (data != null) {
              yufp.clone(data, _this.loanData);
              _this.updateFlag = true;
            }
          } else {
            _this.$xutils.showMsgBox('提示', '错误代码：' + response.code + ',错误信息：' + response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
