<template>
  <div>
    <yu-xform ref="refForm" label-width="120px" :disabled="formType != 'edit' ? true : false" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
      <yu-panel title="经营状况检查(建筑业)" panel-type="simple">
        <yu-xform-group :column="1">
          <yu-xform-item label="主键" ctype="input" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="任务编号" ctype="input" name="taskNo" hidden></yu-xform-item>
          <yu-xform-item label="工程款是否及时回笼" ctype="radio" name="isCapBack" data-code="STD_ZB_YES_NO" @change="isCapBack" rules="required"></yu-xform-item>
          <yu-xform-item label="回笼情况" ctype="textarea" name="backExpl"></yu-xform-item>
          <yu-xform-item label="企业垫资是否严重" ctype="radio" name="isMatEndowment" data-code="STD_ZB_YES_NO" rules="required" @change="isMatEndowment"></yu-xform-item>
          <yu-xform-item label="企业垫资说明情况" ctype="textarea" name="matEndowmentExpl"></yu-xform-item>
          <yu-xform-item label="企业是否存在重大质量问题的工程" ctype="radio" name="qualityProblem" rules="required" data-code="STD_ZB_YES_NO" @change="qualityProblem"></yu-xform-item>
          <yu-xform-item label="重大质量问题的工程说明情况" ctype="textarea" name="problemExpl"></yu-xform-item>
          <yu-xform-item label="借款人当前承接的工程量与授信时相比是否下降" ctype="radio" name="isDown" data-code="STD_ZB_YES_NO" rules="required" @change="isDown" :column="1"></yu-xform-item>
          <yu-xform-item label="下降情况" ctype="textarea" name="downExpl"></yu-xform-item>
          <yu-xform-item label="近半年主要原材料价格波动是否较大" ctype="radio" name="priceChange" data-code="STD_ZB_YES_NO" rules="required" @change="priceChange" :column="1"></yu-xform-item>
          <yu-xform-item label="波动情况" ctype="textarea" name="changeExpl" ></yu-xform-item>
          <yu-panel title="承接工程的类型占比（%）" panel-type="simple" :column="2">
            <yu-xform-item label="市政工程" name="cityPerc" ctype="yu-interest-rate" sign="%" rules="required"></yu-xform-item>
            <yu-xform-item label="房地产工程" name="housePerc" ctype="yu-interest-rate" sign="%" rules="required"></yu-xform-item>
            <yu-xform-item label="其他工程" name="otherPerc" ctype="yu-interest-rate" sign="%" rules="required"></yu-xform-item>
          </yu-panel>
          <yu-panel title="工程主要地点:" panel-type="simple" :column="2">
            <yu-xform-item label="上期结果" ctype="select" name="preRst" data-code="STD_PSP_CURT_RST" disabled></yu-xform-item>
            <yu-xform-item label="本期结果" ctype="select" name="curtRst" data-code="STD_PSP_CURT_RST" rules="required"></yu-xform-item>
            <yu-xform-item label="说明（如有变化）" ctype="textarea" name="remark2"></yu-xform-item>
          </yu-panel>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_PSP_CURT_RST');
import mixinForm from '@/utils/mixins/mixin-form';
export default{

  mixins: [mixinForm],
  props: {
    taskNo: String,
    formType: String
  },

  data: function () {
    return {
      updateUrl: this.$backend.cmisPsp + '/api/pspoperstatuscheckarch/update',
      queryUrl: this.$backend.cmisPsp + '/api/pspoperstatuscheckarch/',
      formdata: {},
      formRules: {backExpl: [{required: true}],
        matEndowmentExpl: [{required: true}],
        problemExpl: [{required: true}],
        downExpl: [{required: true}],
        changeExpl: [{required: true}]}
    };
  },
  methods: {
    // execBillCardDefaultValueFormula:function() {
    //   this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
    //   this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
    // },

    isCapBack: function (value) {
      var _value = value;
      if (_value == '1') {
        this.setBillCardItemRequired('back_expl', false);
      } else {
        this.setBillCardItemRequired('back_expl', true);
      }
    },
    isMatEndowment: function (value) {
      var _value = value;
      if (_value == '1') {
        this.setBillCardItemRequired('mat_endowment_expl', true);
      } else {
        this.setBillCardItemRequired('mat_endowment_expl', false);
      }
    },
    qualityProblem: function (value) {
      var _value = value;
      if (_value == '1') {
        this.setBillCardItemRequired('problem_expl', true);
      } else {
        this.setBillCardItemRequired('problem_expl', false);
      }
    },
    isDown: function (value) {
      var _value = value;
      if (_value == '1') {
        this.setBillCardItemRequired('down_expl', true);
      } else {
        this.setBillCardItemRequired('down_expl', false);
      }
    },

    priceChange: function (value) {
      var _value = value;
      if (_value == '1') {
        this.setBillCardItemRequired('change_expl', true);
      } else {
        this.setBillCardItemRequired('change_expl', false);
      }
    },

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      return this.$request({
        url: this.updateUrl,
        method: 'post',
        data: this.formdata
      });
    }

  },

  created: function () {
    var _this = this;
    this.$request({
      url: _this.queryUrl,
      method: 'get',
      data: {condition: {taskNo: _this.taskNo}}
    }).then((response) => {
      if (response.code == '0') {
        yufp.clone(response.data[0], _this.formdata);
      }
    }).catch(() => {
      _this.$message({
        message: '请求失败'
      });
    });
  }

};
</script>