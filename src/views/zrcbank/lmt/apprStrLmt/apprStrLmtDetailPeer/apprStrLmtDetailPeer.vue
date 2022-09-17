
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
        <yu-panel title="同业客户授信明细列表" panel-type="simple">
          <yu-xtable ref="cusLmtTable" row-number row-key="pkId" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :load="loadList"  :default-load="false" lazy :data-url="urls.cusLmtInfoUrl" :base-params="Param" request-type="POST">
            <yu-xtable-column label="展开/收起" prop=""></yu-xtable-column>
            <yu-xtable-column label="授信类型" prop="lmtMode" data-code="STD_ZB_LMT_MODE"></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="fSerno"></yu-xtable-column>
            <yu-xtable-column label="授信分项编号" prop="apprSubSerno">
              <template slot-scope="scope">
                <a style="color:rgb(133, 184, 92)" href="javaScript:void(0);" @click="changeLmt(scope.row)">{{ scope.row.apprSubSerno }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="limitSubName"></yu-xtable-column>
            <yu-xtable-column label="额度起始日" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="lmtDate"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="suitGuarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="授信总额" align="center">
              <yu-xtable-column label="授信总额" prop="creditTotal" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="outstndAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="availableTotal" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
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
            <yu-xtable-column label="产品名称" prop="investPrdName"></yu-xtable-column>
            <yu-xtable-column label="合同金额" prop="bizAmt" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="占用敞口金额" prop="bizSpacAmtCny" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="占用敞口余额" prop="bizSpacBalanceAmtCny" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="合同起始日" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="合同到期日" prop="endDate"></yu-xtable-column>
            <yu-xtable-column label="占用状态" prop="bizStatus" data-code="STD_ZB_BIZ_STATUS"></yu-xtable-column>
            <yu-xtable-column label="币种">人民币元</yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="占用交易明细信息" v-if="comStarContShow" panel-type="simple">
          <yu-xtable ref="cusLmtContTable" row-number :data-url="urls.comStarLmtContUrl" :base-params="contParam" requestType="POST">
            <yu-xtable-column label="占用业务编号" prop="dealBizNo"></yu-xtable-column>
            <yu-xtable-column label="交易类型" prop="dealBizType" data-code="STD_ZB_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="资产名称" prop="investAssetName"></yu-xtable-column>
            <yu-xtable-column label="占用金额" prop="bizTotalAmtCny" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="交易日期" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="最近更新日期" prop="updDate"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="合同下台账列表" v-if="ifAccShow" panel-type="simple">
          <yu-xtable ref="cusLmtAccTable" row-number :data-url="urls.cusLmtAccUrl" :base-params="accParam" requestType="POST">
            <yu-xtable-column label="台账编号" prop="dealBizNo"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="investPrdName"></yu-xtable-column>
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
      <yu-tab-pane label="产品授信" name="indirect">
        <yu-panel title="产品授信列表" panel-type="simple">
          <yu-xtable ref="cusLmtTable" row-number :data-url="urls.apprCoopBasicUrl" :base-params="indirectParam" request-type="POST">
            <yu-xtable-column label="授信类型" prop="lmtMode" data-code="STD_ZB_LMT_MODE"></yu-xtable-column>
            <yu-xtable-column label="批复编号" prop="fSerno"></yu-xtable-column>
            <yu-xtable-column label="授信分项编号" prop="apprSubSerno">
              <template slot-scope="scope">
                <a style="color:rgb(133, 184, 92)" href="javaScript:void(0);" @click="changeIf(scope.row)">{{ scope.row.apprSubSerno }}</a>
              </template>
            </yu-xtable-column>
            <yu-xtable-column label="授信品种" prop="limitSubName"></yu-xtable-column>
            <yu-xtable-column label="资产名称" prop="proName"></yu-xtable-column>
            <yu-xtable-column label="额度起始日" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="额度到期日" prop="lmtDate"></yu-xtable-column>
            <yu-xtable-column label="宽限期" prop="lmtGraper"></yu-xtable-column>
            <yu-xtable-column label="是否循环额度" prop="isRevolv" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="担保方式" prop="suitGuarWay" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
            <yu-xtable-column label="是否预授信" prop="isPreCrd" data-code="STD_ZB_YES_NO"></yu-xtable-column>
            <yu-xtable-column label="授信总额" align="center">
              <yu-xtable-column label="授信总额" prop="avlAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="outstndAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="availableTotal" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
            <yu-xtable-column label="额度状态" prop="status" data-code="STD_ZB_APPR_ST"></yu-xtable-column>
            <yu-xtable-column label="责任人" prop="managerIdName"></yu-xtable-column>
            <yu-xtable-column label="责任机构" prop="managerBrIdName"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="额度下交易列表" v-if="ifIndirectShow" panel-type="simple">
          <yu-xtable ref="indirectAccTable" row-number :data-url="urls.apprLmtContUrl" :base-params="indAccParam" requestType="POST">
            <yu-xtable-column label="业务编号" prop="dealBizNo"></yu-xtable-column>
            <yu-xtable-column label="产品名称" prop="prdName"></yu-xtable-column>
            <yu-xtable-column label="交易类型" prop="dealBizType" data-code="STD_ZB_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="占用余额" prop="bizSpacBalanceAmtCny" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="业务起始日" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="业务到期日" prop="endDate"></yu-xtable-column>
            <yu-xtable-column label="合同状态" prop="bizStatus" data-code="STD_ZB_BIZ_STATUS"></yu-xtable-column>
            <yu-xtable-column label="币种">人民币元</yu-xtable-column>
          </yu-xtable>
        </yu-panel>
        <yu-panel title="占用交易明细信息" v-if="ifComStarContShow" panel-type="simple">
          <yu-xtable ref="cusLmtContTable" row-number :data-url="urls.comStarLmtContUrl" :base-params="contParam" requestType="POST">
            <yu-xtable-column label="占用业务编号" prop="dealBizNo"></yu-xtable-column>
            <yu-xtable-column label="交易类型" prop="dealBizType" data-code="STD_ZB_CONT_TYPE"></yu-xtable-column>
            <yu-xtable-column label="资产名称" prop="investAssetName"></yu-xtable-column>
            <yu-xtable-column label="占用金额" prop="bizTotalAmtCny" :formatter="Currency"></yu-xtable-column>
            <yu-xtable-column label="交易日期" prop="startDate"></yu-xtable-column>
            <yu-xtable-column label="最近更新日期" prop="updDate"></yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
      <yu-tab-pane label="并表额度" name="para">
        <yu-panel title="并表额度" panel-type="simple">
          <yu-xtable ref="refTable" row-number :data-url="urls.instuCdeCusLmtUrl" :base-params="instuCdeCusLmtParam" requestType="POST">
            <yu-xtable-column label="所属法人机构" prop="instuCde" data-code="STD_ZB_INSTU_CDE"></yu-xtable-column>
            <yu-xtable-column label="客户编号" prop="cusId"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="授信总额" align="center">
              <yu-xtable-column label="授信总额" prop="totalAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="合同已占用额度" prop="totalUseAmt" :formatter="Currency"></yu-xtable-column>
              <yu-xtable-column label="授信总额可用" prop="totalValAmt" :formatter="Currency"></yu-xtable-column>
            </yu-xtable-column>
          </yu-xtable>
        </yu-panel>
      </yu-tab-pane>
    </yu-tabs>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
yufp.lookup.reg('STD_ZB_LMT_MODE,STD_ZB_APPR_ST,STD_ZB_YES_NO,STD_PARTNER_TYPE,STD_ZB_BIZ_STATUS,STD_ZB_INSTU_CDE,STD_ZB_CUR_TYP,STD_ZB_CONT_TYPE,STD_ZB_GUAR_WAY');

export default {
  mixins: [mixin],
  data: function () {
    return {
      tabName: 'base',
      expandCollapseName: 'base',
      ifContShow: false,
      ifAccShow: false,
      comStarContShow: false,
      ifComStarContShow: false,
      ifIndirectShow: false,
      ifIndivDetailShow: false,
      urls: {
        cusLmtInfoUrl: '',
        instuCdeCusLmtUrl: '',
        cusLmtContUrl: '',
        cusLmtAccUrl: '',
        apprCoopBasicUrl: '',
        apprLmtContUrl: '',
        comStarLmtContUrl: '',
        assSumUrl: '',
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
      _this.instuCde = this.data.instuCde;
      yufp.clone(_this.data.formdata, _this.formdata);
      // 同业客户授信额度明细
      _this.urls.cusLmtInfoUrl =
        backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectLmtCusInfoList';
      _this.Param = { condition: JSON.stringify({ cusId: _this.cusId, instuCde: _this.instuCde, cusType: '3', lmtType: '07' }) };
      // 产品授信列表
      _this.urls.apprCoopBasicUrl =
        backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectLmtCusPrdInfoList';
      _this.indirectParam = { condition: JSON.stringify({ cusId: _this.cusId, lmtType: '04' }) };
      // 客户额度汇总二维表
      _this.urls.assSumUrl =
        backend.cmisLmt + '/api/apprstrmtableinfo/selectAssSumByCusId';

      if (_this.instuCde == 'C1115632000023') {
        // 并表授信额度
        _this.urls.instuCdeCusLmtUrl =
          backend.cmisLmt + '/api/apprstrmtableinfo/selectSigStrInfoByList';
        _this.instuCdeCusLmtParam = { condition: JSON.stringify({ cusId: _this.cusId, notInstuCde: _this.instuCde, cusType: '3' }) };
      }
    },
    /**
        间接额度分项
     */
    changeIf: function (value) {
      var _this = this;
      var sernoflag = '';
      if (!(value.limitSubNo == undefined || value.limitSubNo == null)) {
        sernoflag = value.limitSubNo.substring(0, 2);
      }
      if (sernoflag == '15') {
        _this.ifIndirectShow = false;
        _this.ifComStarContShow = true;
        _this.urls.comStarLmtContUrl = backend.cmisLmt + '/api/lmtcontrel/queryListByLimitSubNo';
        _this.contParam = {
          condition: JSON.stringify({ limitSubNo: value.apprSubSerno })
        };
      } else {
        _this.ifComStarContShow = false;
        _this.ifIndirectShow = true;
        _this.urls.apprLmtContUrl =
          backend.cmisLmt + '/api/lmtcontrel/queryListByLimitSubNo';
        _this.indAccParam = { condition: JSON.stringify({ limitSubNo: value.apprSubSerno }) };
      }
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
      _this.ComStarContShow = false;
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
      if (value.bizAttr == '3') {
        _this.ifAccShow = false;
        _this.ComStarContShow = true;
        _this.urls.comStarLmtContUrl = backend.cmisLmt + '/api/lmtcontrel/queryListByLimitSubNo';
        _this.contParam = {
          condition: JSON.stringify({ limitSubNo: value.limitSubNo })
        };
      } else {
        _this.ComStarContShow = false;
        _this.ifAccShow = true;
        _this.urls.cusLmtAccUrl = backend.cmisLmt + '/api/contaccrel/queryListByDealBizNo';
        _this.accParam = {
          condition: JSON.stringify({ dealBizNo: value.dealBizNo })
        };
      }
    },

    loadList (tree, treeNode, resolve) {
      var _this = this;
      var apprSubSerno = tree.apprSubSerno;
      var cusId = _this.formdata.cusId;

      if (apprSubSerno) {
        // 向后台发送请求
        yufp.service.request({
          method: 'POST',
          url: backend.cmisLmt + '/api/apprlmtsubbasicinfo/selectHasChildren',
          data: { condition: JSON.stringify({ parentId: apprSubSerno, cusId: cusId}) },
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
