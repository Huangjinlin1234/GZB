<template>
  <div>
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="任务编号" ctype="input" placeholder="业务流水号" name="taskNo" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户名称" name="cusId" rules="required" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewCusDataByCusId">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="借据号" ctype="input" placeholder="借据号" name="billNo" rules="required" disabled :colspan="10">
            <yu-input v-model="customTitle"></yu-input>
          </yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="get" colspan="2">
            <yu-button type="primary" @click="viewLoan">查看</yu-button>
          </yu-xform-item>
          <yu-xform-item label="合同号" ctype="input" placeholder="合同号" name="contNo" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="企业联系电话" ctype="input" placeholder="企业联系电话" name="phoneNo" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="企业联系地址" ctype="input" placeholder="企业联系地址" name="address" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="任务生成日期" ctype="input" placeholder="任务生成日期" name="taskStartDt" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="任务要求完成日期" ctype="input" placeholder="任务要求完成日期" name="taskEndDt" rules="required" disabled ></yu-xform-item>
          <yu-xform-item label="贷款金额（元）" ctype="input" placeholder="贷款金额（元）" name="loanAmt"  disabled ></yu-xform-item>
          <yu-xform-item label="接收人" ctype="yu-xusero" rules="required" placeholder="接收人" name="execId" @select-fn="commonSelectFn" :mapping="{'loginCode':'execId','orgId':'execBrId'}"  :parms="params"  width="680" height="480" :hidden="formType==='details'"></yu-xform-item>
          <yu-xform-item label="任务下发日期" ctype="datepicker" name="issueDate" value-format="yyyy-MM-dd" hidden placeholder="任务下发日期"></yu-xform-item>
          <yu-xform-item label="申请状态" ctype="select" name="approveStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="申请状态"></yu-xform-item>
          <yu-xform-item label="检查状态" ctype="select" name="checkStatus"  data-code="STD_ZB_CHECK_STATUS" placeholder="检查状态" :hidden="formType!='details'"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="saveData">提交</yu-button>
      <yu-button type="primary" @click="cancel">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_ZB_TASK_TYPE,STD_ZB_CHECK_TYPE,STD_ZB_CHECK_STATUS,STD_ZB_APPR_STATUS');
export default {
  mixins: [mixinForm],
  props: {
    pageParams: Object,
    dialogId: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisPsp + "/api/pspwydtasklist/update",
      formdata: {},
      formType: this.pageParams.op,
      params: {roleCode:this.pageParams.roleCode, orgId:this.pageParams.orgCode}
    };
  },
  mounted() {   
    this.AfterInit(); 
  },
  methods: {
    AfterInit () {
      let _this = this;
      yufp.clone(_this.pageParams, _this.formdata);
      if(this.formType == 'UPDATE'){
        _this.formdata.issueId = _this.$xutils.getDefaultformulaData('$LoginLoginCode');
        _this.formdata.issueBrId = _this.$xutils.getDefaultformulaData('$LoginOrgCode');
        _this.formdata.issueDate = _this.$xutils.getDefaultformulaData('$CURRTIME'); 
        _this.formdata.execId = "";
        _this.formdata.execBrId = "";
      }
    },
   
    cancel () {
      this.$dialog.close(this.dialogId);
    },
    // 对公客户查看
    viewCusDataByCusId () {
      if(this.$route.meta.params){
      this.$route.meta.params.cusId = this.formdata.cusId;
      }
      if (this.formdata.cusId == null || this.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.formdata.cusId;
      json['modelGroupNo'] = 'CMG000296';
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      this.$dialog.open(
        '',
        'zrcbank/cus/cuscom/cusCorpMaintain/formalCusMaintainA05',
        -1,
        -1,
        json
      );
    },
     // 借据查看
     viewLoan() {
      if(this.$route.meta.params){
      this.$route.meta.params.cusId = this.formdata.cusId;
      }
      if (this.formdata.cusId == null || this.formdata.cusId == '') {
        this.$xutils.showMsgBox('提示', '客户号为空!');
        return;
      }
      let json = {};
      json['cusId'] = this.formdata.cusId;
      json['viewType'] = 'VIEW';
      json['opType'] = 'view';
      this.$dialog.open(
        '',
        'zrcbank/psp/pspCheck/wyd/pspWydAccLoanList',
        -1,
        -1,
        json
      );
    },
    saveData(){
      if(this.pageParams.roleCode == 'R0050'){//接收人为客户经理时，状态设置成审批通过
      this.formdata.approveStatus = '997';
      this.formdata.checkStatus = '1';
      }else if(this.pageParams.roleCode == 'R1046'){
      var endTimeStem = (new Date(this.formdata.taskEndDt))
      var newendTimeStem = endTimeStem.setDate(endTimeStem.getDate() + 15) ;//一级分配角色分配完成后，贷后要求完成时间重新以分配时间推后十五天计算
      var endDate = new Date(newendTimeStem);
      var year = endDate.getFullYear();
      var month = endDate.getMonth() + 1 < 10 ? '0' + (endDate.getMonth() + 1) : endDate.getMonth() + 1;
      var date = endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate();
      var taskEndDt = year + '-' + month + '-' + date;
      this.formdata.taskEndDt = taskEndDt;
      this.formdata.approveStatus = '111'; 
      }
      this.updateBillCardData();
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>