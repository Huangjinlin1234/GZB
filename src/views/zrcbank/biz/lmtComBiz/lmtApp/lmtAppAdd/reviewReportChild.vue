 <!--
    单一审查
  -->
<template>
  <div>
    <!-- <div style="text-align:center">
      <a class="underline" style="text-decoration:none;align:center" @click="onPrint">查看电子版</a>
    </div> -->
        <yu-xform ref="lmtBaseForm" label-width="160px" v-model="baseFormdata1" :disabled="type=='VIEW'||showSaveBtn" :form-type="viewType">
            <yu-panel title="授信基本信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group>
                <yu-xform-item label="业务流水号" disabled ctype="input" name="serno"></yu-xform-item>
                <yu-xform-item label="业务类型" disabled ctype="select" name="lmtType" data-code="STD_SX_LMT_TYPE"></yu-xform-item>
                <yu-xform-item label="客户编号" disabled ctype="input" name="cusId"></yu-xform-item>
                <yu-xform-item label="客户名称" disabled ctype="input" name="cusName"></yu-xform-item>
                <yu-xform-item label="审批模式" disabled ctype="select" name="apprMode" data-code="STD_APPR_MODE"></yu-xform-item>
                <yu-xform-item label="经办客户经理" disabled ctype="input" name="inputId"></yu-xform-item>
                <yu-xform-item label="经办机构" disabled ctype="input" name="inputBrId"></yu-xform-item>
                <yu-xform-item label="主管客户经理" disabled ctype="input" name="managerId" hidden></yu-xform-item>
                <yu-xform-item label="主管机构" disabled ctype="input" name="managerBrId" hidden></yu-xform-item>
                <yu-xform-item label="主管客户经理" disabled ctype="input" name="managerIdName" hidden></yu-xform-item>
                <yu-xform-item label="主管机构" disabled ctype="input" name="managerBrIdName" hidden></yu-xform-item>
              </yu-xform-group>
            </yu-panel>

              <yu-panel title="1.授信额度" :hideFilter="false" :collapseHide="false">
                <yu-panel title="1.1一般授信额度" :hideFilter="false" :collapseHide="false">
                  <yu-xform-group :column="2">
                    <yu-xform-item label="授信期限（月）" ctype="input" name="lmtTerm"></yu-xform-item>
                    <yu-xform-item label="用信审核方式" ctype="select" name="loanApprMode" data-code="STD_LOAN_APPR_MODE"></yu-xform-item>
                  </yu-xform-group>
                  <yu-xtable :data="replySubList" style="width: 100%;margin-bottom: 20px;" row-key="lmtDrawNo" border
                            :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
                    <yu-xtable-column prop="lmtDrawNo" label="授信分项流水号" sortable width="180"></yu-xtable-column>
                    <yu-xtable-column prop="lmtDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
                    <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                    <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                    <yu-xtable-column prop="lmtAmt" label="授信额度"></yu-xtable-column>
                    <yu-xtable-column prop="lmtTerm" label="额度期限（月）"></yu-xtable-column>
                    <yu-xtable-column prop="isPreLmt" label="是否预授信额度" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                    <yu-xtable-column prop="isSfcaLmt" label="是否存量授信" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                    <yu-xtable-column prop="todo" label="操作" width="100">
                      <template slot-scope="scope">
                        <a class="underline" @click="editSub(scope.row)" v-if="!showSaveBtn">修改</a>
                      </template>
                    </yu-xtable-column>
                  </yu-xtable>
                </yu-panel>
                <div :hidden="hiddenByEntrust">
                  <yu-panel title="1.2委托贷款额度" :hideFilter="false" :collapseHide="false">
                    <yu-xtable :data="replySubEntrustList" style="width: 100%;margin-bottom: 20px;" row-key="lmtDrawNo" border
                              :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :pageable="false">
                      <yu-xtable-column prop="lmtDrawNo" label="授信分项流水号" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="lmtDrawType" label="授信品种" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="lmtAmt" label="授信额度" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="lmtTerm" label="额度期限（月）" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="chrgRate" label="手续费率" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="chrgCollectMode" label="手续费收取方式" data-code="STD_CHRG_COLLECT_MODE" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="rateYear" label="年利率" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="consignorCusId" label="委托人编号" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="consignorCusName" label="委托人名称" sortable ></yu-xtable-column>
                      <yu-xtable-column prop="consignorType" label="委托人类型" data-code="STD_ZB_CUS_TYP" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="consignorCertType" label="证件类型" data-code="STD_ZB_CERT_TYP" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="consignorCertCode" label="证件号码" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="isRevolvLimit" label="是否循环额度" data-code="STD_ZB_YES_NO" sortable width="180"></yu-xtable-column>
                      <!--<yu-xtable-column prop="isPreLmt" label="最低保证金比例" sign="%" :multiple="100" sortable width="180"></yu-xtable-column>-->
                      <yu-xtable-column prop="isPreLmt" label="最低保证金比例"  filter-placement="bottom-end">
                        <template slot-scope="scope">
                          {{ scope.row.lmtAmt }}%
                        </template>
                      </yu-xtable-column>
                      <yu-xtable-column prop="guarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="eiMode" label="结息方式" data-code="STD_EI_MODE" sortable width="180"></yu-xtable-column>
                      <yu-xtable-column prop="repayMode" label="还款方式" data-code="STD_REPAY_MODE" sortable width="180"></yu-xtable-column>
                    </yu-xtable>
                  </yu-panel>
                </div>
              </yu-panel>
              <yu-panel title="2.担保方式" :hideFilter="false" :collapseHide="false">
                <yu-panel title="抵质押担保" :hideFilter="false" :collapseHide="false">
                  <div class="yu-toolBar">
                    <yu-button-group>
                      <yu-button type="primary" @click="saveRef2" v-if="!showSaveBtn">保存</yu-button>
                    </yu-button-group>
                  </div>
                  <yu-xtable ref="refTable2"  row-number :data-url="dataUrl3" condition-key="condition" :base-params="baseParams3" selection-type="radio" request-type="POST" :pageable="false">
                    <yu-xtable-column prop="guarNo" label="guarNo" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="approveSubSerno" label="授信分项流水号"></yu-xtable-column>
                    <yu-xtable-column prop="guarTypeCd" label="抵质押品类型" :formatter="guarTypeCdFormatter"></yu-xtable-column>
                    <yu-xtable-column prop="pldimnMemo" label="抵质押品名称"></yu-xtable-column>
                    <yu-xtable-column prop="guarCusName" label="抵质押所有人名称"></yu-xtable-column>
                    <yu-xtable-column prop="pldLocation" label="坐落" ></yu-xtable-column>
                    <yu-xtable-column prop="squ" label="面积" ></yu-xtable-column>
                    <yu-xtable-column prop="isPldOrder" label="是否顺位抵押" data-code="STD_ZB_YES_NO"></yu-xtable-column>
                    <yu-xtable-column prop="evalAmt" label="评估价值"></yu-xtable-column>
                    <yu-xtable-column prop="maxMortagageAmt"  label="我行可用价值"></yu-xtable-column>
                    <yu-xtable-column prop="correFinAmt" label="对应融资金额" ctype="yu-num"></yu-xtable-column>
                    <yu-xtable-column prop="mortagageRate" label="抵质押率(%)" >
                      <template slot-scope="scope">
                        {{ scope.row.mortagageRate }}%
                      </template>
                    </yu-xtable-column>
                  </yu-xtable>
                  <yu-panel title="" :hideFilter="false" :collapseHide="false">
                    <yu-xform-item label="抵质押担保其他事项说明" ctype="textarea"  name="guarAssureAcc"></yu-xform-item>
                  </yu-panel>
                </yu-panel>
                <yu-panel title="保证担保" :hideFilter="false" :collapseHide="false">
                  <yu-xtable ref="refTable3"  row-number :data-url="dataUrl4" row-click="rowClick3" condition-key="condition" :base-params="baseParams4" selection-type="radio" request-type="POST" :pageable="false"
                    :utrace="utrace"
                    u-pk-value="reViewReport"
                    trace-server-name="/yusp-app-oca"
                    ukey-field="guarantyId"
                    :utrace-usr-id="userId"
                    :utrace-org-id="orgId"
                    :utrace-menu-id="menuId"
                    trace-get-interface="/api/utrace/listByPk"
                    trace-get-list-interface="/api/utrace/listPage"
                    trace-save-interface="/api/utrace/save" >
                  >
                    <yu-xtable-column prop="guarantyId" label="保证_ID" hide-column utrace></yu-xtable-column>
                    <yu-xtable-column prop="serno" label="授信分项流水号"></yu-xtable-column>
                    <yu-xtable-column prop="cusId" label="保证人客户编号"></yu-xtable-column>
                    <yu-xtable-column prop="assureName" label="保证人客户名称"></yu-xtable-column>
                    <yu-xtable-column prop="guarAmt" label="本次拟担保金额" ctype="yu-num" utrace></yu-xtable-column>
                    <yu-xtable-column prop="todo" label="操作" width="100">
                      <template slot-scope="scope">
                        <a class="underline" @click="saveGuarAmt(scope.row)" v-if="!showSaveBtn">保存</a>
                      </template>
                    </yu-xtable-column>
                  </yu-xtable>
                  <yu-panel title="" :hideFilter="false" :collapseHide="false">
                    <yu-xform-item label="保证担保其他事项说明" ctype="textarea"  name="generalAssureAcc"></yu-xform-item>
                  </yu-panel>
                </yu-panel>
              </yu-panel>
            <yu-panel title="3.用信条件与其他限制性条件" :hideFilter="false" :collapseHide="false">
                  <div class="yu-toolBar">
                    <yu-button-group>
                      <yu-button type="primary" @click="addRef4" v-if="!showSaveBtn">新增</yu-button>
                      <yu-button type="primary" @click="deleteRef4" v-if="!showSaveBtn">删除</yu-button>
                      <yu-button type="primary" @click="saveRef4" v-if="!showSaveBtn">保存</yu-button>
                    </yu-button-group>
                  </div>
                  <yu-xtable ref="refTable4" row-number :data-url="dataUrl5" condition-key="condition" :base-params="baseParams5" selection-type="radio" request-type="POST" :pageable="false">
                      <yu-xtable-column prop="pkId" label="pkId" align="center" hide-column></yu-xtable-column>
                      <yu-xtable-column prop="approveSerno" label="审批流水号" align="center"  hide-column></yu-xtable-column>
                      <yu-xtable-column prop="condType" label="条件类型" align="center" hide-column></yu-xtable-column>
                      <yu-xtable-column prop="condDesc" label="具体内容" align="center"  ctype="input"></yu-xtable-column>
                  </yu-xtable>
              </yu-panel>
              <!--<yu-panel title="4.贷后管理要求" :hideFilter="false" :collapseHide="false">
                <yu-xform-item label="是否按要求进行贷后管理" ctype="select"  name="isRequestManageAfterLoan" data-code="STD_ZB_YES_NO" @change="isManAftLoanFnc"></yu-xform-item>
                <yu-xform-item label="是否涉及阶段性担保" ctype="select"  name="isPerGur" data-code="STD_ZB_YES_NO"></yu-xform-item>
                <yu-xform-item label="阶段性担保期限（月）" ctype="yu-num"  name="perGurTerm"></yu-xform-item>
                <div class="yu-toolBar">
                  <yu-button-group>
                    <yu-button @click="addRef6" :disabled="isManAftLoan||showSaveBtn">新增</yu-button>
                    <yu-button @click="deleteRef6" :disabled="isManAftLoan||showSaveBtn">删除</yu-button>
                    <yu-button @click="saveRef6" :disabled="isManAftLoan||showSaveBtn">保存</yu-button>
                    <yu-button @click="register" :disabled="isManAftLoan||showSaveBtn">压降计划登记</yu-button>
                  </yu-button-group>
                </div>
                <yu-xtable ref="refTable5" row-number :data-url="dataUrl6" condition-key="condition" :base-params="baseParams6" selection-type="radio" request-type="POST" :pageable="false">
                    <yu-xtable-column prop="pkId" label="pkId" align="center" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="approveSerno" label="审批流水号" align="center"  hide-column></yu-xtable-column>
                    <yu-xtable-column prop="condType" label="条件类型" align="center" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="condDesc" label="贷后管理要求" align="center" ctype="input"></yu-xtable-column>
                </yu-xtable>
              </yu-panel>-->
              <yu-panel title="4.还款计划" :hideFilter="false" :collapseHide="false">
                <div class="yu-toolBar">
                  <yu-button-group>
                    <yu-button type="primary" @click="addRepay" v-if="!showSaveBtn">新增</yu-button>
                    <yu-button type="primary" @click="updateRepay" v-if="!showSaveBtn">保存</yu-button>
                    <yu-button type="primary" @click="deleteRepay" v-if="!showSaveBtn">删除</yu-button>
                  </yu-button-group>
                </div>
                <yu-xtable ref="refTable6"  row-number :data-url="dataUrl7" condition-key="condition" :base-params="baseParams7" selection-type="radio" request-type="POST" :pageable="false">
                    <yu-xtable-column prop="pkId" label="pkId" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="serno" label="serno" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="subPrdSerno" label="授信分项品种编号" align="center" ctype="input" icon="search" :triger-click="false" :on-icon-click="inputRepayPlan"></yu-xtable-column>
                    <yu-xtable-column prop="lmtBizTypeName" label="授信品种" align="center"></yu-xtable-column>
                    <yu-xtable-column prop="terms" label="还款期数" ctype="yu-num" align="center"></yu-xtable-column>
                    <yu-xtable-column prop="repayDate" label="还款时间" ctype="datepicker" align="center"></yu-xtable-column>
                    <yu-xtable-column prop="repayAmt" ctype="yu-num" label="还款金额" align="center"></yu-xtable-column>
                </yu-xtable>
                <div class="yu-toolBar">
                  <yu-button-group>
                    <yu-button type="primary" @click="addInfo8" v-if="!showSaveBtn">新增</yu-button>
                    <yu-button type="primary" @click="updateInfo8" v-if="!showSaveBtn">保存</yu-button>
                    <yu-button type="primary" @click="deleteInfo8" v-if="!showSaveBtn">删除</yu-button>
                  </yu-button-group>
                </div>
                <yu-xtable ref="refTable8" row-number :data-url="dataUrl8" condition-key="condition" :base-params="baseParams8" selection-type="radio" request-type="POST" :pageable="false">
                    <yu-xtable-column prop="pkId" label="pkId" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="apprSubPrdSerno" label="apprSubPrdSerno" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="approveSubSerno" label="授信分项编号" hide-column></yu-xtable-column>
                    <yu-xtable-column prop="subPrdSerno" label="授信分项品种编号" align="center" ctype="input" icon="search" :triger-click="false" :on-icon-click="inputRepayDesc"></yu-xtable-column>
                    <yu-xtable-column label="授信金额" prop="lmtAmt" align="center" width="120"></yu-xtable-column>
                    <yu-xtable-column label="额度期限" prop="lmtTerm" align="center" width="120"></yu-xtable-column>
                    <yu-xtable-column label="授信品种类型" prop="lmtBizType" align="center" width="120"></yu-xtable-column>
                    <yu-xtable-column label="授信品种类型名称" prop="lmtBizTypeName" align="center" width="160"></yu-xtable-column>
                    <yu-xtable-column label="还款计划描述" prop="repayPlanDesc" ctype="input" align="center" width="780"></yu-xtable-column>
                </yu-xtable>
              </yu-panel>
          </yu-xform>

    <yu-form-buttons align="center">
      <yu-button v-if="type!='VIEW'||!showSaveBtn" type="primary" @click="tempSave">暂存</yu-button>
      <yu-button v-if="type!='VIEW'||!showSaveBtn" type="primary" @click="submit">保存</yu-button>
      <!-- <yu-button type="primary" v-if="!showSaveBtn" @click="onPrint">打印</yu-button> -->
    </yu-form-buttons>
  </div>
