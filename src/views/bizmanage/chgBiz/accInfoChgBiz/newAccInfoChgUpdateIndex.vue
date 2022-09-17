<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :disabled="formDisabled">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="借据信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" hidden></yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden></yu-xform-item>
            <yu-xform-item label="账户属性" ctype="select" name="acctAttr" rules="required" disabled data-code="STD_ZB_BR_ID_ATTR" placeholder="账户属性"></yu-xform-item>
            <yu-xform-item label="账号归属" ctype="select" name="acctBelong" rules="required" data-code="STD_ZB_ACCT_BELONG" placeholder="账号归属" @change="belongChange"></yu-xform-item>
            <yu-xform-item label="账号分类" ctype="select" name="acctClass" rules="required" data-code="STD_ZB_ACCT_CLASS" placeholder="账号分类"></yu-xform-item>
            <yu-xform-item label="账号" ctype="input" placeholder="账号" name="acctNo" rules="required"></yu-xform-item>
            <yu-xform-item label="账号名称" ctype="input" placeholder="账号名称" name="acctName" rules="required"></yu-xform-item>
            <yu-xform-item label="开户行行号" ctype="input" placeholder="开户行行号" name="opanOrgNo" :rules="opanOrgNoRequired"></yu-xform-item>
            <yu-xform-item label="开户行行名" ctype="input" placeholder="开户行行名" name="opanOrgName" :rules="opanOrgNameRequired"></yu-xform-item>
            <yu-xform-item label="机构编号" ctype="input" placeholder="机构编号" name="orgNo" :rules="orgNoRequired"></yu-xform-item>
            <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName" :rules="orgNameRequired"></yu-xform-item>
            <yu-xform-item label="币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
            <yu-xform-item label="支付金额" ctype="yu-currency" name="payAmt" placeholder="支付金额" :min="0" ></yu-xform-item>
            <yu-xform-item label="支付用途" ctype="textarea" name="payUse" rules="required" placeholder="支付用途"></yu-xform-item>
            <yu-xform-item label="账号状态" ctype="select" name="acctStatus" hidden data-code="STD_ZB_PVP_ACCT_ST" placeholder="账号状态"></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="变更操作标识" ctype="select" name="acctChgFlag" hidden data-code="STD_ACCT_CHG_FLAG" placeholder="变更操作标识"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onContinue" v-show="visType">保存</yu-button>
      <yu-button type="primary" @click="onCancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
