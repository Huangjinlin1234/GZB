<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" v-model="formdata"  disabled>
        <yu-panel title="授信品种信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
            <yu-xform-item label="分项额度编号" ctype="input" placeholder="分项流水号" name="accSubNo" disabled ></yu-xform-item>
            <yu-xform-item label="分项名称" ctype="input" name="accSubName" disabled ></yu-xform-item>
            <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" disabled :colspan="12" hidden></yu-xform-item>
            <yu-xform-item label="担保方式" ctype="select" name="guarMode" rules="required" disabled data-code="STD_ZB_GUAR_WAY" placeholder="担保方式" :colspan="12"></yu-xform-item>
            <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" data-code="STD_ZB_CUR_TYP" disabled></yu-xform-item>
            <yu-xform-item label="授信额度" ctype="input" placeholder="授信额度" name="lmtAmt" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="额度期限" ctype="input" placeholder="额度期限" name="lmtTerm" rules="required" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="是否预授信额度" ctype="input" placeholder="是否预授信额度" name="isPreLmt" rules="required" data-code="STD_ZB_YES_NO" disabled :colspan="12"></yu-xform-item>
            <yu-xform-item label="原额度分项编号" ctype="input" placeholder="原额度分项编号" name="origiLmtAccSubNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="原额度分项金额" ctype="input" placeholder="原额度分项金额" name="origiLmtAccSubAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="原额度分项期限" ctype="input" placeholder="原额度分项期限" name="origiLmtAccSubTerm" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
         <yu-form-buttons align="center">
          <yu-button type="primary" @click="goBack">返回</yu-button>
        </yu-form-buttons>
      </yu-xform>
    </div>
  </div>
</template>
<script>
yufp.lookup.reg('STD_ZB_YES_NO,STD_ZB_GUAR_WAY,STD_PRD_TYPE_PROP,STD_ZB_CUR_TYP');
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      formdata: {}
    };
  },
  mounted () {
    let _this = this;
    let model = {
      accSubNo: _this.getFactory().contextData.lmtDrawNo
    };
    // 保存征信信息数据
    yufp.service.request({
      // 同步请求
      async: false,
      method: 'POST',
      url: _this.$backend.cmisBiz + '/api/lmtreplyaccsub/getlmtreplyaccsubbyaccsubno',
      data: JSON.stringify(model),
      callback: function (code, message, response) {
        if (response.code == '0') {
          yufp.clone(response.data, _this.formdata);
        }
      }
    });
  },
  methods: {
    goBack () {
      this.getFactory().back();
    }
  }
};
</script>
