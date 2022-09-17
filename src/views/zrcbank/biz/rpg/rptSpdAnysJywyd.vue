<template>
  <div>
    <yu-panel title="经营性物业贷" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="lmtBaseForm1" label-width="160px" v-model="baseFormdata1" :disabled="op =='VIEW'" :form-type="viewType">
        <yu-xform-group :column="2">
          <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"></yu-xform-item>
          <yu-xform-item label="物业产权所有人" ctype="input" name="propertyOwner"></yu-xform-item>
          <yu-xform-item label="物业合法经营方与产权所有人关系" ctype="input" name="rbtlpatootp"></yu-xform-item>
          <yu-xform-item label="物业合法经营方委托经营协议情况" ctype="input" name="teoaotlpo"></yu-xform-item>
          <yu-xform-item label="物业地址" ctype="input" name="propertyAddress"></yu-xform-item>
          <yu-xform-item label="物业运营情况（承租人）、出租率、已使用期限" ctype="input" name="polrrsl"></yu-xform-item>
          <yu-xform-item label="租金收入情况" ctype="input" name="rentIncome"></yu-xform-item>
        </yu-xform-group>
        <yu-toolbar :show-length="8" style="margin-bottom:10px;margin-top:20px">
              <yu-button type="primary" @click="addRent" v-show="op!='VIEW'">添加</yu-button>
              <yu-button type="primary" @click="saveRent" v-show="op!='VIEW'">保存</yu-button>
              <yu-button type="primary" @click="delRent" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable1"  :data="data"  :pageable="false" request-type="POST">
            <yu-xtable-column label="流水号" prop="serno" hide-column></yu-xtable-column>
            <yu-xtable-column label="承租人" prop="lessee" ctype="input"></yu-xtable-column>
            <yu-xtable-column label="现有租赁合同期限" prop="termOfExistingLeaseContract" ctype="input"></yu-xtable-column>
            <yu-xtable-column label="年份" prop="year" ctype="input"></yu-xtable-column>
            <yu-xtable-column label="金额" prop="amt" ctype="yu-num"></yu-xtable-column>
        </yu-xtable>
        <yu-xform-group :column="2">
          <yu-xform-item label="融资用途" ctype="input" name="financingPurpose"></yu-xform-item>
          <yu-xform-item label="抵押物评估价格房产面积" ctype="input" name="maprea"></yu-xform-item>
          <yu-xform-item label="抵押物评估价格土地面积" ctype="input" name="laomep"></yu-xform-item>
          <yu-xform-item label="抵押物评估价格房产评估价" ctype="input" name="mapreap"></yu-xform-item>
          <yu-xform-item label="抵押物评估价格土地评估价" ctype="input" name="mvplvp"></yu-xform-item>
          <yu-xform-item label="贷款额度是否符合我行规定分析" ctype="textarea" name="aowtllcttpotb"></yu-xform-item>
        </yu-xform-group>
        <yu-toolbar :show-length="8" style="margin-bottom:10px;margin-top:20px">
              <yu-button type="primary" @click="addGuess" v-show="op!='VIEW'">添加</yu-button>
              <yu-button type="primary" @click="upGuess" v-show="op!='VIEW'">修改</yu-button>
              <yu-button type="primary" @click="delGuess" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="refTable2"  :data="data1"  :pageable="false" request-type="POST">
            <yu-xtable-column label="年份" prop="year"></yu-xtable-column>
            <yu-xtable-column label="本金余额" prop="principalBalance"></yu-xtable-column>
            <yu-xtable-column label="利息支出" prop="interestExpense"></yu-xtable-column>
            <yu-xtable-column label="需归还本金" prop="principalToBeReturned"></yu-xtable-column>
            <yu-xtable-column label="还款本利和" prop="repaymentOfPrincipalAndInterest"></yu-xtable-column>
            <yu-xtable-column label="租金收入" prop="rentalIncome"></yu-xtable-column>
            <yu-xtable-column label="差额" prop="difference"></yu-xtable-column>
            <yu-xtable-column label="备注" prop="remarks" ></yu-xtable-column>
        </yu-xtable>
         <yu-xdialog title="租金收入测算" :visible.sync="dialogGuess" width="1000px">
              <yu-xform ref="guessDialog" label-width="160px" v-model="formdataGuess">
                <yu-xform-group :column="2">
                  <yu-xform-item label="年份" name="year" ctype="input"></yu-xform-item>
                  <yu-xform-item label="本金余额" name="principalBalance" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="利息支出" name="interestExpense" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="需归还本金" name="principalToBeReturned" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="还款本利和" name="repaymentOfPrincipalAndInterest" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="租金收入" name="rentalIncome" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="差额" name="difference" ctype="yu-num"></yu-xform-item>
                  <yu-xform-item label="备注" name="remarks" ctype="input"></yu-xform-item>
                </yu-xform-group>
                <div class="yu-grpButton">
                  <yu-button type="primary" @click="saveGuess">保存</yu-button>
                  <yu-button type="primary" @click="backGuess">返回</yu-button>
                </div>
              </yu-xform>
            </yu-xdialog>
        <yu-xform-item label="对租金收入是否足以覆盖历年还款本息情况进行分析：" ctype="textarea" name="awtreiiectrpaitpy"></yu-xform-item>
      </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" @click="submit" v-show="op!='VIEW'">保存</yu-button>
      <!--<yu-button type="primary" @click="print">打印</yu-button>-->
    </yu-form-buttons>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    pageParams: Object,
    param: Object,
    dialogId: String
  },
  data () {
    return {
      type: '',
      majorGradeForm: null,
      op: '',
      data: [],
      data1: [],
      dialogGuess: false
    };
  },
  mounted () {
    this.op = this.param.op;
    this.initForm();
    this.initIncome();
    this.initGuess();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var serno = _this.param.serno;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.baseFormdata1.serno = serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanysjyxwyd/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
          });
        }
      });
    },
    initIncome: function () {
      let _this = this;
      var serno = _this.param.serno;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanysjyxwydrentincome/queryIncome',
        data: {serno: serno},
        callback: function (code, message, response) {
          _this.data = response.data;
        }
      });
    },
    initGuess: function () {
      let _this = this;
      var serno = _this.param.serno;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanysjyxwydrentincomeguess/queryIncomeGuessBySerno',
        data: {serno: serno},
        callback: function (code, message, response) {
          _this.data1 = response.data;
        }
      });
    },
    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      var comitData = {};
      // 校验输入项
      var validate = false;
      _this.$refs.lmtBaseForm1.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      comitData = _this.baseFormdata1;
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/rptspdanysjyxwyd/save',
              data: comitData,
              callback: function (code, message, response) {
                _this.$message('保存成功');
              }
            });
          }
        }
      });
    },
    addRent: function () {
      var _this = this;
      _this.data.push({
        serno: _this.param.serno
      });
    },
    saveRent: function () {
      var _this = this;
      var data = _this.data;
      for (let i = 0; i < data.length; i++) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/rptspdanysjyxwydrentincome/saveIncome',
          data: data[i],
          callback: function (code, message, response) {
            if (code == 0) {
              if (i == data.length - 1) {
                _this.$message({ message: '保存成功', type: 'success' });
                _this.initIncome();
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
    delRent: function () {
      var _this = this;
      let selections = this.$refs.refTable1.selections;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanysjyxwydrentincome/deleteIncome',
        data: selections[0],
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({ message: '删除成功', type: 'success' });
            _this.initIncome();
          }
        }});
    },
    addGuess: function () {
      var _this = this;
      _this.dialogGuess = true;
    },
    upGuess: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable2.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogGuess = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataGuess);
      });
    },
    delGuess: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable2.selections;
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
                '/api/rptspdanysjyxwydrentincomeguess/deleteGuess',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.initGuess();
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
    saveGuess: function () {
      var _this = this;
      _this.formdataGuess.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptspdanysjyxwydrentincomeguess/save',
        data: _this.formdataGuess,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            _this.dialogGuess = false;
            _this.$refs.guessDialog.resetFields();
            _this.initGuess();
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
    backGuess: function () {
      var _this = this;
      _this.dialogGuess = false;
      _this.$refs.guessDialog.resetFields();
    }
  }
};
</script>
