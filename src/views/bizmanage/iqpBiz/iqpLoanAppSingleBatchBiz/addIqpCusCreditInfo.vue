<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="关联流水" ctype="input" name="iqpSerno" hidden></yu-xform-item>
          <yu-xform-item label="与借款人关系" ctype="select" name="debitRela" required="true" placeholder="与借款人关系"  data-code="STD_DEBIT_RELA"  :colspan="24" ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="yu-retail" name="cusId" rules="required" placeholder="客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="900" height="900" :parms="{'cusState':'2','managerId':''}" :colspan="24"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" name="cusName" rules="required" disabled :colspan="24"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" name="certCode" rules="required" disabled :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="save">保存</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String

  },
  data: function () {
    return {
    };
  },
  mounted () {
    this.formdata.iqpSerno = this.pageParams.iqpSerno;
  },
  methods: {

    save () {
      let _this = this;

      var validate = false;
      _this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });
      if (!validate) {
        _this.$message('请将信息填写完整！');
        return;
      }

      yufp.service.request({
        method: 'POST',
        async: true,
        url: _this.$backend.cmisBiz + '/api/iqpcuscreditinfo/insertiqpcuscreditinfo',
        data: _this.formdata,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.$message({message: '新增成功', type: 'success'});
            _this.$dialog.close(_this.dialogId);
          } else {
            _this.$message({message: message, type: 'warning'});
          }
        }
      });
    },


    /* 取消按钮*/
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>