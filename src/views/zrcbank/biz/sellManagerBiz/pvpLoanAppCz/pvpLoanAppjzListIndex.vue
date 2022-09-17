<template>
  <div>
    <yu-panel title="核心出账列表">
      <yu-xform ref="refForm" form-type="search"  related-table-name="refTable" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusCatalog':'cusCatalog','cusId':'cusId','cusName':'cusName'}" width="720" height="480" :parms="{'oprType':'01'}" ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" fuzzy-query="both"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <template slot="right">
        <yu-button-drop>


        </yu-button-drop>
      </template>
       <yu-button type="primary" ref="btn_doView" @click="manualsendFn" :loading="loanflag" v-if="checkCtrl('manualsendFn')">手动发送</yu-button>
        <yu-button type="primary" ref="btn_retailcz" @click="retailcz" :loading="loanflag" v-if="checkCtrl('retailcz')">冲正</yu-button>
      <yu-xtable ref="refTable" row-number condition-key="condition" selection-type="radio" @row-click="onRowClick" @row-dblclick="onRowDBClick" @cell-click="onCellClick" :pageable="true" :data-url="dataUrl" :default-load="true" request-type="POST"  :base-params="params">
        <yu-xtable-column label="交易流水号" prop="tranSerno" width="200"></yu-xtable-column>
        <yu-xtable-column label="出账流水号码" prop="pvpSerno" width="200"></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width="200"></yu-xtable-column>
        <yu-xtable-column label="借据编号" prop="billNo" width="200"></yu-xtable-column>
        <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
        <yu-xtable-column label="客户名称" prop="cusName" width="100"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width="100"></yu-xtable-column>
        <yu-xtable-column label="交易金额" prop="tranAmt"></yu-xtable-column>
        <yu-xtable-column label="交易日期" prop="tranDate"></yu-xtable-column>
        <yu-xtable-column label="授权状态" prop="authStatus" data-code="STD_AUTH_STATUS"></yu-xtable-column>
        <yu-xtable-column label="应答信息" prop="returnDesc" width="100">
         <template slot-scope="scope">
        <yu-popover trigger="hover" placement="top">
          <p> {{ scope.row.returnDesc }}</p>
          <div slot="reference" class="name-wrapper" v-if="returnDescFlag(scope.row)">
            <yu-tag  type="danger">查看</yu-tag>
          </div>
        </yu-popover>
      </template></yu-xtable-column>
    </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import mixinList from '@/utils/mixins/mixin-list';
yufp.lookup.reg('STD_AUTH_STATUS');
export default{
  name: 'D11BillList',
  mixins: [mixinList],
  data: function () {
    return {
      pkField: 'tranSerno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      searchFormdata: {},
      dataUrl: this.$backend.cmisBiz + '/api/pvpauthorize/selectpvpauthorizelist',
      params: {condition: {belgLine: '02'}, sort: 'tran_date desc'},
      loanflag: false


    };
  },
  mounted () {

  },
  methods: {
    manualsendFn () {
      let _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }


      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (_this.$xutils.getDefaultformulaData('$LoginLoginCode') != managerId && _this.$refs.refTable.selections[0].authStatus != '2' && _this.$refs.refTable.selections[0].authStatus != '9') {
        _this.$message({ message: '只能对未成功且本人的数据发起核心', type: 'warning' });
        return;
      }
      this.loanflag = true;
      yufp.service.request({
        async: true,
        method: 'POST',
        url: backend.cmisBiz + '/api/pvploanapp/selectbypvpserno',
        data: {pvpSerno: _this.$refs.refTable.selections[0].pvpSerno},
        callback: function (code, message, response) {
          let approveStatus = response.data.approveStatus;
          if (approveStatus != '997') {
            _this.$message({ message: '放款申请状态为通过才可发送核心', type: 'warning' });
            return;
          }
          _this.$request({
            method: 'POST',
            url: backend.cmisBiz + '/api/pvpauthorize/riskitem0104',
            data: _this.$refs.refTable.selections[0]
          }).then(({code, message, data}) => {
            if (code == 0) {
              let risk = data;
              // 请求成功
              if (risk.riskResultType == '3') {
                _this.$xutils.showConfirmBox(
                  '提示',
                  risk.riskResultDesc +
            ',是否继续发送?',
                  450,
                  300,
                  confirm => {
                    if (confirm) {
                      _this.sendpvpcheckretail();
                    }
                  }
                );
              } else {
                _this.sendpvpcheckretail();
              }
            }
          });
        }
      });
    },

    sendFn () {
      let _this = this;
      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/pvpauthorize/sendAuthToCoreForXd',
        data: _this.$refs.refTable.selections[0]
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data == 1) {
            // 操作成功
            _this.$message({ message: message, type: 'success' });
            _this.$refs.refTable.remoteData();
          } else {
            // 操作失败
            _this.$message({ message: message, type: 'warning' });
            _this.$refs.refTable.remoteData();
          }
        }
      });
    },

    sendpvpcheckretail () { // 判断账户是否为正常
      let _this = this;
      yufp.service.request({
        async: true,
        method: 'POST',
        url: backend.cmisBiz + '/api/pvpauthorize/sendpvpcheckretail',
        data: {pvpSerno: _this.$refs.refTable.selections[0].pvpSerno},
        callback: function (code, message) {
          if (code == 0) {
            _this.sendFn();
          } else {
            _this.$message({ message: message, type: 'warning' });
          }
          _this.loanflag = false;
        }
      });
    },
    returnDescFlag (data) {
      if (data.returnDesc == '' || data.returnDesc == null) { return false }
      return true;
    },

    retailcz () {
      let _this = this;
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }

      let managerId = _this.$refs.refTable.selections[0].managerId;
      if (_this.$xutils.getDefaultformulaData('$LoginLoginCode') != managerId) {
        _this.$message({ message: '只能对本人的数据发起冲正', type: 'warning' });
        return;
      }
      this.loanflag = true;
      _this.$request({
        method: 'POST',
        url: backend.cmisBiz + '/api/pvpauthorize/retailcz',
        data: _this.$refs.refTable.selections[0]
      }).then(({code, message, data}) => {
        if (code == 0) {
          // 请求成功
          if (data == 1) {
            // 操作成功
            _this.$message({ message: message, type: 'success' });
            _this.$refs.refTable.remoteData();
          } else {
            // 操作失败
            _this.$message({ message: message, type: 'warning' });
            _this.$refs.refTable.remoteData();
          }
          this.loanflag = false;
        }
      });
    }


  }
};
</script>