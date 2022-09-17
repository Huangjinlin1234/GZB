<template>
  <div id="d1_1_A_BillCard">
    <div id="d1_1_A_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="批复台账编号" ctype="input" placeholder="批复台账编号" name="grpAccNo" disabled></yu-xform-item>
          <yu-xform-item label="批复编号" ctype="input" placeholder="批复编号" name="lmtReplySerno" disabled></yu-xform-item>
          <yu-xform-item label="授信申请流水号" ctype="input" placeholder="授信申请流水号" name="lmtGrpAppSerno" hidden></yu-xform-item>
          <yu-xform-item label="批复生效日期" ctype="input" placeholder="批复生效日期" name="replyInureDate" disabled></yu-xform-item>
          <yu-xform-item label="业务类型" ctype="input" placeholder="业务类型" name="lmtType" hidden></yu-xform-item>
          <yu-xform-item label="集团客户编号" ctype="input" placeholder="集团客户编号" name="grpCusId" disabled></yu-xform-item>
          <yu-xform-item label="集团客户名称" ctype="input" placeholder="集团客户名称" name="grpCusName" disabled></yu-xform-item>
          <yu-xform-item label="审批模式" ctype="select" placeholder="审批模式" name="apprMode" data-code="STD_APPR_MODE" disabled></yu-xform-item>
          <yu-xform-item label="终审机构" ctype="input" placeholder="终审机构" name="finalApprBrType" disabled data-code="STD_FINAL_APPR_BR_TYPE"></yu-xform-item>
          <yu-xform-item label="审批结论" ctype="select" placeholder="审批结论" name="apprResult" data-code="STD_ZB_APPR_STATUS" disabled></yu-xform-item>
          <yu-xform-item label="批复状态" ctype="select" placeholder="批复状态" name="lmtReplyStatus" data-code="STD_XD_REPLY_STATUS" disabled></yu-xform-item>
          <yu-xform-item label="用信审核方式" ctype="input" placeholder="用信审核方式" name="useLimitAuditMode" hidden></yu-xform-item>
          <yu-xform-item label="币种" ctype="input" placeholder="币种" name="curType" hidden></yu-xform-item>
          <yu-xform-item label="授信期限" ctype="input" placeholder="授信期限" name="lmtTerm" hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" disabled hidden></yu-xform-item>
          <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerIdName" disabled></yu-xform-item>
          <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrIdName" disabled></yu-xform-item>
          <yu-xform-item label="贷后管理要求" ctype="textarea" placeholder="贷后管理要求" name="pspManaNeed" disabled></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D11ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/lmtgrpreplyacc/update',
      addUrl: this.$backend.cmisBiz + '/api/lmtgrpreplyacc/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>