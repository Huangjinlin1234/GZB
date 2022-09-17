
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="集团或关联企业简介" panel-type="simple">
      <yu-xform ref="baseForm" label-width="120px" v-model="baseFormData" :disabled="op =='VIEW'">
        <yu-xform-group :clomn="2">
          <yu-xform-item label="集团全称" name="grpNameTotal" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="集团经营模式" name="grpOperMode" ctype="input" ></yu-xform-item>
          <yu-xform-item label="成立日期" name="buildDate" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="经营所涉行业" name="operTrade" ctype="yu-xdic-tree" @select-fn="commonSelectFn" :parms="{ optType: 'STD_ZB_TRADE_CLASS' }" disabled></yu-xform-item>
          <yu-xform-item label="主体评级" name="subjectLevel" ctype="select" data-code="STD_ZB_GRADE_RANK" disabled></yu-xform-item>
          <yu-xform-item label="现五级分类" name="currentFiveClass" ctype="select" data-code="STD_FIVE_CLASS" ></yu-xform-item>
          <yu-xform-item label="注册资本" name="regiCapAmt" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="实收资本" name="paidCap" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="实际控制人" name="realOperCusId" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="法人代表" name="legal" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="注册地址" name="comRegAdd" ctype="input" disabled></yu-xform-item>
          <yu-xform-item label="实际经营地址" name="operAddrAct" ctype="input" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="经营场所权属、性质、面积状况" panel-type="simple">
          <yu-xform-group :clomn="3">
            <yu-xform-item label="租用土地面积" name="rentLandSqu" ctype="input"></yu-xform-item>
            <yu-xform-item label="租用厂房面积" name="rentWorkshopSqu" ctype="input"></yu-xform-item>
            <yu-xform-item label="租用年租金" name="rentAmtYear" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="自有土地面积" name="selfLandSqu" ctype="input"></yu-xform-item>
            <yu-xform-item label="其中:自有有证土地面积" name="selfCertLandSqu" ctype="input"></yu-xform-item>
            <yu-xform-item label="自有有证土地性质" name="selfCertLandCha" ctype="select" data-code="STD_LAND_CHA"></yu-xform-item>
            <yu-xform-item label="自有房产面积" name="selfHouseSqu" ctype="input"></yu-xform-item>
            <yu-xform-item label="其中:自有有证房产面积" name="selfCertHouseSqu" ctype="input"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-xform-group :clomn="1">
          <yu-xform-item label="集团经营范围" name="grpNatBusi" ctype="input"></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="集团前三大主营业务占比情况（或主营产品）" panel-type="simple">
          <yu-xform-group :clomn="2">
            <yu-xform-item label="主营业务1" name="mainBusi1" ctype="input"></yu-xform-item>
            <yu-xform-item label="占比或相关文字说明" name="mainBusi1Memo" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="主营业务2" name="mainBusi2" ctype="input"></yu-xform-item>
            <yu-xform-item label="占比或相关文字说明" name="mainBusi2Memo" ctype="textarea"></yu-xform-item>
            <yu-xform-item label="主营业务3" name="mainBusi3" ctype="input"></yu-xform-item>
            <yu-xform-item label="占比或相关文字说明" name="mainBusi3Memo" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-panel title="目前股权结构" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="addShar" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="editShar" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="deleteShar" v-show="op!='VIEW'">删除</yu-button>
      </yu-toolbar>
        <yu-xtable ref="ownerStrTable" row-number :data="ownerData"  :pageable="false"  request-type="POST">
          <yu-xtable-column prop="shdCusName" label="股东姓名"></yu-xtable-column>
          <yu-xtable-column prop="permiumAmt" label="认缴金额"></yu-xtable-column>
          <yu-xtable-column prop="perc" label="占比">
          <template slot-scope="scope">
              {{ isNaN(scope.row.perc)? '':Number(scope.row.perc*100).toFixed(2) + '%' }}
          </template>
          </yu-xtable-column>
          <yu-xtable-column prop="paidCap" label="实收资本"></yu-xtable-column>
          <yu-xtable-column prop="invApp" label="出资方式" data-code="STD_ZB_INVT_TYPE"></yu-xtable-column>
          <yu-xtable-column prop="remark" label="备注"></yu-xtable-column>
        </yu-xtable>
        <yu-xform ref="otherDescForm" label-width="120px" v-model="otherDescFormData" :disabled="op =='VIEW'">
          <yu-xform-group :clomn="2">
            <yu-xform-item label="说明近期增减资情况" name="recendRaiseRedceAmtCase" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <yu-xdialog title="股权结构" :visible.sync="dialogShar" width="1000px">
        <yu-xform ref="sharDialog" label-width="160px" v-model="formdataShar">
          <yu-xform-group :column="2">
            <yu-xform-item label="股东姓名" name="shdCusName" ctype="input"></yu-xform-item>
            <yu-xform-item label="认缴金额" name="permiumAmt" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="占比" name="perc" ctype="yu-num"  sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="实收资本" name="paidCap" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="出资方式" name="invApp" ctype="select" data-code="STD_ZB_INVT_TYPE"></yu-xform-item>
            <yu-xform-item label="备注" name="remark" ctype="textarea" ></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveShar">保存</yu-button>
            <yu-button type="primary" @click="backShar">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
      </yu-panel>
    </yu-panel>
    <yu-panel title="年度报表" panel-type="simple">
      <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="addYear" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="editYear" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="deleteYear" v-show="op!='VIEW'">删除</yu-button>
      </yu-toolbar>
      <yu-xtable ref="yearTable" row-number :data-url="yearUrl" show-summary :pageable="false" :default-load="false" :base-params="yearParam" request-type="POST">
        <yu-xtable-column prop="year" label="年度"></yu-xtable-column>
        <yu-xtable-column prop="dataSource" label="数据来源"></yu-xtable-column>
        <yu-xtable-column label="年末资产情况" width="400px" algin="center">
          <yu-xtable-column prop="yearEndAssetAmt" label="总资产"></yu-xtable-column>
          <yu-xtable-column prop="yearEndPureAssetValue" label="净资产"></yu-xtable-column>
          <yu-xtable-column prop="yearEndDebt" label="资产负债率"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column label="年度经营情况" width="350px" algin="center">
          <yu-xtable-column prop="yearMainBusiIncome" label="主营业务收入"></yu-xtable-column>
          <yu-xtable-column prop="yearBusiTotalProfit" label="利润总额"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column prop="yearBusiLoanBalance" label="年末融资余额"></yu-xtable-column>
      </yu-xtable>
      <yu-xdialog title="年度报表" :visible.sync="dialogYear" width="1000px">
        <yu-xform ref="yearDialog" label-width="160px" v-model="formdataYear">
          <yu-xform-group :column="2">
            <yu-xform-item label="年度" name="year" ctype="input"></yu-xform-item>
            <yu-xform-item label="数据来源" name="dataSource" ctype="input"></yu-xform-item>
            <yu-xform-item label="年末总资产" name="yearEndAssetAmt" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="年末净资产" name="yearEndPureAssetValue" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="年末资产负债率" name="yearEndDebt" ctype="yu-num" sign="%" :multiple="100"></yu-xform-item>
            <yu-xform-item label="年度主营业务收入" name="yearMainBusiIncome" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="年度利润总额" name="yearBusiTotalProfit" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="年末融资余额" name="yearBusiLoanBalance" ctype="yu-num"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveYear">保存</yu-button>
            <yu-button type="primary" @click="backYear">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
    </yu-panel>
    <yu-panel title="有形资产情况" panel-type="simple">
      <yu-panel title="房地产情况" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
          <yu-button type="primary" @click="addEstate" v-show="op!='VIEW'">添加</yu-button>
          <yu-button type="primary" @click="upEstate" v-show="op!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="delEstate" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="estateTable" row-number :data-url="estateUrl" :pageable="false" :default-load="false" :base-params="estateData" request-type="POST">
          <yu-xtable-column prop="landCha" label="所属性质" data-code="STD_RPT_LAND_CHA"></yu-xtable-column>
          <yu-xtable-column prop="landCusName" label="所属企业名称"></yu-xtable-column>
          <yu-xtable-column prop="assetProType" label="资产项目类型" data-code="STD_RPT_ASSET_TYP"></yu-xtable-column>
          <yu-xtable-column prop="assetCertProSqu" label="有证面积"></yu-xtable-column>
          <yu-xtable-column prop="assetProSqu" label="无证面积"></yu-xtable-column>
          <yu-xtable-column prop="origiPaperValue" label="原值"></yu-xtable-column>
          <yu-xtable-column prop="equityPaperValue" label="净值"></yu-xtable-column>
          <yu-xtable-column prop="currGuarCaseBank" label="抵押行抵押情况"></yu-xtable-column>
          <yu-xtable-column prop="currGuarCaseMainPart" label="承货主体"></yu-xtable-column>
          <yu-xtable-column prop="currGuarCaseLoanAmt" label="抵押贷款金额"></yu-xtable-column>
          <yu-xtable-column prop="remark" label="备注"></yu-xtable-column>
        </yu-xtable>
        <yu-xdialog title="房地产情况" :visible.sync="dialogEstate" width="1000px">
          <yu-xform ref="estateDialog" label-width="160px" v-model="formdataEstate">
            <yu-xform-group :column="2">
              <yu-xform-item label="所属性质" name="landCha" ctype="select" data-code="STD_RPT_LAND_CHA"></yu-xform-item>
              <yu-xform-item label="所属企业名称" name="landCusName" ctype="input"></yu-xform-item>
              <yu-xform-item label="资产项目类型" name="assetProType" ctype="select" data-code="STD_RPT_ASSET_TYP"></yu-xform-item>
              <yu-xform-item label="有证面积" name="assetCertProSqu" ctype="input"></yu-xform-item>
              <yu-xform-item label="无证面积" name="assetProSqu" ctype="input"></yu-xform-item>
              <yu-xform-item label="原值" name="origiPaperValue" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="净值" name="equityPaperValue" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="抵押行抵押情况" name="currGuarCaseBank" ctype="input"></yu-xform-item>
              <yu-xform-item label="承货主体" name="currGuarCaseMainPart" ctype="input"></yu-xform-item>
              <yu-xform-item label="抵押贷款金额" name="currGuarCaseLoanAmt" ctype="yu-num"></yu-xform-item>
              <yu-xform-item label="备注" name="remark" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
            <div class="yu-grpButton">
              <yu-button type="primary" @click="saveEstate">保存</yu-button>
              <yu-button type="primary" @click="backEstate">返回</yu-button>
            </div>
          </yu-xform>
        </yu-xdialog>
        <yu-xform ref="estateOtherDesc" label-width="200px" v-model="estateOtherDescData" :disabled="op =='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他需说明的事项" name="estateOtherNeedDesc" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="实控人个人/家庭资产情况（选填）" panel-type="simple">
        <yu-toolbar :show-length="8" style="margin-bottom:10px;">
          <yu-button type="primary" @click="addFamily" v-show="op!='VIEW'">添加</yu-button>
          <yu-button type="primary" @click="upFamily" v-show="op!='VIEW'">修改</yu-button>
          <yu-button type="primary" @click="delFamily" v-show="op!='VIEW'">删除</yu-button>
        </yu-toolbar>
        <yu-xtable ref="familyTable" row-number :data-url="familyUrl" :pageable="false" :default-load="false" :base-params="familyData" request-type="POST">
          <yu-xtable-column prop="assetName" label="资产"></yu-xtable-column>
          <yu-xtable-column prop="assetOwner" label="所有权人"></yu-xtable-column>
          <yu-xtable-column prop="origiValue" label="投入原值"></yu-xtable-column>
          <yu-xtable-column prop="marketValue" label="市场价值"></yu-xtable-column>
          <yu-xtable-column prop="gaurInd" label="是否抵质押" data-code="STD_ZB_YES_NO"></yu-xtable-column>
          <yu-xtable-column prop="remark" label="备注"></yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-xdialog title="实控人个人/家庭资产情况" :visible.sync="dialogFamily" width="1000px">
        <yu-xform ref="familyDialog" label-width="160px" v-model="formdataFamily">
          <yu-xform-group :column="2">
            <yu-xform-item label="资产" name="assetName" ctype="input"></yu-xform-item>
            <yu-xform-item label="所有权人" name="assetOwner" ctype="input"></yu-xform-item>
            <yu-xform-item label="投入原值" name="origiValue" ctype="input"></yu-xform-item>
            <yu-xform-item label="市场价值" name="marketValue" ctype="input"></yu-xform-item>
            <yu-xform-item label="是否抵质押" name="gaurInd" ctype="select" data-code="STD_ZB_YES_NO"></yu-xform-item>
            <yu-xform-item label="备注" name="remark" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveFamily">保存</yu-button>
            <yu-button type="primary" @click="backFamily">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
    </yu-panel>
    <yu-panel title="关联企业情况" panel-type="simple">
      <yu-toolbar :show-length="8" style="margin-bottom:10px;">
        <yu-button type="primary" @click="addEnterprises" v-show="op!='VIEW'">添加</yu-button>
        <yu-button type="primary" @click="upEnterprises" v-show="op!='VIEW'">修改</yu-button>
        <yu-button type="primary" @click="delEnterprises" v-show="op!='VIEW'">删除</yu-button>
      </yu-toolbar>
      <yu-xtable ref="enterprisesTable" row-number :data-url="enterprisesUrl" :pageable="false" :default-load="false" :base-params="enterprisesData" request-type="POST">
        <yu-xtable-column prop="regiCapAmt" label="注册资本"></yu-xtable-column>
        <yu-xtable-column prop="stkStr" label="股权结构"></yu-xtable-column>
        <yu-xtable-column prop="mainBusi" label="主营业务"></yu-xtable-column>
        <yu-xtable-column prop="landSqu" label="土地（平方）"></yu-xtable-column>
        <yu-xtable-column prop="houseSqu" label="房产（平方）"></yu-xtable-column>
        <yu-xtable-column prop="pldCase" label="抵押情况"></yu-xtable-column>
        <yu-xtable-column prop="lastYearSale" label="上年销售"></yu-xtable-column>
        <yu-xtable-column prop="profit" label="净利润"></yu-xtable-column>
        <yu-xtable-column prop="currAssTotal" label="本期资产总额"></yu-xtable-column>
        <yu-xtable-column prop="currPureAssetValue" label="本期净资产"></yu-xtable-column>
        <yu-xtable-column prop="otherBankLmt" label="他行融资额度"></yu-xtable-column>
        <yu-xtable-column prop="outguarTotalLmt" label="对外担保额度"></yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="enterprisesOtherDesc" label-width="220px" v-model="enterprisesOtherDescData" :disabled="op =='VIEW'">
         <yu-xform-group :column="1">
            <yu-xform-item label="其他需说明的事项" name="enterprisesOtherDesc" ctype="textarea"></yu-xform-item>
         </yu-xform-group>
      </yu-xform>
      <yu-xdialog title="关联企业情况" :visible.sync="dialogEnterprises" width="1000px">
        <yu-xform ref="enterprisesDialog" label-width="160px" v-model="formdataEnterprises">
          <yu-xform-group :column="2">
            <yu-xform-item label="注册资本" name="regiCapAmt" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="股权结构" name="stkStr" ctype="input"></yu-xform-item>
            <yu-xform-item label="主营业务" name="mainBusi" ctype="input"></yu-xform-item>
            <yu-xform-item label="土地（平方）" name="landSqu" ctype="input"></yu-xform-item>
            <yu-xform-item label="房产（平方）" name="houseSqu" ctype="input"></yu-xform-item>
            <yu-xform-item label="抵押情况" name="pldCase" ctype="input"></yu-xform-item>
            <yu-xform-item label="上年销售" name="lastYearSale" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="净利润" name="profit" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="本期资产总额" name="currAssTotal" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="本期净资产" name="currPureAssetValue" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="他行融资额度" name="otherBankLmt" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="对外担保额度" name="outguarTotalLmt" ctype="yu-num"></yu-xform-item>
          </yu-xform-group>
          <div class="yu-grpButton">
            <yu-button type="primary" @click="saveEnterprises">保存</yu-button>
            <yu-button type="primary" @click="backEnterprises">返回</yu-button>
          </div>
        </yu-xform>
      </yu-xdialog>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
    </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_CORP_QLTY,STD_LAND_CHA,STD_FIVE_CLASS,STD_ZB_GRADE_RANK,STD_ZB_TRADE_CLASS,STD_ZB_INVT_TYPE,STD_RPT_ASSET_TYP,STD_RPT_LAND_CHA');

