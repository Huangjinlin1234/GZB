<template>
  <div id="d1_A_BillCard">
    <div id="d1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="调查编号" ctype="input" placeholder="调查编号" name="surveySerno" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="征信信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="借款人未结清贷款笔数" ctype="input" placeholder="借款人未结清贷款笔数" name="loanUnpaidNums" disabled></yu-xform-item>
            <yu-xform-item label="借款人未销户信用卡授信总额" ctype="input" placeholder="借款人未销户信用卡授信总额" name="creditCrdamtClose" disabled></yu-xform-item>
            <yu-xform-item label="借款人未结清贷款余额" ctype="input" placeholder="借款人未结清贷款余额" name="loanBalUnpaid" disabled></yu-xform-item>
            <yu-xform-item label="借款人近6个月信用卡平均支用比例" ctype="input" placeholder="借款人近6个月信用卡平均支用比例" name="credit6mAveDefrayPerc" disabled></yu-xform-item>
            <yu-xform-item label="借款人近2年贷款审批查询机构数" ctype="input" placeholder="借款人近2年贷款审批查询机构数" name="loan2yQryorgNums" disabled></yu-xform-item>
            <yu-xform-item label="借款人未结清消费金融公司贷款笔数" ctype="input" placeholder="借款人未结清消费金融公司贷款笔数" name="loanConsumecomUnpaidNums" disabled></yu-xform-item>
            <yu-xform-item label="借款人未结清对外担保贷款笔数" ctype="input" placeholder="借款人未结清对外担保贷款笔数" name="loanOutguarUnpaidNums" disabled></yu-xform-item>
            <yu-xform-item label="企业未结清业务机构数" ctype="input" placeholder="企业未结清业务机构数" name="comUnpaidBusiOrg" disabled></yu-xform-item>
            <yu-xform-item label="企业未结清信贷余额(元)" ctype="input" placeholder="企业未结清信贷余额(元)" name="loanBalComUnpaid" disabled></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtdebitcreditinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtdebitcreditinfo/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>