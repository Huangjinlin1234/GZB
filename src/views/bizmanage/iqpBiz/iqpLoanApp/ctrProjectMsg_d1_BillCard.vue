<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent" :disabled="formDisabledFlg">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="合同申请业务号" ctype="input" placeholder="合同申请业务号" name="serno" hidden :value="sernoValue"></yu-xform-item>
          <yu-xform-item label="合同编号" ctype="input" placeholder="合同编号" name="contNo" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="项目类型" ctype="select" data-code="STD_PRO_TYPE" placeholder="项目类型" name="proType" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="项目名称" ctype="input" placeholder="项目名称" name="proName" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="项目投资" ctype="yu-num" number-formatter="0,000.00" placeholder="项目投资" name="proInvest" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="项目金额" ctype="yu-num" number-formatter="0,000.00" placeholder="项目金额" name="proAmt" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="立项批文" ctype="input" placeholder="立项批文" name="proAppr"></yu-xform-item>
          <yu-xform-item label="批文文号" ctype="input" placeholder="批文文号" name="apprNo"></yu-xform-item>
          <yu-xform-item label="规划许可证编号" ctype="input" placeholder="规划许可证编号" name="planLicNo"></yu-xform-item>
          <yu-xform-item label="建设用地许可证编号" ctype="input" placeholder="建设用地许可证编号" name="buildLicNo"></yu-xform-item>
          <yu-xform-item label="环评许可证编号" ctype="input" placeholder="环评许可证编号" name="eiaLicNo"></yu-xform-item>
          <yu-xform-item label="施工许可证编号" ctype="input" placeholder="施工许可证编号" name="consLicNo"></yu-xform-item>
          <yu-xform-item label="其他许可证" ctype="input" placeholder="其他许可证" name="otherLic"></yu-xform-item>
          <yu-xform-item label="其他许可证编号" ctype="input" placeholder="其他许可证编号" name="otherLicNo"></yu-xform-item>
          <yu-xform-item label="开工日期" ctype="datepicker" placeholder="开工日期" name="startWorkDate"></yu-xform-item>
          <yu-xform-item label="操作类型   std_zb_op" ctype="input" placeholder="操作类型   std_zb_op" name="oprType" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden :colspan="12"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/iqploanapppro/addOrUpdateIqpLoanAppProDataBySerno',
      addUrl: this.$backend.cmisBiz + '/api/iqploanapppro/addOrUpdateIqpLoanAppProDataBySerno',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      sernoValue: this.getFactory().contextData.serno,
      formDisabledFlg: false
    };
  },
  mounted () {
    this.AfterInit();
  },
  methods: {
    AfterInit () {
      let op = this.getFactory().contextData.op;
      if (op === 'VIEW') {
        this.formDisabledFlg = true;
      }
    }
  }
};
</script>