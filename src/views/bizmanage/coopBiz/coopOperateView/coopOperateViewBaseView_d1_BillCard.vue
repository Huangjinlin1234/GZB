<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="基本信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo" disabled></yu-xform-item>
            <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" disabled></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="input" placeholder="证件类型" name="certType" disabled></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" disabled></yu-xform-item>
            <yu-xform-item label="合作方类型" ctype="select" name="partnerType" disabled hidden data-code="STD_PARTNER_TYPE" placeholder="合作方类型"></yu-xform-item>
            <yu-xform-item label="总合作额度（元）" ctype="input" placeholder="总合作额度（元）" name="totlCoopLmtAmt" hidden></yu-xform-item>
            <yu-xform-item label="合作起始日" ctype="input" placeholder="合作起始日" name="coopStartDate" hidden></yu-xform-item>
            <yu-xform-item label="统一社会信用代码" ctype="input" placeholder="统一社会信用代码" name="unifyCreditCode" disabled></yu-xform-item>
            <yu-xform-item label="企业性质" ctype="input" placeholder="企业性质" name="corpCha" disabled></yu-xform-item>
            <yu-xform-item label="成立日期" ctype="input" placeholder="成立日期" name="buildDate" disabled></yu-xform-item>
            <yu-xform-item label="注册资本" ctype="input" placeholder="注册资本" name="regiCapAmt" disabled></yu-xform-item>
            <yu-xform-item label="营业期限（月）" ctype="input" placeholder="营业期限（月）" name="bsinsTerm" disabled></yu-xform-item>
            <yu-xform-item label="经营范围" ctype="input" placeholder="经营范围" name="operRange" disabled></yu-xform-item>
            <yu-xform-item label="企业规模" ctype="input" placeholder="企业规模" name="corpScale" disabled></yu-xform-item>
            <yu-xform-item label="行业分类" ctype="input" placeholder="行业分类" name="tradeClass" disabled></yu-xform-item>
            <yu-xform-item label="法人代表" ctype="input" placeholder="法人代表" name="legal" disabled></yu-xform-item>
            <yu-xform-item label="办公地址" ctype="input" placeholder="办公地址" name="officeAddr" disabled></yu-xform-item>
            <yu-xform-item label="注册地址" ctype="input" placeholder="注册地址" name="regiAddr" disabled></yu-xform-item>
            <yu-xform-item label="合作到期日" ctype="input" placeholder="合作到期日" name="coopEndDate" hidden></yu-xform-item>
            <yu-xform-item label="保证金比例" ctype="input" placeholder="保证金比例" name="bailPerc" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_COOP_PLAN_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" name="apprStatus" hidden data-code="STD_ZB_APPR_STATUS" placeholder="审批状态"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="2">
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputIdName" disabled></yu-xform-item>
            <yu-xform-item label="经办日期" ctype="input" placeholder="经办日期" name="inputDate" disabled></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="合作方案编号" ctype="input" placeholder="合作方案编号" name="coopPlanNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled hidden></yu-xform-item>
            <yu-xform-item label="合作类型" ctype="input" placeholder="合作类型" name="coopType" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否全行适用" ctype="input" placeholder="是否全行适用" name="isWholeBankSuit" disabled hidden></yu-xform-item>
            <yu-xform-item label="一般担保额度（元）" ctype="input" placeholder="一般担保额度（元）" name="commonGrtLmtAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="合作期限(月)" ctype="input" placeholder="合作期限(月)" name="coopTerm" disabled hidden></yu-xform-item>
            <yu-xform-item label="单户合作限额（元）" ctype="input" placeholder="单户合作限额（元）" name="singleCoopQuota" disabled hidden></yu-xform-item>
            <yu-xform-item label="单笔业务合作限额（元）" ctype="input" placeholder="单笔业务合作限额（元）" name="sigBusiCoopQuota" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否白名单控制" ctype="input" placeholder="是否白名单控制" name="isWhiteListCtrl" disabled hidden></yu-xform-item>
            <yu-xform-item label="代偿宽限期(天)" ctype="input" placeholder="代偿宽限期(天)" name="subpayGraper" disabled hidden></yu-xform-item>
            <yu-xform-item label="代偿比例" ctype="input" placeholder="代偿比例" name="subpayPerc" disabled hidden></yu-xform-item>
            <yu-xform-item label="对外担保放大倍数" ctype="input" placeholder="对外担保放大倍数" name="outguarMultiple" disabled hidden></yu-xform-item>
            <yu-xform-item label="其他相关说明" ctype="input" placeholder="其他相关说明" name="otherCorreDesc" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金账户最低金额(元)" ctype="input" placeholder="保证金账户最低金额(元)" name="bailAccLowAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="单笔最低缴存金额(元)" ctype="input" placeholder="单笔最低缴存金额(元)" name="sigLowDepositAmt" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金透支上限(元)" ctype="input" placeholder="保证金透支上限(元)" name="bailOverdraftMax" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金缴存方式" ctype="input" placeholder="保证金缴存方式" name="bailDepositMode" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金账号" ctype="input" placeholder="保证金账号" name="bailAccNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="保证金账号子序号" ctype="input" placeholder="保证金账号子序号" name="bailAccNoSubSeq" disabled hidden></yu-xform-item>
            <yu-xform-item label="调查结论" ctype="input" placeholder="调查结论" name="indgtResult" disabled hidden></yu-xform-item>
            <yu-xform-item label="调查意见" ctype="input" placeholder="调查意见" name="indgtAdvice" disabled hidden></yu-xform-item>
            <yu-xform-item label="影像编号" ctype="input" placeholder="影像编号" name="imageNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否集团型客户" ctype="input" placeholder="是否集团型客户" name="isGrpCus" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否我行关联方" ctype="input" placeholder="是否我行关联方" name="isBankCorre" disabled hidden></yu-xform-item>
            <yu-xform-item label="是否我行风险预警客户" ctype="input" placeholder="是否我行风险预警客户" name="isBankRiskAltCus" disabled hidden></yu-xform-item>
            <yu-xform-item label="合作说明" ctype="input" placeholder="合作说明" name="coopDesc" disabled hidden></yu-xform-item>
            <yu-xform-item label="责任人" ctype="input" placeholder="责任人" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="主办机构" ctype="input" placeholder="主办机构" name="managerBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <!-- <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('back')">返回</yu-button>
    </yu-form-buttons> -->
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopplanaccinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/coopplanaccinfo/',
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