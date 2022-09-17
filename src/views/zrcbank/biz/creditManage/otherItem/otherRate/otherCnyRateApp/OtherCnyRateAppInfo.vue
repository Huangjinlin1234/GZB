<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" v-model="formdata" :disabled="type=='VIEW'" :rules="rules">
        <yu-tabs v-model="activeName" @tab-click="handleClick" type="other">
          <yu-tab-pane label="申请信息" name="basicTab">
            <yu-panel title="申请基本信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label="审批表编号" ctype="input" name="serno" disabled rules="required"></yu-xform-item>
                <yu-xform-item label="申请日期" ctype="datepicker" name="inputDate" disabled rules="required"></yu-xform-item>
                <yu-xform-item label="客户经理" ctype="input" name="managerId" disabled rules="required"></yu-xform-item>
                <yu-xform-item label="分支机构" ctype="input" name="managerBrId" disabled rules="required"></yu-xform-item>
                <yu-xform-item label="客户编号" ctype="input" name="cusId" disabled rules="required"></yu-xform-item>
                <yu-xform-item label="客户名称" ctype="input" name="cusName" disabled></yu-xform-item>
                <yu-xform-item label="所属行业" ctype="yu-xdic-tree" name="tradeClass"  @select-fn="commonSelectFn" parms="{ optType: 'STD_ZB_TRADE_CLASS' }" :selectionType="radio" disabled></yu-xform-item>
                <yu-xform-item label="企业规模" ctype="input" name="corpScale" disabled></yu-xform-item>
                <yu-xform-item label="客户类型" ctype="select" name="cusType" disabled data-code="STD_ZB_CUS_TYP"></yu-xform-item>
                <yu-xform-item label="申请理由" ctype="textarea" rules="required" name="appResn" :rows="3" :colspan="24" placeholder="2000个字符以内">
                </yu-xform-item>
              </yu-xform-group>
            </yu-panel>
            <yu-panel title="税务报表或账套数据(单位:万元)" :hideFilter="false" :collapseHide="false">
              <yu-xtable ref="otherCnyRateAppTaxTable" :pageable="false" :default-load="false" :data-url="otherCnyRateAppTaxUrl">
                <yu-xtable-column label="报表类型" prop="reportType" data-code="STD_REPORT_TYPE" hide-column></yu-xtable-column>
                <yu-xtable-column label=" " prop="belgYear" data-code="STD_BELG_YEAR"></yu-xtable-column>
                <yu-xtable-column label="销售收入" prop="saleIncome" ctype="num" maxlength="14" number-formatter="0,000.00" :disabled="type=='VIEW'"></yu-xtable-column>
                <yu-xtable-column label="利润总额" prop="profitTotal" ctype="num" maxlength="14" number-formatter="0,000.00" :disabled="type=='VIEW'"></yu-xtable-column>
                <yu-xtable-column label="资产负债率" prop="assetDebtRate" ctype="yu-num" sign="%" :multiple="100" :precision="2" :min="0" :disabled="type=='VIEW'">
                  <template slot-scope="scope">
                    <span>{{ parseFloat(parseFloat(scope.row.assetDebtRate * 100).toFixed(7)) + '%' }}</span>
                  </template>
                </yu-xtable-column>
                <yu-xtable-column label="应纳增值税" prop="incrementTax" ctype="num" maxlength="14" number-formatter="0,000.00" :disabled="type=='VIEW'"></yu-xtable-column>
              </yu-xtable>
            </yu-panel>
            <yu-panel title="自制报表数据(单位:万元)" :hideFilter="false" :collapseHide="false">
              <yu-xtable ref="otherCnyRateAppSelfTaxTable" :pageable="false" :default-load="false" :data-url="otherCnyRateAppTaxUrl">
                <yu-xtable-column label="报表类型" prop="reportType" data-code="STD_REPORT_TYPE" hide-column></yu-xtable-column>
                <yu-xtable-column label=" " prop="belgYear" data-code="STD_BELG_YEAR"></yu-xtable-column>
                <yu-xtable-column label="销售收入" prop="saleIncome" ctype="num" maxlength="14" number-formatter="0,000.00" :disabled="type=='VIEW'"></yu-xtable-column>
                <yu-xtable-column label="利润总额" prop="profitTotal" ctype="num" maxlength="14" number-formatter="0,000.00" :disabled="type=='VIEW'"></yu-xtable-column>
                <yu-xtable-column label="资产负债率" prop="assetDebtRate" ctype="yu-num" sign="%" :multiple="100" :precision="2" :min="0" :disabled="type=='VIEW'">
                  <template slot-scope="scope">
                    <span>{{ parseFloat(parseFloat(scope.row.assetDebtRate * 100).toFixed(7)) + '%' }}</span>
                  </template>
                </yu-xtable-column>
                <yu-xtable-column label="应纳增值税" prop="incrementTax" ctype="num" maxlength="14" number-formatter="0,000.00" :disabled="type=='VIEW'"></yu-xtable-column>
              </yu-xtable>
            </yu-panel>
            <yu-panel title="上期融资信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label-width="200px" label="上期申请融资总额（万元）" ctype="yu-num" maxlength="14" number-formatter="0,000.00" name="preLmtAmt" ></yu-xform-item>
                <yu-xform-item label-width="200px" label="其中贷款（万元）" ctype="yu-num" maxlength="14" number-formatter="0,000.00" name="preLoanAmt" ></yu-xform-item>
              </yu-xform-group>
              <yu-xtable ref="lastFinDetailsTable" :pageable="false" :default-load="false" :data-url="lastFinDetailsUrl">
                <yu-xtable-column label="额度分项编号" prop="subAccNo"></yu-xtable-column>
                <yu-xtable-column label="贷款品种 " prop="lmtBizTypeName"></yu-xtable-column>
                <yu-xtable-column label="贷款期限" prop="loanTerm" data-code="STD_RATE_LOAN_TERM"></yu-xtable-column>
                <yu-xtable-column label="担保方式" prop="guarType" data-code="STD_GUAR_TYPE"></yu-xtable-column>
                <yu-xtable-column label="贷款金额(万元)" prop="loanAmt" ></yu-xtable-column>
                <yu-xtable-column label="执行利率" prop="execRateYear">
                  <template slot-scope="scope">
                    <span>{{ parseFloat(parseFloat(scope.row.execRateYear * 100).toFixed(7)) + '%' }}</span>
                  </template>
                </yu-xtable-column>
                <yu-xtable-column label="定价方式" prop="priceMode" data-code="STD_PRICE_MODE"></yu-xtable-column>
                <yu-xtable-column label="保证人名称" prop="guarntrNo"></yu-xtable-column>
                <yu-xtable-column label="对外担保总额" prop="outguarTotalAmt"></yu-xtable-column>
                <yu-xtable-column label="其中为本行担保额" prop="orgGuarAmt"></yu-xtable-column>
                <yu-xtable-column label="状态" prop="status" data-code="STD_CUS_LIST_STATUS"></yu-xtable-column>
              </yu-xtable>
            </yu-panel>
            <yu-panel title="本期融资信息" :hideFilter="false" :collapseHide="false">
              <yu-xform-group :column="2">
                <yu-xform-item label-width="200px" label="本期申请融资总额（万元）" maxlength="14" :formatter="formatter" :digit="2" type="num" rules="required" name="lmtAmt"></yu-xform-item>
                <yu-xform-item label-width="200px" label="其中贷款（万元）" maxlength="14" :formatter="formatter" :digit="2" type="num" rules="required" name="loanAmt"></yu-xform-item>
              </yu-xform-group>
              <yu-toolbar>
                <yu-button type="primary" @click="addCurrFinFn" v-show="saveBtnShow">新增</yu-button>
                <yu-button type="primary" @click="modifyCurrFinFn" v-show="saveBtnShow">修改</yu-button>
                <yu-button type="primary" @click="deleteCurrFinFn" v-show="saveBtnShow">删除</yu-button>
                <yu-button type="primary" @click="infoCurrFinFn">查看</yu-button>
              </yu-toolbar>
              <yu-xtable ref="currFinDetailsTable" :pageable="false" :data-url="currFinDetailsUrl" :default-load="false" selection-type="radio">
                <yu-xtable-column label="额度分项编号" prop="subPrdSerno"></yu-xtable-column>
                <yu-xtable-column label="贷款品种 " prop="lmtBizTypeName"></yu-xtable-column>
                <yu-xtable-column label="贷款期限" prop="loanTerm" data-code="STD_RATE_LOAN_TERM"></yu-xtable-column>
                <yu-xtable-column label="担保方式" prop="guarType" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                <yu-xtable-column label="贷款金额(万元)" prop="loanAmt"></yu-xtable-column>
                <yu-xtable-column label="执行利率" prop="execRateYear">
                  <template slot-scope="scope">
                    <span>{{ parseFloat(parseFloat(scope.row.execRateYear * 100).toFixed(7)) + '%' }}</span>
                  </template>
                </yu-xtable-column>
                <yu-xtable-column label="定价方式" prop="priceMode" data-code="STD_PRICE_MODE"></yu-xtable-column>
                <yu-xtable-column label="保证人名称" prop="guarntrNo"></yu-xtable-column>
                <yu-xtable-column label="对外担保总额" prop="outguarTotalAmt"></yu-xtable-column>
                <yu-xtable-column label="其中为本行担保额" prop="orgGuarAmt"></yu-xtable-column>
                <yu-xtable-column label="状态" prop="status" data-code="STD_CUS_LIST_STATUS"></yu-xtable-column>
              </yu-xtable>
            </yu-panel>
            <yu-panel title="集团企业及关联企业在我行上期融资情况" :hideFilter="false" :collapseHide="false">
              <yu-xtable ref="lastFinDetails4OtherBankTable" :pageable="false" row-number :data-url="lastFinDetails4OtherBankUrl" :default-load="false">
                <yu-xtable-column label="企业名称 " prop="otherBankName" data-code="STD_LOAN_TYPE"></yu-xtable-column>
                <yu-xtable-column label="上期客户评级" prop="lastCusCrdGrade"></yu-xtable-column>
                <yu-xtable-column label="本期客户评级" prop="curCusCrdGrade" data-code="STD_GUAR_TYPE"></yu-xtable-column>
                <yu-xtable-column label="贷款金额(万元)" prop="loanAmt"></yu-xtable-column>
                <yu-xtable-column label="执行利率" prop="execRateYear"></yu-xtable-column>
              </yu-xtable>
              <yu-xform-group :column="2" style="margin-top:20px;">
                <yu-xform-item label-width="200px" label="他行融资总额（万元）"  maxlength="14" :formatter="formatter" :digit="2" type="num" name="otherBankLmtAmt"></yu-xform-item>
                <yu-xform-item label-width="200px" label="其中贷款（万元）"  maxlength="14" :formatter="formatter" :digit="2" type="num" rules="required" name="otherLoanAmt"></yu-xform-item>
              </yu-xform-group>
              <yu-toolbar>
                <yu-button type="primary" @click="addOtherFn" v-show="saveBtnShow">新增</yu-button>
                <yu-button type="primary" @click="modifyOtherFn" v-show="saveBtnShow">修改</yu-button>
                <yu-button type="primary" @click="deleteOtherFn" v-show="saveBtnShow">删除</yu-button>
                <yu-button type="primary" @click="infoOtherFn">查看</yu-button>
              </yu-toolbar>
              <yu-xtable ref="otherFinDetailsTable" :pageable="false" row-number :data-url="otherFinDetailsUrl" :parse-response="requestSuccess" selection-type="radio" :default-load="false">
                <yu-xtable-column label="他行名称 " prop="otherBankName" data-code="STD_LOAN_TYPE"></yu-xtable-column>
                <yu-xtable-column label="贷款金额(万元)" prop="loanAmt"></yu-xtable-column>
                <yu-xtable-column label="担保方式" prop="guarType" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                <yu-xtable-column label="执行利率" prop="execRateYear">
                  <template slot-scope="scope">
                    <span>{{ parseFloat(parseFloat(scope.row.execRateYear).toFixed(7)) + '%' }}</span>
                  </template>
                </yu-xtable-column>
              </yu-xtable>
            </yu-panel>
          </yu-tab-pane>
          <yu-tab-pane label="人民币利率定价权限" name="otherCnyRateAppSubTab">
            <other-Cny-Rate-App-Sub-List ref="otherCnyRateAppSubList" v-if="show_chy_rate" :pageParams="pageParams"></other-Cny-Rate-App-Sub-List>
          </yu-tab-pane>
          <yu-tab-pane label="人民币利率定价申请表" name="iframe">
            <iframe  v-if="showPrint" :src="printUrl" width="100%" height="700px" frameborder="0"></iframe>
          </yu-tab-pane>
          <yu-tab-pane label="审批信息" name="replay" v-if="showReply">
            <yu-panel title="利率定价审批" panel-type="simple">
              <yu-xtable ref="refTable01" condition-key="condition" :data-url="replyUrl" :base-params="replyParam" request-type="post" style="width: 100%; height: 100%; margin-bottom: 20px">
                <yu-xtable-column label="分项编号" prop="subPrdSerno"></yu-xtable-column>
                <yu-xtable-column label="贷款品种" prop="lmtBizTypeName"></yu-xtable-column>
                <yu-xtable-column label="期限" prop="loanTerm" data-code="STD_RATE_LOAN_TERM"></yu-xtable-column>
                <yu-xtable-column label="贷款金额(万元)" prop="loanAmt"></yu-xtable-column>
                <yu-xtable-column label="担保方式" prop="guarType" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
                <yu-xtable-column ctype="yu-num" label="批准贷款利率" prop="execRateYear" sign="%" :multiple="100" maxlength="16" @blur="saveBlurData"></yu-xtable-column>
                <yu-xtable-column ctype="select" label="批准定价方式" prop="priceMode" data-code="STD_IR_ADJUST_TYPE" @blur="saveBlurData"></yu-xtable-column>
                <yu-xtable-column ctype="yu-num" label="对应LPR" prop="curLpr" sign="%" :multiple="100" maxlength="16" @blur="saveBlurData"></yu-xtable-column>
                <yu-xtable-column ctype="select" label="利率调整周期" prop="rateAdjustCycle" data-code="STD_RATE_ADJUST_CYCLE" @blur="saveBlurData"></yu-xtable-column>
                <yu-xtable-column ctype="datepicker" label="固定日期" prop="rateIntvalDate" @blur="saveBlurData"></yu-xtable-column>
              </yu-xtable>
            </yu-panel>
          </yu-tab-pane>
        </yu-tabs>
      </yu-xform>
      <yu-form-buttons v-if="showBtn" class="yubfp-button-group" style="text-align:center;">
        <yu-button v-norepeat.loading type="primary" @click="onSave" v-show="saveBtnShow">保存</yu-button>
        <yu-button type="primary" @click="onSubmit" v-show="saveBtnShow">提交</yu-button>
        <yu-button type="primary" @click="onBack">返回</yu-button>
      </yu-form-buttons>
    </div>
    <yufpNwfInit ref="yufpNwfInit" @success-click="submitSuccess"></yufpNwfInit>
  </div>
