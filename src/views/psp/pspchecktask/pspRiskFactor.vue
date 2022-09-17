<template>
    <div>
        <yu-xform ref="refForm" label-width="120px" v-model="formData" :disabled="formType != 'edit' ? true : false">
            <yu-panel title="风险成因" panel-type="simple">
                <yu-xform-group>
                    <yu-xform-item name="pkId" label="主键" :hidden="true"></yu-xform-item>
                    <yu-xform-item name="taskNo" label="任务编号" :hidden="true"></yu-xform-item>

                    <yu-xform-item name="isAcctAttachment" label="账户是否查封" ctype="radio" label-width="1" @change="isAcctAttach" data-code="STD_ZB_YES_NO" rules="required"/>
                    <yu-xform-item name="acctAttachmentRemark" label="查封原因(如有)" ctype="textarea" :rules="rule"/>
                    <yu-xform-item name="isSubmitManualAlt" label="是否已向总行提交人工风险预警" ctype="radio" label-width="1" @change="submit" data-code="STD_ZB_YES_NO" rules="required"/>
                    <yu-xform-item name="submitDate" label="提交时间" ctype="datepicker" :rules="need"/>
                    <yu-xform-item name="lawsuitSitu" label="涉诉情况" ctype="textarea" rules="required"/>
                    <yu-xform-item name="badReason" label="不良成因" ctype="textarea" rules="required"/>
                </yu-xform-group>
            </yu-panel>
        </yu-xform>
    </div>
</template>

<script>
yufp.lookup.reg('STD_ZB_YES_NO');
export default {
  props: {
    taskNo: String,
    formType: String
  },

  data: function () {
    return {
      updateUrl: backend.cmisPsp + '/api/pspriskfactor/update',
      queryUrl: backend.cmisPsp + '/api/pspriskfactor/',
      need: false,
      rule: false,
      formData: {}
    };
  },

  created: function () {
    var _this = this;
    this.taskNo = this.$parent.$route.params.pspTask.taskNo;
    this.$request({
      url: this.queryUrl,
      method: 'get',
      data: {condition: {taskNo: this.taskNo}}
    }).then((response) => {
      if(response.data.length != '0'){
        yufp.clone(response.data[0], _this.formData);
      }
    }).catch(() => {
      _this.$message({
        message: '请求失败'
      });
    });
  },

  methods: {
    // 判断查封原因是否必填
    isAcctAttach () {
      if (this.formData.isAcctAttachment == '1') {
        this.rule = 'required';
      } else if (this.formData.isAcctAttachment == '0') {
        this.rule = false;
      }
      // console.log('this.rule', this.rule);
    },
    // 判断提交时间是否必填
    submit () {
      if (this.formData.isSubmitManualAlt == '1') {
        this.need = 'required';
      } else if (this.formData.isSubmitManualAlt == '0') {
        this.need = false;
      }
      // console.log('this.need', this.need);
    },

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    save: function () {
      var url;
      if(this.formData.pkId) {
        url = this.updateUrl;
      } else {
        url = this.queryUrl;
        this.formData.pkId = this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ');
        this.formData.taskNo = this.taskNo
      }
      return this.$request({
        url: url,
        method: 'post',
        data: this.formData
      });
    }

  }
};
</script>