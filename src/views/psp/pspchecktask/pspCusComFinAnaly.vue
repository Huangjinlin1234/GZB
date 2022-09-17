<template>
  <div>
    <yu-panel title="融资分析" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="cusFinAnalyForm" label-width="550px" :disabled="formType != 'edit' ? true : false" v-model="formdataA" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="1">
          <yu-xform-item label="主键" ctype="input" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="任务编号" ctype="input" name="taskNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="上期贷后检查时融资总额（含法人代表或实际控制人个人经营性贷款）（万元）" name="preFinAmt" ctype="yu-num" number-formatter="0,000.00" rules="required" ></yu-xform-item>
          <yu-xform-item label="本期贷后检查时融资总额（含法人代表或实际控制人个人经营性贷款）（万元）" name="curtFinAmt" ctype="yu-num" number-formatter="0,000.00" rules="required" ></yu-xform-item>
          <yu-xform-item label="融资变化（万元）" ctype="input"  name="finChange" v-model="finChange" disabled ></yu-xform-item>
          <yu-xform-item label="融资变化情况分析" colspan="24" ctype="textarea" name="finChangeAnaly" rules="required" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="本行融资情况（低风险业务不纳入）" :hideFilter="false" :collapseHide="false">
      <yu-xtable ref="refTable" :pageable="false" :data-url="dataUrl" :base-params="baseParams">
        <yu-xtable-column label="融资品种" prop="finVarietName" width="260" align="center"></yu-xtable-column>
        <yu-xtable-column label="融资金额（元）" prop="finAmt" width="260" align="center"></yu-xtable-column>
        <yu-xtable-column label="融资余额（元）" prop="finLmt" width="260" align="center"></yu-xtable-column>
        <yu-xtable-column label="逾期本金（元）" prop="overdueCapAmt" width="260" align="center"></yu-xtable-column>
        <yu-xtable-column label="拖欠利息（元）" prop="debitInt" width="260" align="center"></yu-xtable-column>
        <!--------------------待修改 ------------------------>
       <!-- <yu-xtable-column label="借据编号" prop="taskNo" width="260" align="center"></yu-xtable-column>
        <yu-xtable-column label="担保方式" prop="debitInt" width="260" align="center"></yu-xtable-column>
        <yu-xtable-column label="借据起始日" prop="createTime" width="260" align="center"></yu-xtable-column>
        <yu-xtable-column label="借据到期日" prop="updateTime" width="260" align="center"></yu-xtable-column> -->
      </yu-xtable>
    </yu-panel>
    <yu-panel title="对外担保分析" :hideFilter="false" :collapseHide="false">
      <yu-xform ref="guarCheckForm" label-width="260px" :disabled="formType != 'edit' ? true : false" v-model="formdataB" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="任务编号" ctype="input" name="taskNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="上期贷后检查时担保总额（万元）" ctype="yu-num" formatter="0,000.00" name="preGuarAmt"></yu-xform-item>
          <yu-xform-item label="本期贷后检查时担保总额（万元）" ctype="yu-num" number-formatter="0,000.00" name="curtGuarAmt"></yu-xform-item>
          <yu-xform-item label="对外担保变化（万元）" ctype="input" name="guarChange" v-model="guarChange" disabled></yu-xform-item>
          <yu-xform-item label="其中对关联企业担保总额（万元）" ctype="yu-num" number-formatter="0,000.00" name="correConGuarAmt" rules="required" ></yu-xform-item>
          <yu-xform-item label="对外担保变化情况分析" colspan="24" ctype="textarea" name="guarChangeAnaly" rules="required" ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  mixins: [mixinForm],
  data: function () {
    return {
      dataUrl: this.$backend.cmisPsp + '/api/pspbankfinsitu/',
      formdataA: {},
      formdataB: {},
      baseParams: {condition: {'taskNo': this.taskNo}}
    };
  },

  props: {
    taskNo: String,
    formType: String
  },

  created: function () {
    var _this = this;
    yufp.service.request({
      method: 'GET',
      url: _this.$backend.cmisPsp + '/api/pspcusfinanaly/',
      data: {condition: {taskNo: this.taskNo}},
      callback: function (code, message, response) {
        yufp.clone(response.data[0], _this.formdataA);
        if (response.data.length <= 0) {
          _this.formdataA.pkId = _this.$xutils.getUUID();
          _this.formdataA.taskNo = _this.taskNo;
        }
        yufp.service.request({
          method: 'GET',
          url: _this.$backend.cmisPsp + '/api/pspguarcheck/',
          data: {condition: {taskNo: this.taskNo}},
          callback: function (code, message, response) {
            yufp.clone(response.data[0], _this.formdataB);
            if (response.data.length <= 0) {
              _this.formdataB.pkId = _this.$xutils.getUUID();
              _this.formdataB.taskNo = _this.taskNo;
            }
          }
        });
      }
    });
  },

  computed: {
    guarChange: function () {
      return Number(this.formdataB.curtGuarAmt - this.formdataB.preGuarAmt).toFixed(2);
    },
    finChange: function () {
      return Number(this.formdataA.curtFinAmt - this.formdataA.preFinAmt).toFixed(2);
    }
  },

  watch: {
    guarChange: function (val) {
      this.formdataB.guarChange = val;
    },
    finChange: function (val) {
      this.formdataA.finChange = val;
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
    },

    validate: function () {
      var validateCus = false;
      var validateGuar = false;
      this.$refs.cusFinAnalyForm.validate(function (valid) {
        validateCus = valid;
      });
      this.$refs.guarCheckForm.validate(function (valid) {
        validateGuar = valid;
      });
      return validateCus && validateGuar;
    },

    save: function () {
      var _this = this;

      return _this.$request({
        url: _this.$backend.cmisPsp + '/api/pspcusfinanaly/update',
        method: 'post',
        data: _this.formdataA
      }).then((response) => {
        if (response.code == '0') {
          console.log('保存pspCusfinAnaly');

          return _this.$request({
            url: _this.$backend.cmisPsp + '/api/pspguarcheck/update',
            method: 'post',
            data: _this.formdataB
          });
        }
      }).then((response) => {
        if (response.code == '0') {
          console.log('保存pspGuarCheck');

          return new Promise((resolve, reject) => {
            var response = {};
            response.code = 0;
            resolve(response);
          });
        }
      }).catch(() => {
        _this.$message({
          message: '保存失败'
        });
      });
    }

  }
};
</script>