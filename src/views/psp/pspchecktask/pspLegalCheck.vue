<template>
    <div>
        <yu-xform ref="refForm" label-width="240px" v-model="formData" :disabled="formType != 'edit' ? true : false">
            <yu-panel title="合法性、有效性检查" panel-type="simple">
                <yu-xform-group>
                    <yu-xform-item name="pkId" label="主键" :hidden="true"></yu-xform-item>
                    <yu-xform-item name="taskNo" label="任务编号" :hidden="true"></yu-xform-item>

                    <yu-xform-item name="isVld" label="重要法律文本是否合法、有效" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"/>
                    <yu-xform-item name="isLnk" label="主从合同能否衔接，无法律瑕疵" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"/>
                </yu-xform-group>
            </yu-panel>
            <yu-panel title="时效性检查" panel-type="simple">
                    <yu-xform-item name="isTimeEffect" label-width="180" label="借款合同、保证合同、抵押合同等重要法律文本是否具有时效性以确保诉讼时效，及时主张权利" ctype="radio" data-code="STD_ZB_YES_NO" rules="required"/>
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
      updateUrl: backend.cmisPsp + '/api/psplegalcheck/update',
      queryUrl: backend.cmisPsp + '/api/psplegalcheck/',

      formData: {}
    };
  },

  created: function () {
    var _this = this;
    // _this.taskNo = _this.$parent.$route.params.pspTask.taskNo;
    _this.$request({
      url: _this.queryUrl,
      method: 'get',
      data: {condition: {taskNo: _this.taskNo}}
    }).then((response) => {
        if(response.data.length == '0') {
          // _this.formData.pkId = _this.$xutils.getDefaultformulaData('SEQ:TRADE_ID_SEQ');
          // _this.formData.taskNo = _this.taskNo
          // console.log('_this.formData.taskNo', _this.formData.taskNo)
          // console.log('_this.formData.pkId', _this.formData.pkId)

        } else {
           yufp.clone(response.data[0], _this.formData);
           console.log('response', response)
        }
    }).catch(() => {
      _this.$message({
        message: '请求失败'
      });
    });
  },

  methods: {

    validate: function () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      return validate;
    },

    // save: function () {
    //   return this.$request({
    //     url: this.updateUrl,
    //     method: 'post',
    //     data: this.formData
    //   });
    // },
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