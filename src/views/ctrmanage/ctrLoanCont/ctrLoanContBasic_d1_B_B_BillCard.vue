<template>
  <div id="d1_B_B_BillCard">
    <div id="d1_B_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="使用额度信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="是否使用授信额度" ctype="select" name="isUtilLmt" rules="required" disabled data-code="STD_ZB_YES_NO" placeholder="是否使用授信额度"></yu-xform-item>
            <yu-xform-item label="授信额度编号" ctype="input" placeholder="授信额度编号" name="lmtAccNo" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="replyNo" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="其他信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="还款来源" ctype="textarea" name="repaySour" rules="required" placeholder="还款来源"></yu-xform-item>
            <yu-xform-item label="调查人结论" ctype="textarea" name="inveConclu" rules="required" placeholder="调查人结论"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="地址确认信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="联系人" ctype="input" placeholder="联系人" name="linkman" rules="required"></yu-xform-item>
            <yu-xform-item label="电话" ctype="" name="phone" rules="required" placeholder="电话"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="邮箱" ctype="input" placeholder="邮箱" name="email"></yu-xform-item>
            <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" ctype="input" placeholder="微信" name="wechat"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="deliveryAddr" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="债项评级情况">
          <yu-xform-group :column="3">
            <yu-xform-item label="债项等级" ctype="input" placeholder="债项等级" name="debtLevel" disabled></yu-xform-item>
            <yu-xform-item label="违约损失率LGD" ctype="input" placeholder="违约损失率LGD" name="lgd" disabled></yu-xform-item>
            <yu-xform-item label="违约风险暴露EAD（元）" ctype="input" placeholder="违约风险暴露EAD（元）" name="ead" disabled></yu-xform-item>
            <yu-xform-item label="转敞口对象的PD（元）" ctype="input" placeholder="转敞口对象的PD（元）" name="pd" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="责任机构" ctype="input" placeholder="责任机构" name="managerBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" rules="required" disabled placeholder="登记日期"></yu-xform-item>
            <yu-xform-item label="合同状态" ctype="select" name="contStatus" data-code="STD_CONT_STATUS" placeholder="合同状态"></yu-xform-item>
            <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BBBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/ctrtfloccont/update',
      addUrl: this.$backend.cmisBiz + '/api/ctrtfloccont/',
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