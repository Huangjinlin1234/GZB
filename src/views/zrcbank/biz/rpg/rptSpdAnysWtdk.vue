<template>
  <div>
    <yu-panel title="委托贷款"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtBaseForm1" label-width="160px" v-model="baseFormdata1" :disabled="op =='VIEW'" :form-type="viewType">
            <yu-panel title="1委托人基本信息"  :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"  :colspan="12"></yu-xform-item>
                <yu-xform-item label="企业全程" ctype="input" name="fullNameOfEnterprise"></yu-xform-item>
                <yu-xform-item label="企业性质" ctype="input"  name="natureOfEnterprise"  ></yu-xform-item>
                <yu-xform-item label="成立日期" ctype="datepicker" name="dateOfIncorporation" ></yu-xform-item>
                <yu-xform-item label="行业分类" ctype="input"  name="industryClassfication"  ></yu-xform-item>
                <yu-xform-item label="注册资本" ctype="input"  name="registeredCapital"></yu-xform-item>
                <yu-xform-item label="实收资本" ctype="input"  name="paidInCapital"  ></yu-xform-item>
                <yu-xform-item label="实际控制人" ctype="input"  name="actuealController"  ></yu-xform-item>
                <yu-xform-item label="法人代表" ctype="input"  name="legalRepresentative"  ></yu-xform-item>
                <yu-xform-item label="注册地址" ctype="input" name="companyRegisteredAddress"  ></yu-xform-item>
                <yu-xform-item label="实际经营地址" ctype="input"  name="actualBusinessAddress"  ></yu-xform-item>
                <yu-xform-item label="经营范围" ctype="input" name="natureOfBusiness" :colspan="24" ></yu-xform-item>
              </yu-xform-group>
              </yu-panel>
          <yu-xtable ref="refTable1" row-number :data-url="dataUrl1" condition-key="condition" :base-params="baseParams1" selection-type="radio" request-type="POST">
            <yu-panel title="股东情况"  :hideFilter="false" :collapseHide="false">
                <yu-xtable-column label="股东姓名" prop="lessee"></yu-xtable-column>
                <yu-xtable-column label="认缴金额" prop="termOfExistingLeaseContract"></yu-xtable-column>
                <yu-xtable-column label="占比（%）" prop="year"></yu-xtable-column>
                <yu-xtable-column label="实收资本" prop="amt"></yu-xtable-column>
                <yu-xtable-column label="出资方式" prop="amt"></yu-xtable-column>
                <yu-xtable-column label="备注" prop="amt"></yu-xtable-column>
            </yu-panel>
          </yu-xtable>
          <yu-xform-group :column="2">
              <yu-xform-item label="股东情况其他说明" ctype="input" name="otherInformationAboutShareholders"></yu-xform-item>
              <yu-xform-item label="其他需说明事项" ctype="input" name="otherMattersToBeExplained"></yu-xform-item>
          </yu-xform-group>
         <yu-panel title="公司名下融资情况" panel-type="simple">
              <yu-toolbar :show-length="8" style="margin-bottom:10px;">
                <yu-button type="primary" @click="addCorpFn" v-show="op!='VIEW'">添加</yu-button>
                <yu-button type="primary" @click="editCorpFn" v-show="op!='VIEW'">修改</yu-button>
                <yu-button type="primary" @click="deleteCorpFn" v-show="op!='VIEW'">删除</yu-button>
              </yu-toolbar>
              <yu-xtable ref="corpTable" row-number :data-url="corpUrl" show-summary :pageable="false" :base-params="corpParam" request-type="POST">
                <yu-xtable-column prop="belongBank" label="所属行"></yu-xtable-column>
                <yu-xtable-column prop="creditType" label="信贷品种"></yu-xtable-column>
                <yu-xtable-column label="最近两年末" align="center" width="300px">
                  <yu-xtable-column prop="lastTwoYearAmt" label="金额"></yu-xtable-column>
                  <yu-xtable-column prop="lastTwoYearGuarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                </yu-xtable-column>
                <yu-xtable-column label="最近一年末" align="center" width="300px">
                  <yu-xtable-column prop="lastYearAmt" label="金额"></yu-xtable-column>
                  <yu-xtable-column prop="lastYearGuarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                </yu-xtable-column>
                <yu-xtable-column label="当前月末" align="center">
                  <yu-xtable-column prop="curMonthAmt" label="金额"></yu-xtable-column>
                  <yu-xtable-column prop="curMonthGuarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                  <yu-xtable-column prop="curMonthFiveClass" label="五级分类" data-code="STD_FIVE_CLASS"></yu-xtable-column>
                  <yu-xtable-column prop="curMonthRemark" label="备注"></yu-xtable-column>
                </yu-xtable-column>
              </yu-xtable>
              <yu-xdialog title="公司名下融资情况" :visible.sync="dialogCorp" width="1000px">
                <yu-xform ref="corpDialogForm" label-width="160px" v-model="dialogFormDataCorp">
                  <yu-xform-group :column="2">
                    <yu-xform-item label="所属行" name="belongBank" ctype="input"></yu-xform-item>
                    <yu-xform-item label="信贷品种" name="creditType" ctype="input"></yu-xform-item>
                  </yu-xform-group>
                  <yu-panel title="最近两年末" panel-type="simple">
                    <yu-xform-group :column="2">
                      <yu-xform-item label="金额" name="lastTwoYearAmt" ctype="yu-num"></yu-xform-item>
                      <yu-xform-item label="担保方式" name="lastTwoYearGuarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
                    </yu-xform-group>
                  </yu-panel>
                  <yu-panel title="最近一年末" panel-type="simple">
                    <yu-xform-group :column="2">
                      <yu-xform-item label="金额" name="lastYearAmt" ctype="yu-num"></yu-xform-item>
                      <yu-xform-item label="担保方式" name="lastYearGuarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
                    </yu-xform-group>
                  </yu-panel>
                  <yu-panel title="当前月末" panel-type="simple">
                    <yu-xform-group :column="2">
                      <yu-xform-item label="金额" name="curMonthAmt" ctype="yu-num"></yu-xform-item>
                      <yu-xform-item label="担保方式" name="curMonthGuarMode" ctype="select" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
                      <yu-xform-item label="五级分类" name="curMonthFiveClass" ctype="select" data-code="STD_FIVE_CLASS"></yu-xform-item>
                      <yu-xform-item label="备注" name="curMonthRemark" ctype="textarea"></yu-xform-item>
                    </yu-xform-group>
                  </yu-panel>
                  <div class="yu-grpButton">
                    <yu-button type="primary" @click="saveCorp">保存</yu-button>
                    <yu-button type="primary" @click="backCorp">返回</yu-button>
                  </div>
                </yu-xform>
              </yu-xdialog>
           </yu-panel>
            <yu-panel title="法人代表或实际控制人个人融资情况、信用情况" panel-type="simple">
          <yu-toolbar :show-length="8" style="margin-bottom:10px;">
            <yu-button type="primary" @click="addRepreLoanFn" v-show="op!='VIEW'">添加</yu-button>
            <yu-button type="primary" @click="editRepreLoanFn" v-show="op!='VIEW'">修改</yu-button>
            <yu-button type="primary" @click="deleteRepreLoanFn" v-show="op!='VIEW'">删除</yu-button>
          </yu-toolbar>
          <yu-xtable ref="repreLoanTable" row-number :data-url="repreLoanUrl" :pageable="false" :base-params="repreLoanParam" request-type="POST">
            <yu-xtable-column prop="cusName" label="姓名"></yu-xtable-column>
            <yu-xtable-column prop="cptlBankName" label="融资银行"></yu-xtable-column>
            <yu-xtable-column prop="cptlAmt" label="融资金额"></yu-xtable-column>
            <yu-xtable-column prop="cptlBalance" label="融资余额"></yu-xtable-column>
            <yu-xtable-column prop="overdueTimes" label="逾期或欠息次数"></yu-xtable-column>
          </yu-xtable>
          <yu-xdialog title="对外担保情况" :visible.sync="dialogRepreLoan" width="1000px">
            <yu-xform ref="repreLoanDialogForm" label-width="160px" v-model="dialogFormDataRepreLoan">
              <yu-xform-group :column="2">
                <yu-xform-item label="姓名" name="cusName" ctype="input"></yu-xform-item>
                <yu-xform-item label="融资银行" name="cptlBankName" ctype="input"></yu-xform-item>
                <yu-xform-item label="融资金额" name="cptlAmt" ctype="yu-num"></yu-xform-item>
                <yu-xform-item label="融资余额" name="cptlBalance" ctype="yu-num"></yu-xform-item>
                <yu-xform-item label="逾期或欠息次数" name="overdueTimes" ctype="input"></yu-xform-item>
              </yu-xform-group>
              <div class="yu-grpButton">
                <yu-button type="primary" @click="saveRepreLoan">保存</yu-button>
                <yu-button type="primary" @click="backRepreLoan">返回</yu-button>
              </div>
            </yu-xform>
          </yu-xdialog>
        </yu-panel>
            <yu-panel title="对外担保情况" panel-type="simple">
              <yu-toolbar :show-length="8" style="margin-bottom:10px;">
                <yu-button type="primary" @click="addExtGuarFn" v-show="op!='VIEW'">添加</yu-button>
                <yu-button type="primary" @click="editExtGuarFn" v-show="op!='VIEW'">修改</yu-button>
                <yu-button type="primary" @click="deleteExtGuarFn" v-show="op!='VIEW'">删除</yu-button>
              </yu-toolbar>
              <yu-xtable ref="extGuarTable" row-number :data-url="extGuarUrl" show-summary :pageable="false" :base-params="extGuarParam" request-type="POST">
                <yu-xtable-column prop="guarCha" label="性质" data-code="STD_ZB_GUAR_CHA"></yu-xtable-column>
                <yu-xtable-column prop="beGuarCorpName" label="被担保企业名称"></yu-xtable-column>
                <yu-xtable-column prop="balance" label="余额"></yu-xtable-column>
                <yu-xtable-column prop="fiveClass" label="五级分类" data-code="STD_FIVE_CLASS"></yu-xtable-column>
                <yu-xtable-column prop="beGuarCorpCurOperation" label="被担保企业目前经营情况"></yu-xtable-column>
              </yu-xtable>
              <yu-xdialog title="对外担保情况" :visible.sync="dialogExtGuar" width="1000px">
                <yu-xform ref="extGuarDialogForm" label-width="160px" v-model="dialogFormDataExtGuar">
                  <yu-xform-group :column="2">
                    <yu-xform-item label="性质" name="guarCha" ctype="select" data-code="STD_ZB_GUAR_CHA"></yu-xform-item>
                    <yu-xform-item label="被担保企业名称" name="beGuarCorpName" ctype="input"></yu-xform-item>
                    <yu-xform-item label="余额" name="balance" ctype="yu-num"></yu-xform-item>
                    <yu-xform-item label="五级分类" name="fiveClass" ctype="select" data-code="STD_FIVE_CLASS"></yu-xform-item>
                    <yu-xform-item label="被担保企业目前经营情况" name="beGuarCorpCurOperation" ctype="textarea"></yu-xform-item>
                  </yu-xform-group>
                  <div class="yu-grpButton">
                    <yu-button type="primary" @click="saveExtGuar">保存</yu-button>
                    <yu-button type="primary" @click="backExtGuar">返回</yu-button>
                  </div>
                </yu-xform>
              </yu-xdialog>
            </yu-panel>
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
      dataUrl1: backend.cmisBiz + '/api/rptspdanyswtdk/queryStockHolder',
      baseParams1: {serno: this.param.serno},
      dialogRepreLoan: false,
      dialogCorp: false,
      dialogExtGuar: false,
      extGuarType: '',
      corpType: '',
      repreLoanType: '',
      corpUrl: this.$backend.cmisBiz + '/api/rptcptlsitucorp/selectByModel',
      corpParam: { condition: JSON.stringify({ serno: this.param.serno }) },
      repreLoanUrl:
        this.$backend.cmisBiz + '/api/rptcptlsitulegalrepreloan/selectByModel',
      repreLoanParam: {
        condition: JSON.stringify({ serno: this.param.serno })
      },
      otherDescData: {},
      extGuarUrl:
        this.$backend.cmisBiz + '/api/rptcptlsituextguar/selectByModel',
      extGuarParam: { condition: JSON.stringify({ serno: this.param.serno }) },
      op: ''

    };
  },
  mounted () {
    this.op = this.param.op;
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var serno = _this.param.serno;
      // var op = _this.$route.meta.params.op;
      // _this.type = op;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.baseFormdata1.serno = serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptspdanyswtdk/selectBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
          });
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
              url: backend.cmisBiz + '/api/rptspdanyswtdk/save',
              data: comitData,
              callback: function (code, message, response) {
                _this.$message('保存成功');
              }
            });
          }
        }
      });
    },
    // 取消并返回上一页面
    print: function () {
      this.$xutils.showMsgBox('提示', '开发中！'); // 弹出提示
    },
    addExtGuarFn: function () {
      var _this = this;
      _this.dialogExtGuar = true;
      _this.extGuarType = 'add';
    },
    backExtGuar: function () {
      var _this = this;
      _this.dialogExtGuar = false;
      _this.$refs.extGuarDialogForm.resetFields();
    },
    editExtGuarFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.extGuarTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogExtGuar = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataExtGuar);
      });
      _this.extGuarType = 'edit';
    },
    deleteExtGuarFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.extGuarTable.selections;
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
              url: backend.cmisBiz + '/api/rptcptlsituextguar/deleteExtGuar',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.extGuarTable.remoteData();
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
    saveExtGuar: function () {
      var _this = this;
      if (_this.extGuarType == 'add') {
        _this.dialogFormDataExtGuar.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptcptlsituextguar/insertExtGuar',
          data: _this.dialogFormDataExtGuar,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogExtGuar = false;
              _this.$refs.extGuarDialogForm.resetFields();
              _this.$refs.extGuarTable.remoteData();

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
      } else if (_this.extGuarType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptcptlsituextguar/updateExtGuar',
          data: _this.dialogFormDataExtGuar,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogExtGuar = false;
              _this.$refs.extGuarDialogForm.resetFields();
              _this.$refs.extGuarTable.remoteData();
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
    //
    addRepreLoanFn: function () {
      var _this = this;
      _this.dialogRepreLoan = true;
      _this.repreLoanType = 'add';
    },
    backRepreLoan: function () {
      var _this = this;
      _this.dialogRepreLoan = false;
      _this.$refs.repreLoanDialogForm.resetFields();
    },
    editRepreLoanFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.repreLoanTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogRepreLoan = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataRepreLoan);
      });
      _this.repreLoanType = 'edit';
    },
    deleteRepreLoanFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.repreLoanTable.selections;
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
                '/api/rptcptlsitulegalrepreloan/deleteRepreLoan',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.repreLoanTable.remoteData();
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
    saveRepreLoan: function () {
      var _this = this;
      if (_this.repreLoanType == 'add') {
        _this.dialogFormDataRepreLoan.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptcptlsitulegalrepreloan/insertRepreLoan',
          data: _this.dialogFormDataRepreLoan,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogRepreLoan = false;
              _this.$refs.repreLoanDialogForm.resetFields();
              _this.$refs.repreLoanTable.remoteData();

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
      } else if (_this.repreLoanType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptcptlsitulegalrepreloan/updateRepreLoan',
          data: _this.dialogFormDataRepreLoan,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogRepreLoan = false;
              _this.$refs.repreLoanDialogForm.resetFields();
              _this.$refs.repreLoanTable.remoteData();
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
    addCorpFn: function () {
      var _this = this;
      _this.dialogCorp = true;
      _this.corpType = 'add';
    },
    backCorp: function () {
      var _this = this;
      _this.dialogCorp = false;
      _this.$refs.corpDialogForm.resetFields();
    },
    editCorpFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.corpTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogCorp = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.dialogFormDataCorp);
      });
      _this.corpType = 'edit';
    },
    deleteCorpFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.corpTable.selections;
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
              url: backend.cmisBiz + '/api/rptcptlsitucorp/deleteCorp',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$message('删除成功');
                  _this.$refs.corpTable.remoteData();
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
    saveCorp: function () {
      var _this = this;
      if (_this.corpType == 'add') {
        _this.dialogFormDataCorp.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptcptlsitucorp/insertCorp',
          data: _this.dialogFormDataCorp,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogCorp = false;
              _this.$refs.corpDialogForm.resetFields();
              _this.$refs.corpTable.remoteData();

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
      } else if (_this.corpType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/rptcptlsitucorp/updateCorp',
          data: _this.dialogFormDataCorp,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.dialogCorp = false;
              _this.$refs.corpDialogForm.resetFields();
              _this.$refs.corpTable.remoteData();
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

  }
};
</script>
