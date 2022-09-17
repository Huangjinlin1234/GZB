<template>
  <!--
    @created by 詹煜彪
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 贷款出账申请偿还借据关联
  -->
  <div>
    <yu-panel title="偿还借据" :hideFilter="false" :collapseHide="false" :disabled="isFormDisabled">
      <yu-button-drop >
          <yu-button @click="addFn"  type="primary" :hidden="isHidden">引入</yu-button>
          <yu-button @click="modifyFn" type="primary" :hidden="isHidden">取消引入</yu-button>
          <yu-button @click="claJxhj" type="primary" :hidden="isHidden">批量试算</yu-button>
          <yu-button @click="infoFn" type="primary">查看</yu-button>
      </yu-button-drop>
      <yu-xtable ref="refTableParent" row-number :data-url="dataUrl" request-type="POST" condition-key="condition" style="margin-top: 10px" :base-params="dataParams" >
        <yu-xtable-column label="借据编号" prop="billNo" width=""></yu-xtable-column>
        <yu-xtable-column label="合同编号" prop="contNo" width=""></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="guarMode" width="" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        <yu-xtable-column label="产品名称" prop="prdName" width=""></yu-xtable-column>
        <yu-xtable-column label="贷款发放币种" prop="contCurType" width="" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
        <yu-xtable-column label="贷款金额" prop="loanAmt" width=""></yu-xtable-column>
        <yu-xtable-column label="贷款余额" prop="loanBal" width=""></yu-xtable-column>
        <yu-xtable-column label="贷款起始日" prop="loanStartDate" width=""></yu-xtable-column>
        <yu-xtable-column label="贷款到期日" prop="loanEndDate" width=""></yu-xtable-column>
        <yu-xtable-column label="台账状态" prop="accStatus" width="" data-code="STD_ACC_STATUS"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <!-- 弹框 -->
    <yu-xdialog :title="viewTitle[viewType]" :visible.sync="dialogVisible" width="1600px" height="600px">
      <yu-panel title="借据台账" :hideFilter="false" :collapseHide="false">
        <div :hidden="isFormHidden">
          <yu-xform form-type="search" v-model="searchFormdata" label-width="60px" related-table-name="refTable">
            <yu-xform-group :column="2">
              <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId"></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" fuzzy-query="both"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </div>
        <yu-xtable ref="refTable" :row-number="true" :pageable="true" :data-url="dataUrlAccLoan" :default-load="true" condition-key="condition" :base-params="baseParams" request-type="POST">
          <yu-xtable-column label="借据编号" prop="billNo" width="140px"></yu-xtable-column>
          <yu-xtable-column label="合同编号" prop="contNo" width="140px"></yu-xtable-column>
          <yu-xtable-column label="客户编号" prop="cusId" width="100px"></yu-xtable-column>
          <yu-xtable-column label="客户名称" prop="cusName" width="140px"></yu-xtable-column>
          <yu-xtable-column label="产品编号" prop="prdId" width="100px"></yu-xtable-column>
          <yu-xtable-column label="产品名称" prop="prdName" width="140px"></yu-xtable-column>
          <yu-xtable-column label="贷款金额" prop="loanAmt" width="100px"></yu-xtable-column>
          <yu-xtable-column label="贷款余额" prop="loanBalance" width="100px"></yu-xtable-column>
          <yu-xtable-column label="逾期余额" prop="overdueBalance" width="100px"></yu-xtable-column>
          <yu-xtable-column label="表内欠息" prop="innerOweInt" width="100px"></yu-xtable-column>
          <yu-xtable-column label="表外欠息" prop="outOweInt" width="100px"></yu-xtable-column>
          <yu-xtable-column label="贷款期限" prop="loanTerm" hide-column></yu-xtable-column>
          <yu-xtable-column label="应收利息累计" prop="recIntAccum" width="100px"></yu-xtable-column>
          <yu-xtable-column label="执行利率（月）" prop="realityIrM" width="100px"></yu-xtable-column>
        </yu-xtable>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirmFn" size="small">确认</el-button>
          <el-button @click="clearFn" size="small">取消</el-button>
        </div>
      </yu-panel>
    </yu-xdialog>
    <yu-panel title="试算结果信息" :hideFilter="false" :collapseHide="false">
        <yu-xtable ref="refSTable" row-number :data-url="dataUrlSAccLoan" condition-key="condition" request-type="POST" :base-params="jxhjParams" >
          <yu-xtable-column label="借据编号" prop="billNo"></yu-xtable-column>
          <yu-xtable-column label="还款处理状态" prop="checkStatus" ></yu-xtable-column>
          <yu-xtable-column label="拖欠本金(元)" prop="prcp"></yu-xtable-column>
          <yu-xtable-column label="拖欠利息(元)" prop="normInt"></yu-xtable-column>
          <yu-xtable-column label="拖欠罚息(元)" prop="odInt"></yu-xtable-column>
          <yu-xtable-column label="拖欠复利(元)" prop="commOdInt"></yu-xtable-column>
          <yu-xtable-column label="未到期本金(元)" prop="nextPrcp"></yu-xtable-column>
          <yu-xtable-column label="应计利息(元)" prop="nextInt"></yu-xtable-column>
          <yu-xtable-column label="自还本金(元)" prop="selfPrcp"></yu-xtable-column>
          <yu-xtable-column label="自还利息(元)" prop="selfInt"></yu-xtable-column>
          <yu-xtable-column label="借新本金(元)" prop="newLoanAmt"></yu-xtable-column>
        </yu-xtable>
     </yu-panel>
  </div>