export default {
  props: {
    pageParams: Object,
    dialogId: String
  },
  data () {
    return {
      visType: true,
      updateUrl: this.$backend.cmisBiz + '/api/iqpbillacctchgrel/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpbillacctchgrel/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      formDisabled: false,
      opanOrgNoRequired: true,
      opanOrgNameRequired: true,
      orgNoRequired: true,
      orgNameNoRequired: true
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    // 新增 账号变更申请

    afterInit () {
      // 判断 新增 or 修改
      if (this.pageParams.pk_id != '' && this.pageParams.pk_id != null && this.pageParams.pk_id != undefined) {
        this.queryData({pkId: this.pageParams.pkId});
      } else {
        // 获取页面默认值
        this.execBillCardDefaultValueFormula();
        // 借据信息赋值
        this.formdata.iqpSerno = this.pageParams.iqpSerno;
        this.formdata.billNo = this.pageParams.billNo;
        this.formdata.contNo = this.pageParams.contNo;
        this.formdata.cusId = this.pageParams.cusId;
      }
      // 查看
      if (this.pageParams.opType == 'view') {
        // 查看
        this.d1_BillCard.setItemEditable('*', false);
        this.formDisabled = true;
        this.visType = false;
      }
      // 初始化 页面字段
      this.initializationField();
    },
    // 监听事件
    belongChange (oldVal, newVal) {
      // 账号归属 acct_belong  STD_ZB_ACCT_BELONG
      if (newVal == '10') {
        // 我行
        // 开户行
        this.setItemVisible('opanOrgNo', false);
        this.opanOrgNoRequired = false;
        this.formdata.opanNrgNo = '';
        // 开户行名称
        this.setItemVisible('opanOrgName', false);
        this.opanOrgNameRequired = false;
        this.formdata.opanOrgName = '';
        // 机构号、机构名称
        this.setItemVisible('orgNo', true);
        this.setItemVisible('orgName', true);
      } else if (newVal == '20') {
        // 其他行
        // 开户行、开户行名称
        this.setItemVisible('opanOrgNo', true);
        this.setItemVisible('opanOrgName', true);
        // 机构号、机构名称
        this.setItemVisible('orgNo', false);
        this.orgNoRequired = false;

        this.setItemVisible('orgName', false);
        this.orgNameRequired = false;
        this.formdata.orgName = '';
      } else {
        // 空值
        this.setItemVisible('opanOrgNo', true);
        this.setItemVisible('opanNrgName', true);
        this.setItemVisible('orgNo', true);
        this.setItemVisible('orgName', true);
        this.opanOrgNoRequired = true;
        this.opanOrgNameRequired = true;
        this.orgNoRequired = true;
        this.orgNameRequired = true;
      }
    },
    initializationField () {
      // 账户归属
      const acctBelong = this.formdata.acctBelong;
      if (acctBelong == '10') {
        // 我行
        // 开户行
        this.setItemVisible('opanOrgNo', false);
        this.d1_BillCard.setBillCardItemRequired('opanOrgNo', false);
        this.opanOrgNoRequired = false;
        this.formdata.opanOrgNo = '';
        // 开户行名称
        this.setItemVisible('opanOrgName', false);
        this.opanOrgNameRequired = false;
        this.formdata.opanOrgName = '';
        // 机构号、机构名称
        this.setItemVisible('orgNo', true);
        this.setItemVisible('orgName', true);
      } else if (acctBelong == '20') {
        // 其他行
        // 开户行、开户行名称
        this.setItemVisible('opanOrgNo', true);
        this.setItemVisible('opanOrgName', true);
        // 机构号、机构名称
        this.setItemVisible('orgNo', false);
        this.orgNoRequired = false;
        this.formdata.orgNo = '';
        this.setItemVisible('orgName', false);
        this.orgNameRequired = false;
        this.formdata.orgName = '';
      } else {
        // 空值
        this.setItemVisible('opanOrgNo', true);
        this.setItemVisible('opanOrgName', true);
        this.setItemVisible('orgNo', true);
        this.setItemVisible('orgName', true);
        this.opanOrgNoRequired = true;
        this.opanOrgNameRequired = true;
        this.orgNoRequired = true;
        this.orgNameRequired = true;
      }
      // 账号属性
      const acctAttr = this.formdata.acctAttr;
      if (acctAttr == '3') {
        // 支付金额
        this.setItemVisible('payAmt', false);
      }
    },
    setItemVisible: function (item, flag) {
      this.$refs.refForm.setItemHidden(item, !flag);
    },
    queryData: function (queryParam) {
      this.$request({
        url: this.addUrl,
        method: 'get', // 默认get请求
        data: {condition: JSON.stringify(queryParam)}
        // async: false
      }).then((response) => {
        if (response.code == '0') {
          if (response.data instanceof Array) {
            // 数组就赋值第0项
            if (response.data.length > 0) {
              yufp.clone(response.data[0], this.formdata);
              this.setBillCardValue();
            }
          } else {
            yufp.clone(response.data, this.formdata);
          }
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '请求表单数据失败', type: 'error' });
      });
    },
    // 保存
    onContinue () {
      // 检验必输项
      var validate = false;
      this.$refs.refForm(function (valid) {
        validate = valid;
      });
      if (!validate) {
        return;
      }
      // 保存
      let result;
      if (this.pageParams.pkId != '' && this.pageParams.pkId != null && this.pageParams.pkId != undefined) {
        this.saveData(this.updateUrl);
      } else {
        this.saveData(this.addUrl);
      }
      if (result && result.code == 'ok') {
        this.$xutils.showMsgBox('提示', '保存成功', 350, 150, () => {
        });
      }
    },
    saveData (url) {
      this.$request({
        url: this.updateUrl,
        method: 'post',
        data: yufp.clone(this.formdata, {}),
        async: false,
        success: (response) => {
          if (response.code == '0') {
            this.$message('更新成功!');
            this.$dialog.close(this.dialogId);
          }
        },
        error: () => {
          // 处理请求失败的情况
          this.$message({ message: '更新失败', type: 'error' });
        }
      });
    },
    // 返回
    onCancel () {
      this.$dialog.close(this.dialogId);
    },
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('UUID');
      this.formdata.acctAttr = this.$xutils.getDefaultformulaData('3');
      this.formdata.curType = this.$xutils.getDefaultformulaData('CNY');
      this.formdata.acctStatus = this.$xutils.getDefaultformulaData('1');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.acctChgFlag = this.$xutils.getDefaultformulaData('02');
    }
  }
};
</script>
