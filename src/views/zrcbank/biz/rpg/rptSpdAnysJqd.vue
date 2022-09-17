
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="集群贷通用版" panel-type="simple">
      <yu-panel title="企业经营情况分析" panel-type="simple">
        <yu-panel title="客户、产品及销售分析" panel-type="simple">
          <yu-xform ref="baseForm" label-width="120px" v-model="baseFormData" :disabled="op =='VIEW'">
            <yu-xform-group :clomn="1">
              <yu-xform-item label="主要供应商及销售客户" name="mainCustomerIntr" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-toolbar :show-length="8" style="margin-bottom:10px;">
            <yu-button type="primary" @click="addCustomerFn" v-show="op!='VIEW'">添加</yu-button>
            <yu-button type="primary" @click="updateCustomerFn" v-show="op!='VIEW'">修改</yu-button>
            <yu-button type="primary" @click="deleteCustomerFn" v-show="op!='VIEW'">删除</yu-button>
          </yu-toolbar>
          <yu-xtable ref="customerTable" row-number :data-url="customerUrl" :pageable="false" :base-params="customerParam" request-type="POST">
            <yu-xtable-column prop="mainSupplier" label="主要供应商"></yu-xtable-column>
            <yu-xtable-column prop="supplierPrec" label="采购比例"></yu-xtable-column>
            <yu-xtable-column prop="supplierTerm" label="结账周期"></yu-xtable-column>
            <yu-xtable-column prop="mainSeller" label="主要销售商"></yu-xtable-column>
            <yu-xtable-column prop="sellerPrec" label="采购比例"></yu-xtable-column>
            <yu-xtable-column prop="sellerTerm" label="结账周期"></yu-xtable-column>
          </yu-xtable>
          <yu-xdialog title="主要供应商及销售客户" :visible.sync="customerDialogVisible" width="1000px">
            <yu-xform ref="customerRefFormDialog" label-width="160px" v-model="customerFormdataDialog">
              <yu-xform-group :column="2">
                <yu-xform-item label="主要供应商" name="mainSupplier" ctype="input"></yu-xform-item>
                <yu-xform-item label="采购比例" name="supplierPrec" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
                <yu-xform-item label="结账周期" name="supplierTerm" ctype="input"></yu-xform-item>
                <yu-xform-item label="主要销售商" name="mainSeller" ctype="input"></yu-xform-item>
                <yu-xform-item label="采购比例" name="sellerPrec" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
                <yu-xform-item label="结账周期" name="sellerTerm" ctype="input"></yu-xform-item>
              </yu-xform-group>
              <div class="yu-grpButton">
                <yu-button type="primary" @click="saveCustomer">保存</yu-button>
                <yu-button type="primary" @click="canclCustomer">返回</yu-button>
              </div>
            </yu-xform>
          </yu-xdialog>
          <yu-xform ref="customerForm" label-width="120px" v-model="customerFormData" :disabled="op =='VIEW'">
            <yu-xform-group :clomn="1">
              <yu-xform-item label="情况分析" name="mainCustomerAnys" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="主要产品成本结构分析" panel-type="simple">
          <yu-toolbar :show-length="8" style="margin-bottom:10px;">
            <yu-button type="primary" @click="addProductFn" v-show="op!='VIEW'">添加</yu-button>
            <yu-button type="primary" @click="updateProductFn" v-show="op!='VIEW'">修改</yu-button>
            <yu-button type="primary" @click="deleteProductFn" v-show="op!='VIEW'">删除</yu-button>
          </yu-toolbar>
          <yu-xtable ref="productTable" row-number :data-url="productUrl" :pageable="false" :base-params="productParam" request-type="POST">
            <yu-xtable-column prop="productType" label="产品种类"></yu-xtable-column>
            <yu-xtable-column prop="sellAmt" label="售价"></yu-xtable-column>
            <yu-xtable-column prop="productCost" label="根据成本结构计算成本"></yu-xtable-column>
            <yu-xtable-column prop="prec" label="占总销售比例"></yu-xtable-column>
          </yu-xtable>
          <yu-xdialog title="主要供应商及销售客户" :visible.sync="productDialogVisible" width="1000px">
            <yu-xform ref="productRefFormDialog" label-width="160px" v-model="productFormdataDialog">
              <yu-xform-group :column="2">
                <yu-xform-item label="产品种类" name="productType" ctype="input"></yu-xform-item>
                <yu-xform-item label="售价" name="sellAmt" ctype="yu-num"></yu-xform-item>
                <yu-xform-item label="根据成本结构计算成本" name="productCost" ctype="yu-num"></yu-xform-item>
                <yu-xform-item label="占总销售比例" name="prec" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
              </yu-xform-group>
              <div class="yu-grpButton">
                <yu-button type="primary" @click="saveProduct">保存</yu-button>
                <yu-button type="primary" @click="canclProduct">返回</yu-button>
              </div>
            </yu-xform>
          </yu-xdialog>
          <yu-xform ref="productForm" label-width="120px" v-model="productFormData" :disabled="op =='VIEW'">
            <yu-xform-group :clomn="1">
              <yu-xform-item label="情况分析" name="mainProductAnys" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="财务情况" panel-type="simple">
          <yu-xform ref="finaFrom" label-width="120px" v-model="finaFormData" :disabled="op =='VIEW'">
            <yu-xform-group :clomn="1">
              <yu-xform-item label="财务情况" name="finaSitu" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
      </yu-panel>
      <yu-panel title="客户分层" panel-type="simple">
        <yu-panel title="商圈/商会/园区类" panel-type="simple">
          <yu-xform ref="storeFrom" label-width="120px" v-model="storeFormData" :disabled="op =='VIEW'">
            <yu-panel title="销售收入" panel-type="simple">
              <yu-xform-group :clomn="2">
                <yu-xform-item label="属于层级" name="storeSaleLevel" ctype="input"></yu-xform-item>
                <yu-xform-item label="类似客户的市场占比" name="storeSalePrec" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="经营年限" panel-type="simple">
              <yu-xform-group :clomn="2">
                <yu-xform-item label="属于层级" name="storeSaleYearLevel" ctype="input"></yu-xform-item>
                <yu-xform-item label="类似客户的市场占比" name="storeSaleYearPrec" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="家庭净资产" panel-type="simple">
              <yu-xform-group :clomn="2">
                <yu-xform-item label="属于层级" name="storeFamilyLevel" ctype="input"></yu-xform-item>
                <yu-xform-item label="类似客户的市场占比" name="storeFamilyPrec" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-xform>
        </yu-panel>
        <yu-panel title="核心企业供应链类" panel-type="simple">
          <yu-xform ref="enterpriseFrom" label-width="120px" v-model="enterpriseFormData" :disabled="op =='VIEW'">
            <yu-panel title="销售收入" panel-type="simple">
              <yu-xform-group :clomn="2">
                <yu-xform-item label="属于层级" name="enterpriseSaleLevel" ctype="input"></yu-xform-item>
                <yu-xform-item label="类似客户的市场占比" name="enterpriseSalePrec" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="经营年限" panel-type="simple">
              <yu-xform-group :clomn="2">
                <yu-xform-item label="属于层级" name="enterpriseSaleYearLevel" ctype="input"></yu-xform-item>
                <yu-xform-item label="类似客户的市场占比" name="enterpriseSaleYearPrec" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="家庭净资产" panel-type="simple">
              <yu-xform-group :clomn="2">
                <yu-xform-item label="属于层级" name="enterpriseFamilyLevel" ctype="input"></yu-xform-item>
                <yu-xform-item label="类似客户的市场占比" name="enterpriseFamilyPrec" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
              </yu-xform-group>
            </yu-panel>
          </yu-xform>
        </yu-panel>
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
      baseFormData: {},
      customerUrl:
        this.$backend.cmisBiz + '/api/rptspdanysjqdcustomer/selectByModel',
      customerParam: { condition: JSON.stringify({ serno: this.param.serno }) },
      customerDialogVisible: false,
      customerFormdataDialog: {},
      customerType: '',
      customerFormData: {},
      productUrl:
        this.$backend.cmisBiz + '/api/rptspdanysjqdproduct/selectByModel',
      productParam: { condition: JSON.stringify({ serno: this.param.serno }) },
      productDialogVisible: false,
      productFormdataDialog: {},
      productType: '',
      productFormData: {},
      finaFormData: {},
      storeFormData: {},
      enterpriseFormData: {},
      op: ''
    };
  },
  mounted: function () {
    this.op = this.param.op;
    // 初始化参数
    var _this = this;
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
        url: _this.$backend.cmisBiz + '/api/rptspdanysjqd/selectBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.baseFormData);
            yufp.clone(response.data, _this.customerFormData);
            yufp.clone(response.data, _this.productFormData);
            yufp.clone(response.data, _this.finaFormData);
            yufp.clone(response.data, _this.storeFormData);
            yufp.clone(response.data, _this.enterpriseFormData);
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
    addCustomerFn: function () {
      var _this = this;
      _this.customerDialogVisible = true;
      _this.customerType = 'add';
    },
    updateCustomerFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.customerTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.customerDialogVisible = true;
      _this.customerType = 'edit';
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.customerFormdataDialog);
      });
    },
    saveCustomer: function () {
      var _this = this;
      var validate = false;
      _this.$refs.customerRefFormDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      if (_this.customerType == 'add') {
        _this.customerFormdataDialog.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptspdanysjqdcustomer/insertCustomer',
          data: _this.customerFormdataDialog,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.customerDialogVisible = false;
              _this.$refs.customerTable.remoteData();
              _this.$refs.customerRefFormDialog.resetFields();
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
      } else if (_this.customerType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptspdanysjqdcustomer/updateCustomer',
          data: _this.customerFormdataDialog,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.customerDialogVisible = false;
              _this.$refs.customerTable.remoteData();
              _this.$refs.customerRefFormDialog.resetFields();
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
    deleteCustomerFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.customerTable.selections;
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
                _this.$backend.cmisBiz +
                '/api/rptspdanysjqdcustomer/deleteCustomer',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$refs.customerTable.remoteData();
                  _this.$message('删除成功');
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
    // 弹窗关闭
    canclCustomer: function () {
      var _this = this;
      _this.customerDialogVisible = false;
      _this.$refs.customerRefFormDialog.resetFields();
    },
    //
    addProductFn: function () {
      var _this = this;
      _this.productDialogVisible = true;
      _this.productType = 'add';
    },
    updateProductFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.productTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.productDialogVisible = true;
      _this.productType = 'edit';
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.productFormdataDialog);
      });
    },
    saveProduct: function () {
      var _this = this;
      var validate = false;
      _this.$refs.productRefFormDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      if (_this.productType == 'add') {
        _this.productFormdataDialog.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz + '/api/rptspdanysjqdproduct/insertProduct',
          data: _this.productFormdataDialog,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.productDialogVisible = false;
              _this.$refs.productTable.remoteData();
              _this.$refs.productRefFormDialog.resetFields();
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
      } else if (_this.productType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz + '/api/rptspdanysjqdproduct/updateProduct',
          data: _this.productFormdataDialog,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.productDialogVisible = false;
              _this.$refs.productTable.remoteData();
              _this.$refs.productRefFormDialog.resetFields();
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
    deleteProductFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.productTable.selections;
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
                _this.$backend.cmisBiz +
                '/api/rptspdanysjqdproduct/deleteProduct',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$refs.productTable.remoteData();
                  _this.$message('删除成功');
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
    // 弹窗关闭
    canclProduct: function () {
      var _this = this;
      _this.productDialogVisible = false;
      _this.$refs.productRefFormDialog.resetFields();
    },
    // 保存按钮
    saveBtn: function () {
      var _this = this;
      var param = {};
      param.serno = _this.param.serno;
      param.mainCustomerIntr = _this.baseFormData.mainCustomerIntr;
      param.mainCustomerAnys = _this.customerFormData.mainCustomerAnys;
      param.mainProductAnys = _this.productFormData.mainProductAnys;
      param.finaSitu = _this.finaFormData.finaSitu;
      param.storeSaleLevel = _this.storeFormData.storeSaleLevel;
      param.storeSalePrec = _this.storeFormData.storeSalePrec;
      param.storeSaleYearLevel = _this.storeFormData.storeSaleYearLevel;
      param.storeSaleYearPrec = _this.storeFormData.storeSaleYearPrec;
      param.storeFamilyLevel = _this.storeFormData.storeFamilyLevel;
      param.storeFamilyPrec = _this.storeFormData.storeFamilyPrec;
      param.enterpriseSaleLevel = _this.enterpriseFormData.enterpriseSaleLevel;
      param.enterpriseSalePrec = _this.enterpriseFormData.enterpriseSalePrec;
      param.enterpriseSaleYearLevel =
        _this.enterpriseFormData.enterpriseSaleYearLevel;
      param.enterpriseSaleYearPrec =
        _this.enterpriseFormData.enterpriseSaleYearPrec;
      param.enterpriseFamilyLevel =
        _this.enterpriseFormData.enterpriseFamilyLevel;
      param.enterpriseFamilyPrec =
        _this.enterpriseFormData.enterpriseFamilyPrec;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysjqd/updateJqd',
        data: param,
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
