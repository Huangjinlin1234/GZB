<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="viewType=='VIEW'" :rules="formRules" :form-change="triggerEditChangeEvent"
        :utrace="utrace"
        u-pk-value="cusbankbase_form"
        trace-server-name="/yusp-app-oca"
        ukey-field="cusId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save"
      >
        <yu-panel title="地址与联系方式" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" hidden></yu-xform-item>
            <yu-xform-item label="常用联系人" ctype="input" placeholder="常用联系人" name="freqLinkman" utrace rules="required" colspan="11"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="1">
              <yu-button @click="getCusMsg" type="primary" size="small">选取</yu-button>
            </yu-xform-item>
            <yu-xform-item label="常用联系人手机" ctype="input" placeholder="常用联系人手机" name="freqLinkmanTel" utrace rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="经营地址" ctype="input" placeholder="经营地址" name="operAddrAct" disabled></yu-xform-item>
            <yu-xform-item label="注册地址" ctype="yu-xdic-tree-addr" placeholder="注册地址" name="regiAddr" disabled  @select-fn="commonSelectFn" width="480" height="480" :parms="{ optType: 'STD_ZB_AREA_CODE',levels: '5'}" :selectionType="radio"></yu-xform-item>
            <yu-xform-item label="送达地址" ctype="input" placeholder="送达地址" name="sendAddr" utrace rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="传真" ctype="input" placeholder="传真" name="fax"></yu-xform-item>
            <yu-xform-item label="电子邮箱" utrace ctype="input" placeholder="电子邮箱" name="linkmanEmail"></yu-xform-item>
            <yu-xform-item label="qq" utrace ctype="input" placeholder="qq" name="qq"></yu-xform-item>
            <yu-xform-item label="微信" utrace ctype="input" placeholder="微信" name="wechatNo" :rules="{ required: iswechatNo, message: '微信、QQ、Email地址三项中至少输入一项' }"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
      <div>
        <span style="font-size:16px;font-weight:bold">温馨提示：微信、QQ、Email地址三项中至少输入一项</span>
      </div>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { sessionStore } from 'xy-utils';
export default {
  props: {
    cusCorp: Object,
    dialogId: String,
    viewType: String
  },
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      utrace: true,
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'cusCorpBaseAddress',
      updateUrl: this.$backend.cmisCus + '/api/cuscorp/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  created () {
    this.formdata.cusId = this.cusCorp.cusId;
  },
  mounted () {
    this.AfterInit();
  },
  watch: {
    cusCorp: function (newValue, oldValue) {
      // 父组件param对象改变会触发此函数
      this.AfterInit();
    }
  },
  computed: {
    iswechatNo: function () {
      return !!(this.formdata.qq == '' && this.formdata.linkmanEmail == '');
    }
  },
  methods: {
    AfterInit () {
      var _this = this;
      if (_this.cusCorp) {
        _this.copyExsitFieldValue(_this.cusCorp, _this.formdata);
        // _this.formdata.freqLinkman = _this.cusCorp.freqLinkman;
        // _this.formdata.freqLinkmanTel = _this.cusCorp.freqLinkmanTel;
        // _this.formdata.operAddrAct = _this.cusCorp.operAddrAct;
        // _this.formdata.registerAddress = _this.cusCorp.registerAddress;
        // _this.formdata.sendAddr = _this.cusCorp.sendAddr;
        // _this.formdata.fax = _this.cusCorp.fax;
        // _this.formdata.linkmanEmail = _this.cusCorp.linkmanEmail;
        // _this.formdata.qq = _this.cusCorp.qq;
        // _this.formdata.wechatNo = _this.cusCorp.wechatNo;
        if (_this.cusCorp.bizType == 'A03') {
          _this.setBillCardItemVisible('regiAddr', false);
        }
      }
    },
    getCusMsg () {
      this.$dialog.open('客户信息', 'zrcbank/cus/cusIndiv/tempCusIndiv/cusindivPop', 1000, 600, null, rowData => {
        // 常用联系人
        this.formdata.freqLinkman = rowData.cusName;
        // 常用联系电话
        this.formdata.freqLinkmanTel = rowData.mobileNo;
        // 送达地址
        this.formdata.sendAddr = rowData.sendAddr || '';
        this.formdata.linkmanEmail = rowData.email || '';
        this.formdata.qq = rowData.qq || '';
        this.formdata.wechatNo = rowData.wechatNo || '';
      });
    },
    copyExsitFieldValue (source, target) {
      for (let i in source) { // 仅赋值表单存在的字段
        if (target.hasOwnProperty(i)) {
          target[i] = source[i];
        }
      }
    }
  }
};
</script>
