<template>
  <!--
    @created by
    @updated by zhoumw
    @description 地址与联系信息
  -->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent"
        :utrace="utrace"
        u-pk-value="cusindiv_form"
        trace-server-name="/yusp-app-oca"
        ukey-field="cusId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save">
        <yu-panel title="地址与联系信息" :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden></yu-xform-item>
            <yu-xform-item label="身份证地址" ctype="input" placeholder="身份证地址" name="certAddr" hidden></yu-xform-item>
            <yu-xform-item label="身份证地址街道/路" ctype="input" placeholder="身份证地址街道/路" name="certStreet" hidden></yu-xform-item>
            <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="mobileNo" :rules="required" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="住宅电话" ctype="input" placeholder="住宅电话" name="mobile" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="微信号" ctype="input" placeholder="微信号" name="wechatNo" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="QQ" ctype="input" placeholder="QQ" name="qq" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="居住地址街道/路" ctype="input" placeholder="居住地址街道/路" name="streetRsd" hidden :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="faxCode" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="Email地址" ctype="input" placeholder="Email地址" name="email" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="户籍地址" ctype="yu-xdic-tree-addr" rules="required" placeholder="户籍地址" name="indivHouhRegAdd" @selectval-fn="selectValFn" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}"  :selectionType="radio" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="户籍地址街道/路" ctype="textarea" rules="required" placeholder="户籍地址街道/路" name="regionStreet" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="yu-xdic-tree-addr" utrace rules="required" placeholder="送达地址" name="sendAddr" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="送达地址街道/路" ctype="textarea" rules="required" placeholder="送达地址街道/路" name="deliveryStreet" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="邮政编码" ctype="input" placeholder="邮政编码" name="postcode" :rules="required" :disabled="disabled" maxlength="6"></yu-xform-item>
            <yu-xform-item label="居住状况 " ctype="select" :rules="required" data-code="STD_ZB_RSD_ST" placeholder="居住状况 " name="indivRsdSt" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="居住区域名称" ctype="yu-xdic-tree-addr" placeholder="居住区域名称" name="regionalism" :rules="required" :disabled="disabled" @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :mapping="{'id':'regionalism'}" @selectval-fn="selectAreaValFn" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="居住区域名称" ctype="input" placeholder="居住区域名称" name="regionaName" hidden></yu-xform-item>
            <yu-xform-item label="居住区域编号" ctype="input" placeholder="居住区域编号" name="regionalism" :rules="required" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="居住地地址" ctype="input" placeholder="居住地地址" name="indivRsdAddr" :rules="required" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="居住时间（年）" ctype="input" placeholder="居住时间（年）" name="resiTime" :rules="required" :disabled="disabled"></yu-xform-item>
            <yu-xform-item label="是否农户" ctype="select" :rules="required" data-code="STD_ZB_YES_NO" placeholder="是否农户" name="isAgri" :disabled="disabled"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
import { sessionStore } from 'xy-utils';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      utrace: true,
      formdatautrace: {},
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'cusIndivContactInfoIndex',
      updateUrl: this.$backend.cmisCus + '/api/cusindivcontact/update',
      addUrl: this.$backend.cmisCus + '/api/cusindivcontact/',
      formdata: {},
      formType: 'edit',
      required: '',
      dicOptions: {},
      disabled: false,
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
    selectValFn (val) {
      if (val) {
        this.$request({
          url: this.$backend.cmisCus + '/api/cussnqyqd/selectbyprimarykey',
          method: 'post',
          data: {address: val.substr(val.indexOf('省') + 1)}
        }).then((res) => {
          if (res.code == '0' && res.data) {
            this.formdata.isAgri = res.data.isSn;
          }
        });
      }
    },
    selectAreaValFn (val) {
      this.formdata.regionName = val;
    }
  }
};
</script>
