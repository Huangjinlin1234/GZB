<template>
  <div>
    <yu-panel title="保证金信息" :hideFilter="false" :collapseHide="false" >
          <yu-toolbar>
            <yu-button @click="addFn" :hidden="isHidden">新增</yu-button>
            <yu-button @click="deleteFn" :hidden="isHidden">删除</yu-button>
            <yu-button @click="saveFn" :hidden="isHidden">保存</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number border :data="bailaccinfo" :pageable="false">
            <yu-xtable-column label="保证金账号" prop="bailAccNo" ctype="input" icon="search" :triger-click="false" :on-icon-click="initBail" :data="bailAccNoData"></yu-xtable-column>
            <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub"></yu-xtable-column>
            <yu-xtable-column label="开户行号" prop="acctsvcrName"></yu-xtable-column>
            <yu-xtable-column label="保证金金额" prop="bailAmt" ctype="input" :disabled="isDisabled"></yu-xtable-column>
            <yu-xtable-column label="保证金计息方式" prop="bailInterestMode" ctype="select" data-code="STD_BAIL_INTEREST_MODE" :disabled="isDisabled"></yu-xtable-column>
          </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
// 注册字典项 保证金计息方式
yufp.lookup.reg('STD_BAIL_INTEREST_MODE');
import mixinList from '@/utils/mixins/mixin-list';
export default{
  name: 'D1BABillList',
  mixins: [mixinList],
  data: function () {
    return {
      serno: '',
      tableParams: {},
      bailaccinfo: [],
      tableUrl: backend.cmisBiz + '/api/bailaccinfo/showlist',
      add: true,
      del: true,
      pkField: 'pkId',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: this.$backend.cmisBiz + '/api/bailaccinfo/',
      baseParams: {}
    };
  },
  mounted () {
    var _this = this;
    let data = _this.getFactory().contextData;
    // 进入初始化
    _this.serno = data.serno;
    _this.op = data.op;
    if (_this.op == 'VIEW') {
      this.isHidden = true;
      this.isDisabled = true;
    }
    this.tableParams = { serno: _this.serno };
    this.getAllBailData(this.tableParams);
  },
  methods: {
    getAllBailData: function (tableParams) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bailaccinfo/getList/',
        data: tableParams,
        callback: function (code, message, response) {
          _this.bailaccinfo = response.data;
        }
      });
    },

    // 选取保证金
    initBail: function (value) {
      var _this = this;
      let jsoPar = _this.$refs.refTable.selections[0];
      let serno = _this.getFactory().contextData.serno;
      let zhshuxin = '';
      if (!jsoPar.bailAccNo) {
        _this.$message({
          message: '请先输入保证金帐号！',
          type: 'warning'
        });
        return;
      }
      var data = { bailAccNo: jsoPar.bailAccNo, zhshuxin: zhshuxin };
      this.$dialog.open('', 'zrcbank/biz/common/commonBailSelect', 1000, 800, data, params => {
        _this.$refs.refTable.selections[0].bailAccNoSub = params.bailAccNoSub;
        _this.$refs.refTable.selections[0].acctsvcrName = params.acctsvcrName;
      });
    },

    /**
     * 选择保证金账号信息
     */
    selectBail: function (arr) {
      this.bailaccinfo[this.bailaccinfo.length - 1].bailAccNo = arr[0].bailAccNo;
      this.bailaccinfo[this.bailaccinfo.length - 1].bailAccNoSub = arr[0].bailAccNoSub;
      this.bailaccinfo[this.bailaccinfo.length - 1].acctsvcrName = arr[0].acctsvcrName;
    },
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.bailaccinfo.push({
        serno: _this.serno
      });
    },

    // 保存
    saveFn: function () {
      var _this = this;
      var data = _this.$refs.refTable.tabledata;
      for (let i = 0; i < data.length; i++) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/bailaccinfo/savebailaccinfo',
          data: data[i],
          callback: function (code, message, response) {
            if (code == 0) {
              if (response.data.rtnCode == '000000') {
                if (i == data.length - 1) {
                  _this.$message({ message: '保存成功', type: 'success' });
                }
              } else {
                _this.$message.error(response.data.rtnMsg);
              }
            } else {
              _this.$message({
                showClose: true,
                message: response.data.rtnMsg,
                type: 'error'
              });
            }
          }
        });
      }
    },

    // 删除
    deleteFn: function () {
      var _this = this;
      let selections = this.$refs.refTable.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      var row = selections[0];
      if (!row.pkId) {
        _this.bailaccinfo.splice(selections, 1);
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/bailaccinfo/delete/' + row.pkId,
          callback: function (code, message, response) {
            if (code == 0) {
              _this.bailaccinfo.splice(selections, 1);
              _this.$message('删除成功');
            } else {
              _this.$message('删除失败');
            }
          }
        });
      }
    }
  }
};
</script>
