<template>
  <div>
    <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :disabled="formDisabled">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="iqpSerno" hidden></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" hidden></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" hidden></yu-xform-item>
          <yu-xform-item label="账户属性" ctype="select" name="acctAttr" rules="required" data-code="STD_ZB_BR_ID_ATTR" placeholder="账户属性" @change="acctAttrChange"></yu-xform-item>
          <yu-xform-item label="账号归属" ctype="select" name="acctBelong" rules="required" data-code="STD_ZB_ACCT_BELONG" placeholder="账号归属" @change="acctBelongChange"></yu-xform-item>
          <yu-xform-item label="账号分类" ctype="select" name="acctClass" rules="required" data-code="STD_ZB_ACCT_CLASS" placeholder="账号分类"></yu-xform-item>
          <yu-xform-item label="账号" ctype="input" placeholder="账号" name="acctNo" rules="required"></yu-xform-item>
          <yu-xform-item label="账号名称" ctype="input" placeholder="账号名称" name="acctName" rules="required"></yu-xform-item>
          <yu-xform-item label="开户行行号" ctype="input" placeholder="开户行行号" name="opanOrgNo" :required="opanOrgRequired"></yu-xform-item>
          <yu-xform-item label="开户行行名" ctype="input" placeholder="开户行行名" name="opanOrgName"   :required="opanOrgRequired"></yu-xform-item>
          <yu-xform-item label="机构编号" ctype="input" placeholder="机构编号" name="orgNo"  :required="orgRequired"></yu-xform-item>
          <yu-xform-item label="机构名称" ctype="input" placeholder="机构名称" name="orgName"   :required="orgRequired"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" name="curType" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="币种"></yu-xform-item>
          <yu-xform-item label="支付金额" ctype="yu-currency" name="payAmt" rules="required" placeholder="支付金额" :min="0" :required="payAmtRequired"></yu-xform-item>
          <yu-xform-item label="支付用途" ctype="textarea" name="payUse" rules="required" placeholder="支付用途"></yu-xform-item>
          <yu-xform-item label="账号状态" ctype="select" name="acctStatus" hidden data-code="STD_ZB_PVP_ACCT_ST" placeholder="账号状态"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="onSave">保存</yu-button>
      <yu-button type="primary" @click="onCancel">关闭</yu-button>
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
      updateUrl: this.$backend.cmisBiz + '/api/iqpacctchgdtl/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpacctchgdtl/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      selfPars: {},
      formDisabled: false,
      payAmtRequired: true,
      opanOrgRequired: true,
      orgRequired: true
    };
  },
  mounted () {
    this.afterInit();
  },
  methods: {
    afterInit () {
      this.selfPars = this.pageParams;
      this.d1_BillCard.execBillCardDefaultValueFormula();
      // 设置币种默认为人民币不可编辑
      this.$refs.refForm.setItemDisabled('curType', true);
      this.formdata.curType = 'CNY';
      if (this.selfPars.optType == 'VIEW') {
        this.queryData({pkId: this.selfPars.pkId});
        this.initBillCard();
        this.formDisabled = true;
      }
    },
    queryData (queryParam) {
      let _this = this;
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
              yufp.clone(response.data[0], _this.formdata);
            }
          } else {
            yufp.clone(response.data, _this.formdata);
          }
        }
      }).catch(() => {
        // 处理请求失败的情况
        this.$message({ message: '请求表单数据失败', type: 'error' });
      });
    },

    // 初始化卡片内容
    initBillCard () {
      this.acctAttrChange(this.formdata.acctAttr);
      this.acctBelongChange(this.formdata.acctBelong);
    },

    onSave () {
      var validate = false;
      this.$refs.refForm.validate(function (valid) {
        validate = valid;
      });

      if (validate) {
        // 保存
        if (this.formdata.acctAttr == '1') {
          // 放款账户
          if (this.pageParams.loanCount > 0) {
            this.$xutils.showMsgBox('提示', '已存在放款账户,多个放款账户！');
            return;
          }
        }
        if (this.formdata.acctAttr == '3') {
          // 还款账户
          if (this.pageParams.repayCount > 2) {
            this.$xutils.showMsgBox('提示', '最多只能拥有三个还款账户！');
            return;
          }
        }
        this.formdata.iqpSerno = this.pageParams.iqpSerno;
        this.formdata.contNo = this.pageParams.contNo;
        this.formdata.cusId = this.pageParams.cusId;
        this.formdata.acctStatus = '1';
        const result = this.d1_BillCard.saveBillCardData();
        if (result && result.code == 'ok') {
          this.$xutils.showMsgBox('提示', '新增成功！', 350, 150, () => {
            // 刷新父级页面的列表数据
            this.$xutils.getParentPage(
              this,
              'd1_BillList',
              'queryDataByCondition',
              ['a.iqp_serno = \'' + this.pageParams.iqp_serno + '\'']
            );

            this.$dialog.close(this.dialogId);
          });
        } else {
          this.$xutils.showMsgBox('提示', '新增失败！');
          return;
        }
      }
    },

    onCancel () {
      this.$dialog.close(this.dialogId);
    },
    acctBelongChange: function (newVal) {
      if (newVal == '10') {
        // 是本行账户，显示机构号机构名，隐藏行号，行名
        this.$refs.refForm.setItemHidden('orgNo', false);
        this.$refs.refForm.setItemHidden('orgName', false);
        this.formdata.opanOrgNo = '';
        this.formdata.opanOrgName = '';
        this.$refs.refForm.setItemHidden('opanOrgNo', true);
        this.$refs.refForm.setItemHidden('opanOrgName', true);
        this.orgRequired = true;
        this.opanOrgRequired = false;
      }

      if (newVal == '20') {
        // 不是本行账户，隐藏机构号机构名，显示行号，行名
        this.$refs.refForm.setItemHidden('orgNo', false);
        this.$refs.refForm.setItemHidden('orgName', false);
        this.formdata.orgNo = '';
        this.formdata.orgName = '';
        this.$refs.refForm.setItemHidden('opanOrgNo', false);
        this.$refs.refForm.setItemHidden('opanOrgName', false);
        this.orgRequired = false;
        this.opanOrgRequired = true;
      }
    },
    acctAttrChange (newVal) {
      if (newVal == '4') {
        this.$refs.refForm.setItemHidden('payAmt', false);
        this.payAmtRequired = true;
        this.$refs.refForm.setItemDisabled('acctBelong', false);
      } else {
        this.$refs.refForm.setItemHidden('payAmt', true);
        this.$refs.refForm.payAmt = '';
        this.payAmtRequired = false;
        // 非受托支付的场景，设置账户归属为【我行账户】，不可编辑
        this.d1_BillCard.setBillCardItemValue('', '10');
        this.formdata.acctBelong = '10';
        this.$refs.refForm.setItemDisabled('acctBelong', true);
        this.acctBelongChange('10');
      }
    }
  }
};
</script>
