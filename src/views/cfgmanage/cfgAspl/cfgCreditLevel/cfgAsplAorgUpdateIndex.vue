<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :disabled="isFormDisabled"
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
        <yu-xform-group :column="2">
            <yu-xform-item label="主键" ctype="input" name="pkId" disabled utrace hidden></yu-xform-item>
            <yu-xform-item label="总行行号" ctype="input" name="headBankNo" :column="12" ></yu-xform-item>
            <yu-xform-item label="ECIF编号" ctype="input" name="ecifNo" :column="12"  hidden></yu-xform-item>
            <yu-xform-item label="同业名称" ctype="input" name="intbankName" :column="12" ></yu-xform-item>
            <yu-xform-item label="信用等级" ctype="select" utrace name="creditLevel" @change="creditLevelChange" data-code="STD_ACC_BANK_CREDIT_LEVEL" :column="12" ></yu-xform-item>
            <yu-xform-item label="抵质押率" ctype="yu-num" utrace sign="%" :multiple="100" name="pldimnRate" :column="12"  hidden></yu-xform-item>
            <yu-xform-item label="生效状态" ctype="select" utrace name="status" :column="12" data-code="STD_ZB_YES_NO" ></yu-xform-item>

            <yu-xform-item label="操作类型" ctype="input" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="datepicker" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="datepicker" name="createTime" disabled></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="datepicker" name="updateTime" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doUpdate" :hidden="isShowSaveBtn">保存</yu-button>
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
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      isFormDisabled: false,
      isShowSaveBtn: false
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      let par = this.pageParams;
      // 查看
      if (par.op) {
        if (par.op == 'VIEW') {
          this.isFormDisabled = true;
          this.isShowSaveBtn = true;
        }
      }
      this.$request({
        // async: false,
        method: 'post',
        url: this.$backend.cmisBiz + '/api/asplaorglist/showdetail',
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

    // 信用等级
    creditLevelChange (value) {
      if (value == '01') {
        this.formdata.pldimnRate = '1.00';
      } else if (value == '02') {
        this.formdata.pldimnRate = '0.95';
      } else if (value == '03') {
        this.formdata.pldimnRate = '0.90';
      } else {
        // this.formdata.pldimnRate = '';
      }
    },
    // 修改
    doUpdate () {
      let jsoPar = this.formdata;
      // 登录信息
      let userInfo = this.$xutils.getLoginUserInfo();
      jsoPar.updId = userInfo.loginCode;
      jsoPar.updBrId = userInfo.orgCode;
      jsoPar.updDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      jsoPar.updateTime = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      // 请求参数
      this.$xutils.request({
        // 同步请求
        async: false,
        // 修改
        url: this.$backend.cmisBiz + '/api/asplaorglist/update',
        data: JSON.stringify(jsoPar),
        success: (response, status, xhr) => {
          // 自动刷新列表数据
          this.UTraceSet();
          this.$xutils.showMsgBox('提示', '保存成功!');

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
