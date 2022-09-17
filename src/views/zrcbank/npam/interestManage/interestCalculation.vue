<template>
  <div>
    <yu-panel title="利息计算(不受停息影响)" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="searchForm" label-width="160px" v-model="searchFormdata" >
        <yu-xform-group :column="2">
         <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" rules="required" icon="search" @click.native="showPop"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" readonly></yu-xform-item>
          <yu-xform-item rules="required" label="计息方式"  ctype="select" placeholder="计息方式" name="loanRatType" data-code="LOAN_RAT_MODE" @change="dateFn" ></yu-xform-item>
          <yu-xform-item label="利息计算时间点" ctype="datepicker" placeholder="利息计算时间点" name="tagertTime" :hidden="flag1" rules="required"></yu-xform-item>
          <yu-xform-item label="利息计算时间区间" ctype="custom" name="inputDate" :hidden="flag2"  rules="required">
            <yu-date-picker label="利息计算时间区间" type="daterange" v-model="searchFormdata.inputDate"></yu-date-picker>
          </yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="借据列表" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="billTable" condition-key="condition" :row-number="true" request-type="POST" selection-type="checkbox"
       @selection-change="billSelectChange"  @loaded="billDataLoad" :pageable="true" :data-url="dataUrl" :default-load="false" :base-params="baseParams1" >
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="币种" prop="contCurType" width="100" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="拖欠利息总额" prop="totalAmountOfInterestOwed" width="150" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="起始日期" prop="loanStartDate"></yu-xtable-column>
        <yu-xtable-column label="到期日期" prop="loanEndDate"></yu-xtable-column>
        <yu-xtable-column label="执行年利率(%)" prop="execRateYear"></yu-xtable-column>
        <yu-xtable-column label="五级分类" prop="fiveClass" data-code="STD_FIVE_CLASS"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="inputBrIdName"></yu-xtable-column>
      </yu-xtable>
      <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
        <yu-button type="primary" size="large" @click="calInterest">利息试算</yu-button>
      </yu-form-buttons>
    </yu-panel>
    <yu-panel title="利息试算结果" :hideFilter="false" :collapseHide="false">
      <yufp-excel-export type="primary"  :export-url="exportUrl" title="导出" :export-param="{condition: JSON.stringify(queryBillNoParams)}"></yufp-excel-export>
      <yu-xtable ref="calResultTable" condition-key="condition" :row-number="true" :pageable="true" request-type="POST"
       :data-url="calResultDataUrl" :default-load="true" :base-params="baseParams" @loaded="execRateYearFn">
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" ></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="执行年利率(%)" prop="execRateYear" ></yu-xtable-column>
        <yu-xtable-column label="利息" prop="intAmt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="罚息" prop="penalInt" :formatter="Currency"></yu-xtable-column>
        <yu-xtable-column label="复利" prop="compoundInt" :formatter="Currency"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>

    <!------------------------------------------------------pop弹框---------------------------------------------------->
    <yu-xdialog title="客户信息" :visible.sync="dialogTableVisible" width="1200px">
      <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-tab-pane label="公司客户" name="company"></yu-tab-pane>
        <yu-tab-pane label="个人客户" name="person"></yu-tab-pane>
      </yu-tabs>
      <yu-panel :title="title" panel-type="simple">
        <yu-xform ref="refForm" related-table-name="refTable" form-type="search" v-model="searchFormdataPop" label-width="120px" >
          <yu-xform-group :column="3">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
         <yu-toolbar>
          <yu-button type="primary" @click="confimBtn">选取</yu-button>
          <yu-button type="primary" @click="back">返回</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable" row-number condition-key="condition" request-type="post" selection-type="radio" :pageable="true" :data-url="dataUrlPop"
         :base-params="baseParamsPop">
          <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
          <yu-xtable-column label="客户类型" prop="cusType" data-code="STD_ZB_CUS_TYP" ></yu-xtable-column>
          <yu-xtable-column label="证件类型" prop="certType" data-code="STD_ZB_CERT_TYP"></yu-xtable-column>
          <yu-xtable-column label="证件号码" prop="certCode"></yu-xtable-column>
          <yu-xtable-column label="客户分类" prop="cusRankCls" data-code="STD_ZB_CUS_CLS"></yu-xtable-column>
          <yu-xtable-column label="管户客户经理" prop="managerIdName"></yu-xtable-column>
          <yu-xtable-column label="客户状态" prop="cusState" data-code="STD_CUS_STATE"></yu-xtable-column>
          <yu-xtable-column label="所属机构" prop="managerBrIdName"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
    </yu-xdialog>
  </div>
