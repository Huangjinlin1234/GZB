
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 特定产品业务分析：木材贷 rpt_spd_anys_mcd   rptSpdAnysMcd
  -->
  <div>
       <yu-xform ref="mcdForm1" label-width="240px" v-model="formdatamcd1" :disabled="op =='VIEW'">
        <yu-panel title="合作方信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="申请流水号" ctype="input" name="serno"  hidden="true"></yu-xform-item>
            <yu-xform-item label="市场方编号" ctype="input" rules="required" name="partnerId" ></yu-xform-item>
            <yu-xform-item label="市场方名称" ctype="input" rules="required" name="partnerName" ></yu-xform-item>
            <yu-xform-item label="市场方额度" ctype="yu-num" rules="required" name="partnerAmt" ></yu-xform-item>
            <yu-xform-item label="已用额度" ctype="yu-num" rules="required" name="outstndAmt" ></yu-xform-item>
            <yu-xform-item label="剩余额度" ctype="yu-num" rules="required" name="leftAmt" ></yu-xform-item>
            <yu-xform-item label="市场方授信到期日" ctype="datepicker" rules="required" name="lmtTerm" ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
          <yu-panel title="上期授信木材质押情况" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="转让木材品种" ctype="input" rules="required" name="transferWoodType" ></yu-xform-item>
            <yu-xform-item label="转让木材数量(吨)" ctype="yu-num" rules="required" name="transferWoodNum" ></yu-xform-item>
            <yu-xform-item label="转让木材原货值(元)" ctype="yu-num" rules="required" name="transferOriginalValue" ></yu-xform-item>
            <yu-xform-item label="转让木材目前货值(元)" ctype="yu-num" rules="required" name="transferPresentValue" ></yu-xform-item>
            <yu-xform-item label="转让木材有无补货情况" ctype="input" rules="required" name="transferWoodDesc" ></yu-xform-item>
          </yu-xform-group>
          </yu-panel>
          <yu-panel title="本期授信木材质押情况" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="拟转让木材品种" ctype="input" rules="required" name="intendTransferWoodType" ></yu-xform-item>
            <yu-xform-item label="拟转让木材数量(吨)" ctype="yu-num" rules="required" name="intendTransferWoodNum" ></yu-xform-item>
            <yu-xform-item label="拟转让木材货值(元)" ctype="yu-num" rules="required" name="intendTransferValue" @blur="measureLmtAmt" ></yu-xform-item>
            <yu-xform-item label="最高可授信金额(元)" ctype="yu-num" rules="required" name="maxLmtAmt" disabled ></yu-xform-item>
          </yu-xform-group>
          </yu-panel>
          <yu-panel title="市场内租赁情况" panel-type="simple">
            <yu-xform-group :column="3">
            <yu-xform-item label="租赁面积" ctype="yu-num" rules="required" name="rentSqu" ></yu-xform-item>
            <yu-xform-item label="租赁期限" ctype="input" rules="number" name="rentTerm" ></yu-xform-item>
            <yu-xform-item label="租金" ctype="input" rules="required" name="rentAmt" ></yu-xform-item>
            <yu-xform-item label="支付方式" ctype="input" rules="required" name="payMode" ></yu-xform-item>
            <yu-xform-item label="租赁位置" ctype="input" rules="required" name="rentArea" ></yu-xform-item>
          </yu-xform-group>
          </yu-panel>
       </yu-xform>
      <yu-panel title="市场内经营情况" panel-type="simple">
      <yu-form-buttons class="yubfp-button-group" style="align:margin-left">
        <yu-button type="primary" @click="addMcd" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="editMcd" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="deleteMcd" v-show="op!='VIEW'">删除</yu-button>
      </yu-form-buttons>
        <yu-xtable ref="mcdTable" row-number :data="mcdData"  condition-key="condition" :pageable="false"  request-type="POST">
          <yu-xtable-column prop="woodType" label="木材品种" ></yu-xtable-column>
          <yu-xtable-column prop="inventoryNum" label="入库数量(吨)"></yu-xtable-column>
          <yu-xtable-column prop="buyAmt" label="采购金额(元)"></yu-xtable-column>
          <yu-xtable-column prop="deliveryNum" label="出库数量(吨)"></yu-xtable-column>
          <yu-xtable-column prop="salesAmt" label="销售金额(元)"></yu-xtable-column>
          <yu-xtable-column prop="currInventoryNum" label="当年库存数量(吨)"></yu-xtable-column>
          <yu-xtable-column prop="currInventoryAmt" label="当年库存金额(元)"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-xdialog title="市场内经营情况" :visible.sync="dialogMcd" width="1000px">
        <yu-xform ref="mcdDialog" label-width="160px" v-model="dialogFormDataMcd">
          <yu-xform-group :column="2">
            <yu-xform-item label="木材品种" name="woodType" ctype="input" rules="required"></yu-xform-item>
            <yu-xform-item label="入库数量(吨)" name="inventoryNum" ctype="yu-num" rules="required"></yu-xform-item>
            <yu-xform-item label="采购金额(元)" name="buyAmt" ctype="yu-num" rules="required"></yu-xform-item>
            <yu-xform-item label="出库数量(吨)" name="deliveryNum" ctype="yu-num" rules="required"></yu-xform-item>
            <yu-xform-item label="销售金额(元)" name="salesAmt" ctype="yu-num" rules="required"></yu-xform-item>
            <yu-xform-item label="当年库存数量(吨)" name="currInventoryNum" ctype="yu-num" rules="required"></yu-xform-item>
            <yu-xform-item label="当年库存金额(元)" name="currInventoryAmt" ctype="yu-num"  rules="required"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveFn">保存</yu-button>
            <yu-button type="primary" @click="backFn">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
      <yu-panel title="销售收入验证" panel-type="simple" >
        <yu-xform ref="mcdForm2" label-width="240px" v-model="formdatamcd2" :disabled="op =='VIEW'">
        <yu-panel title="仓储费" panel-type="simple" >
          <yu-xform-group :column="2">
            <yu-xform-item label="市场内发生费用" name="storageChargeAmt" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="销售金额" name="storageChargeSalesAmt" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="与出入库情况核对及简要说明" name="storageChargeDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="列支费" panel-type="simple" >
          <yu-xform-group :column="2">
            <yu-xform-item label="市场内发生费用" name="chargeFeeAmt" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="销售金额" name="chargeFeeSalesAmt" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="与出入库情况核对及简要说明" name="chargeFeeDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        </yu-xform>
      </yu-panel>
        <yu-panel title="市场外经营情况" panel-type="simple" >
         <yu-xform ref="mcdForm3" label-width="240px" v-model="formdatamcd3" :disabled="op =='VIEW'">
          <yu-xform-group :column="1">
            <yu-xform-item label="市场外经营情况" name="marketOutDesc" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="其他情况说明" name="otherDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        </yu-panel>
      <yu-panel title="经营情况分析" panel-type="simple">
        <yu-form-buttons class="yubfp-button-group" style="align:margin-left">
        <yu-button type="primary" @click="addMcdOper" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="editMcdOper" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="deleteMcdOper" v-show="op!='VIEW'">删除</yu-button>
      </yu-form-buttons>
        <yu-xtable ref="mcdTableOper" row-number :data="mcdDataOper"  condition-key="condition" :pageable="false"  request-type="POST">
          <yu-xtable-column prop="subjectName" label="项目名称" ></yu-xtable-column>
          <yu-xtable-column prop="lastSecondYear" :label="lastSecondYear" ></yu-xtable-column>
          <yu-xtable-column prop="lastYear" :label="lastYear" ></yu-xtable-column>
          <yu-xtable-column prop="currYear" :label="currYear" ></yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="市场内经营情况" :visible.sync="dialogMcdOper" width="1000px">
        <yu-xform ref="mcdDialogOper" label-width="160px" v-model="dialogFormDataMcdOper">
          <yu-xform-group :column="2">
            <yu-xform-item label="项目名称" name="subjectName" ctype="input" rules="required" ></yu-xform-item>
            <yu-xform-item :label="lastSecondYear" name="lastSecondYear" ctype="yu-num" rules="required" ></yu-xform-item>
            <yu-xform-item :label="lastYear" name="lastYear" ctype="yu-num" rules="required" ></yu-xform-item>
            <yu-xform-item :label="currYear" name="currYear" ctype="yu-num" rules="required" ></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveOperFn">保存</yu-button>
            <yu-button type="primary" @click="backOperFn">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
      </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'" >保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg('');
