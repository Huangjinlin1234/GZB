<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules">
        <yu-xform-group :column="2">
            <yu-xform-item label="主键" ctype="input" name="pkId" hidden ></yu-xform-item>
            <yu-xform-item label="总行行号" ctype="input" name="headBankNo" :column="12"></yu-xform-item>
            <yu-xform-item label="ECIF编号" ctype="input" name="ecifNo" :column="12" hidden></yu-xform-item>
            <yu-xform-item label="同业名称" ctype="input" name="intbankName" :column="12"></yu-xform-item>
            <yu-xform-item label="信用等级" ctype="select" name="creditLevel" data-code="STD_ACC_BANK_CREDIT_LEVEL" @change="creditLevelChange" :column="12"></yu-xform-item>
            <yu-xform-item label="抵质押率" ctype="yu-num" sign="%" :multiple="100" name="pldimnRate"  :column="12" hidden></yu-xform-item>
            <yu-xform-item label="生效状态" ctype="select" name="status" :column="12" data-code="STD_ZB_YES_NO"></yu-xform-item>

            <yu-xform-item label="操作类型" ctype="input" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" name="inputDate" hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="datepicker" name="createTime" disabled></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="datepicker" name="updateTime" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doAdd">提交</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
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
      this.formdata.createTime = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      this.formdata.updateTime = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
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
    // 新增
    doAdd () {
      let jsoPar = this.formdata;
      // 登录信息
      let userInfo = this.$xutils.getLoginUserInfo();
      jsoPar.updId = userInfo.loginCode;
      jsoPar.updBrId = userInfo.orgCode;
      jsoPar.updDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
      jsoPar.managerId = userInfo.loginCode;
      jsoPar.managerBrId = userInfo.orgCode;
      jsoPar.inputId = userInfo.loginCode;
      jsoPar.inputBrId = userInfo.loginCode;
      jsoPar.inputDate = this.$xutils.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());

      jsoPar.pkId = this.$xutils.getUUID();
      jsoPar.oprType = '01';
      // 请求参数
      this.$xutils.request({
        // 同步请求
        async: false,
        // 修改
        url: this.$backend.cmisBiz + '/api/asplaorglist/',
        data: JSON.stringify(jsoPar),
        success: (response, status, xhr) => {
          this.$xutils.showMsgBox('提示', '保存成功!', 350, 150, () => {
            this.cancel();
          });
        },
        error: (result, b) => {
          this.$xutils.showMsgBox('提示', result + '；错误信息：' + b); // 弹出提示
        }
      });
    },
    // 返回
    cancel () {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
