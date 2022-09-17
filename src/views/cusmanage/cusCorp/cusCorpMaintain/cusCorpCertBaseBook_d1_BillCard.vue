<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="保证金账户账号" name="settlAcctNum" rules="required" ctype="input" icon="search" :triger-click="false" :on-icon-click="initBail" :data="bailAccNoData"></yu-xform-item>
          <yu-xform-item label="账户名称" name="acctName" rules="required"></yu-xform-item>
          <yu-xform-item label="账户子序号" name="acctSubNum" rules="required"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="curType" data-code="STD_ZB_CUR_TYP"></yu-xform-item>
          <yu-xform-item label="开户机构" name="openOrgId"></yu-xform-item>
          <yu-xform-item label="是否使用" name="isEffect" ctype="select" data-code="STD_ZB_YES_NO" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="formType=='edit'" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('onBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String,
    formType: {
      type: String,
      default: 'edit'
    }
  },
  data: function () {
    return {
      formdata: {},
      dialogData: {},
      updateUrl: this.$backend.cmisCus + '/api/cusaccountinfo/update',
      addUrl: this.$backend.cmisCus + '/api/cusaccountinfo/'
    };
  },
  methods: {
    // 选取保证金
    initBail: function (value) {
      let _this = this;
      if (!_this.formdata.settlAcctNum) {
        _this.$message({
          message: '请先输入结算账户账号！',
          type: 'warning'
        });
        return;
      }
      var data = { acctNo: _this.formdata.settlAcctNum };
      _this.$dialog.open('', 'zrcbank/biz/common/commonEndAccount', 1000, 800, data, params => {
        _this.formdata.acctName = params.zhhuzwmc;
        _this.formdata.acctSubNum = params.zhhaoxuh;
        _this.formdata.curType = params.huobdaih;
        _this.formdata.openOrgId = params.kaihjigo;
      });
    }
  }
};
</script>