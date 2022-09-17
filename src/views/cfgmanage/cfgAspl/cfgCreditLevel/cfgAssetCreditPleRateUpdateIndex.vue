<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules"
        :utrace="utrace"
        u-pk-value="asplaorglist_form"
        trace-server-name="/yusp-app-oca"
        ukey-field="pkId"
        :utrace-usr-id="userId"
        :utrace-org-id="orgId"
        :utrace-menu-id="menuId"
        trace-get-interface="/api/utrace/listByPk"
        trace-get-list-interface="/api/utrace/listPage"
        trace-save-interface="/api/utrace/save"
      >
        <yu-xform-group :column="1">
            <yu-xform-item label="主键" ctype="input" name="pkId" hidden></yu-xform-item>
            <yu-xform-item label="配置类型" ctype="select" name="cfgType" placeholder="配置类型" data-code="STD_ASPL_CFG_TYPE" hidden></yu-xform-item>
            <yu-xform-item label="资产类型" ctype="select" name="assetType" placeholder="资产类型" data-code="STD_ASPL_ASSET_TYPE" utrace></yu-xform-item>
            <yu-xform-item label="信用配置类型" ctype="select" name="cfgCreditType" placeholder="信用配置类型" data-code="STD_CFG_CREDIT_TYPE" hidden></yu-xform-item>
            <yu-xform-item label="信用等级" ctype="select" name="creditLevel" placeholder="信用等级" data-code="STD_ACC_BANK_CREDIT_LEVEL" hidden></yu-xform-item>
            <yu-xform-item label="抵质押率" ctype="yu-num" sign="%"  name="pldimnRate" placeholder="抵质押率" :multiple="100" :precision="0" :min="0" utrace></yu-xform-item>

            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden :colspan="24"></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden :colspan="24"></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden :colspan="24"></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden :colspan="24"></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden :colspan="24"></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden :colspan="24"></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden :colspan="24"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden :colspan="24"></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden :colspan="24"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doUpdate">保存</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { sessionStore } from 'xy-utils';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    const sessionInfo = sessionStore.get('YUFP-SESSION-USER');
    const tab = this.$route || this.$router.history.current;
    return {
      utrace: false,
      formdatautrace: {},
      userId: sessionInfo.userCode,
      orgId: sessionInfo.org.code,
      menuId: tab.meta.id || 'asplAorgListForm',
      updateUrl: this.$backend.cmisCfg + '/api/cfgcreditlevel/update',
      addUrl: this.$backend.cmisCfg + '/api/cfgcreditlevel/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      let par = this.pageParams;
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisCfg + '/api/cfgcreditlevel/showdetail',
        data: par.pkId
      })
        .then(response => {
          if (this.utrace === false) {
            this.utrace = true;
          }
          this.$utils.clone(response.data, this.formdatautrace);
          // 重置表单数据
          this.$refs.refForm.resetFields();
          // 给表单数据赋值
          this.$utils.clone(response.data, this.formdata);
        })
        .catch(() => {
          this.$xutils.showMsgBox('提示', '请求异常'); // 弹出提示
        });
    },
    // 修改
    doUpdate () {
      let jsoPar = this.formdata;
      this.$xutils.request({
        // 同步请求
        async: false,
        // 修改
        url: this.$backend.cmisCfg + '/api/cfgcreditlevel/update',
        data: JSON.stringify(jsoPar),
        success: (response, status, xhr) => {
          if (response.data) {
            // 自动刷新列表数据
            this.UTraceSet();
            this.$xutils.showMsgBox('提示', '保存成功！');
          } else {
            this.$xutils.showMsgBox('提示', response.message);
          }
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    UTraceSet () {
      this.$refs.refForm.saveUTrace(this.formdatautrace);
      this.$utils.clone(this.formdata, this.formdatautrace);
    },
    // 返回
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
