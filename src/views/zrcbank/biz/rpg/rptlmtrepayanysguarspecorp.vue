
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 调查报告授信可行性及还款能力分析担保为公司 rpt_lmt_repay_anys_guar_corp rptLmtRepayAnysGuarCorp
  -->
  <div>
      <yu-panel title="担保人为专业担保公司" panel-type="simple">
        <yu-xform ref="rptLmtRepayAnysGuarSpeCorpForm4" label-width="240px" v-model="formdata" :disabled="op =='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="流水号" name="serno" ctype="input" hidden></yu-xform-item>
            <yu-xform-item label="总体概述" name="generalOverview" ctype="textarea" :colspan="24"></yu-xform-item>
            <yu-xform-item label="担保公司名称" name="guarComName" ctype="input"></yu-xform-item>
            <yu-xform-item label="担保公司类型" name="guarComType" ctype="input"></yu-xform-item>
            <yu-xform-item label="反担保情况" name="guarCounter" ctype="input" :colspan="24"></yu-xform-item>
            <yu-xform-item label="其他说明" name="otherDesc" ctype="textarea" :colspan="24"></yu-xform-item>
            <yu-xform-item label="总合作额度" name="coopTotalAmt" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
            <yu-xform-item label="额度是否可循环" name="isQuotaRecy" ctype="input"></yu-xform-item>
            <yu-xform-item label="单笔业务合作限额" name="singBusiCoopLmt" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
            <yu-xform-item label="承担违约风险比例" name="propDefaultRisk" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
            <yu-xform-item label="单户限额" name="singAccoLmt" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
            <yu-xform-item label="代偿宽限期" name="comGraPed" ctype="input"></yu-xform-item>
            <yu-xform-item label="已用合作额度" name="usedCoopAmt" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
            <yu-xform-item label="可用合作额度" name="availCoopAmt" ctype="yu-num" number-formatter="0,000.00"></yu-xform-item>
            <yu-xform-item label="合作起始日" name="coopStartDate" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="合作到期日" name="coopEndDate" ctype="datepicker"></yu-xform-item>
            <yu-xform-item label="合作方状态" name="partnerStatus" ctype="input" :colspan="12"></yu-xform-item>
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


export default {
  components: { YufpDemoSelector, mapState },
  props: {
    param: Object
  },
  data: function () {
    return {
      list: [],
      formdata: {},
      op: ''
    };
  },
  mounted: function () {
    // 初始化参数
    var _this = this;
    this.op = this.param.op;
    _this.initrptLmtRepayAnysGuarPerson4();
  },
  methods: {
    initrptLmtRepayAnysGuarPerson4: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarspecorp/selectBySerno',
        data: JSON.stringify({ serno: _this.param.serno }),
        callback: function (code, message, response) {
          if (code == 0) {
            if (response.data != null && response.data.length > 0) {
              yufp.clone(response.data[0], _this.formdata);
            }
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
      _this.formdata.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarspecorp/saveGuarSpecorp',
        data: _this.formdata,
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
        }
      });
    }
  }
};
</script>
