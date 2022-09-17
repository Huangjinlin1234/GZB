<template>
   <div>
   <yu-tabs v-model="activeName">
    <yu-tab-pane label="待签协议" name="first">
    <yu-panel  panel-type="normal">
      <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTable">
        <yu-xform-group :column="3">
         <yu-xform-item  label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="contApproveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('export')" @click="printFn">打印</yu-button>
          <yu-button type="primary" v-if="checkCtrl('sign')" @click="signFn">签订</yu-button>
          <yu-button type="primary" v-if="checkCtrl('view')" @click="viewsign()">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="{'condition':{'contapply': 'Y','isSignAgr':'Y'},'sort':'inputDate desc'}" :default-load="true" request-type="post">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="原执行利率（年）">
          <template slot-scope="scope">
              {{ Number(scope.row.oldExecRateYear*100).toFixed(2) + '%' }}
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="变更后执行利率(年)">
          <template slot-scope="scope" width="100">
              {{ Number(scope.row.execRateYear*100).toFixed(2) + '%' }}
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="利率变更生效日" prop="newInureDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="contApproveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
    <yu-tab-pane label="历史协议" name="second">
    <yu-panel  panel-type="normal">
      <yu-xform ref="refForm" form-type="search" label-width="120px" related-table-name="refTableOld">
        <yu-xform-group :column="3">
         <yu-xform-item  label="业务流水号" placeholder="业务流水号" name="iqpSerno" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户编号" placeholder="客户编号" name="cusId" ctype="input"></yu-xform-item>
          <yu-xform-item label="客户名称" placeholder="客户名称" name="cusName" ctype="input" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="借据编号" placeholder="借据编号" name="billNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="合同编号" placeholder="合同编号" name="contNo" ctype="input"></yu-xform-item>
          <yu-xform-item label="审批状态" placeholder="审批状态" name="contApproveStatus" ctype="select" data-code="STD_ZB_APPR_STATUS"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template panel-type="simple">
        <yu-button-drop style="margin-bottom:10px;">
          <yu-button type="primary" v-if="checkCtrl('viewhis')" @click="view()">查看</yu-button>
        </yu-button-drop>
      </template>
      <yu-xtable ref="refTableOld" row-number condition-key="condition" selection-type="radio" :pageable="true" :data-url="dataUrl" :base-params="{'condition':{'conthistory':'Y','isSignAgr':'Y'},'sort':'inputDate desc'}" :default-load="true" request-type="post">
        <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="120"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
        <yu-xtable-column label="原执行利率（年）">
          <template slot-scope="scope">
              {{ Number(scope.row.oldExecRateYear*100).toFixed(2) + '%' }}
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="变更后执行利率(年)">
          <template slot-scope="scope" width="100">
              {{ Number(scope.row.execRateYear*100).toFixed(2) + '%' }}
          </template>
        </yu-xtable-column>
        <yu-xtable-column label="利率变更生效日" prop="newInureDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记人" prop="inputIdName" width="120"></yu-xtable-column>
        <yu-xtable-column label="登记日期" prop="inputDate" width="120"></yu-xtable-column>
        <yu-xtable-column label="审批状态" prop="contApproveStatus" width="120" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    </yu-tab-pane>
  </yu-tabs>
      <yu-xdialog :visible.sync="visiable"  width="400px" title="请确认利率变更生效日" >
      <yu-xform ref="refForm" label-width="120px" v-model="formdata">
        <yu-xform-group :column="3">
        <yu-xform-item label="利率变更生效日" colspan="24" ctype="datepicker" name="newInureDate" :rules="inureDateRule" placeholder="原借据编号"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="confirm">确认</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
    </yu-xdialog>
  </div>
</template>
<script>
export default {
  data: function () {
    let _this = this;
    function checkInureDate (rule, value, callback) {
      let oldDate = new Date(_this.hisInureDate);
      let newData = new Date(value);
      if (newData > oldDate) {
        callback();
      } else {
        callback(new Error('利率变更生效日期必须大于前次利率生效日期!'));
      }
    }
    return {
      dataUrl: this.$backend.cmisBiz + '/api/iqpratechgapp/',
      visiable: false,
      formdata: {},
      activeName: 'first',
      inureDateRule: [{type: 'date', required: true, message: '必填'}, {validator: checkInureDate}],
      hisInureDate: ''
    };
  },
  methods: {
    printFn: function () {
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
      params.src = _this.$backend.frptRptService + 'buchong-1.cpt&type=1&serno=' + params.iqpSerno + '&billNo=' + params.billNo;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '利率变更签订',
        // 传递的业务数据，可选配置
        data: params
      });
    },
    signFn: function () {
      let _this = this;
      let row = this.$refs.refTable.selections;
      if (row.length == 0) {
        this.$message('必须选择一条记录进行操作！');
        return;
      }
      row = yufp.clone(row[0], {});
      row['opType'] = 'EDIT';
      // 区别于默认修改页面标识
      row.opDetialType = 'SIGN';
      row.callback = function () {
        _this.$refs.refTable.remoteData();
      };
      this.opendTab(row, '利率变更查看', row.billNo);
    },
    onCancel: function () {
      this.visiable = false;
    },
    /**
      tab页签方式打开页面
     */
    opendTab (params, title, key) {
      this.$router.addTab({
        name: 'zrcbank/biz/bizchg/iqpratechgapp/iqpRateSignInfo',
        key: 'custom_view_' + key + '_' + new Date().getTime(),
        title: title,
        data: params
      });
    },
    confirm: function () {
      let _this = this;
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var jsoCardData = this.formdata; // 先取得表单的数据
      this.$request({
        url: this.$backend.cmisBiz + '/api/iqpratechgapp/update',
        method: 'post',
        data: jsoCardData,
        async: false,
        success: (response) => {
          if (response.code == '0') {
            _this.$refs.refTable.remoteData();
            _this.visiable = false;
            _this.$message({type: 'error', message: '打印功能待开发...'});
          }
        },
        error: () => {
          // 处理请求失败的情况
          this.$message({ message: '更新失败', type: 'error' });
        }
      });
    },
    viewsign () {
      let row = this.$refs.refTable.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      row['opType'] = 'VIEW';
      this.opendTab(row, '利率调变更协议查看', row.billNo);
    },
    view () {
      let row = this.$refs.refTableOld.selections[0];
      if (row == null) {
        this.$xutils.showMsgBox('提示', '必须选择一条记录进行操作！');
        return;
      }
      row['opType'] = 'VIEW';
      this.opendTab(row, '利率调变更协议查看', row.billNo);
    }
  }
};
</script>
