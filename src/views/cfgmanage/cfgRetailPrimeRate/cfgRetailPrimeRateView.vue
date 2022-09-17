<template>
    <div>
        <yu-xform ref="refForm" :disabled="disabled" v-model="refFormData">
            <yu-xform-group :column="2">
                <yu-xform-item label="产品代码" ctype="input" placeholder="产品代码" name="prdId" ></yu-xform-item>
                <yu-xform-item label="产品名称" ctype="input" placeholder="产品名称" name="prdName"></yu-xform-item>
                <yu-xform-item label="机构代码" ctype="input" placeholder="机构代码" name="orgCode" ></yu-xform-item>
                <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName"></yu-xform-item>
                <yu-xform-item label="岗位代码" ctype="input" placeholder="岗位代码" name="dutyCode" ></yu-xform-item>
                <yu-xform-item label="岗位名称" ctype="input" placeholder="岗位名称" name="dutyName" ></yu-xform-item>
                <yu-xform-item label="报价利率" ctype="input" placeholder="报价利率" name="offerRate" ></yu-xform-item>
                <yu-xform-item label="利率下调上限" ctype="input" placeholder="利率下调上限" name="rateMax" ></yu-xform-item>
                <yu-xform-item label="利率下调下限" ctype="input" placeholder="利率下调下限" name="rateMin" ></yu-xform-item>
                <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
                <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
                <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate"></yu-xform-item>
                <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate"></yu-xform-item>
                <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId"></yu-xform-item>
                <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime"></yu-xform-item>
                <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime"></yu-xform-item>
            </yu-xform-group>
        </yu-xform>
        <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
            <yu-button type="primary" @click="onCancel()">取消</yu-button>
        </yu-form-buttons>
    </div>
</template>

<script>
export default {
  data () {
    return {
        disabled: true,
        refFormData: {}
    };
  },
  activated () {
      /**跳转到这个页面时将数据填充上去 */
      var _this = this;
      _this.$refs.refForm.resetFields();
      this.$request({
            url: _this.$backend.cmisCfg + '/api/cfgretailprimerate/show/' + _this.$route.meta.params.selection.pkId,
            method: 'post'
        }).then((response) => {
            if (response.code === '0') {
                yufp.clone(response.data, _this.refFormData);
            }
        });
  },
  methods: {
    /**
     *  关闭弹窗
     */
    onCancel () {
        // this.$dialog.close(this.dialogId);
        var _this = this;
        _this.$refs.refForm.resetFields();
        yufp.router.removeTab(_this.$route.path);
    }
  }
};
</script>