export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      dialogMcd: false,
      dialogMcdOper: false,
      mcdData: [],
      mcdDataOper: [],
      op: '',
      inputYear: '',
      lastSecondYear: '',
      lastYear: '',
      currYear: ''
    };
  },
  mounted: function () {
    this.op = this.param.op;
    this.init();
  },

  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysmcd/initMcd',
        data: {serno: _this.param.serno, cusId: _this.param.cusId},
        callback: function (code, message, response) {
          if (response.data && response.data != null) {
            yufp.clone(response.data, _this.formdatamcd1);
            yufp.clone(response.data, _this.formdatamcd2);
            yufp.clone(response.data, _this.formdatamcd3);
          }
          _this.initMcdOper();
          _this.initMcdOperDetail();
        }});
    },
    initMcdOper: function () {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysmcdoper/selectByModel',
        data: {condition: JSON.stringify({serno: _this.param.serno})},
        callback: function (code, message, response) {
          _this.mcdData = response.data;
        }});
    },
    initMcdOperDetail: function () {
      var _this = this;
      yufp.service.request({
        async: false,
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysmcdoperdetail/selectByModel',
        data: {condition: JSON.stringify({serno: _this.param.serno})},
        callback: function (code, message, response) {
          _this.mcdDataOper = response.data;
          if (response.data != null && response.data.length > 0) {
            _this.inputYear = response.data[0].inputYear;
          } else {
            _this.inputYear = _this.$xutils.dateFormat('yyyyMM', new Date());
          }
          var year = _this.inputYear.substring(0, 4);
          var month = _this.inputYear.substring(4, 6);
          if (month.substring(0, 1) == '0') {
            month = month.substring(1, 2);
          }
          _this.lastSecondYear = parseInt(year) - 2 + '年度';
          _this.lastYear = parseInt(year) - 1 + '年度';
          _this.currYear = year + '年1月-' + (parseInt(month) - 1) + '月';
        }});
    },
    addMcd: function () {
      var _this = this;
      _this.dialogMcd = true;
    },
    editMcd: function () {
      var _this = this;
      var selectionAry = _this.$refs.mcdTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogMcd = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataMcd);
      });
    },
    deleteMcd: function () {
      var _this = this;
      var selectionAry = _this.$refs.mcdTable.selections;
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
              url: backend.cmisBiz + '/api/rptspdanysmcdoper/deleteMcdOper',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.initMcdOper();
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
    saveFn: function () {
      var _this = this;
      _this.dialogFormDataMcd.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysmcdoper/save',
        data: _this.dialogFormDataMcd,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            _this.dialogMcd = false;
            _this.$refs.mcdDialog.resetFields();
            _this.initMcdOper();
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
    },
    backFn: function () {
      var _this = this;
      _this.dialogMcd = false;
      _this.$refs.mcdDialog.resetFields();
    },
    addMcdOper: function () {
      var _this = this;
      _this.dialogMcdOper = true;
    },
    editMcdOper: function () {
      var _this = this;
      var selectionAry = _this.$refs.mcdTableOper.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogMcdOper = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataMcdOper);
      });
    },
    deleteMcdOper: function () {
      var _this = this;
      var selectionAry = _this.$refs.mcdTableOper.selections;
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
              url: backend.cmisBiz + '/api/rptspdanysmcdoperdetail/deleteMcdOperDetail',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.initMcdOperDetail();
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
    saveOperFn: function () {
      var _this = this;
      _this.dialogFormDataMcdOper.serno = _this.param.serno;
      _this.dialogFormDataMcdOper.inputYear = _this.inputYear;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysmcdoperdetail/save',
        data: _this.dialogFormDataMcdOper,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            _this.dialogMcdOper = false;
            _this.$refs.mcdDialogOper.resetFields();
            _this.initMcdOperDetail();
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
    },
    backOperFn: function () {
      var _this = this;
      _this.dialogMcdOper = false;
      _this.$refs.mcdDialogOper.resetFields();
    },
    measureLmtAmt: function () {
      var _this = this;
      _this.formdatamcd1.maxLmtAmt = parseFloat(parseFloat(_this.formdatamcd1.intendTransferValue) / 2).toFixed(2);
    },
    saveBtn: function () {
      var _this = this;
      var obj = {};
      obj = _this.formdatamcd1;
      obj.serno = _this.param.serno;
      obj.storageChargeAmt = _this.formdatamcd2.storageChargeAmt;
      obj.storageChargeSalesAmt = _this.formdatamcd2.storageChargeSalesAmt;
      obj.storageChargeDesc = _this.formdatamcd2.storageChargeDesc;
      obj.chargeFeeAmt = _this.formdatamcd2.chargeFeeAmt;
      obj.chargeFeeSalesAmt = _this.formdatamcd2.chargeFeeSalesAmt;
      obj.chargeFeeDesc = _this.formdatamcd2.chargeFeeDesc;
      obj.marketOutDesc = _this.formdatamcd3.marketOutDesc;
      obj.otherDesc = _this.formdatamcd3.otherDesc;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysmcd/save',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
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
    }
  }
};
</script>