</template>
<script>
/* eslint vue/no-unused-components:0 */
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_CUR_TYP,STD_ACC_STATUS');
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
export default {
  components: { YufpDemoSelector },
  data: function () {
    return {
      searchFormdata: {},
      dataUrl: backend.cmisBiz + '/api/pvploanapprepaybillrell/queryRepayBillRell',
      dataUrlAccLoan: backend.cmisBiz + '/api/accloan/queryassociatedaccloan',
      dataUrlSAccLoan: backend.cmisBiz + '/api/pvpjxhjrepayloan/selectrepayloan',
      dataParams: {},
      jxhjParams: {},
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
      dialogVisible: false,
      formDisabled: false,
      viewType: 'DETAIL',
      viewTitle: yufp.lookup.find('CRUD_TYPE', false),
      saveBtnShow: true,
      op: '',
      pvpSerno: '',
      isFormDisabled: false,
      isHidden: false,
      baseParams: {},
      isFormHidden: false,
      obj: {}
    };
  },

  created () {
    var _this = this;
    var obj = {};
    if (_this.getFactory().contextData.instanceInfo) {
      obj = _this.getFactory().contextData.instanceInfo;
      _this.pvpSerno = obj.bizId;
      _this.op = 'VIEW';
    } else if (_this.$route.meta.params) {
      obj = _this.$route.meta.params;
      _this.pvpSerno = obj.pvpSerno;
      _this.op = obj.op;
    } else if (_this.getFactory().contextData) {
      obj = _this.getFactory().contextData;
      _this.pvpSerno = obj.pvpSerno;
      _this.op = obj.op;
    }
    if (this.$route.meta.params != null && this.$route.meta.params.PageType != null && this.$route.meta.params.PageType != 'LOOK') {
      _this.isFormDisabled = false;
      _this.isHidden = false;
    } else {
      _this.isFormDisabled = true;
      _this.isHidden = true;
    }

    _this.obj = obj;
    _this.dataParams = {condition: {serno: _this.pvpSerno}};
    _this.jxhjParams = {condition: {serno: _this.pvpSerno}};
    _this.baseParams = {condition: {contNo: _this.obj.contNo, prdId: _this.obj.prdId, loanModal: _this.obj.loanModal, cusId: _this.obj.cusId}};
  },

  methods: {
    /**
     * 取消
     */
    clearFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    },

    claJxhj: function () {
      var _this = this;
      var pvpSerno = _this.obj.pvpSerno;
      yufp.service.request({
        method: 'POST',
        data: { condition: JSON.stringify({serno: pvpSerno})},
        url: backend.cmisBiz + '/api/pvpjxhjrepayloan/clajxhjloanrepay',
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data.rtnCode == '000000') {
              _this.$message({ message: '操作成功', type: 'success' });
              _this.$refs.refSTable.remoteData();
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
    },
    /**
     * 确定
     */
    confirmFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/pvploanapprepaybillrell/leadInAccLoan',
        data: { billNo: selections[0].billNo, pvpSerno: _this.obj.pvpSerno},
        callback: function (code, message, response) {
          _this.dialogVisible = false;
          _this.$refs.refTableParent.remoteData();
        }
      });
    },

    /**
     * 保存
     */
    saveFn: function () {
      var _this = this;
      var model = {};
      yufp.clone(_this.formdata, model);
      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: '/trade/example/save',
        data: model,
        callback: function (code, message, response) {
          _this.$refs.refTable.remoteData();
          _this.$message('操作成功');
          _this.dialogVisible = false;
        }
      });
    },

    /**
     * 控制保存按钮、xdialog、表单的状态
     * @param viewType 表单类型
     * @param editable 可编辑,默认false
     */
    switchStatus: function (viewType, editable) {
      var _this = this;
      _this.viewType = viewType;
      _this.saveBtnShow = editable;
      if (_this.obj.loanModal == '3' || _this.obj.loanModal == '6') {
        _this.isFormHidden = true;
      }
      _this.dialogVisible = true;
      _this.formDisabled = !editable;
    },

    /**
     * 引入
     */
    addFn: function () {
      var _this = this;
      _this.switchStatus('ADD', true);
      _this.$nextTick(function () {
        // _this.$refs.refForm.resetFields();
      });
    },

    /**
     * 取消引入
     */
    modifyFn: function () {
      var _this = this;
      var selections = _this.$refs.refTableParent.selections;
      if (selections.length < 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将取消引入, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/pvploanapprepaybillrell/deleterepaybillrell/' + selections[0].billNo,
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.$refs.refTableParent.remoteData();
                  _this.$message({ message: '取消引入成功', type: 'success' });
                } else {
                  _this.$message({ message: '取消引入失败', type: 'error' });
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
      var selectionsAry = _this.$refs.refTableParent.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var params = selectionsAry[0];
      // 贷款台账模块
      params['model_group_no'] = 'ACC_LOAN_VIEW_MODE';
      params['op'] = 'VIEW';
      params['bill_no'] = params.billNo;

      this.$dialog.open(
        '贷款台账',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        params
      );
    },

    /**
     * 删除
     */
    deleteFn: function () {
      var _this = this;
      var selections = _this.$refs.refTable.selections;
      if (selections.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      var len = selections.length,
        arr = [];
      for (var i = 0; i < len; i++) {
        arr.push(selections[i].id);
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: '/trade/example/delete',
              data: {
                ids: arr.join(',')
              },
              callback: function (code, message, response) {
                _this.$refs.refTable.remoteData();
                _this.$message('操作成功');
              }
            });
          }
        }
      });
    }
  }
};
</script>