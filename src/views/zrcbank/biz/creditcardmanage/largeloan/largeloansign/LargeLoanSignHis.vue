
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 调额申请信息历史
  -->
  <div>
    <yu-panel panel-type="simple">
      <yu-xform related-table-name="largeLoanSignHisTable" form-type="search" v-model="searchFormdata" label-width="120px">
        <yu-xform-group :column="4">
         <yu-xform-item label="客户姓名" placeholder="客户姓名" name="cusName" ctype="input"></yu-xform-item>
          <yu-xform-item label="证件号码" placeholder="证件号码" name="certCode" ctype="input"></yu-xform-item>
          <yu-xform-item label="卡号" placeholder="卡号 " name="cardNo" ctype="input"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button type="primary"  v-if="checkCtrl('view')"  @click="infoFn">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="largeLoanSignHisTable" condition-key="condition" selection-type="radio" row-number request-type="POST" :data-url="dataUrl"  :base-params="baseParams">
        <yu-xtable-column label="业务流水号" prop="serno">
          <template slot-scope="scope">
            <a class="underline" @click="showFuncDetail(scope.row)">{{ scope.row.serno }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="卡号" prop="cardNo"></yu-xtable-column>
        <yu-xtable-column label="分期金额" prop="loanAmount"></yu-xtable-column>
        <yu-xtable-column label="分期期数" prop="loanTerm"></yu-xtable-column>
         <yu-xtable-column label="合同状态" prop="contStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import {lookup} from '@/utils';
lookup.reg('STD_ZB_CERT_TYP,STD_CONT_STATUS,STD_ZB_APPR_STATUS');
export default {
  name: 'LargeLoanSignHis',
  components: {},
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/creditctrloancont/querybystatus',
      baseParams: {
        condition: {applyExistsStatus: '111,990,991,993,997,998'
        }
      }
    };
  },
  methods: {
    /**
     * 合同状态格式化
     */
    contStatusFormatter: function (row, column, cellValue) {
      const statusArr = lookup.find('STD_CONT_STATUS');
      const obj = statusArr.find((item, index) => {
        return item.key === cellValue;
      });
      return obj ? obj.value : '';
    },
    /**
     * 审批状态格式化
     */
    approveStatusFormatter: function (row, column, cellValue) {
      const statusArr = lookup.find('STD_ZB_APPR_STATUS');
      const obj = statusArr.find((item, index) => {
        return item.key === cellValue;
      });
      return obj ? obj.value : '';
    },
    /**
     * 详情
     */
    infoFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.largeLoanSignHisTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path = 'zrcbank/biz/creditcardmanage/largeloan/largeloansign/largeloansigncont/LargeLoanSignContIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看大额分期申请',
        data: {
          actionType: 'DETAIL', // 操作类型
          data: selectionsAry[0],
          name: this.$route.name
        }
      });
    },
    /**
     * 查看
     */
    showFuncDetail: function (row) {
      let _this = this;
      let path = 'zrcbank/biz/creditcardmanage/largeloan/largeloansign/largeloansigncont/LargeLoanSignContIndex';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看大额分期申请',
        data: {
          actionType: 'DETAIL', // 操作类型
          data: row,
          name: this.$route.name
        }
      });
    }
  }
};
</script>
