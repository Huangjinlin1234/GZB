<template>
  <div id="d1_A_BillCard">
    <yu-xform ref="refForm" label-width="120px" :form-type="operate" v-model="formdata" :disabled="formDisable" :form-change="triggerEditChangeEvent">
      <yu-panel title="基本信息" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled></yu-xform-item>
          <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" rules="required"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
          <yu-xform-item label="联系电话" ctype="input" utrace placeholder="联系电话" name="phone" rules="required"></yu-xform-item>
          <yu-xform-item label="借据号" ctype="input" utrace name="billNo" placeholder="借据号" disabled></yu-xform-item>
          <yu-xform-item label="合同号" ctype="input" utrace name="contNo" placeholder="合同号" disabled></yu-xform-item>
          <yu-xform-item label="借据金额" ctype="input" name="billAmt" placeholder="借据金额" disabled></yu-xform-item>
          <yu-xform-item label="借据余额" ctype="input" name="billBal" placeholder="借据余额" disabled></yu-xform-item>
          <yu-xform-item label="贷款起始日" ctype="datepicker" placeholder="贷款起始日" name="loanStartDate" disabled></yu-xform-item>
          <yu-xform-item label="贷款截止日" ctype="datepicker" utrace placeholder="贷款截止日" name="loanEndDate" disabled></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="datepicker" utrace name="appDate" placeholder="申请日期" disabled></yu-xform-item>
          <yu-xform-item label="配偶名称" ctype="input" name="spouseCusName" placeholder="配偶名称"></yu-xform-item>
          <yu-xform-item label="婚姻状态" ctype="select" placeholder="婚姻状态" name="spouseMarryVal" data-code="STD_ZB_MAR_ST"></yu-xform-item>
          <yu-xform-item label="配偶电话" ctype="input" placeholder="配偶电话" name="spousePhone"></yu-xform-item>
          <yu-xform-item label="配偶证件号" ctype="input" placeholder="配偶证件号" name="spouseCertCode"></yu-xform-item>
          <yu-xform-item label="配偶客户经理" ctype="input" placeholder="配偶客户经理" name="spouseManagerName"></yu-xform-item>
          <yu-xform-item label="办理状态" ctype="select" name="applyStatus" placeholder="办理状态" data-code="STD_XD_ZXD_STATUS"></yu-xform-item>
          <yu-xform-item label="转换原因" ctype="input" placeholder="转换原因" name="changeRs"></yu-xform-item>
          <yu-xform-item label="押品他项权证金额" ctype="input" placeholder="押品他项权证金额" name="evalAmt"></yu-xform-item>
          <yu-xform-item label="批复余额" ctype="input" placeholder="批复余额" name="approvalBal"></yu-xform-item>
          <yu-xform-item label="配偶客户编号" ctype="input" name="spouseCusId" placeholder="配偶客户编号"></yu-xform-item>
          <yu-xform-item label="配偶借据号" ctype="input" placeholder="配偶借据号" name="spouseBillNo"></yu-xform-item>
          <yu-xform-item label="账务机构" ctype="input" placeholder="账务机构" name="finaBrId"></yu-xform-item>
          <yu-xform-item label="配偶的客户经理" ctype="input" placeholder="配偶的客户经理" name="spouseManagerId"></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
      <yu-panel title="其他信息" panel-type="simple">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户经理" ctype="input" placeholder="客户经理" name="managerName"></yu-xform-item>
          <yu-xform-item label="执行利率" ctype="input" placeholder="执行利率" name="execRateYear" disabled></yu-xform-item>
          <yu-xform-item label="房产类型编码" ctype="select" name="landUseWay" placeholder="房产类型编码" data-code="STD_ZB_HOUSE_TYPE"></yu-xform-item>
          <yu-xform-item label="还款期数" ctype="input" placeholder="还款期数" name="repayTerm" disabled></yu-xform-item>
          <yu-xform-item label="本金逾期记录" ctype="input" placeholder="本金逾期记录" name="overdueCount"></yu-xform-item>
          <yu-xform-item label="借据号汇总" ctype="input" placeholder="借据号汇总" name="billNoAll"></yu-xform-item>
          <yu-xform-item label="配偶本金逾期记录" ctype="input" placeholder="配偶本金逾期记录" name="memberOverdueCount"  disabled ></yu-xform-item>
          <yu-xform-item label="配偶借据号汇总" ctype="input" placeholder="配偶借据号汇总" name="memberBillNoAll" disabled></yu-xform-item>
          <yu-xform-item label="调查流水号" ctype="input" placeholder="调查流水号" name="surveySerno"></yu-xform-item>
          <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" disabled></yu-xform-item>
          <yu-xform-item label="主管机构" ctype="input" name="managerBrId" placeholder="主管机构"  disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" placeholder="登记日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId"  disabled ></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" placeholder="最后修改日期" name="updDate" disabled></yu-xform-item>
          <yu-xform-item label="操作类型"  ctype="select" data-code="STD_ZB_OPR_TYPE" placeholder="操作类型" name="oprType"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" name="updateTime" placeholder="修改时间" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-panel>
    </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="doSave"  v-show="onlyView">保存</yu-button>
      <yu-button type="primary" @click="doBack">返回</yu-button>
    </yu-form-buttons>

  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_OPR_TYPE,STD_ZB_HOUSE_TYPE,STD_XD_ZXD_STATUS,STD_ZB_MAR_ST');
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      isdisabled: false,
      onlyView: true,
      formDisable: false,
      infoShow: 'true',
      spouseHidden: false,
      spouseRules: [],
      updateUrl: this.$backend.cmisBiz + '/api/cuslstzxd/update',
      formdata: {},
      formType: 'edit'// ,
      // formRules: {
      //   appDate: [{validator: validator.isDate, message: '不是正确的日期', trigger: 'blur'}],
      //   idcardNo: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}],
      //   mobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}],
      //   spouseIdcardNo: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}],
      //   spouseMobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}]
      // },
      // imageUrls: {},
      // File: {}
    };
  },
  mounted () {
    var optype = this.pageParams.optype;
    if(optype === 'view'){
      this.onlyView = false;
      this.isdisabled = true;
      this.setBillCardItemEditable('*', false);
    }
    this.setBillCardValue(this.pageParams);
    this.$refs.refTable.remoteData({condition:{serno: this.pageParams.serno}});
  },
  methods: {
    doBack(){
      this.$dialog.close(this.dialogId);
    },

    doSave(){
      let resp = this.updateBillCardData();
      if (resp) {
        this.$dialog.close(this.dialogId);
      } else {
        this.$xutils.showMsgBox("提示", '保存失败', 350, 150, null);
        return;
      }
    },

  }

};
</script>
