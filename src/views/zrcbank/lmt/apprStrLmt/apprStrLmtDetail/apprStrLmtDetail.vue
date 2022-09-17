
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
              <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled></yu-xform-item>
              <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item>
              <yu-xform-item label="用信总余额" ctype="yu-num" name="loanBalance" disabled></yu-xform-item>
              <yu-xform-item label="用信敞口余额" ctype="yu-num" name="loanSpacBalance" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
          <yu-xtable ref="assSumTable" stripe :pageable="false" :data-url="urls.assSumUrl" :base-params="Param" request-type="POST">
            <yu-xtable-column prop="name" width="260" style="color:#747B89" align="center"></yu-xtable-column>
            <yu-xtable-column label="不含关联汇总" prop="noAssSum" align="center"></yu-xtable-column>
            <yu-xtable-column label="含关联汇总" prop="assSum" align="center"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="法人客户授信明细列表" panel-type="simple">
          <yu-xtable ref="cusLmtTable" row-number row-key="pkId" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :load="loadList" lazy :data-url="urls.cusLmtInfoUrl" :base-params="Param" request-type="POST">
            <yu-xtable-column label="展开/收起" prop="" width="100"></yu-xtable-column>
            <yu-xtable-column label="授信类型" prop="lmtMode" data-code="STD_ZB_LMT_MODE"></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="fSerno"></yu-xtable-column>
            <yu-xtable-column label="授信分项编号" prop="apprSubSerno" width="120">
              <template slot-scope="scope">
                <a style="color:rgb(133, 184, 92)" href="javaScript:void(0);" @click="changeLmt(scope.row)">{{ scope.row.apprSubSerno }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="prdLimitSubName"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="lmtBizTypeProp" width="120" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="额度起始日" prop="startDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="lmtDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="宽限期" prop="lmtGraper"></yu-xtable-column>
            <yu-xtable-column label="是否循环额度" prop="isRevolv" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="suitGuarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="是否预授信" prop="isPreCrd" width="120" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="授信总额" align="center">
              <yu-xtable-column label="授信总额" prop="creditTotal" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="outstndAmt" width="120" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="availableTotal" width="120" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="授信敞口" align="center">
              <yu-xtable-column label="授信敞口" prop="spacAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="spacOutstndAmt" width="120"  :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信敞口可用" prop="spacTotal" width="120"  :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="已出账金额" prop="pvpOutstndAmt" width="120" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="可出账金额" prop="avlOutstndAmt" width="120" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="额度状态" prop="status" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
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
        <yu-panel title="占用交易明细信息" v-if="ifComStarContShow" panel-type="simple">
          <yu-xtable ref="cusLmtContTable" row-number :data-url="urls.comStarLmtContUrl" :base-params="contParam" requestType="POST">
            <yu-xtable-column label="占用业务编号" prop="dealBizNo">
              <template slot-scope="scope">
                <a style="color:rgb(133, 184, 92)" href="javaScript:void(0);" @click="changeLmtCont(scope.row)">{{ scope.row.dealBizNo }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="交易类型" prop="dealBizType" data-code="STD_ZB_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="资产名称" prop="investAssetName"></yu-xtable-column>
            <yu-xtable-column label="产品类型属性" prop="prdTypeProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>
            <yu-xtable-column label="占用金额" prop="bizTotalAmtCny" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="交易日期" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="最近更新日期" prop="updDate"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="合同下台账列表" v-if="ifAccShow" panel-type="simple">
          <yu-xtable ref="cusLmtAccTable" row-number :data-url="urls.cusLmtAccUrl" :base-params="accParam" requestType="POST">
            <yu-xtable-column label="台账编号" prop="tranAccNo"></yu-xtable-column>
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

      <yu-tab-pane label="间接授信额度" name="indirect" panel-type="simple">
        <yu-panel title="合作方授信列表">
          <yu-xtable ref="indirectContTable" row-number :data-url="urls.apprCoopBasicUrl" :base-params="indirectParam"  request-type="POST">
            <yu-xtable-column label="合作方编号" prop="cusId" width="110">
              <template slot-scope="scope">
                <a style="color:rgb(133, 184, 92)" href="javaScript:void(0);" @click="changeIf(scope.row)">{{ scope.row.cusId }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="合作方名称" prop="cusName" width="200" sortable></yu-xtable-column>
            <yu-xtable-column label="合作方台账编号" :hidden="true" prop="apprSerno"></yu-xtable-column>
            <yu-xtable-column label="合作方类型" prop="copType" width="110" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
            <yu-xtable-column label="额度起始日" prop="startDate" width="100"></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="endDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="总合作额度" prop="lmtAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="已用额度" prop="totalUseAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="可用额度" prop="totalAvlAmt" :formatter="Currency"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="合作方分项/项目额度" v-if="ifIndirectShow" panel-type="simple">
          <yu-xtable ref="indirectAccTable" row-number :data-url="urls.apprCoopSubInfoUrl" :base-params="indAccParam" request-type="POST">
            <yu-xtable-column label="分项编号" prop="apprSubSerno"></yu-xtable-column>
            <yu-xtable-column label="分项类型" prop="copType"></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="apprSerno"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="limitSubName"></yu-xtable-column>
            <!--<yu-xtable-column label="产品名称" prop="lmtBizTyprProp" data-code="STD_PRD_TYPE_PROP"></yu-xtable-column>-->
            <yu-xtable-column label="额度起始日" prop="startDate" width="100"></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="endDate" width="120"></yu-xtable-column>
            <yu-xtable-column label="额度状态" prop="status" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
            <yu-xtable-column label="是否可循环" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="单户限额" prop="sigAmt" width="110" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="单笔业务限额" prop="sigBussAmt" width="110" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="授信总额" prop="avlAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="授信总额已用" prop="outstndAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="授信总额可用" prop="createAt">
              <template slot-scope="scope">
                <span>{{ Currency(parseFloat(scope.row.avlAmt - scope.row.outstndAmt).toFixed(2)) }}</span>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="关联授信个人额度" name="relevance">
        <yu-panel title="关联个人授信列表" panel-type="simple">
          <yu-xtable ref="relIndivTable" row-number :data-url="urls.relIndivApprLmtUrl" :base-params="relIndivApprLmtParam" request-type="POST">
            <yu-xtable-column label="客户编号" prop="cusId" width="110">
              <template slot-scope="scope">
                <a style="color:rgb(133, 184, 92)" href="javaScript:void(0);" @click="changeRelIndivLmtDetails(scope.row)">{{ scope.row.cusId }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="关联人类型" prop="relType"></yu-xtable-column>
            <yu-xtable-column label="授信总额" align="center">
              <yu-xtable-column label="授信总额" prop="totalAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="totalUseAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="totalValAmt" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="授信敞口" align="center">
              <yu-xtable-column label="授信敞口" prop="totalSpacAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="totalSpacUseAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信敞口可用" prop="totalSpacValAmt" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="关联个人授信明细列表" v-if="ifIndivDetailShow" panel-type="simple">
          <yu-xtable ref="relIndivDetailTable" row-key="pkId" lazy row-number :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :load="loadRelIndivDetailList" :data-url="urls.relIndivDetailListUrl" :base-params="relIndivDetailParam"  request-type="POST">
            <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
            <yu-xtable-column label="授信类型" prop="lmtMode" data-code="STD_ZB_LMT_MODE"></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="fSerno"></yu-xtable-column>
            <yu-xtable-column label="授信分项编号" prop="apprSubSerno"></yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="limitSubName"></yu-xtable-column>
            <yu-xtable-column label="额度起始日" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="lmtDate"></yu-xtable-column>
            <yu-xtable-column label="宽限期" prop="lmtGraper"></yu-xtable-column>
            <yu-xtable-column label="是否循环额度" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="suitGuarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="是否预授信" prop="isPreCrd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="授信总额" align="center">
              <yu-xtable-column label="授信总额" prop="creditTotal" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="outstndAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="availableTotal" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="授信敞口" align="center">
              <yu-xtable-column label="授信敞口" prop="spacAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="spacOutstndAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信敞口可用" prop="spacTotal" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="额度状态" prop="status" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
            <yu-xtable-column label="币种" prop="curType" data-code="STD_ZB_CUR_TYP"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="并表额度" name="para">
        <yu-panel title="并表额度" panel-type="simple">
          <yu-xtable ref="refTable" row-number :data-url="urls.instuCdeCusLmtUrl" :base-params="instuCdeCusLmtParam" request-type="POST">
            <yu-xtable-column label="所属法人机构" prop="instuCde" data-code="STD_ZB_INSTU_CDE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="授信总额" align="center">
              <yu-xtable-column label="授信总额" prop="totalAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="totalUseAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="totalValAmt" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="授信敞口" align="center">
              <yu-xtable-column label="授信敞口" prop="totalSpacAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="totalSpacUseAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信敞口可用" prop="totalSpacValAmt" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import mixin from '@/utils/mixin';
import { mapState } from 'vuex';
yufp.lookup.reg('STD_ZB_LMT_MODE,STD_ZB_APPR_ST,STD_ZB_YES_NO,STD_PARTNER_TYPE,STD_ZB_BIZ_STATUS,STD_ZB_INSTU_CDE,STD_ZB_CUR_TYP,STD_ZB_GUAR_WAY,STD_ZB_CONT_TYPE,STD_PRD_TYPE_PROP');

export default {
  mixins: [mixin],
  components: { YufpDemoSelector, mapState },
  props: {
    children: Object,
    dialogId: String,
    pageParams: Object
  },
  data: function () {
    return {
      tabName: 'base',
      expandCollapseName: 'base',
      ifComStarContShow: false,
      ifContShow: false,
      ifAccShow: false,
      ifIndirectShow: false,
      ifIndivDetailShow: false,
      urls: {
        cusLmtInfoUrl: '',
        instuCdeCusLmtUrl: '',
        cusLmtContUrl: '',
        comStarLmtContUrl: '',
        cusLmtAccUrl: '',
        apprCoopBasicUrl: '',
        apprCoopSubInfoUrl: '',
        assSumUrl: '',
        relIndivApprLmtUrl: '',
        dataUrl: '',
        relIndivDetailListUrl: ''
      },
      dataParam: {},
      Param: {},
      indAccParam: {},
      contParam: {},
      accParam: {},
      formdata: {},
      instuCdeCusLmtParam: {},
      relIndivDetailParam: {}// 关联个人授信明细列表查询参数
    };
  },
  created () {
    if (this.children) {
      this.dataParam = this.children;
    } else if (this.pageParams) {
      this.dataParam = this.pageParams;
    } else if (this.$route.meta.params) {
      this.dataParam = this.$route.meta.params;
    }
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
      _this.data = this.dataParam;
      _this.viewType = this.data.viewType;
      _this.cusId = this.data.cusId;
      _this.instuCde = this.data.instuCde;
      yufp.clone(_this.data.formdata, _this.formdata);
      if (this.children) {
        yufp.service.request({
          method: 'POST',
          url: backend.cmisLmt + '/api/apprstrmtableinfo/selectStrInfoByList',
          data: { condition: JSON.stringify({ oprType: '01', cusId: _this.cusId, instuCde: _this.instuCde, cusType: '2' }) },
          callback: function (code, message, response) {
            if (response.data.length == 0 && _this.$route.meta.params) {
              _this.formdata.cusId = _this.$route.meta.params.cusId;
              _this.formdata.cusName = _this.$route.meta.params.borrowerCusName;
              _this.formdata.loanBalance = 0;
              _this.formdata.loanSpacBalance = 0;
            } else {
              yufp.clone(response.data[0], _this.formdata);
            }
          }
        });
      }
      // 关联个人客户授信额度明细
      _this.urls.cusLmtInfoUrl =
        backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectLmtCusInfoList';
      _this.Param = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: _this.instuCde, cusType: '2' }) };
      // 合作方授信列表
      _this.urls.apprCoopBasicUrl =
        backend.cmisLmt + '/api/apprcoopinfo/selectByCusIdAndStatus';
      _this.indirectParam = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: '' }) };
      // 客户额度汇总二维表
      _this.urls.assSumUrl =
        backend.cmisLmt + '/api/apprstrmtableinfo/selectAssSumByCusId';

      // 关联个人授信额度
      _this.urls.relIndivApprLmtUrl =
        backend.cmisLmt + '/api/apprstrmtableinfo/selectRelCusApprLmtByCusId';
      _this.relIndivApprLmtParam = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: _this.instuCde, cusType: '2', relCusType: '1' }) };

      if (_this.instuCde == 'C1115632000023') {
        // 并表授信额度
        _this.urls.instuCdeCusLmtUrl =
          backend.cmisLmt + '/api/apprstrmtableinfo/selectStrInfoByList';
        _this.instuCdeCusLmtParam = { condition: JSON.stringify({ cusId: _this.cusId, notInstuCde: _this.instuCde, cusType: '2' }) };
      }
    },

    // 数字精度
    formatterNum: function (value) {
      return parseFloat(parseFloat(value).toFixed(2));
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
      var sernoflag = '';
      _this.ifAccShow = false;
      if (!(value.limitSubNo == undefined || value.limitSubNo == null)) {
        sernoflag = value.limitSubNo.substring(0, 2);
      }
      if (sernoflag == '15') {
        _this.ifContShow = false;
        _this.ifComStarContShow = true;
        _this.urls.comStarLmtContUrl = backend.cmisLmt + '/api/lmtcontrel/queryListByLimitSubNo';
        _this.contParam = {
          condition: JSON.stringify({ limitSubNo: value.apprSubSerno })
        };
      } else {
        _this.ifComStarContShow = false;
        _this.ifContShow = true;
        _this.urls.cusLmtContUrl = backend.cmisLmt + '/api/lmtcontrel/queryListByLimitSubNo';
        _this.contParam = {
          condition: JSON.stringify({ limitSubNo: value.apprSubSerno })
        };
      }
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
    },

    loadList (tree, treeNode, resolve) {
      var _this = this;
      var apprSubSerno = tree.apprSubSerno;
      if (apprSubSerno) {
        // 向后台发送请求
        yufp.service.request({
          method: 'POST',
          url: backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectHasChildren',
          data: { condition: JSON.stringify({ parentId: apprSubSerno }) },
          callback: function (code, message, response) {
            if (code == 0) {
              var arr = response.data || [];
              resolve(arr);
            }
          }
        });
      }
    },

    loadRelIndivDetailList (tree, treeNode, resolve) {
      var _this = this;
      var apprSubSerno = tree.apprSubSerno;
      if (apprSubSerno) {
        // 向后台发送请求
        yufp.service.request({
          method: 'POST',
          url: backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectHasChildren',
          data: { condition: JSON.stringify({ parentId: apprSubSerno }) },
          callback: function (code, message, response) {
            if (code == 0) {
              var arr = response.data || [];
              resolve(arr);
            }
          }
        });
      }
    }
  }
};
</script>
