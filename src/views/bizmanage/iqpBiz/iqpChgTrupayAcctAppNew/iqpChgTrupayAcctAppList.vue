<template>
  <!--
    @created by 屈文
    @description 修改受托支付账号列表、历史列表
  -->
  <div class="tab-search">
    <yu-tabs v-model="activeName" @tab-click="handleClick">
      <yu-tab-pane label="待发起" name="messageTip">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTable" form-type="search" v-model="searchFormdata" label-width="60px">
              <yu-xform-group :column="3">
                <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"  fuzzy-query="both"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-toolbar>
            <!--<yu-button @click="addFn">新增</yu-button>-->
            <yu-button v-if="checkCtrl('edit')" @click="modifyFn">修改</yu-button>
            <yu-button v-if="checkCtrl('view')" @click="infoFn">查看</yu-button>
            <yu-button v-if="checkCtrl('delete')" @click="deleteFn">删除</yu-button>
          </yu-toolbar>
          <yu-xtable ref="refTable" row-number :data-url="dataUrl" condition-key="condition" selection-type="radio" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="serno" hide-column></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="交易对手账户" prop="toppAccno"></yu-xtable-column>
            <yu-xtable-column label="交易对手名称" prop="toppName"></yu-xtable-column>
            <yu-xtable-column label="交易对手金额" prop="toppAmt"></yu-xtable-column>
            <yu-xtable-column label="登记日期" prop="inputDate"></yu-xtable-column>
            <yu-xtable-column label="登记人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="已处理" name="deal">
        <yu-panel title="输入查询条件" :hideFilter="false" :collapseHide="false">
            <yu-xform related-table-name="refTableHis" form-type="search" v-model="searchHisFormdata" label-width="60px">
              <yu-xform-group :column="3">
                <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
                <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
              </yu-xform-group>
            </yu-xform>
          <yu-button-drop>
            <yu-button @click="doCore">通知核心</yu-button>
            <yu-button v-if="checkCtrl('viewhis')" @click="viewFn">查看</yu-button>
          </yu-button-drop>
          <yu-xtable ref="refTableHis" row-number :data-url="dataHisUrl" condition-key="condition" selection-type="radio" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="serno" hide-column></yu-xtable-column>
            <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
            <yu-xtable-column label="合同编号" prop="contNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="交易对手账户" prop="toppAccno"></yu-xtable-column>
            <yu-xtable-column label="交易对手名称" prop="toppName"></yu-xtable-column>
            <yu-xtable-column label="交易对手金额" prop="toppAmt"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerId"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrId"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
            <yu-xtable-column label="是否成功通知核心" prop="authStatus" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <!--修改受托支付账号新增向导-->
      <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisibleGuide" width="1500px" height="700px">
        <yu-panel title="修改受托支付账号新增向导" :hideFilter="false" :collapseHide="false">
          <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" :custom-search-fn="customSearch">
            <yu-xform-group :column="4">
              <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo"></yu-xform-item>
              <yu-xform-item label="客户编号" ctype="yu-xcustom" placeholder="客户编号" name="cusId"  @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','name':'cusName'}" width="730" height="480" ></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </yu-xdialog>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_STATUS');
