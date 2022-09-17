
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 额度审批-历史交易记录
  -->
  <div>
    <yu-panel panel-type="simple" title="历史交易记录">
      <yu-xform related-table-name="tradeRecordHisTable" ref="searchForm" v-model="searchFormdata" form-type="search" :custom-search-fn="searchFn" :custom-reset-fn="resetFn" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="起始日期" placeholder="起始日期" name="stmtStartDate" ctype="datepicker" :pickerOptions="startDatePickerOptions"></yu-xform-item>
          <yu-xform-item label="截止日期" placeholder="截止日期" name="stmtEndDate" ctype="datepicker" :pickerOptions="endDatePickerOptions"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button type="primary" @click="infoFn">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="tradeRecordHisTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl"  :base-params="searchData">
        <yu-xtable-column label="卡号 " prop="cardNo">
          <template slot-scope="scope">
            <a class="underline" @click="showFuncDetail(scope.row)">{{ scope.row.cardNo }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="账户类型" prop="cardType"></yu-xtable-column>
        <yu-xtable-column label="账单日期" prop="billDate"></yu-xtable-column>
        <yu-xtable-column label="上期账单余额" prop="upBillBal"></yu-xtable-column>
        <yu-xtable-column label="当期借记余额" prop="curDebitBal"></yu-xtable-column>
        <yu-xtable-column label="当期贷记余额" prop="curCrditBal"></yu-xtable-column>
        <yu-xtable-column label="全部应还款项" prop="allNeedPay"></yu-xtable-column>
        <yu-xtable-column label="当期账余额" prop="curAccountBal"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!--历史账单详细信息-->
    <yu-xdialog title="历史账单详细信息" :visible.sync="dialogShow" width="80%">
      <yu-xtable row-number request-type="POST" :data-url="tradeHisDtlUrl" condition-key="condition" :base-params="tradeHisDtlParams">
        <yu-xtable-column label="卡号 " prop="cardNo"></yu-xtable-column>
        <yu-xtable-column label="账户类型" prop="cardType"></yu-xtable-column>
        <yu-xtable-column label="交易日期" prop="tradeDate"></yu-xtable-column>
        <yu-xtable-column label="受理机构名称" prop="aqnead"></yu-xtable-column>
        <yu-xtable-column label="交易码" prop="tncode"></yu-xtable-column>
        <yu-xtable-column label="交易币种代码" prop="tncrcd"></yu-xtable-column>
        <yu-xtable-column label="金额借记方向" prop="dbcrid"></yu-xtable-column>
        <yu-xtable-column label="交易金额" prop="txnamt"></yu-xtable-column>
        <yu-xtable-column label="账单交易描述" prop="tnstds"></yu-xtable-column>
        <yu-xtable-column label="入账日期" prop="ptdate"></yu-xtable-column>
        <yu-xtable-column label="入账币种代码" prop="ptcrcd"></yu-xtable-column>
        <yu-xtable-column label="入账币种金额" prop="pstamt"></yu-xtable-column>
        <yu-xtable-column label="资金来源" prop="cupsou"></yu-xtable-column>
        <yu-xtable-column label="付款方账号" prop="cuptno"></yu-xtable-column>
        <yu-xtable-column label="付款方卡号" prop="cupdno"></yu-xtable-column>
        <yu-xtable-column label="付款方名称" prop="cupame"></yu-xtable-column>
        <yu-xtable-column label="附言" prop="cupent"></yu-xtable-column>
      </yu-xtable>
    </yu-xdialog>
  </div>
</template>
<script>
import {lookup} from '@/utils';
lookup.reg('CRUD_TYPE');
export default {
  name: 'TradeRecordHis',
  props: {
    tradeRecordHisParams: Object
  },
  components: {},
  data: function () {
    let _this = this;
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/findhistorybusinesslist',
      tradeHisDtlUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/findhistorydetail',
      startDatePickerOptions: {
        disabledDate: function (time) {
          let endDate = _this.searchFormdata.endDate;
          if (endDate) {
            return time.getTime() > new Date(endDate).getTime();
          }
          return time.getTime() > Date.now();
        }
      },
      endDatePickerOptions: {
        disabledDate: function (time) {
          let startDate = _this.searchFormdata.startDate;
          if (startDate) {
            return time.getTime() < new Date(startDate).getTime();
          }
          return time.getTime() > Date.now();
        }
      },
      searchFormdata: {
        currCd: '',
        cardNo: '',
        stmtEndDate: '',
        stmtStartDate: ''
      },
      tradeHisDtlParams: {},
      dialogShow: false,
      cardNo: '',
      searchData: {
        condition: {
          currCd: this.tradeRecordHisParams.certCode,
          cardNo: this.tradeRecordHisParams.cardNo
        }
      }
    };
  },
  mounted: function () {
  },
  methods: {
    // 自定义查询功能
    searchFn: function () {
      let param = {condition: JSON.stringify(this.searchFormdata)};
      this.$refs.tradeRecordHisTable.remoteData(param);
    },
    // 自定义重置功能
    resetFn: function () {
      this.$refs.searchForm.resetFields();
      this.searchFormdata.currCd = this.tradeRecordHisParams.certCode;
      this.searchFormdata.cardNo = this.tradeRecordHisParams.cardNo;
    },
    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.tradeRecordHisTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let trObj = selectionsAry[0];
      this.tradeHisDtlParams = {condition: {cardNo: trObj.cardNo, stmtStartDate: trObj.billDate}};
      this.dialogShow = true;
    },
    showFuncDetail: function (row) {
      this.tradeHisDtlParams = {condition: {cardNo: row.cardNo, stmtStartDate: row.billDate}};
      this.dialogShow = true;
    }
  }
};
</script>
