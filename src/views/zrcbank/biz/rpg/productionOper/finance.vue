
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="融资租赁公司" panel-type="simple">
      <yu-xform ref="basicForm" label-width="160px" v-model="basicFormData" :disabled="op =='VIEW'">
        <yu-panel title="目前业务规模情况" panel-type="simple">
          <yu-xform-group :clomn="1">
            <yu-xform-item label="目前租赁（保理）资产规模" name="factorAssetSize" ctype="textarea" disabled></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :clomn="2">
            <yu-xform-item label="省内业务" name="provinceBusi" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="省外业务" name="outProvinceBusi" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="企业类业务" name="compBusi" ctype="input" disabled></yu-xform-item>
            <yu-xform-item label="政府类业务" name="goveBusi" ctype="input" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <yu-panel title="对外投资情况" panel-type="simple">
        <yu-xtable ref="foreignTable" show-summary row-number :pageable="false" :data="foreignData">
          <yu-xtable-column prop="investor" label="被投资人"></yu-xtable-column>
          <yu-xtable-column label="投资情况">
            <yu-xtable-column prop="investCaseAmt" label="金额"></yu-xtable-column>
            <yu-xtable-column prop="investCaseStockPerc" label="股权占比"></yu-xtable-column>
          </yu-xtable-column>
          <yu-xtable-column label="近年投资收益" width="300px">
            <yu-xtable-column prop="nearThirdInvestIncome" label="最近第三年"></yu-xtable-column>
            <yu-xtable-column prop="nearSecondInvestIncome" label="最近第二年"></yu-xtable-column>
            <yu-xtable-column prop="nearFirstInvestIncome" label="最近第一年"></yu-xtable-column>
          </yu-xtable-column>
          <yu-xtable-column prop="remark" label="备注"></yu-xtable-column>
        </yu-xtable>
        <yu-xform ref="outerInvestForm" label-width="160px" v-model="outerInvestFormData" :disabled="op =='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="其他需说明事项" name="outerInvestRemark" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
      <yu-panel title="经营风险情况" panel-type="simple">
        <yu-xtable ref="riskTable" show-summary row-number :pageable="false" :data="riskData">
          <yu-xtable-column prop="inputYear" label="发生年度"></yu-xtable-column>
          <yu-xtable-column prop="happenAmt" label="发生额"></yu-xtable-column>
          <yu-xtable-column prop="receiveAmt" label="已收回"></yu-xtable-column>
          <yu-xtable-column label="未收回">
            <yu-xtable-column prop="noReceiveAmt" label="余额"></yu-xtable-column>
            <yu-xtable-column prop="progress" label="进度"></yu-xtable-column>
          </yu-xtable-column>
        </yu-xtable>
      </yu-panel>
      <yu-panel title="损益情况" panel-type="simple">
        <yu-xform ref="profitForm" label-width="160px" v-model="profitFormData" :disabled="op =='VIEW'">
          <yu-panel title="最近第二年" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="最近第二年" name="secondYear" ctype="input" colspan="6" unit="年" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-xform-group :column="4">
            <yu-xform-item label="主营业务收入" name="nearSecondMainBusiIncome" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="投资收益" name="nearSecondInvestIncome" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="利润总额" name="nearSecondBusiTotalProfit" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="净利润" name="nearSecondProfit" ctype="yu-num"></yu-xform-item>
          </yu-xform-group>
          <yu-panel title="最近第一年" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="最近第一年" name="firstYear" ctype="input" colspan="6" unit="年" disabled></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-xform-group :column="4">
            <yu-xform-item label="主营业务收入" name="nearFirstMainBusiIncome" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="投资收益" name="nearFirstInvestIncome" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="利润总额" name="nearFirstBusiTotalProfit" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="净利润" name="nearFirstProfit" ctype="yu-num"></yu-xform-item>
          </yu-xform-group>
          <yu-panel title="当前年" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="当前年" name="currYear" ctype="input" colspan="6" ></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-xform-group :column="4">
            <yu-xform-item label="主营业务收入" name="currCurrSecondMainBusiIncome" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="投资收益" name="currSecondInvestIncome" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="利润总额" name="currSecondBusiTotalProfit" ctype="yu-num"></yu-xform-item>
            <yu-xform-item label="净利润" name="currSecondProfit" ctype="yu-num"></yu-xform-item>
          </yu-xform-group>
          <yu-panel title="备注" panel-type="simple">
            <yu-xform-group :column="2">
              <yu-xform-item label="主营业务收入备注" name="mainBusiIncomeMemo" ctype="textarea"></yu-xform-item>
              <yu-xform-item label="投资收益备注" name="investIncomeMemo" ctype="textarea"></yu-xform-item>
              <yu-xform-item label="利润总额备注" name="busiTotalProfitMemo" ctype="textarea"></yu-xform-item>
              <yu-xform-item label="净利润备注" name="profitMemo" ctype="textarea"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
          <yu-xform-group :column="1">
            <yu-xform-item label="其他需说明事项" name="otherNeedDescMemo" ctype="textarea"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </yu-panel>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
    </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';


export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      baiscFormData: {},
      profitFormData: {},
      foreignData: [],
      riskData: [],
      outerInvestFormData: {},
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    _this.op = _this.param.op;
    _this.init();
  },
  methods: {
    /**
      初始化参数
     */
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz + '/api/rptoperfinleascompany/selectBySerno',
        data: JSON.stringify({
          serno: _this.param.serno
        }),
        callback: function (code, message, response) {
          if (code == 0) {
            yufp.clone(response.data, _this.basicFormData);
            yufp.clone(response.data, _this.outerInvestFormData);
            yufp.clone(response.data, _this.profitFormData);
            var inputYear = response.data.inputYear;
            var year = inputYear.substring(0, 4);
            var month = inputYear.substring(5, 7);
            if (month.substring(0, 1) == '0') {
              month = month.substring(1, 2);
            }
            _this.profitFormData.secondYear = parseInt(year) - 2;
            _this.profitFormData.firstYear = parseInt(year) - 1;
            _this.profitFormData.currYear = year + '年1月-' + month + '月';
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz +
                '/api/rptoperfinleascompanyforeigninvest/selectByModel',
              data: {
                condition: JSON.stringify({ serno: _this.param.serno })
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.foreignData = response.data;
                }
              }
            });
            yufp.service.request({
              method: 'POST',
              url:
                _this.$backend.cmisBiz +
                '/api/rptoperfinleascompanyrisk/selectByModel',
              data: {
                condition: JSON.stringify({ serno: _this.param.serno })
              },
              callback: function (code, message, response) {
                if (code == 0) {
                  _this.riskData = response.data;
                }
              }
            });
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
    saveBtn: function () {
      var _this = this;
      var obj = _this.profitFormData;
      obj.outerInvestRemark = _this.outerInvestFormData.outerInvestRemark;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz +
          '/api/rptoperfinleascompany/updateFinLeasCompany',
        data: obj,
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