</template>

<script>
import { sessionStore } from 'xy-utils';
yufp.lookup.reg('STD_SX_LMT_TYPE,STD_APPR_MODE,STD_ZB_CUS_TYP,STD_ZB_CERT_TYP,STD_ZB_GUAR_WAY,STD_EI_MODE,STD_REPAY_MODE,STD_CHRG_COLLECT_MODE,STD_LOAN_APPR_MODE,STD_ZB_CONC,STD_ZB_YES_NO');
export default {
  components: {},
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    return {
      type: '',
      majorGradeForm: null,
      replySubEntrustList: [],
      hiddenByEntrust: true,
      menuId: 'reViewReportMenuId',
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      dataUrl1: this.$backend.cmisBiz + '/api/lmtappr/queryLmtApprSubBySerno',
      baseParams1: { serno: this.$route.params.serno, lmtBizType: '' },
      dataUrl2: this.$backend.cmisBiz + '/api/lmtappr/queryLmtApprSubBySerno',
      baseParams2: { serno: this.$route.params.serno, lmtBizType: '' },
      // baseParam2: {serno: this.getFactory().contextData.serno, contType: '01'},
      dataUrl3: backend.cmisBiz + '/api/lmtappr/queryGuarBaseInfo',
      // baseParam3: {serno: this.getFactory().contextData.serno, contType: '03'},
      baseParams3: {serno: this.$route.params.serno},
      dataUrl4: backend.cmisBiz + '/api/guarguarantee/querguaranteerelbylmtappserno',
      // '/api/lmtappr/queryGuaranteeInfo'  querguaranteerelbylmtappserno
      baseParams4: {serno: this.$route.params.serno},
      // baseParam4: {serno: this.getFactory().contextData.serno},
      dataUrl5: backend.cmisBiz + '/api/lmtappr/queryLoanCond',
      baseParams5: {serno: this.$route.params.serno, condType: '01'},
      dataUrl6: backend.cmisBiz + '/api/lmtappr/queryLoanCond',
      baseParams6: {serno: this.$route.params.serno, condType: '02'},
      dataUrl7: backend.cmisBiz + '/api/repaycapplan/selectbylmtserno',
      baseParams7: {condition: {serno: this.$route.params.serno}},
      dataUrl8: backend.cmisBiz + '/api/lmtappr/queryLmtApprSubDataBySerno',
      baseParams8: {serno: this.$route.params.serno, repayPlanDesc: ''},
      dialogVisible: false,
      effType: '',
      replySubList: [], // 分项列表
      isManAftLoan: false,
      showSaveBtn: false, // 办结查看标志
      oldGuarAmt: '',
      hiddenByLmtType: true,
      titleText: '一、评审结论',
      DZDataObject: {}
    };
  },
  created () {
    this.$request({
      url: this.$backend.cmisCfg + '/api/adminsmtreedic/tree',
      method: 'post',
      async: false,
      data: {
        optType: 'STD_DZY_TYPE',
        root: '',
        baseFormdata1: {}
      }
    }).then(res => {
      if (res.code == '0') {
        this.DZData = [];
        this.$utils.clone(res.data.data, this.DZData);
        console.log('res.data------------->', res.data);
      }
    });
  },
  mounted () {
    this.initForm();
    this.getApproveBySerno();
    // 查询对应的申请信息
    this.initFromApp();
  },
  methods: {
    /**
     * 加载表单数据
     */
    initForm: function () {
      let _this = this;
      var serno = _this.$route.params.serno;
      // 已办 办结进入
      if (_this.$route.params && (_this.$route.params.type == 'DONE' || _this.$route.params.type == 'HIS')) {
        _this.showSaveBtn = true;
      }
      // 查看
      if (_this.$route.params && (_this.$route.params.op == 'VIEW')) {
        _this.showSaveBtn = true;
      }
      _this.baseFormdata1.serno = serno;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappr/queryInfoBySerno',
        data: serno,
        callback: function (code, message, response) {
          _this.$nextTick(function () {
            yufp.clone(response.data, _this.baseFormdata1);
            // 审查报告第二点永久
            // 复审04、变更02、复议05、调剂08前面三点都去掉
            // 再议06、新增01，续作03、预授信细化07留1、3
            if (response.data.lmtType == '04' || response.data.lmtType == '02' || response.data.lmtType == '05' || response.data.lmtType == '08') {
              _this.hiddenByLmtType = true;
              _this.titleText = '一、评审结论';
            } else if (response.data.lmtType == '01' || response.data.lmtType == '03' || response.data.lmtType == '06' || response.data.lmtType == '07') {
              _this.hiddenByLmtType = false;
              _this.titleText = '三、评审结论';
            }
          });
        }
      });
    },

    /**
     * 加载表单控制
     */
    initFromApp: function () {
      let _this = this;
      if (_this.$route.params.op) {
        _this.type = _this.$route.params.op;
      }
      // yufp.service.request({
      //   method: 'POST',
      //   url: backend.cmisBiz + '/api/lmtapp/getlmtappbyserno',
      //   data: {serno: serno},
      //   callback: function (code, message, response) {
      //     // 单一授信进入
      //     if (response.data && '997,998,996,993'.indexOf(response.data.approveStatus) != -1) {
      //       _this.showSaveBtn = true;
      //     }
      //     // 成员客户进入
      //     if (response.data && response.data.isGrp == '1') {
      //       _this.showSaveBtn = false;
      //     }
      //   }
      // });
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
          // _this.replyLoanConds = response.data.lmtApprLoanConds;
        }
      });
      yufp.service.request({
        method: 'POST',
        data: {serno: serno},
        url: backend.cmisBiz + '/api/lmtappr/queryEntrustSubDataByParams',
        callback: function (code, message, response) {
          _this.replySubEntrustList = response.data.lmtApproveSubDtoList;
          if (response.data.lmtApproveSubDtoList && response.data.lmtApproveSubDtoList != null) {
            _this.hiddenByEntrust = false;
          }
        }
      });
    },
    // 压降计划登记
    register () {
      var _this = this;
      var params = {};
      yufp.service.request({
        async: false,
        method: 'POST',
        data: {
          cusId: _this.baseFormdata1.cusId,
          enterListFlag: '02',
          status: '2'
        },
        url: backend.cmisCus + '/api/cuslstdedkkh/queryNewDekhDataByCusId',
        callback: function (code, message, response) {
          debugger;
          if (response.data && response.data.cusId != null) {
            params = response.data;
            params['op'] = 'update';
            params['opType'] = 'approve';
            params['managerBrId'] = params.belgOrg;
            params['managerBrIdName'] = params.belgOrgName;
            _this.$dialog.open(
              '大额贷款客户名单',
              'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex',
              -1,
              -1,
              params
            );
          } else {
            if (_this.baseFormdata1.cusId.startsWith('8')) {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisCus + '/api/cuscorp/selectcropbycusid',
                data: _this.baseFormdata1.cusId,
                callback: function (code, message, response) {
                  yufp.clone(response.data, params);
                  params['op'] = 'add';
                  params['opType'] = 'approve';
                  params['belgOrg'] = params.managerBrId;
                  params['belgOrgName'] = params.managerBrIdName;
                  _this.$dialog.open(
                    '大额贷款客户名单',
                    'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex',
                    -1,
                    -1,
                    params
                  );
                }
              });
            } else if (!_this.baseFormdata1.cusId.startsWith('8')) {
              yufp.service.request({
                method: 'POST',
                url: backend.cmisCus + '/api/cusindiv/querycusindivbycusid',
                data: _this.baseFormdata1.cusId,
                callback: function (code, message, response) {
                  yufp.clone(response.data, params);
                  params['op'] = 'add';
                  params['opType'] = 'approve';
                  params['belgOrg'] = params.managerBrId;
                  params['belgOrgName'] = params.managerBrIdName;
                  _this.$dialog.open(
                    '大额贷款客户名单',
                    'cusmanage/corpCus/dedkkh/dedkkhInfoAddIndex',
                    -1,
                    -1,
                    params
                  );
                }
              });
            }
            // params['op'] = 'add';
            // params['opType'] = 'approve';
            // params['cusId'] = _this.baseFormdata1.cusId;
            // params['cusName'] = _this.baseFormdata1.cusName;
            // params['managerId'] = _this.baseFormdata1.inputId;
            // params['managerIdName'] = _this.baseFormdata1.inputIdName;
            // params['managerBrId'] = _this.baseFormdata1.inputBrId;
            // params['managerBrIdName'] = _this.baseFormdata1.inputBrIdName;
          }
        }
      });
    },

    /**
      *修改分项信息
      */
    editSub: function (data) {
      var _this = this;
      _this.$router.addTab({
        // 路由名称
        name: 'zrcbank/biz/lmtComBiz/lmtApp/lmtAppAdd/lmtApprSubInfo',
        // 自定义唯一页签key,请统一使用custom_前缀开头
        key: 'custom_reply' + data.lmtDrawNo, // 必传
        // 页签名称
        title: '授信额度信息修改',
        // 传递的业务数据，可选配置
        data: data
      });
    },
    // 保存按钮提示信息
    submit: function () {
      var _this = this;
      var comitData = {};
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
                if (code == 0) {
                  _this.$message('保存成功');
                }
              }
            });
          }
        }
      });
    },

    // 保存按钮提示信息
    tempSave: function () {
      var _this = this;
      var comitData = {};
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
                if (code == 0) {
                  _this.$message('暂存成功');
                }
              }
            });
          }
        }
      });
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
      params.serno = _this.$route.params.serno;
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
    },
    // 用信条件 保存
    saveRef4 () {
      var _this = this;
      var tableData = _this.$refs.refTable4.tabledata;
      if (tableData.length > 0) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapprloancond/batchsavelmtapprloancond',
          data: tableData,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.$refs.refTable4.remoteData();
            } else {
              _this.$message({showClose: true, message: '保存失败', type: 'error'});
            }
          }
        });
      } else {
        return;
      }
    },

    // 用信条件 新增
    addRef4: function () {
      var _this = this;
      _this.$refs.refTable4.clearValidateMessage();
      _this.pushRefTable4Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable4Row: function () {
      var _this = this;
      let pkId = _this.$xutils.getUUID();
      let row = {pkId: pkId, approveSerno: _this.$route.params.serno, condType: '01', condDesc: '', createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
      _this.$refs.refTable4.tabledata.push(row);
      _this.$refs.refTable4.setCurrentRow(row);
    },

    // 用信条件 删除
    deleteRef4 () {
      let selections = this.$refs.refTable4.selections;
      var _this = this;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let data = selections[0];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapprloancond/deleteByPkId',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({showClose: true, message: '删除成功', type: 'success'});
            _this.$refs.refTable4.remoteData();
          } else {
            _this.$message({showClose: true, message: '删除失败', type: 'error'});
          }
        }
      });
    },

    // 贷后管理条件 保存
    saveRef6 () {
      var _this = this;
      var tableData = _this.$refs.refTable5.tabledata;
      if (tableData.length > 0) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/lmtapprloancond/batchsavelmtapprloancond',
          data: tableData,
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
            } else {
              _this.$message({showClose: true, message: '保存失败', type: 'error'});
            }
          }
        });
      } else {
        return;
      }
    },

    // 贷后管理条件 新增
    addRef6: function () {
      var _this = this;
      _this.$refs.refTable5.clearValidateMessage();
      _this.pushRefTable6Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable6Row: function () {
      var _this = this;
      let pkId = _this.$xutils.getUUID();
      let row = {pkId: pkId, approveSerno: _this.$route.params.serno, condType: '02', condDesc: '', createTime: this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
      _this.$refs.refTable5.tabledata.push(row);
      _this.$refs.refTable5.setCurrentRow(row);
    },

    // 贷后管理条件 删除
    deleteRef6 () {
      let selections = this.$refs.refTable5.selections;
      var _this = this;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let data = selections[0];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapprloancond/deleteByPkId',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({showClose: true, message: '删除成功', type: 'success'});
            _this.$refs.refTable5.remoteData();
          } else {
            _this.$message({showClose: true, message: '删除失败', type: 'error'});
          }
        }
      });
    },

    // 是否按要求贷后管理
    isManAftLoanFnc (value) {
      if (value == '0') {
        this.isManAftLoan = true;
      } else {
        this.isManAftLoan = false;
      }
    },

    // 担保列表 保存
    saveRef2 () {
      var _this = this;
      var tableData = _this.$refs.refTable2.tabledata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtappr/batchsavelmtreplysubdata',
        data: tableData,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '保存成功', type: 'success' });
            _this.$refs.refTable2.remoteData();
          } else {
            _this.$message({showClose: true, message: '保存失败', type: 'error'});
          }
        }
      });
    },


    // 还款计划维护
    updateRepay () {
      let _this = this;
      let tableData = _this.$refs.refTable6.selections;
      if (tableData.length == 1) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisBiz + '/api/repaycapplan/saverepaycapplanretail',
          data: tableData[0],
          callback: function (code, message, response) {
            if (response.code == '0') {
              _this.$message({ message: '保存成功', type: 'success' });
              _this.$refs.refTable6.remoteData();
            } else {
              _this.$message({showClose: true, message: '保存失败', type: 'error'});
            }
          }
        });
      } else {
        _this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
    },

    // 还款计划 选取分项明细
    inputRepayPlan: function (value) {
      var _this = this;
      let serno = _this.$route.params.serno;
      var data = {serno: serno};
      _this.$dialog.open('', 'zrcbank/biz/common/lmtApprSubPrdRepayPlan', 1000, 800, data, params => {
        _this.$refs.refTable6.selections[0].serno = params.apprSubPrdSerno;
        _this.$refs.refTable6.selections[0].subPrdSerno = params.subPrdSerno;
        _this.$refs.refTable6.selections[0].lmtBizTypeName = params.lmtBizTypeName;
      });
    },

    // 还款计划 新增
    addRepay: function () {
      var _this = this;
      _this.$refs.refTable6.clearValidateMessage();
      _this.pushRefTable7Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable7Row: function () {
      var _this = this;
      // let pkId = _this.$xutils.getUUID();
      let loginInfo = _this.$xutils.getLoginUserInfo();
      let row = {pkId: '',
        serno: '',
        terms: '',
        repayDate: '',
        repayAmt: '',
        oprType: '01',
        inputId: loginInfo.loginCode,
        inputBrId: loginInfo.org.id,
        inputDate: _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        updId: loginInfo.loginCode,
        updBrId: loginInfo.org.id,
        updDate: _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        createTime: _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
      _this.$refs.refTable6.tabledata.push(row);
      _this.$refs.refTable6.setCurrentRow(row);
    },

    // 还款计划 删除
    deleteRepay () {
      let selections = this.$refs.refTable6.selections;
      var _this = this;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let data = selections[0];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/repaycapplan/deleteByPkId',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({showClose: true, message: '删除成功', type: 'success'});
            _this.$refs.refTable6.remoteData();
          } else {
            _this.$message({showClose: true, message: '删除失败', type: 'error'});
          }
        }
      });
    },

    // 还款计划描述 新增
    addInfo8: function () {
      var _this = this;
      _this.$refs.refTable8.clearValidateMessage();
      _this.pushRefTable8Row();
    },
    // 添加数据 添加一条空白数据
    pushRefTable8Row: function () {
      var _this = this;
      // let pkId = _this.$xutils.getUUID();
      let loginInfo = _this.$xutils.getLoginUserInfo();
      let row = {pkId: '',
        apprSubPrdSerno: '',
        lmtAmt: '',
        lmtTerm: '',
        lmtBizType: '',
        lmtBizTypeName: '',
        updId: loginInfo.loginCode,
        updBrId: loginInfo.org.id,
        updDate: _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date()),
        createTime: _this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date())};
      _this.$refs.refTable8.tabledata.push(row);
      _this.$refs.refTable8.setCurrentRow(row);
    },

    // 还款计划 选取分项明细
    inputRepayDesc: function (value) {
      var _this = this;
      let serno = _this.$route.params.serno;
      var data = {serno: serno};
      _this.$dialog.open('', 'zrcbank/biz/common/lmtApprSubPrdRepayPlan', 1000, 800, data, params => {
        _this.$refs.refTable8.selections[0].pkId = params.pkId;
        _this.$refs.refTable8.selections[0].subPrdSerno = params.subPrdSerno;
        _this.$refs.refTable8.selections[0].apprSubPrdSerno = params.apprSubPrdSerno;
        _this.$refs.refTable8.selections[0].approveSubSerno = params.approveSubSerno;
        _this.$refs.refTable8.selections[0].lmtAmt = params.lmtAmt;
        _this.$refs.refTable8.selections[0].lmtTerm = params.lmtTerm;
        _this.$refs.refTable8.selections[0].lmtBizType = params.lmtBizType;
        _this.$refs.refTable8.selections[0].lmtBizTypeName = params.lmtBizTypeName;
      });
    },

    // 还款计划描述 维护
    updateInfo8 () {
      let _this = this;
      let tableData = _this.$refs.refTable8.tabledata;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapprsubprd/batchupdate',
        data: tableData,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '保存成功', type: 'success' });
            _this.$refs.refTable8.remoteData();
          } else {
            _this.$message({showClose: true, message: '保存失败', type: 'error'});
          }
        }
      });
    },

    // 还款计划描述 删除  将还款计划描述置为空
    deleteInfo8 () {
      let selections = this.$refs.refTable8.selections;
      var _this = this;
      if (selections.length < 1) {
        this.$message({ message: '请选中一条数据！', type: 'warning' });
        return;
      }
      let data = selections[0];
      data.repayPlanDesc = '';
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/lmtapprsubprd/update',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '删除成功', type: 'success' });
            _this.$refs.refTable8.remoteData();
          } else {
            _this.$message({showClose: true, message: '删除失败', type: 'error'});
          }
        }
      });
    },
    // 保证人列表 表格单击时间
    rowClick3 (data) {
      debugger;
      this.oldGuarAmt = data.guarAmt;
    },

    // 保证人列表 本次担保金额修改
    saveGuarAmt (data) {
      let _this = this;
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/guarguarantee/update',
        data: data,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message({ message: '保存成功', type: 'success' });
            _this.$refs.refTable4.remoteData();
            _this.saveUtrace();
          } else {
            _this.$message({showClose: true, message: '保存失败', type: 'error'});
          }
        }
      });
    },

    // 小U留痕
    saveUtrace () {

    },

    // 抵质押类型翻译
    guarTypeCdFormatter (row, column, cellValue) {
      if (cellValue && this.DZData.length > 0) {
        if (Object.prototype.hasOwnProperty.call(this.DZDataObject, cellValue)) {
          return this.DZDataObject[cellValue];
        }
        const node = this.findTreeNode(this.DZData, cellValue);
        if (node) {
          this.DZDataObject[cellValue] = node.label;
          return node.label;
        }
        return cellValue;
      }
      return cellValue;
    },
    findTreeNode (tree, id) {
      if (tree.length > 0) {
        let node;
        for (let i = 0; i < tree.length; i++) {
          const element = tree[i];
          if (element.id == id) {
            return element;
          }
          if (element.children && element.children.length > 0) {
            node = this.findTreeNode(element.children, id);
            if (node) {
              return node;
            }
          }
        }
      }
    }


  }
};
</script>
