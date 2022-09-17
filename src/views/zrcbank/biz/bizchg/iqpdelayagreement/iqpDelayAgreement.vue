<template>
   <div>
   <yu-tabs v-model="activeName">
    <yu-tab-pane label="待签延期还款协议列表" name="first">
    <yu-panel  panel-type="normal">
      <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
         <yu-xform-item  label="业务流水号" placeholder="业务流水号" name="agrSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('export')" @click="printFn">打印</yu-button>
          <yu-button type="primary" v-if="checkCtrl('sign')" @click="onUpdate(true)">签订</yu-button>
          <yu-button type="primary" v-if="checkCtrl('view')" @click="onUpdate(false)">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="{'condition':{'apply': 'Y'},'sort':'inputDate desc'}" :default-load="false" request-type="post">
        <yu-xtable-column label="业务流水号" prop="agrSerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="还款间隔" prop="repayInterval"></yu-xtable-column>
        <yu-xtable-column label="生效截止日" prop="delayEndDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="签订状态" prop="coreStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
    <yu-tab-pane label="延期还款协议签订历史" name="second">
    <yu-panel  panel-type="normal">
      <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTableOld">
        <yu-xform-group :column="3">
         <yu-xform-item  label="业务流水号" placeholder="业务流水号" name="agrSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="approveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="onUpdate2(false)">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTableOld" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="{'condition':{'history':'Y'},'sort':'inputDate desc'}" :default-load="true" request-type="post">
        <yu-xtable-column label="业务流水号" prop="agrSerno"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt"></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBalance"></yu-xtable-column>
        <yu-xtable-column label="还款间隔" prop="repayInterval"></yu-xtable-column>
        <yu-xtable-column label="生效截止日" prop="delayEndDate"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
        <yu-xtable-column label="登记机构" prop="inputBrIdName"></yu-xtable-column>
        <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
        <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
        <yu-xtable-column label="签订状态" prop="coreStatus" data-code="STD_CONT_STATUS"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
  </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS,STD_CONT_STATUS');
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      dialogVisible: false,
      dataUrl: this.$backend.cmisBiz + '/api/iqpdelayagreement/',
      visiable: false,
      formdata: {},
      activeName: 'first'
    };
  },
  mounted(){
    this.$refs.refTable.remoteData();
  },
  methods: {
    printFn () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var params = _this.$refs.refTable.selections[0];;
      console.log(params);
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxpf';
      params.src = _this.$backend.frptRptService + 'buchong-1.cpt&type=4&serno=' + params.agrSerno + '&billNo=' + params.billNo;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '延期协议签订',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    onCancel: function () {
      this.visiable = false;
      this.$nextTick(function () {
        this.$refs.refForm.resetFields();
      });
    },
    opendTab (params, title, key) {
      this.$router.addTab({
        name: 'zrcbank/biz/bizchg/iqpdelayagreement/iqpDelayAgreementMain',
        key: 'custom_view_' + key + '_' + new Date().getTime(),
        title: title,
        data: params
      });
    },
    
    /**
       * 修改
       */
    onUpdate (updateFlag) {
      let _this = this;
      let row = this.$refs.refTable.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      if(updateFlag){
        if (row.approveStatus == '000' || row.approveStatus == '992') {
          row['opType'] = 'EDIT' ;
          row.callback = function () {
            _this.$refs.refTable.remoteData();
          };
          this.opendTab(row, '还款申请修改', row.billNo);
        } else {
          this.$xutils.showMsgBox('提示', '只有待发起和打回状态才能进行修改！');
          return;
        }
      }else{
         row['opType'] = 'VIEW';
          row.callback = function () {
            _this.$refs.refTable.remoteData();
          };
          this.opendTab(row, '还款申请查看', row.billNo);
      }
    },
    onUpdate2 (updateFlag) {
      let _this = this;
      let row = this.$refs.refTableOld.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      row['opType'] = updateFlag ? 'EDIT' : 'VIEW';
      row.callback = function () {
        _this.$refs.refTableOld.remoteData();
      };
      this.opendTab(row, updateFlag ? '还款申请修改' : '还款申请查看', row.billNo);
    }
  }
};
</script>
