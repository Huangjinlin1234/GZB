<template>
  <div>
          <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata1" :disabled="type=='VIEW'" :form-type="viewType">
              <yu-panel title="1.授信额度" :hideFilter="false" :collapseHide="false">
                <yu-xform-group :column="2">
                  <yu-xform-item label="申请流水号" ctype="input" name="serno" hidden="true"></yu-xform-item>
                  <yu-xform-item label="授信期限（月）" ctype="input" name="lmtTerm" ></yu-xform-item>
                  <yu-xform-item label="用信审核方式" ctype="input" name="loanApprMode" ></yu-xform-item>
                 </yu-xform-group>
              </yu-panel>
              <yu-panel title="1.1一般授信额度" :hideFilter="false" :collapseHide="false">
                  <yu-xform-group :column="2">
                    <yu-xform-item label="敞口额度合计" ctype="input" name="openTotalLmtAmt" ></yu-xform-item>
                    <yu-xform-item label="低风险额度合计" ctype="input" name="lowRiskTotalLmtAmt" ></yu-xform-item>
                  </yu-xform-group>
                <yu-xtable ref="refTable1" show-summary row-number :data-url="dataUrl1"  :base-params="baseParams1" selection-type="radio" request-type="POST">
                    <yu-xtable-column label="授信品种" prop="lmtBizType"></yu-xtable-column>
                    <yu-xtable-column label="是否为预授信" prop="isPreLmt"></yu-xtable-column>
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
          </yu-xform>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String,
    serno: String
  },
  data () {
    return {
      type: '',
      majorGradeForm: null,
      dataUrl1: this.$backend.cmisBiz + '/api/lmtappr/queryLmtApprSubBySerno',
      baseParams1: { serno: this.serno, lmtBizType: '01' },
      dataUrl2: this.$backend.cmisBiz + '/api/lmtappr/queryLmtApprSubBySerno',
      baseParams2: { serno: this.serno, lmtBizType: '02' },
      // baseParam2: {serno: this.getFactory().contextData.serno, contType: '01'},
      dataUrl3: backend.cmisBiz + '/api/lmtappr/queryGuarBaseInfo',
      // baseParam3: {serno: this.getFactory().contextData.serno, contType: '03'},
      baseParams3: {serno: this.serno},
      dataUrl4: backend.cmisBiz + '/api/lmtappr/queryGuaranteeInfo',
      baseParams4: {serno: this.serno},
      // baseParam4: {serno: this.getFactory().contextData.serno},
      dataUrl5: backend.cmisBiz + '/api/lmtappr/queryLoanCond',
      baseParams5: {serno: this.serno, condType: '01'},
      dataUrl6: backend.cmisBiz + '/api/lmtappr/queryLoanCond',
      baseParams6: {serno: this.serno, condType: '02'},
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
      var serno = this.serno;
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
    }
  }
};
</script>
