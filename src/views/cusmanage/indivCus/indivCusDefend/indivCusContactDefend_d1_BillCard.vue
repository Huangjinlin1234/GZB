<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden></yu-xform-item>
          <yu-xform-item label="身份证地址" ctype="input" placeholder="身份证地址" name="certAddr" hidden></yu-xform-item>
          <yu-xform-item label="身份证地址街道/路" ctype="input" placeholder="身份证地址街道/路" name="certStreet" hidden></yu-xform-item>
          <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="mobileNo" :rules="required"></yu-xform-item>
          <yu-xform-item label="住宅电话" ctype="input" placeholder="住宅电话" name="mobile"></yu-xform-item>
          <yu-xform-item label="微信号" ctype="input" placeholder="微信号" name="wechatNo"></yu-xform-item>
          <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq"></yu-xform-item>
          <yu-xform-item label="居住地址街道/路" ctype="input" placeholder="居住地址街道/路" name="streetRsd" hidden></yu-xform-item>
          <yu-xform-item label="传真" ctype="input" placeholder="传真" name="faxCode"></yu-xform-item>
          <yu-xform-item label="Email地址" ctype="input" placeholder="Email地址" name="email"></yu-xform-item>
          <yu-xform-item label="户籍地址" ctype="input" placeholder="户籍地址" name="indivHouhRegAdd" hidden></yu-xform-item>
          <yu-xform-item label="户籍地址" ctype="yu-xdic-tree-addr" :rules="required" placeholder="户籍地址" name="regionAddrName" @select-fn="commonSelectFn" :mapping="{$pathtext:'regionAddrName',enName:'regionAddr'}" width="480" height="480" :parms="{optType:'STD_ZB_AREA_CODE'}" :selectionType="radio" ></yu-xform-item>
          <yu-xform-item label="户籍地址街道/路" ctype="textarea" :rules="required" placeholder="户籍地址街道/路" name="regionStreet"></yu-xform-item>
          <yu-xform-item label="送达地址" ctype="yu-xdic-tree-addr" placeholder="送达地址" name="sendAddrName" @select-fn="commonSelectFn" :mapping="{ $pathtext: 'sendAddrName', enName: 'sendAddr' }" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
          <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="sendAddr" hidden></yu-xform-item>
          <yu-xform-item label="送达地址街道/路" ctype="textarea" :rules="required" placeholder="送达地址街道/路" name="deliveryStreet"></yu-xform-item>
          <yu-xform-item label="邮政编码" ctype="input" placeholder="邮政编码" name="postcode" :rules="required"></yu-xform-item>
          <yu-xform-item label="居住状况 " ctype="select" :rules="required" data-code="STD_ZB_RSD_ST" placeholder="居住状况 " name="indivRsdSt"></yu-xform-item>
          <yu-xform-item label="手机号码1" ctype="input" placeholder="手机号码1" name="mobileA" hidden></yu-xform-item>
          <yu-xform-item label="居住区域名称" ctype="input" placeholder="居住区域名称" name="regionName" :rules="required"></yu-xform-item>
          <yu-xform-item label="号码是否验证1 std_zb_y" ctype="input" placeholder="号码是否验证1 std_zb_y" name="isCheckA" hidden></yu-xform-item>
          <yu-xform-item label="居住区域编号" ctype="input" placeholder="居住区域编号" name="regionalism" :rules="required"></yu-xform-item>
          <yu-xform-item label="号码是否本人1 std_zb_y" ctype="input" placeholder="号码是否本人1 std_zb_y" name="isOneselfA" hidden></yu-xform-item>
          <yu-xform-item label="居住地地址" ctype="input" placeholder="居住地地址" name="indivRsdAddr" :rules="required"></yu-xform-item>
          <yu-xform-item label="手机号码2" ctype="input" placeholder="手机号码2" name="mobileB" hidden></yu-xform-item>
          <yu-xform-item label="居住地邮政编码" ctype="input" placeholder="居住地邮政编码" name="indivZipCode"></yu-xform-item>
          <yu-xform-item label="居住时间（年）" ctype="input" placeholder="居住时间（年）" name="resiTime" :rules="required"></yu-xform-item>
          <yu-xform-item label="号码是否验证2 std_zb_y" ctype="input" placeholder="号码是否验证2 std_zb_y" name="isCheckB" hidden></yu-xform-item>
          <yu-xform-item label="号码是否本人2 std_zb_y" ctype="input" placeholder="号码是否本人2 std_zb_y" name="isOneselfB" hidden></yu-xform-item>
          <yu-xform-item label="手机号码1来源" ctype="input" placeholder="手机号码1来源" name="mobile1Sour" hidden></yu-xform-item>
          <yu-xform-item label="手机号码2来源" ctype="input" placeholder="手机号码2来源" name="mobile2Sour" hidden></yu-xform-item>
          <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="是否农户" ctype="select" :rules="required" :options="dicOptions.isAgriOptions" placeholder="是否农户" name="isAgri"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">暂存</yu-button>
      <yu-button type="primary" @click="customClick('commit')">提交</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusindivcontact/update',
      addUrl: this.$backend.cmisCus + '/api/cusindivcontact/',
      formdata: {},
      formType: 'edit',
      required: '',
      dicOptions: {isAgriOptions: [{key: 'Y', value: '是'}, {key: 'N', value: '否'}] },
      formRules: { mobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}],
        mobile: [{validator: validator.telephone, message: '不是正确的固定电话和小灵通', trigger: 'blur'}],
        faxCode: [{validator: validator.telephone, message: '不是正确的固定电话和小灵通', trigger: 'blur'}],
        email: [{validator: validator.email, message: '不是正确的邮件格式', trigger: 'blur'}],
        postcode: [{validator: validator.number, message: '不是正确的数字', trigger: 'blur'}],
        resiTime: [{validator: validator.pInt, message: '不是正确的非零正整数', trigger: 'blur'}] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgId');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>


