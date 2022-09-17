
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
      <yu-tab-pane label="客户额度信息" name="base">
        <yu-panel title="客户额度信息" panel-type="simple">
          <yu-xform ref="refForm" label-width="100px" v-model="formdata" class="yu-form-gap">
            <yu-xform-group>
              <yu-xform-item label="合作方编号" ctype="input" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="合作方名称" ctype="input" name="cusName" disabled></yu-xform-item>
              <yu-xform-item label="合作方类型" ctype="select" name="copType" data-code="STD_PARTNER_TYPE" disabled></yu-xform-item>
              <yu-xform-item label="总合作额度" ctype="input" name="totalAmt" disabled></yu-xform-item>
              <yu-xform-item label="已用额度" ctype="yu-num" name="totalUseAmt" disabled></yu-xform-item>
              <yu-xform-item label="可用额度" ctype="yu-num" name="totalValAmt" disabled></yu-xform-item>
              <yu-xform-item label="用信总余额" ctype="yu-num" name="totalLoanBalance" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <yu-panel title="合作方分项/项目额度" panel-type="simple">
          <yu-xtable ref="indirectAccTable" row-number :data-url="urls.apprCoopSubInfoUrl" :base-params="indAccParam" :default-load="false" request-type="POST">
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
            <yu-xtable-column label="是否可循环" prop="isRevolv" width="110" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="单户限额" prop="sigAmt" width="110" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="单笔业务限额" prop="sigBussAmt" width="110" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="授信总额" prop="avlAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="授信总额已用" prop="outstndAmt"  width="110" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="授信总额可用" prop="totalValAmt" width="110" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="额度下占用合同列表" v-if="ifContShow" panel-type="simple">
          <yu-xtable ref="cusLmtContTable" row-number :data-url="urls.cusLmtContUrl" :base-params="contParam" requestType="POST">
            <yu-xtable-column label="合同编号" prop="dealBizNo">
              <template slot-scope="scope">
                <a style="color:rgb(133, 184, 92)" href="javaScript:void(0);" @click="changeLmtCont(scope.row)">{{ scope.row.dealBizNo }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="bizAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="占用敞口金额" prop="bizSpacAmtCny" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="占用敞口余额" prop="bizSpacBalanceAmtCny" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="合同起始日" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="合同到期日" prop="endDate"></yu-xtable-column>
            <yu-xtable-column label="占用状态" prop="bizStatus" data-code="STD_ZB_BIZ_STATUS"></yu-xtable-column>
            <yu-xtable-column label="币种">人民币元</yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="合同下台账列表" v-if="ifAccShow" panel-type="simple">
          <yu-xtable ref="cusLmtAccTable" row-number :data-url="urls.cusLmtAccUrl" :base-params="accParam" requestType="POST">
            <yu-xtable-column label="台账编号" prop="tranAccNo"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="台账金额" prop="accTotalAmtCny" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="台账余额" prop="accTotalBalanceAmtCny" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="台账敞口余额" prop="accSpacBalanceAmtCny" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="台账起始日" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="台账到期日" prop="endDate"></yu-xtable-column>
            <yu-xtable-column label="台账状态" prop="status" data-code="STD_ZB_BIZ_STATUS"></yu-xtable-column>
            <yu-xtable-column label="币种">人民币元</yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="并表额度" name="para" panel-type="simple">
        <yu-panel title="并表额度">
          <yu-xtable ref="refTable" row-number :data-url="urls.instuCdeCusLmtUrl" :base-params="instuCdeCusLmtParam" request-type="POST">
            <yu-xtable-column label="所属法人机构" prop="instuCde" data-code="STD_ZB_INSTU_CDE"></yu-xtable-column>
            <yu-xtable-column label="合作方编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="合作方名称" prop="cusName" width="200" sortable></yu-xtable-column>
            <yu-xtable-column label="合作方类型" prop="copType" width="110" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
            <yu-xtable-column label="总合作额度" prop="totalAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="已用额度" prop="totalUseAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="可用额度" prop="totalValAmt" :formatter="Currency"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_ZB_LMT_MODE,STD_ZB_APPR_ST,STD_ZB_YES_NO,STD_PARTNER_TYPE,STD_ZB_BIZ_STATUS,STD_ZB_INSTU_CDE,STD_ZB_CUR_TYP,STD_PRD_TYPE_PROP');

export default {
  mixins: [mixin],
  data: function () {
    return {
      tabName: 'base',
      expandCollapseName: 'base',
      ifContShow: false,
      ifAccShow: false,
      ifIndirectShow: false,
      ifIndivDetailShow: false,
      urls: {
        cusLmtUrl:
          backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectLmtInfoByCusId',
        cusLmtInfoUrl: '',
        instuCdeCusLmtUrl: '',
        cusLmtContUrl: '',
        cusLmtAccUrl: '',
        apprCoopBasicUrl: '',
        apprCoopSubInfoUrl: '',
        relIndivApprLmtUrl: '',
        dataUrl: '',
        relIndivDetailListUrl: ''
      },
      Param: {},
      indAccParam: {},
      contParam: {},
      accParam: {},
      formdata: {},
      instuCdeCusLmtParam: {},
      relIndivDetailParam: {}// 关联个人授信明细列表查询参数
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
      _this.data = this.$route.meta.params;
      _this.viewType = this.data.viewType;
      _this.cusId = this.data.cusId;
      _this.copType = this.data.copType;
      _this.instuCde = this.data.instuCde;
      yufp.clone(_this.data.formdata, _this.formdata);
      // 关联个人客户授信额度明细
      _this.urls.cusLmtInfoUrl =
        backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectLmtCusInfoList';
      _this.Param = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: _this.instuCde }) };
      // 合作方授信列表
      _this.urls.apprCoopBasicUrl =
        backend.cmisLmt + '/api/apprcoopinfo/selectByCusIdAndStatus';
      _this.indirectParam = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: '' }) };

      // 合作方分项/项目额度
      _this.urls.apprCoopSubInfoUrl =
        backend.cmisLmt + '/api/apprcoopsubinfo/queryListByCusIdAndCopType';
      _this.indAccParam = { condition: JSON.stringify({ cusId: _this.cusId, copType: _this.copType, instuCde: _this.instuCde }) };

      // 关联个人授信额度
      _this.urls.relIndivApprLmtUrl =
        backend.cmisLmt + '/api/apprstrmtableinfo/selectRelCusApprLmtByCusId';
      _this.relIndivApprLmtParam = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: _this.instuCde, cusType: '2', relCusType: '1' }) };

      if (_this.instuCde == 'C1115632000023') {
        // 并表授信额度
        _this.urls.instuCdeCusLmtUrl =
          backend.cmisLmt + '/api/apprcoopinfo/queryListByInstuCde';
        _this.instuCdeCusLmtParam = { condition: JSON.stringify({ notInstuCde: _this.instuCde, cusId: _this.cusId }) }; ;
      }
    },
    /**
        间接额度分项
     */
    changeIf: function (value) {
      var _this = this;
      _this.ifIndirectShow = true;
      _this.urls.apprCoopSubInfoUrl =
        backend.cmisLmt + '/api/apprcoopsubinfo/selectApprCoopSubInfoAndBasicBySerno';
      _this.indAccParam = { condition: JSON.stringify({ serno: value.apprSerno }) };
    },

    /**
        关联个人授信明细列表
     */
    changeRelIndivLmtDetails: function (value) {
      var _this = this;
      _this.ifIndivDetailShow = true;
      _this.urls.relIndivDetailListUrl =
        backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectLmtCusInfoList';
      _this.relIndivDetailParam = { condition: JSON.stringify({ cusId: value.cusId }) };
    },

    /**
        额度下合同明细
     */
    changeLmt: function (value) {
      var _this = this;
      _this.ifContShow = true;
      _this.ifAccShow = false;
      _this.urls.cusLmtContUrl = backend.cmisLmt + '/api/lmtcontrel/queryListByLimitSubNo';
      _this.contParam = {
        condition: JSON.stringify({ limitSubNo: value.apprSubSerno })
      };
    },
    /**
        合同下台账明细
     */
    changeLmtCont: function (value) {
      var _this = this;
      _this.ifAccShow = true;
      _this.urls.cusLmtAccUrl = backend.cmisLmt + '/api/contaccrel/queryListByDealBizNo';
      _this.accParam = {
        condition: JSON.stringify({ dealBizNo: value.dealBizNo })
      };
    }
  }
};
</script>
