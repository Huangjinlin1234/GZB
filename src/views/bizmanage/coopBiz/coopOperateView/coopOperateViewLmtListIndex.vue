
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div class="tab-form">
    <yu-tabs v-model="tabName">
      <yu-tab-pane label="授信信息" name="base">
        <yu-panel title="客户额度信息" panel-type="simple" v-if="false">
          <yu-xform ref="refForm" label-width="100px" v-model="formdata" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="合作方编号" ctype="input" name="partnerNo" disabled></yu-xform-item>
              <yu-xform-item label="合作方名称" ctype="input" name="partnerName" disabled></yu-xform-item>
              <yu-xform-item label="合作方类型" ctype="select" name="partnerType" data-code="STD_PARTNER_TYPE" disabled></yu-xform-item>
              <yu-xform-item label="总合作额度" ctype="input" name="totalCoopLmtAmt" disabled></yu-xform-item>
              <yu-xform-item label="已用额度" ctype="input" name="totalUseAmt" disabled></yu-xform-item>
              <yu-xform-item label="可用额度" ctype="input" name="totalValAmt" disabled></yu-xform-item>
              <yu-xform-item label="用信总余额" ctype="num" name="totalloanBalance" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="合作方分项/项目额度" panel-type="simple">
          <yu-button type="primary" @click="changeAllLmt()">显示全部关联业务</yu-button>
          <yu-xtable ref="indirectAccTable" row-number :data-url="urls.apprCoopSubInfoUrl" :base-params="indAccParam" :default-load="false" request-type="POST">
            <!--<yu-xtable ref="indirectAccTable" row-number :data="apprCoopSubInfoData" :pageable="true" :default-load="false" request-type="POST">-->
            <yu-xtable-column label="分项编号" prop="apprSubSerno">
              <template slot-scope="scope">
                <a style="color:rgb(133, 184, 92)" href="javaScript:void(0);" @click="changeLmt(scope.row)">{{ scope.row.apprSubSerno }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="分项类型" prop="copType" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="apprSerno"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="limitSubName"></yu-xtable-column>
            <!--<yu-xtable-column label="产品名称" prop="lmtBizTyprProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>-->
            <yu-xtable-column label="额度起始日" prop="startDate" width="100"></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="endDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="额度状态" prop="status" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
            <yu-xtable-column label="是否可循环" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="单户限额" prop="sigAmt" width="110"></yu-xtable-column>
            <yu-xtable-column label="单笔业务限额" prop="sigBussAmt" width="110"></yu-xtable-column>
            <yu-xtable-column label="授信总额" prop="avlAmt"></yu-xtable-column>
            <yu-xtable-column label="授信总额已用" prop="outstndAmt"></yu-xtable-column>
            <yu-xtable-column label="授信总额可用" prop="totalValAmt"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-button-group>
          <yu-button type="primary" @click="changeLmtContLeft()">合作额度下关联授信</yu-button>
          <yu-button type="primary" @click="changeLmtCentre()">合作额度下关联合同</yu-button>
          <yu-button type="primary" @click="changeLmtContRight()">合作额度下关联台账</yu-button>
        </yu-button-group>
        <yu-panel title="特色关联对公授信" v-show="defaultShow1" panel-type="simple">
          <yu-xtable ref="lmtAppSubTable" row-number :data-url="urls.lmtAppSubUrl" :base-params="lmtAppSubParam" :pageable="true" :default-load="false" show-summary :summary-method="getSummaries" request-type="POST">
            <yu-xtable-column label="授信分项额度编号" prop="subSerno"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="lmtBizTypeName"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="lmtBizTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="是否授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="授信额度" prop="lmtAmt"></yu-xtable-column>
            <yu-xtable-column label="额度期限(月)" prop="lmtTerm"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="一般担保关联对公授信（仅担保公司）" v-show="defaultShow1" panel-type="simple">
          <yu-xtable ref="lmtAppSubGuarTable" row-number :data-url="urls.lmtAppSubGuarUrl" :base-params="lmtAppSubGuarParam" :pageable="true" :default-load="false" show-summary :summary-method="getSummariesGuar" request-type="POST">
            <yu-xtable-column label="授信分项额度编号" prop="subSerno"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="lmtBizTypeName"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="lmtBizTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="是否循环额度" prop="isRevolvLimit" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="是否授信额度" prop="isPreLmt" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="guarMode" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="授信额度" prop="lmtAmt"></yu-xtable-column>
            <yu-xtable-column label="额度期限(月)" prop="lmtTerm"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="关联零售授信" v-show="defaultShow" panel-type="simple">
          <yu-xtable ref="iqpLoanAppTable" row-number :data-url="urls.iqpLoanAppUrl" :base-params="iqpLoanAppParam" :pageable="true" :default-load="false" show-summary :summary-method="getSummariesIqp" request-type="POST">
            <yu-xtable-column label="业务流水号" prop="iqpSerno"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column label="主担保方式" prop="guarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="申请币种" prop="appCurType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="申请金额" prop="appAmt"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column label="审批状态" prop="approveStatus" data-code="STD_ZB_APPR_STATUS"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="额度下占用合同列表" v-show="ifContShow" panel-type="simple">
          <yu-xtable ref="cusLmtContTable" row-number :data-url="urls.cusLmtContUrl" :base-params="cusLmtContParam" :pageable="true" :default-load="false" show-summary :summary-method="getCusLmtContData" request-type="POST">
            <!--<yu-xtable ref="cusLmtContTable" row-number :data="cusLmtContData" :base-params="cusLmtContParam" :pageable="true" :default-load="false" show-summary :summary-method="getCusLmtContData" request-type="POST">-->
            <yu-xtable-column label="合同编号" prop="dealBizNo"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="bizAmt"></yu-xtable-column>
            <yu-xtable-column label="占用敞口金额" prop="bizSpacAmtCny"></yu-xtable-column>
            <yu-xtable-column label="占用敞口余额" prop="bizSpacBalanceAmtCny"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP">人民币元</yu-xtable-column>
            <yu-xtable-column label="合同起始日" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="合同到期日" prop="endDate"></yu-xtable-column>
            <yu-xtable-column label="占用状态" prop="bizStatus" data-code="STD_ZB_BIZ_STATUS"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="inputBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="合同下台账列表" v-show="ifAccShow" panel-type="simple">
          <yu-xtable ref="cusLmtAccTable" row-number :data-url="urls.cusLmtAccUrl" :base-params="cusLmtAccParam" :pageable="true" :default-load="false" show-summary :summary-method="getcusLmtAcc" request-type="POST">
          <!--<yu-xtable ref="cusLmtAccTable" row-number :data="cusLmtAccData" :base-params="cusLmtAccParam" :pageable="true" :default-load="false" show-summary :summary-method="getcusLmtAcc" request-type="POST">-->
            <yu-xtable-column label="台账编号" prop="tranAccNo"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="台账金额" prop="bizAmt"></yu-xtable-column>
            <yu-xtable-column label="台账余额" prop="accTotalBalanceAmtCny"></yu-xtable-column>
            <yu-xtable-column label="台账敞口余额" prop="accSpacBalanceAmtCny"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP">人民币元</yu-xtable-column>
            <yu-xtable-column label="台账起始日" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="台账到期日" prop="endDate"></yu-xtable-column>
            <yu-xtable-column label="台账状态" prop="status" data-code="STD_ZB_BIZ_STATUS"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="inputIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="inputBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_APPR_ST,STD_ZB_YES_NO,STD_PARTNER_TYPE,STD_ZB_BIZ_STATUS,STD_ZB_CUR_TYP,STD_PRD_TYPE_PROP,STD_ZB_APPR_STATUS,STD_ZB_GUAR_WAY');

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      tabName: 'base',
      expandCollapseName: 'base',
      defaultShow: true,
      defaultShow1: true,
      ifContShow: false,
      ifAccShow: false,
      ifIndirectShow: false,
      ifIndivDetailShow: false,
      boolear1: false,
      boolear2: false,
      apprCoopSubInfoData: [],
      lmtAppSubData: [],
      lmtAppSubGuarData: [],
      iqpLoanAppData: [],
      cusLmtContData: [],
      cusLmtAccData: [],
      apprSubSernos: '',
      sumLmtAmt: '',
      sumLmtAmtGuar: '',
      sumAppAmt: '',
      sumBizTotalAmtCny: '',
      sumBizSpacAmtCny: '',
      sumBizSpacBalanceAmtCny: '',
      sumAccTotalAmtCny: '',
      sumAccTotalBalanceAmtCny: '',
      sumAccSpacBalanceAmtCny: '',
      urls: {
        cusLmtUrl:
          backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectLmtInfoByCusId',
        cusLmtInfoUrl: '',
        instuCdeCusLmtUrl: '',
        apprCoopBasicUrl: '',
        apprCoopSubInfoUrl: '',
        relIndivApprLmtUrl: '',
        dataUrl: '',
        relIndivDetailListUrl: '',
        lmtAppSubUrl: '',
        lmtAppSubGuarUrl: '',
        iqpLoanAppUrl: '',
        cusLmtContUrl: '',
        cusLmtAccUrl: ''
      },
      Param: {},
      indAccParam: {},
      contParam: {},
      accParam: {},
      formdata: {},
      instuCdeCusLmtParam: {},
      relIndivDetailParam: {}, // 关联个人授信明细列表查询参数
      lmtAppSubParam: {},
      lmtAppSubGuarParam: {},
      iqpLoanAppParam: {},
      cusLmtContParam: {},
      cusLmtAccParam: {}
    };
  },
  mounted: function () {
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
      _this.data = this.$route.meta.params.planAppData;
      _this.viewType = this.$route.meta.params.op;
      _this.cusId = this.$route.meta.params.cusId;
      _this.copType = this.data.partnerType;
      debugger
      let jsoUser = this.$xutils.getLoginUserInfo(); // 当前登录用户信息
      _this.instuCde = jsoUser.instu.code;
      yufp.clone(_this.data, _this.formdata);
      // 关联个人客户授信额度明细
      _this.urls.cusLmtInfoUrl =
        backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectLmtCusInfoList';
      _this.Param = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: _this.instuCde }) };
      // 合作方授信列表
      _this.urls.apprCoopBasicUrl =
        backend.cmisLmt + '/api/apprcoopinfo/selectByCusIdAndStatus';
      _this.indirectParam = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: _this.instuCde }) };
      // 关联个人授信额度
      _this.urls.relIndivApprLmtUrl =
        backend.cmisLmt + '/api/apprstrmtableinfo/selectRelCusApprLmtByCusId';
      _this.relIndivApprLmtParam = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: _this.instuCde, cusType: '2', relCusType: '1' }) };

      if (_this.instuCde == '001') {
        // 并表授信额度
        _this.urls.instuCdeCusLmtUrl =
          backend.cmisLmt + '/api/apprcoopinfo/queryListByInstuCde';
        _this.instuCdeCusLmtParam = { condition: JSON.stringify({ notInstuCde: _this.instuCde }) }; ;
      }

      // 合作方分项/项目额度
      _this.urls.apprCoopSubInfoUrl =
        backend.cmisLmt + '/api/apprcoopsubinfo/queryListByCusIdAndCopType';
      _this.indAccParam = { condition: JSON.stringify({ cusId: _this.cusId, copType: _this.copType, instuCde: _this.instuCde }) };
      _this.$request({
        method: 'POST',
        url: backend.cmisLmt + '/api/apprcoopsubinfo/queryListByCusIdAndCopType',
        data: { condition: JSON.stringify({ cusId: _this.cusId, copType: _this.copType, instuCde: _this.instuCde }) }
      })
        .then(response => {
          if (response.code == 0) {
          // _this.apprCoopSubInfoData = response.data;
            var tableData = response.data;
            for (var i = 0; i < tableData.length; i++) {
              if (i == tableData.length - 1) {
                _this.apprSubSernos += tableData[i].apprSubSerno;
              } else {
                _this.apprSubSernos += tableData[i].apprSubSerno + ',';
              }
            }
            if (response.data.length != 0) {
              _this.getSum();
              _this.initOtherTables();
              _this.byApprSubSernoInitTable();
              _this.boolear1 = true;
            }
            _this.contParam = {
              condition: JSON.stringify({ cusId: _this.cusId})
            };
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        });
      if (_this.copType == 1) {
        _this.defaultShow1 = false;
      } else {
        _this.defaultShow1 = true;
      }
    },
    // 初始化合作额度下关联授信信息
    initOtherTables () {
      var _this = this;
      _this.urls.lmtAppSubUrl =
          backend.cmisBiz + '/api/coopplanaccinfo/queryListByPartnerNo';
      _this.lmtAppSubParam = { condition: JSON.stringify({ partnerNo: _this.cusId, oprType: '01'}) };
      _this.urls.lmtAppSubGuarUrl =
          backend.cmisBiz + '/api/coopplanaccinfo/queryLmtAppSubGuar';
      _this.lmtAppSubGuarParam = { condition: JSON.stringify({ cusId: _this.cusId }) };
    },
    // 通过分项编号查询表数据
    byApprSubSernoInitTable () {
      var _this = this;
      _this.urls.iqpLoanAppUrl =
          backend.cmisBiz + '/api/coopplanaccinfo/byProNo';
      _this.iqpLoanAppParam = { condition: JSON.stringify({ proNo: _this.apprSubSernos }) };
    },
    // 查询合作额度下关联合同
    getApprCoopInfoList () {
      var _this = this;
      if (_this.boolear2) {
        // 根据合作方额度分项编号查询合作方额度项下未结清的合同列表
        _this.urls.cusLmtContUrl =
        backend.cmisLmt + '/api/apprcoopinfo/selectCoopLmtContRelByApprSubSerno';
        _this.cusLmtContParam = _this.contParam;
        _this.$xutils.request({
          type: 'POST',
          url: backend.cmisLmt + '/api/apprcoopinfo/selectTotalCoopLmtContRelByApprSubSerno',
          data: _this.contParam,
          success: (response, status, xhr) => {
            if (response.code == '0') {
              _this.sumBizTotalAmtCny = response.data.totalContAmt;
              _this.sumBizSpacAmtCny = response.data.totalSpacAmt;
              _this.sumBizSpacBalanceAmtCny = response.data.totalSpacBalanceAmt;
            } else {
              _this.$xutils.showMsgBox('提示', response.message);
            }
          },
          error: (result, b) => {
            _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      } else {
        // 根据合作方客户号查找客户合作方额度项下关联合同列表
        _this.urls.cusLmtContUrl =
          backend.cmisLmt + '/api/apprcoopinfo/selectCoopLmtContRelByCusId';
        _this.cusLmtContParam = _this.contParam;
        _this.$xutils.request({
          type: 'POST',
          url: backend.cmisLmt + '/api/apprcoopinfo/selectTotalCoopLmtContRelByCusId',
          data: _this.contParam,
          success: (response, status, xhr) => {
            if (response.code == '0') {
              _this.sumBizTotalAmtCny = response.data.totalContAmt;
              _this.sumBizSpacAmtCny = response.data.totalSpacAmt;
              _this.sumBizSpacBalanceAmtCny = response.data.totalSpacBalanceAmt;
            } else {
              _this.$xutils.showMsgBox('提示', response.message);
            }
          },
          error: (result, b) => {
            _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      }
    },
    // 查询合同下台账列表
    getcusLmtAccList () {
      var _this = this;
      if (_this.boolear2) {
        // 根据合作方额度分项编号查询合作方额度分项项下关联的合同关联的台账列表
        _this.urls.cusLmtAccUrl =
          backend.cmisLmt + '/api/apprcoopinfo/selectCoopAccContRelByApprSubSerno';
        _this.cusLmtAccParam = _this.contParam;
        _this.$xutils.request({
          type: 'POST',
          url: backend.cmisLmt + '/api/apprcoopinfo/selectTotalCoopAccContRelByApprSubSerno',
          data: _this.contParam,
          success: (response, status, xhr) => {
            if (response.code == '0') {
              _this.sumAccTotalAmtCny = response.data.totalContAmt;
              _this.sumAccTotalBalanceAmtCny = response.data.totalSpacAmt;
              _this.sumAccSpacBalanceAmtCny = response.data.totalSpacBalanceAmt;
            } else {
              _this.$xutils.showMsgBox('提示', response.message);
            }
          },
          error: (result, b) => {
            _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      } else {
        // 根据合作方客户号查询合作方客户的合作方额度项下关联合同的下的台账列表
        _this.urls.cusLmtAccUrl =
          backend.cmisLmt + '/api/apprcoopinfo/selectCoopAccContRelByCusId';
        _this.cusLmtAccParam = _this.contParam;
        _this.$xutils.request({
          type: 'POST',
          url: backend.cmisLmt + '/api/apprcoopinfo/selectTotalCoopAccContRelByCusId',
          data: _this.contParam,
          success: (response, status, xhr) => {
            if (response.code == '0') {
              _this.sumAccTotalAmtCny = response.data.totalContAmt;
              _this.sumAccTotalBalanceAmtCny = response.data.totalSpacAmt;
              _this.sumAccSpacBalanceAmtCny = response.data.totalSpacBalanceAmt;
            } else {
              _this.$xutils.showMsgBox('提示', response.message);
            }
          },
          error: (result, b) => {
            _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
          }
        });
      }
    },
    // 显示全部关联业务
    changeAllLmt () {
      var _this = this;
      _this.ifContShow = false;
      _this.ifAccShow = false;
      _this.defaultShow = true;
      if (_this.copType == 1) {
        _this.defaultShow1 = false;
      } else {
        _this.defaultShow1 = true;
      }
      _this.boolear2 = false;
      _this.$message({ message: '查看全部分项编号信息！', type: 'info' });
      _this.contParam = {
        condition: JSON.stringify({ cusId: _this.cusId})
      };
      var tableData = _this.$refs.indirectAccTable.tabledata;
      _this.apprSubSernos = '';
      for (var i = 0; i < tableData.length; i++) {
        if (i == tableData.length - 1) {
          _this.apprSubSernos += tableData[i].apprSubSerno;
        } else {
          _this.apprSubSernos += tableData[i].apprSubSerno + ',';
        }
      }
      if (this.boolear1) {
        _this.byApprSubSernoInitTable();
        _this.getSum();
      }
    },
    /**
     查看单个分项信息
     */
    changeLmt: function (value) {
      var _this = this;
      _this.ifContShow = false;
      _this.ifAccShow = false;
      _this.defaultShow = true;
      if (_this.copType == 1) {
        _this.defaultShow1 = false;
      } else {
        _this.defaultShow1 = true;
      }
      _this.boolear2 = true;
      // 清空合同和台账表格
      // _this.$refs.iqpLoanAppTable.clearData();
      _this.$refs.cusLmtContTable.clearData();
      _this.$refs.cusLmtAccTable.clearData();
      _this.$message({ message: '查看分项编号为：' + value.apprSubSerno + '的信息！', type: 'info' });
      _this.apprSubSernos = value.apprSubSerno;
      _this.byApprSubSernoInitTable();
      _this.getSum();
      _this.contParam = {
        condition: JSON.stringify({ apprSubSerno: value.apprSubSerno})
      };
    },
    // 合作额度下关联授信
    changeLmtContLeft: function () {
      var _this = this;
      _this.ifContShow = false;
      _this.ifAccShow = false;
      _this.defaultShow = true;
      if (_this.copType == 1) {
        _this.defaultShow1 = false;
      } else {
        _this.defaultShow1 = true;
      }
      if (this.boolear1) {
        _this.byApprSubSernoInitTable();
        _this.getSum();
      }
    },
    // 合作额度下关联合同
    changeLmtCentre: function () {
      var _this = this;
      _this.ifContShow = true;
      _this.ifAccShow = false;
      _this.defaultShow = false;
      _this.defaultShow1 = false;
      if (this.boolear1) {
        _this.getApprCoopInfoList();
      }
    },
    /**
     合作额度下关联台账
     */
    changeLmtContRight: function () {
      var _this = this;
      _this.ifAccShow = true;
      _this.ifContShow = false;
      _this.defaultShow = false;
      _this.defaultShow1 = false;
      if (this.boolear1) {
        _this.getcusLmtAccList();
      }
    },
    // 金额汇总
    getSummaries: function (param) {
      var _this = this;
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 1) {
          sums[index] = '汇总';
          return;
        }
        if (index === 9) {
          sums[index] = _this.sumLmtAmt;
        }
      });
      return sums;
    },
    getSummariesGuar: function (param) {
      var _this = this;
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 1) {
          sums[index] = '汇总';
          return;
        }
        if (index === 9) {
          sums[index] = _this.sumLmtAmtGuar;
        }
      });

      return sums;
    },
    getSummariesIqp: function (param) {
      var _this = this;
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 1) {
          sums[index] = '汇总';
          return;
        }
        if (index === 7) {
          sums[index] = _this.sumAppAmt;
        }
      });
      return sums;
    },
    getCusLmtContData: function (param) {
      var _this = this;
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 1) {
          sums[index] = '汇总';
          return;
        }
        if (index === 6) {
          sums[index] = _this.sumBizTotalAmtCny;
        }
        if (index === 7) {
          sums[index] = _this.sumBizSpacAmtCny;
        }
        if (index === 8) {
          sums[index] = _this.sumBizSpacBalanceAmtCny;
        }
      });
      return sums;
    },
    getcusLmtAcc: function (param) {
      var _this = this;
      var columns = param.columns;
      var data = param.data;
      var sums = [];
      columns.forEach(function (column, index) {
        if (index === 1) {
          sums[index] = '汇总';
          return;
        }
        if (index === 6) {
          sums[index] = _this.sumAccTotalAmtCny;
        }
        if (index === 7) {
          sums[index] = _this.sumAccTotalBalanceAmtCny;
        }
        if (index === 8) {
          sums[index] = _this.sumAccSpacBalanceAmtCny;
        }
      });
      return sums;
    },
    // 获取汇总数据
    getSum () {
      var _this = this;
      _this.$xutils.request({
        type: 'POST',
        url: backend.cmisBiz + '/api/coopplanaccinfo/getSumByLmtAmt',
        data: { condition: JSON.stringify({ partnerNo: _this.cusId }) },
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.sumLmtAmt = response.data.sumLmtAmt;
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      _this.$xutils.request({
        type: 'POST',
        url: backend.cmisBiz + '/api/coopplanaccinfo/getSumByLmtAmtGuar',
        data: { condition: JSON.stringify({ cusId: _this.cusId }) },
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.sumLmtAmtGuar = response.data.sumLmtAmtGuar;
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
      _this.$xutils.request({
        type: 'POST',
        url: backend.cmisBiz + '/api/coopplanaccinfo/getSumByAppAmt',
        data: { condition: JSON.stringify({ proNo: _this.apprSubSernos }) },
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.sumAppAmt = response.data.sumAppAmt;
          } else {
            _this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          _this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    }
  }
};
</script>