export default {
  mixins: [mixinForm],
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      baseFormData: {},
      otherDescFormData: {},
      ownerStrUrl: '',
      ownerStrParam: {},
      ownerStrUrl1: '',
      ownerStrParam1: {},
      recendFormData: {},
      ownerStrChgUrl: '',
      ownerStrChgParam: {},
      yearUrl: '',
      yearParam: {},
      estateUrl: '',
      estateData: {},
      dialogEstate: false,
      formdataEstate: {},
      estateType: '',
      dialogEnterprises: false,
      formdataEnterprises: {},
      enterprisesType: '',
      dialogFamily: false,
      formdataFamily: {},
      familyType: '',
      dialogOwnerStrChg: false,
      formdataOwnerStrChg: {},
      ownerStrChgType: '',
      dialogOwnerStr: false,
      formdataOwnerStr: {},
      ownerStrType: '',
      dialogYear: false,
      formdataYear: {},
      yearType: '',
      op: '',
      ownerData: [],
      dialogShar: false,
      enterprisesOtherDescData: {}
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.op = this.param.op;
    _this.init();
  },
  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptbasicinforelatedgrpcustomers/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.grpSerno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != '' && response.data != null) {
              yufp.clone(response.data, _this.baseFormData);
              yufp.clone(response.data, _this.otherDescFormData);
              yufp.clone(response.data, _this.recendFormData);
              yufp.clone(response.data, _this.enterprisesOtherDescData);
              // 股权结构变化
              _this.initShar();
              // 年度报表
              _this.yearUrl =
              _this.$backend.cmisBiz +
              '/api/rptbasicinfoownerstrannualreport/selectByModel';
              _this.yearParam = {
                condition: JSON.stringify({ serno: _this.param.grpSerno })
              };
              // 房产信息
              _this.estateUrl =
              _this.$backend.cmisBiz +
              '/api/rptbasicinforealestate/selectByModel';
              _this.estateData = {
                condition: JSON.stringify({ serno: _this.param.grpSerno })
              };
              // 个人家庭资产情况
              _this.familyUrl =
              _this.$backend.cmisBiz +
              '/api/rptbasicinfopersfamilyassets/selectByModel';
              _this.familyData = {
                condition: JSON.stringify({ serno: _this.param.grpSerno })
              };
              // 关联企业情况
              _this.enterprisesUrl =
              _this.$backend.cmisBiz +
              '/api/rptbasicinforelatedenterprises/selectByModel';
              _this.enterprisesData = {
                condition: JSON.stringify({ serno: _this.param.grpSerno })
              };
            } else {
              yufp.service.request({
                method: 'POST',
                url: _this.$backend.cmisBiz + '/api/rptbasicinforelatedgrpcustomers/initGrpAsso',
                data: JSON.stringify({
                  grpSerno: _this.param.grpSerno,
                  grpNo: _this.param.grpCusId
                }),
                callback: function (code, message, response) {
                  if (response.data > 0) {
                    _this.init();
                  } else {
                    _this.$message({
                      duration: 4000,
                      message: '引入客户数据失败，请联系管理员！',
                      type: 'warning'
                    });
                    return;
                  }
                }
              });
            }
          }
        }});
    },
    initShar: function () {
      var _this = this;
      _this.ownerData = [];
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/rptcustomerownerstr/initOwner',
        data: {
          grpSerno: _this.param.grpSerno,
          grpNo: _this.param.grpCusId
        },
        callback: function (code, message, response) {
          _this.ownerData = response.data;
        }});
    },
    addShar: function () {
      var _this = this;
      _this.dialogShar = true;
    },
    editShar: function () {
      var _this = this;
      var selectionAry = _this.$refs.ownerStrTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogShar = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataShar);
      });
    },
    deleteShar: function () {
      var _this = this;
      var selectionAry = _this.$refs.ownerStrTable.selections;
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
              url: backend.cmisBiz + '/api/rptcustomerownerstr/deleteCustomerOwnerStr',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.initShar();
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
    saveShar: function () {
      var _this = this;
      _this.formdataShar.serno = _this.param.grpSerno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptcustomerownerstr/save',
        data: _this.formdataShar,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            _this.dialogShar = false;
            _this.$refs.sharDialog.resetFields();
            _this.initShar();
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
    },
    backShar: function () {
      var _this = this;
      _this.dialogShar = false;
      _this.$refs.sharDialog.resetFields();
    },
    addYear: function () {
      var _this = this;
      _this.dialogYear = true;
      _this.yearType = 'add';
    },
    editYear: function () {
      var _this = this;
      var selectionAry = _this.$refs.yearTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.yearType = 'edit';
      _this.dialogYear = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataYear);
      });
    },
    deleteYear: function () {
      var _this = this;
      var selectionAry = _this.$refs.yearTable.selections;
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
                '/api/rptbasicinfoownerstrannualreport/deleteYearReport',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$refs.yearTable.remoteData();
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
    saveYear: function () {
      var _this = this;
      if (_this.yearType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptbasicinfoownerstrannualreport/updateYearReport',
          data: _this.formdataYear,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogYear = false;
              _this.$refs.yearDialog.resetFields();
              _this.$refs.yearTable.remoteData();
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
      } else if (_this.yearType == 'add') {
        var validate = false;
        _this.$refs.yearDialog.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        _this.formdataYear.serno = _this.param.grpSerno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptbasicinfoownerstrannualreport/insertYearReport',
          data: _this.formdataYear,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogYear = false;
              _this.$refs.yearDialog.resetFields();
              _this.$refs.yearTable.remoteData();
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
    backYear: function () {
      var _this = this;
      _this.dialogYear = false;
      _this.$refs.yearDialog.resetFields();
    },
    addEstate: function () {
      var _this = this;
      _this.dialogEstate = true;
      _this.estateType = 'add';
    },
    upEstate: function () {
      var _this = this;
      var selectionAry = _this.$refs.estateTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.estateType = 'edit';
      _this.dialogEstate = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataEstate);
      });
    },
    delEstate: function () {
      var _this = this;
      var selectionAry = _this.$refs.estateTable.selections;
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
              url: backend.cmisBiz + '/api/rptbasicinforealestate/deleteEstate',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$refs.estateTable.remoteData();
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
    saveEstate: function () {
      var _this = this;
      if (_this.estateType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz + '/api/rptbasicinforealestate/updateEstate',
          data: _this.formdataEstate,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogEstate = false;
              _this.$refs.estateDialog.resetFields();
              _this.$refs.estateTable.remoteData();
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
      } else if (_this.estateType == 'add') {
        var validate = false;
        _this.$refs.estateDialog.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        _this.formdataEstate.serno = _this.param.grpSerno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz + '/api/rptbasicinforealestate/insertEstate',
          data: _this.formdataEstate,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogEstate = false;
              _this.$refs.estateDialog.resetFields();
              _this.$refs.estateTable.remoteData();
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
    backEstate: function () {
      var _this = this;
      _this.dialogEstate = false;
      _this.$refs.estateDialog.resetFields();
    },
    addFamily: function () {
      var _this = this;
      _this.dialogFamily = true;
    },
    upFamily: function () {
      var _this = this;
      var selectionAry = _this.$refs.familyTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.dialogFamily = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataFamily);
      });
    },
    delFamily: function () {
      var _this = this;
      var selectionAry = _this.$refs.familyTable.selections;
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
                '/api/rptbasicinfopersfamilyassets/delectFamily',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$refs.familyTable.remoteData();
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
    backFamily: function () {
      var _this = this;
      _this.dialogFamily = false;
      _this.$refs.familyDialog.resetFields();
    },
    saveFamily: function () {
      var _this = this;
      var validate = false;
      _this.$refs.familyDialog.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      _this.formdataFamily.serno = _this.param.grpSerno;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz +
          '/api/rptbasicinfopersfamilyassets/save',
        data: _this.formdataFamily,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '操作成功！'
            });
            _this.dialogFamily = false;
            _this.$refs.familyDialog.resetFields();
            _this.$refs.familyTable.remoteData();
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
    },
    addEnterprises: function () {
      var _this = this;
      _this.dialogEnterprises = true;
      _this.enterprisesType = 'add';
    },
    upEnterprises: function () {
      var _this = this;
      var selectionAry = _this.$refs.enterprisesTable.selections;
      if (selectionAry.length < 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      _this.enterprisesType = 'edit';
      _this.dialogEnterprises = true;
      _this.$nextTick(function () {
        yufp.clone(selectionAry[0], _this.formdataEnterprises);
      });
    },
    delEnterprises: function () {
      var _this = this;
      var selectionAry = _this.$refs.enterprisesTable.selections;
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
                '/api/rptbasicinforelatedenterprises/deleteEnterprises',
              data: selectionAry[0],
              callback: function (code, message, response) {
                if (response.data > 0) {
                  _this.$refs.enterprisesTable.remoteData();
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
    saveEnterprises: function () {
      var _this = this;
      if (_this.enterprisesType == 'edit') {
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptbasicinforelatedenterprises/updateEnterprises',
          data: _this.formdataEnterprises,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogEnterprises = false;
              _this.$refs.enterprisesDialog.resetFields();
              _this.$refs.enterprisesTable.remoteData();
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
      } else if (_this.enterprisesType == 'add') {
        var validate = false;
        _this.$refs.enterprisesDialog.validate(function (valid) {
          validate = valid;
        });
        if (!validate) {
          _this.$message({
            message: '数据验证不通过，请修改后重新保存！',
            type: 'error'
          });
          return;
        }
        _this.formdataEnterprises.serno = _this.param.grpSerno;
        yufp.service.request({
          method: 'POST',
          url:
            _this.$backend.cmisBiz +
            '/api/rptbasicinforelatedenterprises/insertEnterprises',
          data: _this.formdataEnterprises,
          callback: function (code, message, response) {
            if (response.data > 0) {
              _this.$message({
                message: '操作成功！'
              });
              _this.dialogEnterprises = false;
              _this.$refs.enterprisesDialog.resetFields();
              _this.$refs.enterprisesTable.remoteData();
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
    backEnterprises: function () {
      var _this = this;
      _this.dialogEnterprises = false;
      _this.$refs.enterprisesDialog.resetFields();
    },
    personFn: function () {},
    // 保存按钮
    saveBtn: function () {
      var _this = this;
      _this.baseFormData.otherNeedDesc = _this.otherDescFormData.otherNeedDesc;
      _this.baseFormData.recendRaiseRedceAmtCase = _this.otherDescFormData.recendRaiseRedceAmtCase;
      _this.baseFormData.enterprisesOtherDesc = _this.enterprisesOtherDescData.enterprisesOtherDesc;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz +
          '/api/rptbasicinforelatedgrpcustomers/updateGrpCustomers',
        data: _this.baseFormData,
        callback: function (code, message, response) {
          if (response.data > 0) {
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
};
</script>