</template>
<script>
import YufpExcelExport from '@/components/widgets/YufpExcelExport';
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_FIVE_CLASS,STD_ZB_CUR_TYP,STD_ZB_CERT_TYP,STD_ZB_CUS_TYP,STD_CUS_STATE');
export default {
  components: { YufpExcelExport },
  mixins: [mixin],
  data: function () {
    return {
      searchFormdata: {
        loanRatType: '01',
        tagertTime: '',
        inputDate: '',
        cusId: ''
      },
      baseParams: {condition: {cusId: ''}},
      baseParams1: {condition: {accStatusArray: '1,2,3,4,5,6,7,8'}},
      queryBillNoParams: {
        billNo: []
      },
      dataUrl: this.$backend.cmisBiz + '/api/accloan/',
      dialogTableVisible: false,
      searchFormdataPop: {},
      dataUrlPop: this.$backend.cmisCus + '/api/cusbase/queryCusBaseList',
      activeName: 'company',
      title: '公司客户',
      baseParamsPop: {condition: {cusCatalog: '2', roleList: this.$xutils.getLoginUserInfo().roles}},
      calResultDataUrl: this.$backend.cmisNpam + '/api/plaloanrat/selectByBillNoList',
      exportUrl: this.$backend.cmisNpam + '/api/plaloanrat/export'
    };
  },
  /* 数据变动时，刷新关联列表数据 */
  watch: {
    'searchFormdata.inputDate': function (val) {
      this.dateFn();
    },
    'searchFormdata.tagertTime': function (val) {
      this.dateFn();
    }
  },
  computed: {
    flag1 () {
      return this.searchFormdata.loanRatType == '02' || this.searchFormdata.loanRatType == '';
    },
    flag2 () {
      return this.searchFormdata.loanRatType == '01' || this.searchFormdata.loanRatType == '';
    }
  },
  methods: {
    /* 时间选择方式 */
    dateFn () {
      if (this.searchFormdata.loanRatType == '02') {
        this.$refs.billTable.selections.forEach(val => {
          val.loanRatStartDare = this.searchFormdata.inputDate[0];
          val.loanRatDare = this.searchFormdata.inputDate[1];
          this.queryBillNoParams.billNo.push(val.billNo);
        });
      };
      if (this.searchFormdata.loanRatType == '01') {
        this.$refs.billTable.selections.forEach(val => {
          val.loanRatDare = this.searchFormdata.tagertTime;
          val.loanRatStartDare = '';
          this.queryBillNoParams.billNo.push(val.billNo);
        });
      }
    },
    /* 借据列表选择改变时 */
    billSelectChange () {
      this.dateFn();
    },
    /*
      拖欠利息总额 = 欠息+罚息+复息
    */
    interestAmtSum: function (billInfo) {
      return parseFloat(billInfo.debitInt ? billInfo.debitInt : 0) + parseFloat(billInfo.penalInt ? billInfo.penalInt : 0) + parseFloat(billInfo.compoundInt ? billInfo.compoundInt : 0);
    },

    /*
      借据列表数据加载后,计算拖欠利息总额,并赋值
    */
    billDataLoad: function (data, total, response) {
      data.forEach(val => {
        this.$set(val, 'totalAmountOfInterestOwed', this.interestAmtSum(val));
        val.execRateYear = val.execRateYear * 100;
      });
    },
    /*
     *利息试算/计算
    */
    calInterest () {
      var _this = this;
      var validate = false;
      this.$refs.searchForm.validate(volid => {
        validate = volid;
      });
      if (!validate) {
        return this.$message.error('请填写必填项');
      };
      var data = this.$refs.billTable.selections;
      if (data.length < 1) {
        return this.$message.error('请选择借据');
      };
      yufp.service.request({
        method: 'POST',
        url: backend.cmisNpam + '/api/plaloanrat/queryhxloanrat',
        data: JSON.stringify(data),
        callback: function (code, message, response) {
          if (response.code == '0') {
            var selectArry = _this.$refs.billTable.selections;
            var billNo = [];
            selectArry.forEach(item => {
              billNo.push(item.billNo);
            });
            _this.$refs.calResultTable.remoteData({condition: JSON.stringify({billNo: billNo})});
          } else {
            this.$message.error(response.message);
          }
        }
      });
    },
    /* 弹出pop框 */
    showPop () {
      this.dialogTableVisible = true;
    },

    /*
      将表格的数据，赋值给表单字段
    */
    commonSelect4CusFn: function (data) {
      this.searchFormdata.cusId = data.cusId;
      this.searchFormdata.cusName = data.cusName;
      this.searchFn();
    },
    // 自定义查询功能
    searchFn: function () {
      let _this = this;
      var _model = _this.searchFormdata;
      var _param = {
        condition: JSON.stringify({cusId: _model.cusId ? _model.cusId : ''})
      };
      _this.$refs.billTable.remoteData(_param);
    },

    /* 选取客户数据赋值给表单 */
    confimBtn () {
      this.searchFormdata.cusId = this.$refs.refTable.selections[0].cusId;
      this.searchFormdata.cusName = this.$refs.refTable.selections[0].cusName;
      this.searchFn();
      this.dialogTableVisible = false;
    },
    /* pop框影藏 */
    back () {
      this.dialogTableVisible = false;
    },
    /* tab栏切换处理 */
    handleClick (tab, event) {
      var userInfo = this.$xutils.getLoginUserInfo();
      var roleList = userInfo.roles;
      if (tab.name == 'company') {
        this.title = '公司客户';
        this.baseParamsPop = {condition: {cusCatalog: '2', roleList: roleList}};
      }
      if (tab.name == 'person') {
        this.title = '个人客户';
        this.baseParamsPop = {condition: {cusCatalog: '1', roleList: roleList}};
      }
    },
    /* 利息百分率转换 */
    execRateYearFn (data) {
      // console.log('data', data);
      // data.forEach(item => {
      //   item.execRateYear = item.execRateYear * 100;
      // });
    }
  }
};
</script>
