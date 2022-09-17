<template>
  <div>
    <yu-panel title="核查报告"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata1" :disabled="type=='VIEW'" :form-type="viewType">
              <yu-panel title="一、综合评价" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="综合评价" ctype="textarea"  name="inteEvlu"></yu-xform-item>
              </yu-panel>
              <yu-panel title="二、核查意见及建议" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="是否重组贷款" ctype="radio" name="isRestruLoan" data-code="STD_ZB_YES_NO" hidden="true"></yu-xform-item>
                  <yu-xform-group :column="2">
                        <yu-xform-item label="集团申请流水号" ctype="input" name="grpSerno" hidden="true"></yu-xform-item>
                        <yu-xform-item label="敞口额度合计" ctype="yu-num" number-formatter="0,000.00"  name="openTptalLmtAmt" rules="required"></yu-xform-item>
                        <yu-xform-item label="低风险额度合计" ctype="yu-num" number-formatter="0,000.00"  name="lowRiskTotalLmtAmt" rules="required" ></yu-xform-item>
                  </yu-xform-group>
                   <yu-xform-item label="是否允许额度在成员间调剂" ctype="select" data-code="STD_ZB_YES_NO" name="isAllowAllocatMem" rules="required" ></yu-xform-item>
                   <yu-toolbar :show-length="8" style="margin-bottom:10px;">
                      <yu-button type="primary" @click="updateFn">修改</yu-button>
                      <yu-button type="primary" @click="deleteFn">删除</yu-button>
                    </yu-toolbar>
                    <yu-xtable ref="refTable1" show-summary row-number :data-url="dataUrl1" condition-key="condition" :base-params="baseParams1" selection-type="radio" request-type="POST">
                          <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
                          <yu-xtable-column label="授信品种" prop="lmtBizType"></yu-xtable-column>
                          <yu-xtable-column label="是否为预授信" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                          <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                          <yu-xtable-column label="授信额度" prop="lmtAmt"></yu-xtable-column>
                          <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
                          <yu-xtable-column label="年利率" prop="rateYear"></yu-xtable-column>
                          <yu-xtable-column label="最低保证金比例" prop="bailPreRate"></yu-xtable-column>
                          <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                          <yu-xtable-column label="授信期限（月）" prop="lmtTerm"></yu-xtable-column>
                      </yu-xtable>
                      <yu-xdialog title="授信情况" :visible.sync="dialogVisible" width="1000px">
                        <yu-xform ref="refFormDialog" label-width="160px" v-model="formdataDialog">
                          <yu-xform-group :column="2">
                            <yu-xform-item label="客户名称" name="cusName" ctype="input" rules="required"></yu-xform-item>
                            <yu-xform-item label="授信品种" name="lmtBizType" ctype="input" rules="required"></yu-xform-item>
                            <yu-xform-item label="是否为预授信" name="isPreLmt" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
                            <yu-xform-item label="是否循环额度" name="isRevolvLimit" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
                            <yu-xform-item label="授信额度" name="lmtAmt" ctype="yu-num" number-formatter="0,000.00" rules="required"></yu-xform-item>
                            <yu-xform-item label="币种" name="curType" ctype="input" rules="required"></yu-xform-item>
                            <yu-xform-item label="年利率" name="rateYear" ctype="yu-num" sign="%" rules="required"></yu-xform-item>
                            <yu-xform-item label="最低保证金比例" name="bailPreRate" ctype="yu-num" sign="%" rules="required"></yu-xform-item>
                            <yu-xform-item label="担保方式" name="guarMode" ctype="select" rules="required" data-code="STD_ZB_GUAR_WAY"></yu-xform-item>
                            <yu-xform-item label="授信期限（月）" name="lmtTerm" ctype="yu-num"  rules="required"></yu-xform-item>
                          </yu-xform-group>
                          <div class="yu-grpButton">
                            <yu-button type="primary" @click="saveEffWar">保存</yu-button>
                            <yu-button type="primary" @click="canclFn">返回</yu-button>
                          </div>
                        </yu-xform>
                      </yu-xdialog>
                      <yu-xtable ref="refTable2" show-summary row-number :data-url="dataUrl2" condition-key="condition" :base-params="baseParams2" selection-type="radio" request-type="POST">
                          <yu-xtable-column label="用信条件" prop="condDesc"></yu-xtable-column>
                      </yu-xtable>
                      <yu-xtable ref="refTable3" show-summary row-number :data-url="dataUrl3" condition-key="condition" :base-params="baseParams3" selection-type="radio" request-type="POST">
                          <yu-xtable-column label="风控建议" prop="condDesc"></yu-xtable-column>
                      </yu-xtable>
                      <yu-xtable ref="refTable4" show-summary row-number :data-url="dataUrl4" condition-key="condition" :base-params="baseParams4" selection-type="radio" request-type="POST">
                          <yu-xtable-column label="申请流水号" prop="serno"></yu-xtable-column>
                          <yu-xtable-column label="还款日期" prop="repayDate"></yu-xtable-column>
                          <yu-xtable-column label="还款金额" prop="repayAmt"></yu-xtable-column>
                      </yu-xtable>
              </yu-panel>
          </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button type="primary" v-if="type!='VIEW'" @click="submit">保存</yu-button>
      <yu-button type="primary" @click="onBack">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>

