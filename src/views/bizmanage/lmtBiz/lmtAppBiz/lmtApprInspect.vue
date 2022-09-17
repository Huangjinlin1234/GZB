<template>
  <div>
    <yu-panel title="审查报告"  :hideFilter="false" :collapseHide="false">
          <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata1" :disabled="type=='VIEW'" :form-type="viewType">
              <yu-panel title="一、审查内容" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="审查内容" ctype="textarea"  name="reviewContent"></yu-xform-item>
              </yu-panel>
              <yu-panel title="二、授信用途合理性分析" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="主键" ctype="input" name="pkId" hidden="true"></yu-xform-item>
                  <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"></yu-xform-item>
                  <yu-xform-item label="授信用途合理性分析" ctype="textarea"  name="analysisRationalLmtUse"></yu-xform-item>
              </yu-panel>
              <yu-panel title="三、风险因素" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="风险因素" ctype="textarea"  name="riskFactor"></yu-xform-item>
              </yu-panel>
              <yu-panel title="四、评审结论" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="评审结论" ctype="radio"  name="reviewConclustion" data-code="STD_ZB_CONC"></yu-xform-item>
                  <yu-xform-item label="结论性描述" ctype="textarea"  name="restDesc"></yu-xform-item>
                  <yu-xform-item label="是否重组贷款" ctype="radio"  name="reviewConclustion" data-code="STD_ZB_YSE_NO"></yu-xform-item>
              </yu-panel>
              <yu-panel title="1.授信额度" :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="2">
                  <yu-xform-item label="授信期限（月）" ctype="input" name="lmtTerm"></yu-xform-item>
                  <yu-xform-item label="用信审核方式" ctype="input" name="loanApprMode" ></yu-xform-item>
                 </yu-xform-group>
              </yu-panel>
              <yu-panel title="1.1一般授信额度" :hideFilter="false" :collapseHide="false">
                <yu-xtable ref="refTable1" show-summary row-number :data-url="dataUrl1" condition-key="condition" :base-params="baseParams1" selection-type="radio" request-type="POST">
                    <yu-xtable-column label="授信品种" prop="lmtBizType"></yu-xtable-column>
                    <yu-xtable-column label="授信额度" prop="lmtAmt"></yu-xtable-column>
                    <yu-xtable-column label="额度期限（月）" prop="lmtTerm"></yu-xtable-column>
                    <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                    <yu-xtable-column label="年利率" prop="rateYear"></yu-xtable-column>
                    <yu-xtable-column label="最低保证金比例" prop="bailPreRate"></yu-xtable-column>
                    <yu-xtable-column label="担保方式" prop="guarMode"></yu-xtable-column>
                    <yu-xtable-column label="结息方式" prop="eiMode"></yu-xtable-column>
                    <yu-xtable-column label="还款方式" prop="repayMode"></yu-xtable-column>
                  </yu-xtable>
              </yu-panel>
              <yu-panel title="1.2委托贷款额度" :hideFilter="false" :collapseHide="false">
                <yu-xtable ref="refTable2" show-summary row-number :data-url="dataUrl2" condition-key="condition" :base-params="baseParams2" selection-type="radio" request-type="POST">
                    <yu-xtable-column prop="lmtBizTypeName" label="授信品种"></yu-xtable-column>
                    <yu-xtable-column prop="lmtAmt" label="授信额度"></yu-xtable-column>
                    <yu-xtable-column prop="lmtTerm" label="额度期限"></yu-xtable-column>
                    <yu-xtable-column prop="chrgRate" label="手续费率"></yu-xtable-column>
                    <yu-xtable-column prop="chrgCollectMode" label="手续费率收取方式" data-code="STD_CHRG_COLLECT_MODE"></yu-xtable-column>
                    <yu-xtable-column prop="rateYear" label="年利率"></yu-xtable-column>
                    <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                    <yu-xtable-column prop="bailPreRate" label="最低保证金比例"></yu-xtable-column>
                    <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                    <yu-xtable-column prop="eiMode" label="结息方式" data-code="STD_EI_MODE"></yu-xtable-column>
                    <yu-xtable-column prop="repayMode" label="还款方式" data-code="STD_REPAY_MODE"></yu-xtable-column>
                  </yu-xtable>
              </yu-panel>
              <yu-panel title="2 担保方式" :hideFilter="false" :collapseHide="false">
                <yu-panel title="抵质押担保" :hideFilter="false" :collapseHide="false">
                  <yu-xtable ref="refTable2" show-summary row-number :data-url="dataUrl3" condition-key="condition" :base-params="baseParams3" selection-type="radio" request-type="POST">
                      <yu-xtable-column prop="guarNo" label="抵质押品编号"></yu-xtable-column>
                      <yu-xtable-column prop="guarTypeCd" label="抵质押品类型"></yu-xtable-column>
                      <yu-xtable-column prop="pldimnMemo" label="抵质押品名称"></yu-xtable-column>
                      <yu-xtable-column prop="confirmAmt" label="担保金额"></yu-xtable-column>
                      <yu-xtable-column prop="mortagageRate" label="抵质押率"></yu-xtable-column>
                    </yu-xtable>
                </yu-panel>
                <yu-panel title="保证担保" :hideFilter="false" :collapseHide="false">
                  <yu-xtable ref="refTable2" show-summary row-number :data-url="dataUrl4" condition-key="condition" :base-params="baseParams4" selection-type="radio" request-type="POST">
                      <yu-xtable-column prop="assureCertCode" label="保证人客户编号"></yu-xtable-column>
                      <yu-xtable-column prop="assureName" label="保证人客户名称"></yu-xtable-column>
                      <yu-xtable-column prop="guarAmt" label="本次拟担保金额"></yu-xtable-column>
                    </yu-xtable>
                </yu-panel>
              </yu-panel>
              <yu-panel title="3.用信条件与其他限制性条件" :hideFilter="false" :collapseHide="false">
                  <yu-xtable ref="refTable2" show-summary row-number :data-url="dataUrl5" condition-key="condition" :base-params="baseParams5" selection-type="radio" request-type="POST">
                      <yu-xtable-column prop="condDesc" label="具体内容"></yu-xtable-column>
                    </yu-xtable>
              </yu-panel>
              <yu-panel title="4.贷后管理要求" :hideFilter="false" :collapseHide="false">
                  <yu-xtable ref="refTable2" show-summary row-number :data-url="dataUrl6" condition-key="condition" :base-params="baseParams6" selection-type="radio" request-type="POST">
                      <yu-xtable-column prop="condDesc" label="具体内容"></yu-xtable-column>
                    </yu-xtable>
              </yu-panel>
              <yu-panel title="5.还款计划" :hideFilter="false" :collapseHide="false">
                  <yu-xtable ref="refTable2" show-summary row-number :data-url="dataUrl7" condition-key="condition" :base-params="baseParams7" selection-type="radio" request-type="POST">
                      <yu-xtable-column prop="lmtBizTypeName" label="授信品种"></yu-xtable-column>
                      <yu-xtable-column prop="repayDate" label="还款时间"></yu-xtable-column>
                      <yu-xtable-column prop="repayAmt" label="还款金额"></yu-xtable-column>
                    </yu-xtable>
               </yu-panel>
              <yu-panel title="6.其他" :hideFilter="false" :collapseHide="false">
                  <yu-xform-item label="是否超限额管理要求" ctype="radio"  name="isOutLmtQuotaMana" data-code="STD_ZB_YES_NO"></yu-xform-item>
                  <yu-xform-item label="其他说明" ctype="input"  name="otherDesc"></yu-xform-item>
              </yu-panel>
          </yu-xform>
    </yu-panel>
    <yu-form-buttons align="center">
      <yu-button v-if="type!='VIEW'" type="primary" @click="submit">保存</yu-button>
      <yu-button type="primary" @click="onBack">返回</yu-button>
      <yu-button type="primary" @click="onPrint">打印</yu-button>
    </yu-form-buttons>
  </div>