import mixinForm from '@/utils/mixins/mixin-form';
import mixinList from '@/utils/mixins/mixin-list';
export default {
  mixins: [mixinForm, mixinList],
  data: function () {
    return {
      activeName: 'messageTip',
      searchFormdata: {},
      searchHisFormdata: {},
      formdataNext: {},
      dataUrl: backend.cmisBiz + '/api/iqpchgtrupayacctapp/tosignlist',
      dataHisUrl: backend.cmisBiz + '/api/iqpchgtrupayacctapp/donesignlist',
      formdata: {},
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
      dialogVisibleGuide: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false)
    };
  },
  methods: {
    /**
     * 新增按钮
     */
    addFn: function () {
      var _this = this;
      _this.dialogVisibleGuide = true;
    },

    /**
     * 下一步
     */
    nextFn: function () {
      var _this = this;
      var op = 'ADD';
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$xutils.showMsgBox('提示', '请选择一条记录', 350, 150);
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpchgtrupayacctapp/savechgtrupayacctappinfo',
        data: jsoPar,
        callback: function (code, message, response) {
          var retvalue = response.code;
          var data = response.data;
          if (retvalue == '0') {
            _this.$message('保存成功');
            // 返回对应的流水号去查询
            _this.jumpFactory(data, op);
          } else {
            _this.$message(response.message);
            return;
          }
        }
      });
    },

    /**
     * 取消
     */
    cancelFn: function () {
      var _this = this;
      _this.dialogVisibleGuide = false;
    },

    /**
     * 修改
     */
    modifyFn: function () {
      var _this = this;
      var op = 'EDIT';
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }

      var jsoPar = _this.$refs.refTable.selections[0];
      if (jsoPar.approveStatus != '000' && jsoPar.approveStatus != '992') {
        _this.$message({
          message: '只允许修改【待发起】【打回】的数据!',
          type: 'warning'
        });
        return;
      }
      _this.jumpFactory(jsoPar, op);
    },

    // 调模版工厂
    jumpFactory: function (jsoPar, op) {
      var _this = this;
      var modelGroupNo = 'CMG000730';
      jsoPar['model_group_no'] = modelGroupNo;
      jsoPar['op'] = op;
      // _this.$dialog.open(
      //   '',
      //   'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
      //   1400,
      //   800,
      //   jsoPar,
      //   function () {
      //     _this.$refs.refTable.remoteData();
      //   },
      //   true,
      //   true
      // );
      _this.$router.addTab({
        name: 'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        key: jsoPar.serno + '_' + new Date().getTime(),
        title: '修改受托账号',
        data: jsoPar,
        function () {
          _this.$refs.refTable.remoteData();
        }
      });
    },

    /**
     * 刪除按钮
     */
    deleteFn: function () {
      var _this = this;
      if (_this.$refs.refTable.selections.length !== 1) {
        _this.$message({
          message: '必须选择一条记录进行操作',
          type: 'warning'
        });
        return;
      }
      var iqpChgTrupayAcctApp = _this.$refs.refTable.selections[0];
      if (iqpChgTrupayAcctApp.approveStatus != '000' && iqpChgTrupayAcctApp.approveStatus != '992') {
        _this.$message({
          message: '只允许修改【待发起】【打回】的数据!',
          type: 'warning'
        });
        return;
      }

      // 000进行逻辑删除，992改为996
      if (iqpChgTrupayAcctApp.approveStatus == '000') {
        iqpChgTrupayAcctApp['oprType'] = '02';
      }
      if (iqpChgTrupayAcctApp.approveStatus == '002') {
        iqpChgTrupayAcctApp['approveStatus'] = '996';
      }
      _this.$confirm('确认删除数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            // 调用删除方法
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/iqpchgtrupayacctapp/update',
              data: iqpChgTrupayAcctApp,
              callback: function (code, message, response) {
                if (response.code == '0') {
                  _this.$message('删除成功');
                  _this.$refs.refTable.remoteData();
                } else {
                  _this.$message('删除失败');
                  _this.$refs.refTable.remoteData();
                  return;
                }
              }
            });
          }
        }
      });
    },

    /**
     * 详情
     */
    infoFn: function () {
      var _this = this;
      var op = 'VIEW';
      if (_this.$refs.refTable.selections.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var jsoPar = _this.$refs.refTable.selections[0];
      _this.jumpFactory(jsoPar, op);
    },

    /**
     * 历史详情
     */
    viewFn: function () {
      var _this = this;
      var op = 'VIEW';
      if (_this.$refs.refTableHis.selections.length != 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var jsoPar = _this.$refs.refTableHis.selections[0];
      _this.jumpFactory(jsoPar, op);
    },

    // 通知核心
    doCore: function () {
      var _this = this;
      var selectionsAry = _this.$refTableHis.selections;
      if (selectionsAry.length !== 1) {
        _this.$notify({
          title: '提示',
          message: '请先选择一条记录',
          special: true,
          type: 'warning'
        });
        return;
      }
      // 授权状态 authStatus(00-未授权 01-授权失败 02-已授权 03-授权已撤销 04-失败已重发)
      // 出账状态 tradeStatus （1-未出账 2-已出账 3-冲正申请中 4-已冲正）
      if (selectionsAry[0].authStatus != '00') {
        _this.$message({
          message: '只能对未授权的数据通知核心',
          type: 'warning'
        });
        return;
      }
      // 核心出账
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpchgtrupayacctapp/sendcore',
        data: selectionsAry[0],
        callback: function (code, message, response) {
          if (response.code == 0) {
            _this.$message({ message: '通知成功', type: 'success' });
          } else {
            _this.$message({
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
