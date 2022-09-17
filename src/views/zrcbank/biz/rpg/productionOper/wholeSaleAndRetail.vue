
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="批发与零售业" panel-type="simple">
      <div id="opera">
       <table  cellspacing="0" cellpadding="0" border="1" >
       <colgroup class="el-table_group">
          <col width="10%">
          <col width="20%">
          <col width="5%">
          <col width="20%">
          <col width="50%">
        </colgroup>
        <tr height="50px">
          <td colspan="2">特许经营机制</td>
          <td colspan="3">
          <yu-input type="input" v-model="basicFormData.franchiseMechanism"></yu-input>
          </td>
        </tr>
        <tr height="50px">
          <td colspan="2" rowspan="6">产品</td>
          <td colspan="3">前三大主营业务占比情况（或主营产品）</td>
        </tr>
        <tr height="50px">
          <td colspan="2">主营业务</td>
          <td>占比或相关文字说明</td>
        </tr>
        <tr height="50px">
          <td>1.</td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi1"></yu-input></td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi1Memo"></yu-input></td>
        </tr>
        <tr height="50px">
        <td>2.</td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi2"></yu-input></td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi2Memo"></yu-input></td>
        </tr>
        <tr height="50px">
        <td>3.</td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi3"></yu-input></td>
          <td><yu-input type="input" v-model="basicFormData.mainBusi3Memo"></yu-input></td>
        </tr>
        <tr height="50px">
          <td colspan="2">其他说明</td>
          <td><yu-input type="input" v-model="basicFormData.otherDesc"></yu-input></td>
        </tr>
        </table>
      </div>
      <yu-panel title="销售" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
          <yu-button type="primary" @click="addSalesFn" v-show="op!='VIEW'">添加</yu-button>
          <yu-button type="primary" @click="editSalesFn" v-show="op!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="delectSalesFn" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="salesTable" row-number :pageable="false" :data="salesData">
          <yu-xtable-column prop="productType" label="产品品种"></yu-xtable-column>
          <yu-xtable-column prop="cusName" label="客户名称"></yu-xtable-column>
          <yu-xtable-column prop="lastCurrSaleAmt" label="上年销售金额"></yu-xtable-column>
          <yu-xtable-column prop="perc" label="上年销售金额占比"></yu-xtable-column>
          <yu-xtable-column prop="settlementMethod" label="结算方式及账期"></yu-xtable-column>
          <yu-xtable-column prop="coopYear" label="合作年限"></yu-xtable-column>
          <yu-xtable-column prop="lastCurrAccouantRevice" label="年末应收账款余额"></yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="下游前几大客户分析" :visible.sync="dialogSales" width="1000px">
          <yu-xform ref="salesDialog" label-width="160px" v-model="dialogFormSales">
            <yu-xform-group :column="2">
              <yu-xform-item label="产品品种" name="productType" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
              <yu-xform-item label="上年销售金额" name="lastCurrSaleAmt" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="上年销售金额占比" name="perc" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="结算方式及账期" name="settlementMethod" ctype="input"></yu-xform-item>
              <yu-xform-item label="合作年限" name="coopYear" ctype="input"></yu-xform-item>
              <yu-xform-item label="年末应收账款余额" name="lastCurrAccouantRevice" ctype="yu-num"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="saveSales">保存</yu-button>
              <yu-button type="primary" @click="backSales">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
      </yu-panel>
      <yu-panel title="采购" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;" >
          <yu-button type="primary" @click="addPurchaseFn" v-show="op!='VIEW'">添加</yu-button>
          <yu-button type="primary" @click="editPurchaseFn" v-show="op!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="delectPurchaseFn" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="purchaseTable" row-number :pageable="false"  :data="purchaseData">
          <yu-xtable-column prop="buyType" label="采购品种"></yu-xtable-column>
          <yu-xtable-column prop="cusName" label="客户名称"></yu-xtable-column>
          <yu-xtable-column prop="lastCurrBuyAmt" label="上年采购金额"></yu-xtable-column>
          <yu-xtable-column prop="perc" label="上年采购金额占比"></yu-xtable-column>
          <yu-xtable-column prop="settlementMethod" label="结算方式及账期"></yu-xtable-column>
          <yu-xtable-column prop="coopYear" label="合作年限"></yu-xtable-column>
          <yu-xtable-column prop="priceWaveCase" label="价格波动情况"></yu-xtable-column>
          <yu-xtable-column prop="lastCurrAccouantPay" label="年末应付账款余额"></yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="上游供应商分析" :visible.sync="dialogPurchase" width="1000px">
          <yu-xform ref="purchaseDialog" label-width="160px" v-model="dialogFormPurchase">
            <yu-xform-group :column="2">
              <yu-xform-item label="采购品种" name="buyType" ctype="input"></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" ctype="input"></yu-xform-item>
              <yu-xform-item label="上年采购金额" name="lastCurrBuyAmt" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="上年采购金额占比" name="perc" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="结算方式及账期" name="settlementMethod" ctype="input"></yu-xform-item>
              <yu-xform-item label="合作年限" name="coopYear" ctype="input"></yu-xform-item>
              <yu-xform-item label="价格波动情况" name="priceWaveCase" ctype="textarea"></yu-xform-item>
              <yu-xform-item label="年末应付账款余额" name="lastCurrAccouantPay" ctype="yu-num"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="savePurchase">保存</yu-button>
              <yu-button type="primary" @click="backPurchase">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
        <yu-xform ref="purchaseForm" label-width="160px" v-model="purchaseFormData" :disabled="op =='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他需说明事项" name="buyOtherNeedDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
      </div>
    </yu-panel>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';