</template>

<script>
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
      dataUrl1: this.$backend.cmisBiz + '/api/lmtappr/queryLmtApprSubBySerno',
      baseParams1: { serno: 'LMT202107010000822', lmtBizType: '01' },
      dataUrl2: this.$backend.cmisBiz + '/api/lmtappr/queryLmtApprSubBySerno',
      baseParams2: { serno: 'LMT202107010000822', lmtBizType: '02' },
      // baseParam2: {serno: this.getFactory().contextData.serno, contType: '01'},
      dataUrl3: backend.cmisBiz + '/api/lmtappr/queryGuarBaseInfo',
      // baseParam3: {serno: this.getFactory().contextData.serno, contType: '03'},
      baseParams3: {serno: 'LMT202107010000822'},
      dataUrl4: backend.cmisBiz + '/api/lmtappr/queryGuaranteeInfo',
      baseParams4: {serno: 'LMT202107010000822'},
      // baseParam4: {serno: this.getFactory().contextData.serno},
      dataUrl5: backend.cmisBiz + '/api/lmtappr/queryLoanCond',
      baseParams5: {serno: 'LMT202107010000822', condType: '01'},
      dataUrl6: backend.cmisBiz + '/api/lmtappr/queryLoanCond',
      baseParams6: {serno: 'LMT202107010000822', condType: '02'},
      dialogVisible: false,
      effType: ''
    };
  },
  mounted () {
    this.initForm();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      // var serno = _this.getFactory().contextData.grpSerno;
      var serno = 'LMT202107010000822';
      // var op = _this.getFactory().contextData.op;
      // _this.type = op;
      if (!serno || serno === '') {
        serno = this.getFactory().contextData.instanceInfo.bizId;
      }
      this.baseFormdata1.serno = serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappr/queryInfoBySerno',
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
      _this.$refs.lmtBaseForm.validate(function (valid) {
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
              url: backend.cmisBiz + '/api/lmtappr/save',
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
              url: backend.cmisBiz + '/api/lmtappr/deleteLmtCond',
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
          url: _this.$backend.cmisBiz + '/api/lmtappr/insertLmtCond',
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
          url: _this.$backend.cmisBiz + '/api/lmtappr/updateLmtCond',
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
    },

    onPrint: function () {
      var _this = this;
      // var params = _this.baseFormdata;// 模板工厂中的参数传递
      var params = {};
      params.serno = _this.baseFormdata1.serno;
      if (params.serno == null || params.serno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemoscbgdy';
      params.src = _this.$backend.frptRptService + 'DGSX-SCBG-DY.cpt&op=view&serno=' + params.serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '审查报告(单一)',
        // 传递的业务数据，可选配置
        data: params
      });
    }

  }
};
</script>
