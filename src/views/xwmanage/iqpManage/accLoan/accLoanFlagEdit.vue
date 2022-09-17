/**
 * @Created by jijian on 2021/8/26 下午2:58:08.
 * @updated by
 * @description 贷款标识修改
 */
<template>
  <div>
    <yu-tabs v-model="activeName" @tab-click="handleClick">
        <yu-panel title="" panel-type="simple" is-collapse :collapse-title="collapseTitle">
          <yu-xform ref="accLoanForm" label-width="140px" v-model="formdata">
            <yu-xform-group :column="2">
              <yu-xform-item label="借据号" name="billNo" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="客户名称" name="cusName" ctype="input" disabled ></yu-xform-item>
              <yu-xform-item label="资金来源标识" name="loanFlag" ctype="select" data-code="STD_LOAN_FLAG" rules="required"></yu-xform-item>
            </yu-xform-group>
          </yu-xform>
        </yu-panel>
        <div class="yu-grpButton">
          <yu-button type="primary" @click="saveFn">保存</yu-button>
          <yu-button type="primary" @click="cancelFn">返回</yu-button>
        </div>
    </yu-tabs>
  </div>
</template>
<script>
import mixin from '@/utils/mixin';
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_LOAN_FLAG');
export default {
  mixins: [mixin, mixinForm],
  data: function () {
    return {
      viewType: '',
      formdata: {}
    };
  },
  created () {

  },
  mounted () {
    this.viewType = this.$route.meta.params.viewType;
    yufp.clone(this.$route.meta.params.josnData, this.formdata);
  },
  methods: {
    /* 返回 */
    cancelFn () {
      var _this = this;
      yufp.router.removeTab(_this.$route.path);
    },
    saveFn () {
      /* 保存 */
      var _this = this;
      var validate = false;
      _this.$refs.accLoanForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      var modal = {};
      yufp.clone(_this.formdata, modal);
      yufp.service.request({
        method: 'POST',
        url: this.$backend.cmisBiz + '/api/accloan/updateselective',
        async: false,
        data: modal,
        callback: function (code, message, response) {
          if (response.code == '0') {
            _this.$message.success('保存成功');
          } else {
            _this.$message.error('保存失败');
          }
        }
      });
    }
  }
};
</script>
