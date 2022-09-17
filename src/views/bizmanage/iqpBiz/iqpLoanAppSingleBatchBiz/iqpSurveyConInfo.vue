
<template>
  <!--
    @created by
    @updated by taoting1 2018-8-16 修改代码规范
    @updated by luoshun 2018-10-11 更新组件内容及标签
    @description 模板示例——分组表单
  -->
  <div>
    <yu-panel title="调查结论" is-collapse panel-type="normal">
      <yu-xform ref="refForm1" label-width="100px" v-model="formdata1">
        <yu-xform-group>
          <yu-xform-item label="申请流水号" ctype="input" name="iqpSerno" hidden></yu-xform-item>
          <yu-xform-item label="产品编号" ctype="select" name="prdId" disabled></yu-xform-item>
          <yu-xform-item label="产品名称" ctype="select" name="prdName" disabled></yu-xform-item>
          <yu-xform-item label="借款人名称" ctype="select" name="debitName" disabled></yu-xform-item>
          <yu-xform-item label="借款人证件号码" name="debitCode" disabled></yu-xform-item>
          <yu-xform-item label="借款金额" ctype="input" name="debitAmt" disabled></yu-xform-item>
          <yu-xform-item label="担保方式" ctype="select" name="guarMode"  data-code="STD_ZB_GUAR_WAY" disabled></yu-xform-item>
          <yu-xform-item label="贷款期限" ctype="input" name="loanTerm" disabled></yu-xform-item>
          <yu-xform-item label="贷款利率" ctype="yu-num" name="loanRate" sign="%" :multiple="100" disabled></yu-xform-item>
          <yu-xform-item label="还款方式" ctype="select" name="repayMode" data-code="STD_REPAY_MODE" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </yu-panel>
    <yu-panel title="其他说明：（公检法信息、逾期情况、近期征信查询次数和原因、对外担保情况、保证人征信、贷记卡用信情况情况、抵押物、担保人、质押物、风控措施等）" is-collapse panel-type="normal">
      <yu-xform ref="refForm2" label-width="100px" v-model="formdata2">
        <yu-xform-group>
          <yu-xform-item label="" ctype="textarea" name="otherDesc" rules="required" colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>

    </yu-panel>

    <yu-form-buttons align="center">
      <yu-button type="primary" @click="save">保存</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg('GENDER,EDUCATION_TYPE,IDENT_TYPE');

export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata1: null,
      formdata2: null,
      expandCollapseName: ['base'],
      familyFormRules: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number
        }
      ]
    };
  },
  mounted () {
    var _this = this;
    yufp.service.request({
      method: 'POST',
      url: backend.cmisBiz + '/api/iqpsurveyconinfo/selectByPrimaryKey/',
      data: {
        iqpSerno: _this.$route.meta.params.iqpSerno
      },
      callback: function (code, message, response) {
        yufp.clone(response.data, _this.formdata1);
        yufp.clone(response.data, _this.formdata2);
      }
    });
  },
  methods: {
    /**
      * 保存
      */
    save: function () {
      var _this = this;
      var validate = false;
      _this.$refs.refForm2.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息填写完整！');
        return;
      }
      // 向后台发送保存请求
      yufp.service.request({
        method: 'POST',
        url: backend.cmisBiz + '/api/iqpsurveyconinfo/update',
        data: _this.formdata2,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message('保存成功!');
          } else {
            _this.$message('保存失败!');
          }
        }
      });
    }
  }


};
</script>
