 <!--
    单一批复
  -->
<template>
  <div>
    <div style="text-align:center">
      <a class="underline" style="text-decoration:none;" @click="onPrint">查看电子版</a>
    </div>
    <yu-xform ref="refForm" label-width="120px" v-model="formdata" class="yu-form-gap" disabled>
        <yu-panel title="授信基本信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group>
            <yu-xform-item label="业务流水号" disabled ctype="input" name="serno"></yu-xform-item>
            <yu-xform-item label="业务类型" disabled ctype="select" name="lmtType" data-code="STD_SX_LMT_TYPE">></yu-xform-item>
            <yu-xform-item label="客户编号" disabled ctype="input" name="cusId"></yu-xform-item>
            <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
            <yu-xform-item label="审批模式" disabled ctype="select" name="apprMode" data-code="STD_APPR_MODE">></yu-xform-item>
            <yu-xform-item label="经办客户经理" disabled ctype="input" name="inputId"></yu-xform-item>
            <yu-xform-item label="经办机构" disabled ctype="input" name="inputBrId"></yu-xform-item>
            <yu-xform-item label="主管客户经理" disabled ctype="input" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" disabled ctype="input" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" disabled ctype="input" name="managerIdName" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" disabled ctype="input" name="managerBrIdName" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="" :hideFilter="false" :collapseHide="false">
          <yu-xform-item label="是否重组贷款" ctype="radio"  name="isRestruLoan" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="评审结论" ctype="radio"  name="reviewConclusion" data-code="STD_ZB_CONC"></yu-xform-item>
          <yu-xform-item label="结论性描述" ctype="textarea"  name="restDesc"></yu-xform-item>
        </yu-panel>
        <yu-panel title="1.授信额度信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="3">
            <yu-xform-item label="授信期限(月)" ctype="input" name="lmtTerm"></yu-xform-item>
            <yu-xform-item label="用信审核方式" ctype="select" name="loanApprMode" data-code="STD_LOAN_APPR_MODE"></yu-xform-item>
            <yu-xform-item label="宽限期(月)" ctype="input" name="lmtGraperTerm"></yu-xform-item>
          </yu-xform-group>
          <yu-panel title="1.1一般授信额度" :hideFilter="false" :collapseHide="false">
            <yu-xtable :data="replySubList" style="width: 100%;margin-bottom: 20px;" row-key="lmtDrawNo" border
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
              <yu-xtable-column prop="lmtDrawNo" label="授信分项流水号" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="lmtDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="lmtAmt" label="授信额度"></yu-xtable-column>
              <yu-xtable-column prop="lmtTerm" label="额度期限（月）"></yu-xtable-column>
              <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
              <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
              <yu-xtable-column prop="rateYear" label="年利率" >
                <template slot-scope="scope">
                  {{ isNaN(scope.row.rateYear)? '':Number(scope.row.rateYear*100).toFixed(2) + '%' }}
                </template>
              </yu-xtable-column>
              <yu-xtable-column prop="bailPreRate" label="最低保证金比例" ></yu-xtable-column>
              <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
              <yu-xtable-column prop="eiMode" label="结息方式" data-code="STD_EI_MODE"></yu-xtable-column>
              <yu-xtable-column prop="repayMode" label="还款方式" data-code="STD_REPAY_MODE"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="1.2委托贷款额度" :hideFilter="false" :collapseHide="false">
            <yu-xtable :data="replySubEntrustList" style="width: 100%;margin-bottom: 20px;" row-key="lmtDrawNo" border
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
              <yu-xtable-column prop="lmtDrawNo" label="授信分项流水号" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="lmtDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="lmtAmt" label="授信额度" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="lmtTerm" label="额度期限（月）" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="chrgRate" label="手续费率" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="chrgCollectMode" label="手续费收取方式" data-code="STD_CHRG_COLLECT_MODE" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="rateYear" label="年利率" sortable width="180">
                <template slot-scope="scope">
                  {{ isNaN(scope.row.rateYear)? '':Number(scope.row.rateYear*100).toFixed(2) + '%' }}
                </template>
              </yu-xtable-column>
              <yu-xtable-column prop="consignorCusId" label="委托人编号" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="consignorCusName" label="委托人名称" sortable ></yu-xtable-column>
              <yu-xtable-column prop="consignorType" label="委托人类型" data-code="STD_ZB_CUS_TYP" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="consignorCertType" label="证件类型" data-code="STD_ZB_CERT_TYP" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="consignorCertCode" label="证件号码" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="isPreLmt" label="最低保证金比例" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="eiMode" label="结息方式" data-code="STD_EI_MODE" sortable width="180"></yu-xtable-column>
              <yu-xtable-column prop="repayMode" label="还款方式" data-code="STD_REPAY_MODE" sortable width="180"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
        </yu-panel>
        <yu-panel title="2.担保方式" :hideFilter="false" :collapseHide="false">
          <yu-panel title="抵质押担保" :hideFilter="false" :collapseHide="false">
            <yu-xtable ref="refTable2"  row-number :data-url="dataUrl3" condition-key="condition" :base-params="baseParams3" selection-type="radio" request-type="POST" :pageable="false">
              <yu-xtable-column prop="pkId" label="pkId" hide-column></yu-xtable-column>
              <yu-xtable-column prop="subSerno" label="授信分项流水号"></yu-xtable-column>
              <yu-xtable-column prop="guarTypeCdName" label="抵质押品类型"></yu-xtable-column>
              <yu-xtable-column prop="pldimnMemo" label="抵质押品名称"></yu-xtable-column>
              <yu-xtable-column prop="guarCusName" label="抵质押所有人名称"></yu-xtable-column>
              <yu-xtable-column prop="pldAddress" label="坐落"></yu-xtable-column>
              <yu-xtable-column prop="pldSqu" label="面积"></yu-xtable-column>
              <yu-xtable-column prop="isPldOrder" label="是否顺位抵押" data-code="STD_ZB_YES_NO"></yu-xtable-column>
              <yu-xtable-column prop="evalAmt" label="评估价值"></yu-xtable-column>
              <yu-xtable-column prop="maxMortagageAmt"  label="我行可用价值"></yu-xtable-column>
              <yu-xtable-column prop="correFinAmt" label="对应融资金额" ></yu-xtable-column>
              <yu-xtable-column prop="mortagageRate" label="抵质押率">
                <template slot-scope="scope">
                  {{ scope.row.mortagageRate }}%
                </template>
              </yu-xtable-column>
            </yu-xtable>
          </yu-panel>
          <yu-panel title="保证担保" :hideFilter="false" :collapseHide="false">
            <yu-xtable ref="refTable3"  row-number :data-url="dataUrl4" condition-key="condition" :base-params="baseParams4" selection-type="radio" request-type="POST" :pageable="false">
              <yu-xtable-column prop="guarantyId" label="保证_ID" hide-column></yu-xtable-column>
              <yu-xtable-column prop="serno" label="授信分项流水号"></yu-xtable-column>
              <yu-xtable-column prop="cusId" label="保证人客户编号"></yu-xtable-column>
              <yu-xtable-column prop="assureName" label="保证人客户名称"></yu-xtable-column>
              <yu-xtable-column prop="guarAmt" label="本次拟担保金额"></yu-xtable-column>
            </yu-xtable>
          </yu-panel>
        </yu-panel>
        <yu-panel title="3.用信条件与其他限制性条件" :hideFilter="false" :collapseHide="false">
          <yu-xtable ref="refTable4" row-number :data-url="dataUrl5" condition-key="condition" :base-params="baseParams5" selection-type="radio" request-type="POST" :pageable="false">
              <yu-xtable-column prop="pkId" label="pkId" align="center" hide-column></yu-xtable-column>
              <yu-xtable-column prop="approveSerno" label="审批流水号" align="center"  hide-column></yu-xtable-column>
              <yu-xtable-column prop="condType" label="条件类型" align="center" hide-column></yu-xtable-column>
              <yu-xtable-column prop="condDesc" label="具体内容" align="center" ></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="4.贷后管理要求" :hideFilter="false" :collapseHide="false">
          <yu-xform-item label="是否按要求进行贷后管理" ctype="select"  name="isRequestManageAfterLoan" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="是否涉及阶段性担保" ctype="select"  name="isPerGur" data-code="STD_ZB_YES_NO"></yu-xform-item>
          <yu-xform-item label="阶段性担保期限（月）" ctype="input"  name="perGurTerm"></yu-xform-item>
          <yu-xtable ref="refTable5" row-number :data-url="dataUrl6" condition-key="condition" :base-params="baseParams6" selection-type="radio" request-type="POST" :pageable="false">
              <yu-xtable-column prop="pkId" label="pkId" align="center" hide-column></yu-xtable-column>
              <yu-xtable-column prop="approveSerno" label="审批流水号" align="center"  hide-column></yu-xtable-column>
              <yu-xtable-column prop="condType" label="条件类型" align="center" hide-column></yu-xtable-column>
              <yu-xtable-column prop="condDesc" label="贷后管理要求" align="center" ></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="5.还款计划" :hideFilter="false" :collapseHide="false">
          <yu-xtable ref="refTable6"  row-number :data-url="dataUrl7" condition-key="condition" :base-params="baseParams7" selection-type="radio" request-type="POST" :pageable="false">
            <yu-xtable-column prop="pkId" label="pkId" hide-column></yu-xtable-column>
            <yu-xtable-column prop="serno" label="授信分项品种编号" align="center" ></yu-xtable-column>
            <yu-xtable-column prop="lmtBizTypeName" label="授信品种" align="center"></yu-xtable-column>
            <yu-xtable-column prop="terms" label="还款期数"  align="center"></yu-xtable-column>
            <yu-xtable-column prop="repayDate" label="还款时间"  align="center"></yu-xtable-column>
            <yu-xtable-column prop="repayAmt"  label="还款金额" align="center"></yu-xtable-column>
          </yu-xtable>
          <yu-xtable ref="refTable7" row-number :data-url="dataUrl8" condition-key="condition" :base-params="baseParams8" selection-type="radio" request-type="POST" :pageable="false">
              <yu-xtable-column prop="pkId" label="pkId" hide-column></yu-xtable-column>
              <yu-xtable-column prop="apprSubPrdSerno" label="授信分项品种编号" align="center" width="160"></yu-xtable-column>
              <yu-xtable-column label="授信金额" prop="lmtAmt" align="center" width="120"></yu-xtable-column>
              <yu-xtable-column label="额度期限" prop="lmtTerm" align="center" width="120"></yu-xtable-column>
              <yu-xtable-column label="授信品种类型" prop="lmtBizType" align="center" width="120"></yu-xtable-column>
              <yu-xtable-column label="授信品种类型名称" prop="lmtBizTypeName" align="center" width="160"></yu-xtable-column>
              <yu-xtable-column prop="repayPlanDesc" label="还款计划描述" align="center" width="780"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
    </yu-xform>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_LOAN_APPR_MODE,STD_ZB_YES_NO,STD_APPR_MODE,STD_SX_LMT_TYPE,STD_EI_MODE,STD_REPAY_MODE,STD_CHRG_COLLECT_MODE,STD_ZB_CUS_TYP,STD_ZB_CERT_TYP');
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {},
      replySubList: [],
      replySubEntrustList: [],
      dataUrl2: backend.cmisBiz + '/api/lmtappr/queryGuarBaseInfo',
      baseParams2: {serno: this.$route.params.serno},
      dataUrl3: backend.cmisBiz + '/api/lmtappr/queryGuarBaseInfo',
      baseParams3: {serno: this.$route.params.serno},
      dataUrl4: backend.cmisBiz + '/api/guarguarantee/querguaranteerelbylmtappserno',
      baseParams4: {serno: this.$route.params.serno},
      dataUrl5: backend.cmisBiz + '/api/lmtappr/queryLoanCond',
      baseParams5: {serno: this.$route.params.serno, condType: '01'},
      dataUrl6: backend.cmisBiz + '/api/lmtappr/queryLoanCond',
      baseParams6: {serno: this.$route.params.serno, condType: '02'},
      dataUrl7: backend.cmisBiz + '/api/repaycapplan/selectbylmtserno',
      baseParams7: {condition: {serno: this.$route.params.serno}},
      dataUrl8: backend.cmisBiz + '/api/lmtappr/queryLmtApprSubDataBySerno',
      baseParams8: {serno: this.$route.params.serno, repayPlanDesc: ''}
    };
  },
  mounted () {
    var _this = this;
    _this.initForm();
    _this.getApproveBySerno();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var serno = _this.$route.params.serno;
      _this.formdata.serno = serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappr/queryInfoBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.formdata);
          });
        }
      });
    },

    getApproveBySerno: function () {
      var _this = this;
      var serno = _this.$route.params.serno;
      yufp.service.request({
        method: 'POST',
        data: serno,
        url: backend.cmisBiz + '/api/lmtappr/getapproveinfobyserno',
        callback: function (code, message, response) {
          _this.replySubList = response.data.lmtApproveSubDtoList;
        }
      });
      yufp.service.request({
        method: 'POST',
        data: {serno: serno},
        url: backend.cmisBiz + '/api/lmtappr/queryEntrustSubDataByParams',
        callback: function (code, message, response) {
          _this.replySubEntrustList = response.data.lmtApproveSubDtoList;
        }
      });
    },
    onPrint: function () {
      var _this = this;
      // var params = _this.baseFormdata;// 模板工厂中的参数传递
      var params = {};
      params.serno = _this.$route.params.serno;
      if (params.serno == null || params.serno == '') {
        _this.$xutils.showMsgBox('提示', '流水号为空!\r\n请重新操作!', 350, 150);
        return;
      }
      let name = 'zrcbank/biz/pvpLoanApp/frptdemo'; // 引入另外一个vue文件
      let keydemo = 'frptdemosxpfdysp2second';
      params.src = _this.$backend.frptRptService + 'DGSX-SXPF-DY-SP2.cpt&op=view&serno=' + params.serno;
      _this.$router.addTab({
        // 路由名称
        name: name,
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: keydemo, // 必传
        // 页签名称
        title: '授信批复(单一)',
        // 传递的业务数据，可选配置
        data: params
      });
    }
  }
};
</script>
