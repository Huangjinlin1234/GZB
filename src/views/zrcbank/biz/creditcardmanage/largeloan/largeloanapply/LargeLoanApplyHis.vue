
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额申请信息历史
  -->
  <div>
    <yu-panel panel-type="simple">
      <yu-xform related-table-name="largeLoanApplyHisTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="4">
          <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="证件号码" placeholder="证件号码" name="certCode" ctype="input"></yu-xform-item>
          <yu-xform-item label="卡号" placeholder="卡号 " name="cardNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button type="primary" v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="largeLoanApplyHisTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl" :base-params="baseParams">
        <yu-xtable-column label="业务流水号" prop="serno">
          <template slot-scope="scope">
            <a class="underline" @click="showFuncDetail(scope.row)">{{ scope.row.serno }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="卡号 " prop="cardNo"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="分期金额" prop="loanAmount"></yu-xtable-column>
        <yu-xtable-column label="分期期数" prop="loanTerm"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="申请渠道" prop="appChnl" data-code="STD_CARD_APP_CHNL"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>

      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import {lookup} from '@/utils';
lookup.reg('STD_ZB_CERT_TYP,STD_ZB_APPR_STATUS,STD_CARD_APP_CHNL');
export default {
  name: 'LargeLoanApplyHis',
  components: {},
  data: function () {
    return {
      dataUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/querybystatus',
      searchFormdata: {},
      baseParams: {
        condition: {applyExistsStatus: '111,990,991,993,997,998'}
      }
    };
  },
  methods: {
    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.largeLoanApplyHisTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditcardmanage/largeloan/largeloanapplyadd/LargeLoanApplyAddIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看额度调整申请',
        data: {
          actionType: 'DETAIL', // 操作类型
          data: selectionsAry[0],
          name: this.$route.name
        }
      });
    },
    /**
     * 表格点击查看详情
     */
    showFuncDetail (row) {
      let _this = this;
      let path = 'zrcbank/biz/creditcardmanage/largeloan/largeloanapplyadd/LargeLoanApplyAddIndex';
      let actionType = 'DETAIL';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看大额分期申请信息',
        data: {
          actionType: actionType, // 操作类型
          data: row,
          name: this.$route.name
        }
      });
    }
  }
};
</script>
