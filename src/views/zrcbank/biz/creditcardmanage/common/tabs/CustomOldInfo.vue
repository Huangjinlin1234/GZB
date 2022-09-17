
<template>
  <!--
    @created by creazyCder 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @updated by 2021-05-24 15:50:38
    @description 额度审批-老客户信息
  -->
  <div>
    <yu-panel panel-type="simple" title="信用卡申请历史列表" is-collapse>
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button type="primary" @click="infoCardApplyFn">查看</yu-button>
        <yu-button type="primary" @click="do360View('1')">个人360视图查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="creditCardApplyTable" selection-type="radio" row-number request-type="POST" :data-url="creditCardApplyDataUrl" :base-params="baseParams" @loaded="creditCardApplyTableLoad">
        <yu-xtable-column label="申请流水号" prop="serno">
          <template slot-scope="scope">
            <a class="underline" @click="showCreditCardApplyDetailFun(scope.row)">{{ scope.row.serno }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="申请类型" prop="applyType" data-code="STD_CARD_APPLY_TYPE"></yu-xtable-column>
        <yu-xtable-column label="申请卡产品" prop="applyCardPrd" data-code="STD_CARD_APPLY_CARD_PRD"></yu-xtable-column>
        <yu-xtable-column label="客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="手机号码" prop="phone"></yu-xtable-column>
        <yu-xtable-column label="申请日期" prop="appDate"></yu-xtable-column>
        <yu-xtable-column label="申请渠道" prop="appChnl" data-code="STD_CARD_APP_CHNL"></yu-xtable-column>
        <yu-xtable-column label="申请业务阶段" prop="businessStage"  data-code="STD_CRAD_BUSINESS_STAGE"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
        <yu-xtable-column label="建议额度" prop="suggestLmt" hide-column></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel panel-type="simple" title="调额申请历史列表" is-collapse>
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button type="primary" @click="infoAdjustmentApplyFn">查看</yu-button>
        <yu-button type="primary" @click="do360View('2')">个人360视图查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="adjustmentApplyTable" selection-type="radio" row-number request-type="POST" :data-url="adjustmentApplyDataUrl" :base-params="baseParams" @loaded="adjustmentApplyTableLoad">
        <yu-xtable-column label="业务流水号" prop="serno">
          <template slot-scope="scope">
            <a class="underline" @click="showAdjustmentApplyDetailFun(scope.row)">{{ scope.row.serno }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="卡号 " prop="cardNo"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="原始信用额度" prop="origCreditCardLmt"></yu-xtable-column>
        <yu-xtable-column label="新信用额度" prop="newCreditCardLmt"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel panel-type="simple" title="大额分期历史列表" is-collapse>
      <yu-button-drop style="margin-bottom:10px;">
        <yu-button type="primary" @click="infoLargeLoanApplyFn">查看</yu-button>
        <yu-button type="primary" @click="do360View('3')">个人360视图查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="largeLoanApplyTable" selection-type="radio" row-number request-type="POST" :data-url="largeLoanApplyDataUrl" :base-params="baseParams" @loaded="largeLoanApplyTableLoad">
        <yu-xtable-column label="业务流水号" prop="serno">
          <template slot-scope="scope">
            <a class="underline" @click="showLargeLoanApplyDetailFun(scope.row)">{{ scope.row.serno }}</a>
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="卡号 " prop="cardNo"></yu-xtable-column>
        <yu-xtable-column label="客户号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户姓名" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
        <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
        <yu-xtable-column label="分期金额" prop="loanAmount"></yu-xtable-column>
        <yu-xtable-column label="分期期数" prop="loanTerm" data-code="STD_LARGE_LOAN_TERM"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputId"></yu-xtable-column>
        <yu-xtable-column label="登记时间" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-xdialog :title="dialogTitle" :visible.sync="dialogShow" width="80%">
      <component :is="activeComponent" :dtl-params="dtlInfo" @close="handleCloseDialog"></component>
    </yu-xdialog>
  </div>
</template>
<script>
import {lookup } from '@/utils';
lookup.reg('STD_ZB_APPR_STATUS,STD_LARGE_LOAN_TERM,STD_ZB_CERT_TYP,BELG_TEAM,STD_CRAD_BUSINESS_STAGE,STD_CARD_APP_CHNL,STD_CARD_APPLY_TYPE');
export default {
  name: 'CustomOldInfo',
  props: {
    customOldInfoParams: Object
  },
  components: {},
  data: function () {
    return {
      creditCardApplyDataUrl: this.$backend.cmisBiz + '/api/creditcardappinfo/querybycondition',
      adjustmentApplyDataUrl: this.$backend.cmisBiz + '/api/creditcardadjustmentappinfo/query', // 调额申请历史查询url
      largeLoanApplyDataUrl: this.$backend.cmisBiz + '/api/creditcardlargeloanapp/query', // 大额分期历史查询url
      activeComponent: null,
      dtlInfo: {},
      dialogShow: false,
      creditCardApplyTableLen: 0,
      largeLoanApplyTableLen: 0,
      adjustmentApplyTableLen: 0
    };
  },
  computed: {
    baseParams: function () {
      let params = {
        condition: JSON.stringify({certCode: this.customOldInfoParams.certCode, applyExistsStatus: '111,990,991,993,997,998'})
      };
      return params;
    }
  },
  methods: {
    /**
     *  触发事件
     */
    emitSignFlagFn: function () {
      if (this.creditCardApplyTableLen || this.largeLoanApplyTableLen || this.adjustmentApplyTableLen) {
        this.$emit('signRedColor', true);
      } else {
        this.$emit('signRedColor', false);
      }
    },
    /**
     * 信用卡申请历史表加载事件
     */
    creditCardApplyTableLoad: function (data, total, response) {
      this.creditCardApplyTableLen = total;
      this.emitSignFlagFn();
    },
    /**
     * 信用卡大额分期申请历史表加载事件
     */
    largeLoanApplyTableLoad: function (data, total, response) {
      this.largeLoanApplyTableLen = total;
      this.emitSignFlagFn();
    },
    /**
     * 信用卡额度申请历史表加载事件
     */
    adjustmentApplyTableLoad: function (data, total, response) {
      this.adjustmentApplyTableLen = total;
      this.emitSignFlagFn();
    },
    /**
     * 关闭详情窗口
     */
    handleCloseDialog: function () {
      this.dialogShow = false;
      this.activeComponent = null;
    },
    /**
     * 点击查看信用卡申请历史
     */
    showCreditCardApplyDetailFun: function () {
      this.$message({
        message: '查看信用卡申请历史',
        type: 'info'
      });
    },
    /**
     * 点击查看调额申请历史
     */
    showAdjustmentApplyDetailFun: function () {
      this.$message({
        message: '查看调额申请历史',
        type: 'info'
      });
    },
    /**
     * 点击查看大额分期历史
     */
    showLargeLoanApplyDetailFun: function () {
      this.$message({
        message: '查看大额分期历史',
        type: 'info'
      });
    },
    /**
     * 切换显示组件详情
     */
    switchDtlCoponent: function (type) {
      switch (type) {
      case '1': // 申请信息详情
        this.activeComponent = () => import('@/views/zrcbank/biz/creditcardmanage/common/details/CreditCardApplyDtl');
        break;
      case '2': // 额度调整申请详情
        this.activeComponent = () => import('@/views/zrcbank/biz/creditcardmanage/common/details/AdjustmentApplyDtl');
        break;
      case '3': // 大额分期申请详情
        this.activeComponent = () => import('@/views/zrcbank/biz/creditcardmanage/common/details/LargeLoanApplyDtl');
        break;
      default:
        break;
      }
    },
    /**
     * 查看信用卡申请历史详情infoAdjustmentApplyFn
     */
    infoCardApplyFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.creditCardApplyTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      this.switchDtlCoponent('1');
      this.dtlInfo = selectionsAry[0];
      this.dialogShow = true;
    },
    /**
     * 查看调额申请历史详情
     */
    infoAdjustmentApplyFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.adjustmentApplyTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      this.switchDtlCoponent('2');
      this.dtlInfo = selectionsAry[0];
      this.dialogShow = true;
    },
    /**
     * 查看大额分期历史详情
     */
    infoLargeLoanApplyFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.largeLoanApplyTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      this.switchDtlCoponent('3');
      this.dtlInfo = selectionsAry[0];
      this.dialogShow = true;
    },
    do360View (num) {
      debugger;
      let _this = this;
      let params = _this.$refs.creditCardApplyTable.selections;
      if (num == '1') {
        params = _this.$refs.creditCardApplyTable.selections;
        if (params == null) {
          _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
          return;
        }
        _this.$message({ message: '当前为跳转操作,请耐心等待,如长时间无反应,请重新尝试跳转!', type: 'info' });
        let url1 = _this.$backend.jumpKGPersonDownLoadService + '?viewlet=%25E5%25AE%259E%25E6%2597%25B6%25E6%2595%25B0%25E6%258D%25AE%25E5%25B9%25B3%25E5%258F%25B0%25E5%25A4%25A7%25E5%25B1%258F%252F%25E4%25B8%25AA%25E4%25BA%25BA360%25E8%25A7%2586%25E5%259B%25BE1.0.frm' +
      '&ref_t=design&ref_c=595534ae-4ca1-4f72-8f6b-315d0f6c0eba&cust_no=' + params.cusId + '&cust_name=' + this.$xutils.getLoginUserInfo()['loginName'];
        window.open(url1, '');
      } else if (num == '2') {
        params = _this.$refs.adjustmentApplyTable.selections;
        this.$request({
          method: 'POST',
          url: this.$backend.cmisCus + '/api/cusbase/querycusbycertcode',
          data: {'certCode': params.certCode}
        }).then(({code, message, data}) => {
          if (code == '0') {
            _this.$message({ message: '当前为跳转操作,请耐心等待,如长时间无反应,请重新尝试跳转!', type: 'info' });
            let url1 = _this.$backend.jumpKGPersonDownLoadService + '?viewlet=%25E5%25AE%259E%25E6%2597%25B6%25E6%2595%25B0%25E6%258D%25AE%25E5%25B9%25B3%25E5%258F%25B0%25E5%25A4%25A7%25E5%25B1%258F%252F%25E4%25B8%25AA%25E4%25BA%25BA360%25E8%25A7%2586%25E5%259B%25BE1.0.frm' +
            '&ref_t=design&ref_c=595534ae-4ca1-4f72-8f6b-315d0f6c0eba&cust_no=' + data.cusId + '&cust_name=' + _this.$xutils.getLoginUserInfo()['loginName'];
            window.open(url1, '');
          } else {
            _this.$message({ message: '数据更新失败！', type: 'error'});
          }
        });
      } else {
        params = _this.$refs.largeLoanApplyTable.selections;
        if (params == null) {
          _this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作!');
          return;
        }
        _this.$message({ message: '当前为跳转操作,请耐心等待,如长时间无反应,请重新尝试跳转!', type: 'info' });
        let url1 = _this.$backend.jumpKGPersonDownLoadService + '?viewlet=%25E5%25AE%259E%25E6%2597%25B6%25E6%2595%25B0%25E6%258D%25AE%25E5%25B9%25B3%25E5%258F%25B0%25E5%25A4%25A7%25E5%25B1%258F%252F%25E4%25B8%25AA%25E4%25BA%25BA360%25E8%25A7%2586%25E5%259B%25BE1.0.frm' +
      '&ref_t=design&ref_c=595534ae-4ca1-4f72-8f6b-315d0f6c0eba&cust_no=' + params.cusId + '&cust_name=' + this.$xutils.getLoginUserInfo()['loginName'];
        window.open(url1, '');
      }
    }
  }
};
</script>