</template>
<script>
import otherCnyRateAppSubList from './otherCnyRateAppSub/otherCnyRateAppSubList';
import otherCnyRateApprSub from './otherCnyRateAppSub/otherCnyRateApprSub';
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import { lookup } from '@/utils';
import mixinForm from '@/utils/mixins/mixin-form';
lookup.reg(
  'STD_RATE_APP_TYPE,STD_BELG_YEAR,STD_REPORT_TYPE,STD_PRICE_MODE,STD_ZB_CUS_TYP,STD_CUS_LIST_STATUS,STD_ZB_GUAR_WAY,STD_TRADE_CLASS,STD_IR_ADJUST_TYPE,STD_RATE_ADJUST_CYCLE'
);

export default {
  mixins: [mixinForm],
  components: { otherCnyRateAppSubList, otherCnyRateApprSub, yufpNwfInit },
  props: {
    bizPageData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data: function () {
    return {
      activeName: 'basicTab',
      formdata: {},
      type: '',
      saveBtnShow: true,
      otherCnyRateAppTaxUrl:
        this.$backend.cmisBiz + '/api/othercnyrateapptax/query',
      lastFinDetailsUrl:
        this.$backend.cmisBiz + '/api/othercnyrateappfindetails/lastFinDetails', // 获取上期融资明细地址
      currFinDetailsUrl:
        this.$backend.cmisBiz + '/api/othercnyrateappfindetails/currFinDetails', // 获取本期融资明细地址
      lastFinDetails4OtherBankUrl: this.$backend.cmisBiz + '', // 集团企业及关联企业在我行上期融资情况
      otherFinDetailsUrl:
        this.$backend.cmisBiz + '/api/othercnyrateappfindetails/', // 他行融资信息
      serno: '',
      cusId: '',
      pageParams: {},
      show_chy_rate: false,
      showPrint: true,
      formatter: function (money, num) {
        var num = num && num > 0 && num <= 20 ? num : 2;
        var money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
        var l = money.split('.')[0].split('').reverse();
        var r = money.split('.')[1];
        var t = '';
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? ',' : '');
        }
        return t.split('').reverse().join('') + '.' + r;
      },
      rules: {
        otherBankLmtAmt: [
          { required: true, message: '请输入他行融资总额', trigger: 'blur' }
        ]
      },
      showBtn: true,

      showReply: false
    };
  },
  created () {
    if (
      this.bizPageData.flowParam != null &&
      this.bizPageData.flowParam != undefined
    ) {
      let instanceInfo = this.bizPageData.instanceInfo;
      let flowParam = this.bizPageData.flowParam;
      this.type = false;
      let op = 'VIEW';
      this.serno = instanceInfo.bizId;
      this.cusId = instanceInfo.bizUserId;
      this.pageParams = {
        serno: this.serno,
        cusId: this.cusId,
        op: op
      };
      this.showReply = true;
      this.replyUrl = this.$backend.cmisBiz + '/api/othercnyrateapprsub/queryOtherCnyRateApprSub';
      this.replyParam = {
        condition: JSON.stringify({
          serno: this.serno,
          isSelfBank: '1',
          belgYear: '0',
          oprType: '01'
        })
      };
    }
  },
  mounted () {
    // 开启监听表格监听事件
    yufp.globalEventBus.$on(
      'refreshCurrFinDetailsTable',
      this.refreshCurrFinDetailsTable
    );

    this.afterInit();
    this.printUrl = this.$backend.frptRptService + 'qtsx-rmblldj.cpt&serno=' + this.formdata.serno;
  },
  destroyed: function () {
    yufp.globalEventBus.$off('refreshCurrFinDetailsTable');
  },
  methods: {
    saveBlurData () {
      let jsonListData = this.$refs.refTable01.tabledata[0];
      jsonListData.serno = this.serno;
      var updateurl =
        backend.cmisBiz + '/api/othercnyrateapprsub/updaterateCnySub';
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: updateurl,
        data: jsonListData,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message('修改成功');
          } else {
            _this.$message({ message: '修改失败', type: 'error' });
          }
        }
      });
    },
    requestSuccess (code, msg, response) {
      if (typeof response.data == 'string') {
        this.$refs.refTable.tabledata = [];
        this.$xutils.showMsgBox('提示', response.data);
        return false;
      }
      if (response.code == '0') {
        let data = response.data;
        if (data.length <= 0) {
          this.formdata.otherBankLmtAmt = 0;
          this.rules.otherBankLmtAmt[0].required = false;
        }
      }
    },
    /**
    点击tab事件
     */
    handleClick: function () {
      let _this = this;
      if (_this.activeName == 'iframe') {
        _this.showPrint = false;
        _this.$nextTick(() => {
          _this.showPrint = true;
        });
        _this.showBtn = false;
      } else if (_this.activeName == 'otherCnyRateAppSubTab') {
        this.show_chy_rate = false;
        this.$nextTick(() => {
          this.show_chy_rate = true;
        });
        _this.showBtn = false;
      } else {
        _this.showBtn = true;
      }
    },
    /**
     * 表格刷新
     */
    refreshCurrFinDetailsTable: function () {
      let _this = this;
      let currFinDetailsParams = {
        condition: {
          serno: _this.serno,
          isSelfBank: '1',
          belgYear: '0', // 本期
          oprType: '01'
        }
      };
      _this.$refs.currFinDetailsTable.remoteData(currFinDetailsParams);
    },
    afterInit: function () {
      let _this = this;

      if (
        _this.bizPageData.flowParam != null &&
        _this.bizPageData.flowParam != undefined
      ) {
        this.serno = _this.bizPageData.flowParam.serno;
        this.cusId = _this.bizPageData.flowParam.cusId;
        _this.type = 'VIEW';
        if (_this.type == 'VIEW' || _this.type == 'DETAIL') {
          _this.saveBtnShow = false;
        }
        yufp.clone(_this.bizPageData.flowParam, _this.formdata);
        this.$nextTick(() => {
          this.show_chy_rate = true;
        });
      } else {
        _this.pageParams = _this.$route.meta.params.data;
        _this.type = _this.$route.meta.params.op;
        if (_this.type == 'VIEW' || _this.type == 'DETAIL') {
          _this.saveBtnShow = false;
        }
        yufp.service.request({
          async: false,
          method: 'POST',
          url: backend.cmisBiz + '/api/othercnyrateapp/selectbymodel',
          data: {condition: JSON.stringify({serno: _this.pageParams.serno, oprType: '01'})},
          callback: function (code, message, response) {
            yufp.clone(response.data[0], _this.formdata);
          }
        });
        this.serno = _this.pageParams.serno;
        this.cusId = _this.pageParams.cusId;
        this.show_chy_rate = false;
        this.$nextTick(() => {
          this.show_chy_rate = true;
        });
      }

      // 加载税务数据
      // 税务报表
      _this.$refs.otherCnyRateAppTaxTable.remoteData({
        condition: { reportType: '1', serno: this.serno }
      });
      // 自制报表
      _this.$refs.otherCnyRateAppSelfTaxTable.remoteData({
        condition: { reportType: '2', serno: this.serno }
      });
      // 加载融资信息
      // 上期融资信息
      let lastFinDetailsParams = {
        condition: {
          cusId: this.cusId,
          serno: this.serno,
          isSelfBank: '1',
          belgYear: '1', // 上期
          oprType: '01'
        }
      };
      _this.$refs.lastFinDetailsTable.remoteData(lastFinDetailsParams);
      // 本期融资信息
      _this.refreshCurrFinDetailsTable();
      // 加载他行融资信息
      _this.reloadOther();
    },
    /**
     * 新增申请信息
     */
    onSave: function (actionType) {
      let _this = this;
      let validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }

      // 税费
      _this.$refs.otherCnyRateAppTaxTable.selectAll();
      _this.$refs.otherCnyRateAppSelfTaxTable.selectAll();
      let taxData = this.$refs.otherCnyRateAppTaxTable.selections;
      let selfData = this.$refs.otherCnyRateAppSelfTaxTable.selections;
      let taxList = taxData.concat(selfData);

      // 上期融资信息
      _this.$refs.lastFinDetailsTable.selectAll();
      let finDetails = _this.$refs.lastFinDetailsTable.selections;

      // 审批信息
      // _this.$refs.otherCnyRateApprSub.selectedAll();
      // // _this.$refs.otherCnyRateApprSub.selectAll();
      // let apprSubList = _this.$refs.otherCnyRateApprSub.getSelectedRowsData();

      let url = this.$backend.cmisBiz + '/api/othercnyrateapp/insertAll';
      let data = {
        otherCnyRateApp: _this.formdata, // 申请基本信息
        otherCnyRateAppTaxList: taxList // 税费信息
        // apprSubList: apprSubList //
      };
      _this.$xutils.request({
        // 同步请求
        async: false,
        url: url,
        data: data,
        success: (response, status, xhr) => {
          if (response.code == '0') {
            _this.$message('保存成功');
            _this.afterInit();
            this.$emit('refreshUrl');
            if (actionType == 'SUBMIT') {
              let params = {
                serno: _this.formdata.serno
              };
              _this.submitProcessFun(params);
            }
          } else {
            _this.$message('保存失败');
          }
        },
        error: (result, b) => {
          _this.$message('保存失败');
        }
      });
    },
    onSubmit: function () {
      // 校验是否存在本期融资情况
      if (this.$refs.currFinDetailsTable.tabledata.length == 0) {
          this.$xutils.showMsgBox('提示', '本期融资信息为空');
             return;
      }
        this.onSave('SUBMIT');
    },
    /**
     * 提交流程
     */
    submitProcessFun: function (params) {
      let _this = this;
      const bizType = 'QT002'; // 对公人民币利率定价
      const loginUser = _this.$xutils.getLoginUserInfo();
      // 提交流程
      let startdto = {};
      startdto.systemId = 'cmis';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = params.serno; // 流水号
      startdto.bizUserName = this.formdata.cusName;
      startdto.bizUserId = this.formdata.cusId;
      startdto.param = _this.formdata;
      startdto.param.orgType = this.$store.state.oauth.org.orgType;
      if (loginUser.org.orgType == 'A') {
        // 是否保全客户经理岗
        startdto.param.duty = '0';
        const dutysList = loginUser.dutys;
        if (dutysList != undefined && dutysList.length > 0) {
          for (let i = 0; i < dutysList.length; i++) {
            let item = dutysList[i];
            if (item.code === 'SGH21' || item.code === 'DHH21') { // 保全客户经理岗
              startdto.param.duty = '1';
              break;
            }
          }
        }
        console.log('是否保全客户经理-->', startdto.param.duty)
        if (loginUser.orgCode.startsWith('80')) {
          startdto.bizType = 'SGF01';// （寿光）
        } else if (loginUser.orgCode.startsWith('81')) {
          startdto.bizType = 'DHF01';// （东海）
        }
        // 判断是否展期定价
        _this.$request({
          async: false,
          url: _this.$backend.cmisBiz + '/api/othercnyrateappsub/queryModel',
          method: 'post',
          data: {condition: JSON.stringify({serno: _this.pageParams.serno, rateAppType: '2', oprType: '01'})}
        })
          .then(({ code, message, data }) => {
            console.log('--->', data.data.length);
            if (data.data.length > 0) {
              console.log('原贷款利率-->', data.data[0].origiLoanRate)
              console.log('本次申请利率-->', data.data[0].bankAppRate)
              if(data.data[0].bankAppRate >= data.data[0].origiLoanRate){
                 startdto.param = { rate: '1'};
              } else {
                startdto.param = { rate: '0'};
              }
               // 是否保全客户经理岗
              startdto.param.duty = '0';
              const dutysList = loginUser.dutys;
              if (dutysList != undefined && dutysList.length > 0) {
                for (let i = 0; i < dutysList.length; i++) {
                  let item = dutysList[i];
                  if (item.code === 'SGH21' || item.code === 'DHH21') { // 保全客户经理岗
                    startdto.param.duty = '1';
                    break;
                  }
                }
              }
               console.log('流程参数-->', startdto.param)
              if (loginUser.orgCode.startsWith('80')) {
                startdto.bizType = 'SGF04';// （寿光）
              } else if (loginUser.orgCode.startsWith('81')) {
                startdto.bizType = 'DHF04';// （东海）
              }
            }
          });
      }
      // 小微客户经理
       let roles = this.$xutils.getLoginUserInfo().roles;
       for (let i = 0; i < roles.length; i++) {
          if (roles[i].code == 'R0010') { // R0010 小微客户经理
            startdto.bizType = 'QT013';
          }
        }
        console.log('业务类型-->', startdto.bizType)
      _this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /**
     * 工作流提交成功后回调
     */
    submitSuccess () {
      this.onBack();
    },

    /**
     * 关闭当前页面
     */
    onBack: function () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
      // 调用父组件绑定的事件
      yufp.globalEventBus.$emit('refreshOtherCnyRateAppTable');
    },
    addOtherFn: function () {
      var _this = this;
      var obj = {};
      obj['serno'] = _this.pageParams.serno;
      obj['op'] = 'ADD';
      var url =
        'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppFinDetails/OtherCnyRateAppFinOtherDetailsAdd';
      _this.$dialog.open('新增他行融资', url, -1, -1, obj, () => {
        _this.reloadOther();
      });
    },
    modifyOtherFn: function () {
      var _this = this;
      if (_this.$refs.otherFinDetailsTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.otherFinDetailsTable.selections[0];
      var obj = selection;
      obj['op'] = 'EDIT';
      var url =
        'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppFinDetails/OtherCnyRateAppFinOtherDetailsAdd';
      _this.$dialog.open('修改他行融资', url, -1, -1, obj, () => {
        _this.reloadOther();
      });
    },
    deleteOtherFn: function () {
      var _this = this;
      if (_this.$refs.otherFinDetailsTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            var selection = _this.$refs.otherFinDetailsTable.selections[0];
            var data = selection;
            data['oprType'] = '02';
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/othercnyrateappfindetails/update',
              data: data,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  _this.reloadOther();
                  _this.$message('删除成功');
                } else {
                  _this.$message('删除失败');
                }
              }
            });
          }
        }
      });
    },
    infoOtherFn: function () {
      var _this = this;
      if (_this.$refs.otherFinDetailsTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.otherFinDetailsTable.selections[0];
      var obj = selection;
      obj['op'] = 'VIEW';
      var url =
        'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppFinDetails/OtherCnyRateAppFinOtherDetailsAdd';
      _this.$dialog.open('查看他行融资', url, -1, -1, obj, () => {});
    },
    reloadOther: function () {
      var _this = this;
      _this.$refs.otherFinDetailsTable.remoteData({
        condition: {
          isSelfBank: '0',
          belgYear: '0',
          serno: _this.serno,
          oprType: '01'
        }
      });
    },
    addCurrFinFn: function () {
      let _this = this;
      let path =
        'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppFinDetails/OtherCnyRateAppFinDetailsInfo';
      let data = {
        name: _this.$route.name,
        serno: _this.pageParams.serno,
        cusId: _this.pageParams.cusId
      };
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '本次融资信息详情',
        data: {
          op: 'ADD', // 操作类型
          data: data
        }
      });
    },
    modifyCurrFinFn: function () {
      var _this = this;
      if (_this.$refs.currFinDetailsTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      var selection = _this.$refs.currFinDetailsTable.selections[0];
      selection.cusId = _this.pageParams.cusId;
      var obj = selection;
      var path =
        'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppFinDetails/OtherCnyRateAppFinDetailsInfo';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '本次融资信息详情',
        data: {
          name: _this.$route.name,
          op: 'EDIT', // 操作类型
          data: selection
        }
      });
    },
    deleteCurrFinFn: function () {
      var _this = this;
      if (_this.$refs.currFinDetailsTable.selections.length != 1) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      _this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
        callback: function (action) {
          if (action === 'confirm') {
            var selection = _this.$refs.currFinDetailsTable.selections[0];
            var data = selection;
            data['oprType'] = '02';
            yufp.service.request({
              method: 'POST',
              url: backend.cmisBiz + '/api/othercnyrateappfindetails/update',
              data: data,
              callback: function (code, message, response) {
                if (response.code == 0) {
                  yufp.globalEventBus.$emit('refreshCurrFinDetailsTable');
                  _this.$message('删除成功');
                } else {
                  _this.$message('删除失败');
                }
              }
            });
          }
        }
      });
    },
    infoCurrFinFn: function () {
      let _this = this;
      let selectionsAry = _this.$refs.currFinDetailsTable.selections;
      if (selectionsAry.length !== 1) {
        _this.$message({
          message: '请先选择一条记录',
          type: 'warning'
        });
        return;
      }
      let path =
        'zrcbank/biz/creditManage/otherItem/otherRate/otherCnyRateApp/otherCnyRateAppFinDetails/OtherCnyRateAppFinDetailsInfo';
      _this.$router.addTab({
        name: path,
        key: new Date().getTime(),
        title: '查看本次融资信息详情',
        data: {
          op: 'VIEW', // 操作类型
          data: selectionsAry[0],
          name: this.$route.name
        }
      });
    },

    // 保存提款表格数据
    saveDraw () {
      let jsonListData = this.$refs.refTable01.tabledata;
      var _this = this;
      _this
        .$request({
          url:
            this.$backend.cmisBiz +
            '/api/lmtsiginvestrelfinadetails/addOrUpdateAllTable',
          method: 'post',
          data: jsonListData
        })
        .then(({ code, message, data }) => {
          // 处理请求成功的情况
          if (code == '0') {
            _this.$message({ message: _this.$t('lookupdict.bccg') });
            _this.$refs.refTable01.remoteData();
          } else {
            _this.$message({ message: message, type: 'error' });
          }
        });
      // 新增后 保存修改页面
      // _this.saveFn()
    }
  }
};
</script>
