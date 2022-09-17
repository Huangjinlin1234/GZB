
import func from './vue-temp/vue-editor-bridge';
<template>
  <!--
    @created by zhanyb
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 调查报告授信可行性及还款能力分析担保为自然人 rpt_lmt_repay_anys_guar_corp rptLmtRepayAnysGuarCorp
  -->
  <div>
    <div >
      <yu-panel title="担保人为自然人" panel-type="simple">
        <yu-xform ref="rptLmtRepayAnysGuarPersonForm" label-width="240px" v-model="formdata" :disabled="op =='VIEW'">
          <yu-xform-group :column="2">
            <yu-xform-item label="流水号" name="serno" ctype="input" hidden></yu-xform-item>
            <yu-xform-item label="总体概述" name="generalOverview" ctype="textarea" :colspan="24" rules="required"></yu-xform-item>
            <yu-xform-item label="本次拟担保额度" name="guarAmt" ctype="yu-num" rules="required" number-formatter="0,000.00"></yu-xform-item>
            <yu-xform-item label="担保测算额度" name="guarLmtAmt" ctype="yu-num" rules="required" number-formatter="0,000.00"></yu-xform-item>
            <yu-xform-item label="担保人名称" name="guarName" ctype="input" rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-panel title="担保人担保能力分析" panel-type="simple">
            <yu-xform-group :column="1">
              <yu-xform-item label="担保人担保能力资产分析" name="guarAblAssetAnalysis" rules="required" ctype="textarea"></yu-xform-item>
              <yu-xform-item label="担保人担保能力负债分析" name="guarAblLibilAnalysis" rules="required" ctype="textarea"></yu-xform-item>
              <yu-xform-item label="担保人担保能力收入分析" name="guarAblIncomAnalysis" rules="required" ctype="textarea"></yu-xform-item>
              <yu-xform-item label="担保人担保能力对外担保分析" name="guarAblExtAnalysis" rules="required" ctype="textarea"></yu-xform-item>
              <yu-xform-item label="担保能力总体评价" name="guarAblEval" ctype="textarea" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-panel>
        </yu-xform>
      </yu-panel>
      <div class="yu-grpButton">
        <yu-button type="primary" @click="saveBtn" v-show="op!='VIEW'">保存</yu-button>
      </div>
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
    _this.initrptLmtRepayAnysGuarPerson3();
  },
  methods: {
    initrptLmtRepayAnysGuarPerson3: function () {
      var _this = this;
      yufp.service.request({
        method: 'POST',
        url: _this.$backend.cmisBiz + '/api/rptlmtrepayanysguarperson/selectBySerno',
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
      var validate = false;
      _this.$refs.rptLmtRepayAnysGuarPersonForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message({
          message: '数据验证不通过，请修改后重新保存！',
          type: 'error'
        });
        return;
      }
      _this.formdata.serno = _this.param.serno;
      yufp.service.request({
        method: 'POST',
        url:
          _this.$backend.cmisBiz +
          '/api/rptlmtrepayanysguarperson/saveGuarPerson',
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
