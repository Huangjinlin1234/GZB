<template>
  <!--
    @created by chenlong9
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 银承出账保证金信息
  -->
  <div>
    <yu-panel title="保证金信息" :hideFilter="false" :collapseHide="false" >
      <yu-toolbar>
        <yu-button type="primary" @click="addFn" :hidden="isHidden">新增</yu-button>
        <yu-button type="primary" @click="updateFn" :hidden="isHidden">修改</yu-button>
      </yu-toolbar>
      <yu-xtable ref="refTable" row-number border :data="bailaccinfo" :pageable="false">
        <yu-xtable-column label="保证金账号" :disabled="isDisabled" prop="bailAccNo" icon="search" :triger-click="false" :on-icon-click="initBail" :data="bailAccNoData"></yu-xtable-column>
        <yu-xtable-column label="保证金账号子序号" prop="bailAccNoSub"></yu-xtable-column>
        <yu-xtable-column label="开户行号" prop="acctsvcrNo"></yu-xtable-column>
        <yu-xtable-column label="保证金金额" prop="bailAmt" :disabled="isDisabled"></yu-xtable-column>
        <yu-xtable-column label="保证金计息方式" prop="bailInterestMode" data-code="STD_BAIL_INTEREST_MODE" :disabled="isDisabled"></yu-xtable-column>
        <yu-xtable-column label="操作" prop="opr" align="center">
          <template slot-scope="drawScope">
            <!--<yu-button type="primary" size="small" @click="bailSave(drawScope.$index, drawScope.row)" :hidden="isHidden">保存</yu-button>-->
            <yu-button type="primary" size="small" @click.stop="bailDelete(drawScope.$index, drawScope.row)" :hidden="isHidden">删除</yu-button>
          </template>
        </yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>

// 注册字典项 保证金计息方式
yufp.lookup.reg('STD_BAIL_INTEREST_MODE');
export default {
  data: function () {
    return {
      isHidden: false,
      isDisabled: false,
      serno: '',
      tableParams: {},
      bailaccinfo: [],
      tableUrl: backend.cmisBiz + '/api/bailaccinfo/getList',
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ],
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true
    };
  },

  mounted () {
    var _this = this;
    this.getFactory().setButtonVisiable('commit', false);
    this.getFactory().setButtonVisiable('save', false);
    this.getFactory().setButtonVisiable('tempSave', false);
    this.getFactory().setButtonVisiable('back', false);
    let data = '';
    let pvpSerno = '';
    let cusId = '';
    let op = '';
    if (_this.getFactory().contextData.instanceInfo) {
      data = _this.getFactory().contextData.instanceInfo;
      pvpSerno = data.bizId;
      cusId = data.param.cusId;
      op = data.param.op;
    } else if (_this.$route.meta.params) {
      data = _this.$route.meta.params;
      pvpSerno = data.pvpSerno;
      cusId = data.cusId;
      op = data.op;
    } else if (_this.getFactory().contextData) {
      data = _this.getFactory().contextData;
      pvpSerno = data.pvpSerno;
      cusId = data.cusId;
      op = data.op;
    }

    // 进入初始化
    _this.serno = pvpSerno;
    _this.cusId = cusId;
    _this.op = op;
    if (_this.op == 'VIEW' || _this.op == 'view') {
      this.isHidden = true;
      this.isDisabled = true;
    }
    this.tableParams = { serno: pvpSerno, cusId: cusId};
    this.getAllBailData(this.tableParams);
  },

  methods: {
    getAllBailData: function (tableParams) {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: backend.cmisBiz + '/api/bailaccinfo/getList/',
        data: tableParams,
        callback: function (code, message, response) {
          _this.bailaccinfo = response.data || [];
        }
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
      // _this.bailaccinfo.push({
      //   serno: _this.serno
      // });
      var data = { serno: _this.serno, cusId: _this.cusId};
      this.$dialog.open('', 'zrcbank/biz/pvpAccpApp/bailAccInfoAdd', 800, 800, data, params => {
        _this.getAllBailData(_this.tableParams);
      });
    },

    /**
     * 修改按钮
     */
    updateFn: function () {
      var _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length != 1) {
        _this.$message({
          message: '请先选择一条记录！',
          type: 'warning'
        });
        return;
      }
      let jsoPar = _this.$refs.refTable.selections[0];
      jsoPar['cusId'] = _this.cusId;
      this.$dialog.open('', 'zrcbank/biz/pvpAccpApp/bailAccInfoAdd', 800, 800, jsoPar, params => {
        _this.getAllBailData(_this.tableParams);
      });
    },

    // 选取保证金
    initBail: function (value) {
      var _this = this;
      let jsoPar = _this.$refs.refTable.selections[0];
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
        _this.$refs.refTable.selections[0].acctsvcrNo = params.acctsvcrNo;
      });
    },

    // 保证金信息删除
    bailDelete: function (index, row) {
      var _this = this;
      if (!row.pkId) {
        _this.bailaccinfo.splice(index, 1);
      } else {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/bailaccinfo/delete/' + row.pkId,
          callback: function (code, message, response) {
            if (response.data == 1) {
              _this.bailaccinfo.splice(index, 1);
              _this.$message({message: '删除成功', type: 'success'});
              _this.$refs.refTable.remoteData();
            } else {
              _this.$message({message: '删除失败', type: 'error'});
              _this.$refs.refTable.remoteData();
            }
          }
        });
      }
    },

    // 保证金信息保存
    bailSave: function (index, row) {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/bailaccinfo/savebailaccinfo',
        data: row,
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.dialogVisible = false;
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
  }
};
</script>