<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_ZB_YES_NO,STD_ZB_CUR_TYP');
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      type: '',
      majorGradeForm: null,
      dataUrl1: backend.cmisBiz + '/api/lmtgrpapp/queryLmtApprSubByGrpSerno',
      baseParams1: {},
      // baseParams1: {grpSerno: this.getFactory().contextData.grpSerno},
      dataUrl2: backend.cmisBiz + '/api/lmtgrpapp/queryLmtApprLoanCondByGrpSerno',
      baseParams2: {},
      // baseParam2: {grpSerno: this.getFactory().contextData.grpSerno, contType: '01'},
      dataUrl3: backend.cmisBiz + '/api/lmtgrpapp/queryLmtApprLoanCondByGrpSerno',
      // baseParam3: {grpSerno: this.getFactory().contextData.grpSerno, contType: '03'},
      baseParams3: {},
      dataUrl4: backend.cmisBiz + '/api/lmtgrpapp/queryRepayCapPlanByGrpSerno',
      baseParams4: {},
      // baseParam4: {grpSerno: this.getFactory().contextData.grpSerno},
      dialogVisible: false,
      effType: ''
    };
  },
  created () {
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      let grpSerno = '';
      let data = {};
      // 待办流程进入
      if (_this.getFactory().contextData.instanceInfo) {
        data = _this.getFactory().contextData.instanceInfo;
        grpSerno = data.bizId;
      } else {
        data = _this.$route.meta.params;
        grpSerno = data.grpSerno;
      }
      _this.baseParams1 = {
        grpSerno: grpSerno
      };
      _this.baseParams2 = {
        grpSerno: grpSerno,
        condType: '02'
      };
      _this.baseParams3 = {
        grpSerno: grpSerno,
        condType: '03'
      };
      _this.baseParams4 = {
        grpSerno: grpSerno
      };
      this.baseFormdata1.grpSerno = grpSerno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtgrpapp/queryInfoByGrpSerno',
        data: grpSerno,
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
      yufp.clone(_this.baseFormdata1, comitData);
      _this.$confirm('是否保存该笔信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: function (action) {
          if (action === 'confirm') {
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/lmtgrpapp/save',
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
    /**
     * 关闭当前页面
     */
    onBack: function () {
      this.$router.go(-1);
    },
    addFn: function () {
      var _this = this;
      _this.dialogVisible = true;
      _this.effType = 'add';
    },
    // 修改授信情况
    updateFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable1.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogVisible = true;
      _this.effType = 'edit';
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataDialog);
      });
    },
    deleteFn: function () {
      var _this = this;
      var selectionAry = _this.$refs.refTable1.selections;
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
              url: backend.cmisBiz + '/api/lmtgrpapp/deleteLmtCond',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$refs.effWarTable.remoteData();
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
    saveEffWar: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refFormDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      if (_this.effType == 'add') {
        _this.formdataDialog.serno = _this.param.serno;
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/lmtgrpapp/insertLmtCond',
          data: _this.formdataDialog,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogVisible = false;
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
      } else if (_this.effType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url: _this.$backend.cmisBiz + '/api/lmtgrpapp/updateLmtCond',
          data: _this.formdataDialog,
          callback: function (code, message, response) {
            _this.$message('保存成功');
            _this.dialogVisible = false;
            _this.$refs.refTable1.remoteData();
          }
        });
      }
    },
    // 弹窗关闭
    canclFn: function () {
      var _this = this;
      _this.dialogVisible = false;
    }

  }
};
</script>