export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      salesData: [],
      purchaseData: [],
      dialogSales: false,
      dialogFormSales: {},
      salesType: '',
      dialogPurchase: false,
      dialogFormPurchase: {},
      purchaseType: '',
      basicFormData: {},
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.op = _this.param.op;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz + '/api/rptoperproductionoper/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.basicFormData);
            yufp.clone(response.data, _this.salesFormData);
            yufp.clone(response.data, _this.purchaseFormData);
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz +
                '/api/rptoperenergysalesdetail/selectByModel',
              data: {
                condition: JSON.stringify({ serno: _this.param.serno })
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.salesData = response.data;
                }
              }
            });
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz +
                '/api/rptoperenergypurchasedetail/selectByModel',
              data: {
                condition: JSON.stringify({ serno: _this.param.serno })
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.purchaseData = response.data;
                }
              }
            });
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    },
    addSalesFn: function () {
      var _this = this;
      _this.dialogSales = true;
      _this.salesType = 'add';
    },
    editSalesFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.salesTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogSales = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormSales);
      });
      _this.salesType = 'edit';
    },
    delectSalesFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.salesTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                backend.cmisBiz +
                '/api/rptoperenergysalesdetail/deleteSalesDetail',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.init();
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '系统错误，请联系管理员！',
                    type: 'warning'
                  });
                  return;
                }
              }
            });
          }
        }
      });
    },
    saveSales: function () {
      var _this = this;
      if (_this.salesType == 'add') {
        _this.dialogFormSales.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperenergysalesdetail/insert',
          data: _this.dialogFormSales,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogSales = false;
              _this.$refs.salesDialog.resetFields();
              _this.init();
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      } else if (_this.salesType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperenergysalesdetail/updateSalesDetail',
          data: _this.dialogFormSales,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogSales = false;
              _this.$refs.salesDialog.resetFields();
              _this.init();
              _this.$message({
                message: '操作成功！'
              });
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      }
    },
    backSales: function () {
      var _this = this;
      _this.dialogSales = false;
      _this.$refs.salesDialog.resetFields();
    },
    addPurchaseFn: function () {
      var _this = this;
      _this.dialogPurchase = true;
      _this.purchaseType = 'add';
    },
    editPurchaseFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.purchaseTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogPurchase = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormPurchase);
      });
      _this.purchaseType = 'edit';
    },
    delectPurchaseFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.purchaseTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url:
                backend.cmisBiz +
                '/api/rptoperenergypurchasedetail/deletePurchaseDetail',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.init();
                } else {
                  _this.$message({
                    duration: 4000,
                    message: '系统错误，请联系管理员！',
                    type: 'warning'
                  });
                  return;
                }
              }
            });
          }
        }
      });
    },
    savePurchase: function () {
      var _this = this;
      if (_this.purchaseType == 'add') {
        _this.dialogFormPurchase.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperenergypurchasedetail/insert',
          data: _this.dialogFormPurchase,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogPurchase = false;
              _this.$refs.purchaseDialog.resetFields();
              _this.init();
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      } else if (_this.purchaseType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptoperenergypurchasedetail/updatePurchaseDetail',
          data: _this.dialogFormPurchase,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogPurchase = false;
              _this.$refs.purchaseDialog.resetFields();
              _this.init();
              _this.$message({
                message: '操作成功！'
              });
              return;
            } else {
              _this.$message({
                duration: 4000,
                message: '系统错误，请联系管理员！',
                type: 'warning'
              });
              return;
            }
          }
        });
      }
    },
    backPurchase: function () {
      var _this = this;
      _this.dialogPurchase = false;
      _this.$refs.purchaseDialog.resetFields();
    },
    saveBtn: function () {
      var _this = this;
      var obj = {};
      obj.serno = _this.param.serno;
      obj.buyOtherNeedDesc = _this.purchaseFormData.buyOtherNeedDesc;
      obj.otherDesc = _this.basicFormData.otherDesc;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz +
          '/api/rptoperproductionoper/updateProductionOper',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            return;
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }
      });
    }
  }
};
</script>
<style>
#opera tr > td {
  border: 1px solid #a2aebd;
  height: 30px;
  padding: 3px 10px;
  font-size: 14px;
}
</style>
