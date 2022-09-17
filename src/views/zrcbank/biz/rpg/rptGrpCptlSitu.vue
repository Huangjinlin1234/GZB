
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——Tab页签表单
  -->
  <div>
    <yu-panel title="公司名下融资情况" panel-type="simple">
      <yu-xtable ref="corpTable" row-number :data-url="corpUrl" show-summary :pageable="false" :base-params="corpParam" request-type="POST">
        <yu-xtable-column prop="belongBank" label="所属行"></yu-xtable-column>
        <yu-xtable-column prop="cusName" label="成员名称"></yu-xtable-column>
        <yu-xtable-column prop="creditType" label="信贷品种"></yu-xtable-column>
        <yu-xtable-column label="最近两年末" align="center" width="200px">
          <yu-xtable-column prop="lastTwoYearAmt" label="金额"></yu-xtable-column>
          <yu-xtable-column prop="lastTwoYearGuarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column label="最近一年末" align="center" width="200px">
          <yu-xtable-column prop="lastYearAmt" label="金额"></yu-xtable-column>
          <yu-xtable-column prop="lastYearGuarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
        </yu-xtable-column>
        <yu-xtable-column label="当前月末" align="center">
          <yu-xtable-column prop="curMonthAmt" label="金额"></yu-xtable-column>
          <yu-xtable-column prop="curMonthGuarMode" label="担保方式" data-code="STD_ZB_GUAR_WAY"></yu-xtable-column>
          <yu-xtable-column prop="curMonthFiveClass" label="五级分类" data-code="STD_FIVE_CLASS"></yu-xtable-column>
          <yu-xtable-column prop="curMonthRemark" label="备注"></yu-xtable-column>
        </yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="cptlForm" label-width="120px" v-model="cptlData" :disabled="op =='VIEW'">
        <yu-xform-group :clomn="1">
          <yu-xform-item label="详细描述融资波动原因" name="cptlFlucResn" ctype="textarea" ></yu-xform-item>
          <yu-xform-item label="其他说明" name="cptlSituOtherMemo" ctype="textarea" ></yu-xform-item>
        </yu-xform-group>
    </yu-xform>
    </yu-panel>
    <yu-panel title="法人代表或实际控制人个人融资情况、信用情况" panel-type="simple">
      <yu-xtable ref="repreLoanTable" row-number :data-url="repreLoanUrl" :pageable="false" :base-params="repreLoanParam" request-type="POST">
        <yu-xtable-column prop="cptlBankName" label="融资银行"></yu-xtable-column>
        <yu-xtable-column prop="cusName" label="成员名称"></yu-xtable-column>
        <yu-xtable-column prop="legalRepreCusName" label="姓名"></yu-xtable-column>
        <yu-xtable-column prop="cptlAmt" label="融资金额"></yu-xtable-column>
        <yu-xtable-column prop="cptlBalance" label="融资余额"></yu-xtable-column>
        <yu-xtable-column prop="overdueTimes" label="逾期或欠息次数"></yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="legalForm" label-width="120px" v-model="legalData" :disabled="op =='VIEW'">
      <yu-xform-group :clomn="1">
          <yu-xform-item label="其他说明" name="legalRepreCptlSituOtherMemo" ctype="textarea" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="对外担保情况" panel-type="simple">
      <yu-xtable ref="extGuarTable" row-number :data-url="extGuarUrl" show-summary :pageable="false" :base-params="extGuarParam" request-type="POST">
        <yu-xtable-column prop="cusName" label="成员姓名" ></yu-xtable-column>
        <yu-xtable-column prop="guarCha" label="性质" data-code="STD_ZB_GUAR_CHA"></yu-xtable-column>
        <yu-xtable-column prop="beGuarCorpName" label="被担保企业名称"></yu-xtable-column>
        <yu-xtable-column prop="balance" label="余额"></yu-xtable-column>
        <yu-xtable-column prop="fiveClass" label="五级分类" data-code="STD_FIVE_CLASS"></yu-xtable-column>
        <yu-xtable-column prop="beGuarCorpCurOperation" label="被担保企业目前经营情况"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
    <yu-panel title="或有负债情况" panel-type="simple">
      <yu-xtable ref="situTable" row-number  show-summary :pageable="false" :data="situData">
        <yu-xtable-column prop="cusName" label="成员姓名" ></yu-xtable-column>
        <yu-xtable-column prop="riskType" label="风险类型" ></yu-xtable-column>
        <yu-xtable-column prop="count" label="数量"></yu-xtable-column>
        <yu-xtable-column prop="desc" label="异常情况说明"></yu-xtable-column>
      </yu-xtable>
      <yu-xform ref="otherForm" label-width="120px" v-model="otherData" :disabled="op =='VIEW'">
      <yu-xform-group :clomn="1">
          <yu-xform-item label="其他说明" name="otherDesc" ctype="textarea" ></yu-xform-item>
        </yu-xform-group>
     </yu-xform>
    </yu-panel>
    <div class="yu-grpButton">
      <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
    </div>
  </div>
</template>
<script>
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import { mapState } from 'vuex';
yufp.lookup.reg('STD_ZB_GUAR_WAY,STD_FIVE_CLASS,STD_ZB_GUAR_CHA');

export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      corpUrl: this.$backend.cmisBiz + '/api/rptcptlsitucorp/selectGrpCorp',
      corpParam: { condition: JSON.stringify({ serno: this.param.grpSerno }) },
      repreLoanUrl:
        this.$backend.cmisBiz +
        '/api/rptcptlsitulegalrepreloan/selectGrpRepreLoan',
      repreLoanParam: {
        condition: JSON.stringify({ serno: this.param.grpSerno })
      },
      otherDescData: {},
      extGuarUrl:
        this.$backend.cmisBiz + '/api/rptcptlsituextguar/selectGrpExtGuar',
      extGuarParam: {
        condition: JSON.stringify({ serno: this.param.grpSerno })
      },
      situData: [],
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.op = this.param.op;
    _this.init();
    _this.initCptl();
  },
  methods: {
    init: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptcptlsitu/selectGrpSitu',
        data: { condition: JSON.stringify({ serno: _this.param.grpSerno }) },
        callback: function (code, message, response) {
          if (code == 0) {
            _this.situData = response.data;
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
    initCptl: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptcptlsitu/selectByGrpSerno',
        data: _this.param.grpSerno,
        callback: function (code, message, response) {
          if (response.data != null) {
            yufp.clone(response.data, _this.cptlData);
            yufp.clone(response.data, _this.legalData);
            yufp.clone(response.data, _this.otherData);
          }
        }});
    },
    saveBtn: function () {
      var _this = this;
      var obj = {};
      obj = _this.cptlData;
      obj.serno = _this.param.grpSerno;
      obj.legalRepreCptlSituOtherMemo = _this.legalData.legalRepreCptlSituOtherMemo;
      obj.otherDesc = _this.otherData.otherDesc;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptcptlsitu/save',
        data: obj,
        callback: function (code, message, response) {
          if (response.data > 0) {
            _this.$message({
              message: '保存成功'
            });
          } else {
            _this.$message({
              duration: 4000,
              message: '系统错误，请联系管理员！',
              type: 'warning'
            });
            return;
          }
        }});
    }
  }
};
</script>
