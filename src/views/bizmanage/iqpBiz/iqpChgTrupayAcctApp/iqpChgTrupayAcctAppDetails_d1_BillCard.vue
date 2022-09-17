<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" padding-top  :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" rules="required" disabled></yu-xform-item>
            <!--<yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" required disabled></yu-xform-item>-->
            <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="viewContDataBycontNo" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
            <!--<yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" required disabled></yu-xform-item>-->
            <yu-xform-item label="借据编号" ctype="input" placeholder="借据编号" name="billNo" rules="required" disabled :colspan="10">
              <yu-input v-model="customTitle"></yu-input>
            </yu-xform-item>
            <yu-xform-item label="" ctype="custom" name="get" colspan="2">
              <yu-button type="primary" @click="viewBillDataBybillNo" :disabled="op == 'VIEW'">查看</yu-button>
            </yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" colspan="24" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="交易对手账户" ctype="input" placeholder="交易对手账户" name="toppAccno" rules="required"></yu-xform-item>
            <yu-xform-item label="原交易对手账户" ctype="input" placeholder="原交易对手账户" name="origiToppAccno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="交易对手名称" ctype="input" placeholder="交易对手名称" name="toppName" rules="required"></yu-xform-item>
            <yu-xform-item label="原交易对手名称" ctype="input" placeholder="原交易对手名称" name="origiToppName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="开户行行号" ctype="input" placeholder="开户行行号" name="toppBankNo" rules="required"></yu-xform-item>
            <yu-xform-item label="原开户行行号" ctype="input" placeholder="原开户行行号" name="origiToppBankno" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="开户行名称" ctype="input" placeholder="开户行名称" name="toppBankName" rules="required"></yu-xform-item>
            <yu-xform-item label="原开户行名称" ctype="input" placeholder="原开户行名称" name="origiToppBankname" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="交易对手金额" ctype="input" placeholder="交易对手金额" name="toppAmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="原交易对手金额" ctype="input" placeholder="原交易对手金额" name="origiToppAmt" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="是否客户修改" ctype="input" placeholder="是否客户修改" name="isOwner" rules="required"></yu-xform-item>
            <yu-xform-item label="核心流水号" ctype="input" placeholder="核心流水号" name="hxSerno" disabled></yu-xform-item>
            <yu-xform-item label="受托账号变更原因" ctype="input" placeholder="受托账号变更原因" name="chgResn" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" padding-top  :hideFilter="false" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled hidden></yu-xform-item>

            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerIdName" disabled></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrIdName" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">保存</yu-button>
      <yu-button type="primary" @click="customClick('commit')">提交</yu-button>
      <yu-button type="primary" @click="customClick('cancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqpchgtrupayacctapp/update',
      addUrl: this.$backend.cmisBiz + '/api/iqpchgtrupayacctapp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {},
      rule: [
        {
          required: true,
          message: '必填项',
          trigger: 'blur'
        },
        {
          validator: yufp.validator.number,
          message: '数字',
          trigger: 'blur'
        }
      ]
    };
  },
  methods: {

    viewContDataBycontNo () {
      if (this.formdata.contNo == null || this.formdata.contNo == '') {
        this.$xutils.showMsgBox('提示', '合同号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.formdata.cusId;
      json['contNo'] = this.formdata.contNo;
      json['model_group_no'] = 'CMG000015';
      json['viewType'] = 'VIEW';
      json['bizOp'] = 'VIEW';
      json['opType'] = 'view';
      json['nodeFlag'] = '1';
      json['contType'] = '1';
      json['iqpSerno'] = '1';
      json['op'] = 'VIEW';
      this.$dialog.open(
        '',
        'cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex',
        -1,
        -1,
        json
      );
    },

    viewBillDataBybillNo () {

    }

  }
};
</script>