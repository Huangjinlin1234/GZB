<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="查询对象信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="与主借款人关系" ctype="select" name="borrowRel" :options="dicOptions.borrowRelOptions" placeholder="与主借款人关系"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="征信查询类别">
          <yu-xform-group :column="3">
            <yu-xform-item label="征信查询流水号" ctype="input" placeholder="征信查询流水号" name="crqlSerno"></yu-xform-item>
            <yu-xform-item label="征信查询类别" ctype="select" name="qryCls" disabled :options="dicOptions.qryClsOptions" placeholder="征信查询类别"></yu-xform-item>
            <yu-xform-item label="征信查询原因" ctype="select" name="qryResn" :options="dicOptions.qryResnOptions" placeholder="征信查询原因"></yu-xform-item>
            <yu-xform-item label="查询原因描述" ctype="input" placeholder="查询原因描述" name="qryResnDec"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="主借款人信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="主借款客户号" ctype="yu-xcredit-query" name="borrowerCusId" placeholder="主借款客户号" @select-fn="commonSelectFn" :mapping="{'cusId':'borrowerCusId','cusName':'borrowerCusName','certCode':'borrowerCertCode'}" width="880" height="680" ></yu-xform-item>
            <yu-xform-item label="主借款人名称" ctype="input" placeholder="主借款人名称" name="borrowerCusName"></yu-xform-item>
            <yu-xform-item label="主借款人证件号码" ctype="input" placeholder="主借款人证件号码" name="borrowerCertCode"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="查询对象信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="征信查询对象号" ctype="yu-xcredit-query" name="cusId" placeholder="征信查询对象号" @select-fn="commonSelectFn" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="880" height="680" ></yu-xform-item>
            <yu-xform-item label="征信查询对象名称" ctype="input" placeholder="征信查询对象名称" name="cusName"></yu-xform-item>
            <yu-xform-item label="查询对象证件类型" ctype="select" name="certType" data-code="STD_ZB_CERT_TYP" placeholder="查询对象证件类型"></yu-xform-item>
            <yu-xform-item label="查询对象证件号码" ctype="input" placeholder="查询对象证件号码" name="certCode"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="授权信息">
          <yu-xform-group :column="3">
            <yu-xform-item label="授权书编号" ctype="input" placeholder="授权书编号" name="authbookNo"></yu-xform-item>
            <yu-xform-item label="授权书日期" ctype="datepicker" name="authbookDate" value-format="yyyy-MM-dd" placeholder="授权书日期"></yu-xform-item>
            <yu-xform-item label="授权书内容" ctype="checkbox" name="authbookContent" :options="dicOptions.authbookContentOptions" placeholder="授权书内容"></yu-xform-item>
            <yu-xform-item label="其他授权书内容" ctype="input" placeholder="其他授权书内容" name="otherAuthbookExt" hidden></yu-xform-item>
            <yu-xform-item label="主管客户经理" ctype="input" placeholder="主管客户经理" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="成功发起时间" ctype="input" placeholder="成功发起时间" name="sendTime" hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="select" name="approveStatus" hidden :options="dicOptions.approveStatusOptions" placeholder="审批状态"></yu-xform-item>
            <yu-xform-item label="是否成功发起" ctype="select" name="isSuccssInit" hidden data-code="STD_ZB_YES_NO" placeholder="是否成功发起"></yu-xform-item>
            <yu-xform-item label="征信报告编号" ctype="input" placeholder="征信报告编号" name="reportNo" hidden></yu-xform-item>
            <yu-xform-item label="征信查询状态" ctype="select" name="qryStatus" hidden :options="dicOptions.qryStatusOptions" placeholder="征信查询状态"></yu-xform-item>
            <yu-xform-item label="征信返回地址" ctype="input" placeholder="征信返回地址" name="creditUrl" hidden></yu-xform-item>
            <yu-xform-item label="报告生成时间" ctype="datepicker" name="reportCreateTime" value-format="yyyy-MM-dd" hidden placeholder="报告生成时间"></yu-xform-item>
            <yu-xform-item label="征信查询标识" ctype="select" name="qryFlag" hidden :options="dicOptions.qryFlagOptions" placeholder="征信查询标识"></yu-xform-item>
            <yu-xform-item label="影像编号" ctype="input" placeholder="影像编号" name="imageNo" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="datepicker" name="createTime" value-format="yyyy-MM-dd" hidden placeholder="创建时间"></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="datepicker" name="updateTime" value-format="yyyy-MM-dd" hidden placeholder="修改时间"></yu-xform-item>
            <yu-xform-item label="操作" ctype="input" placeholder="操作" name="operate" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "dialog_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + "/api/creditreportqrylst/update",
      addUrl: this.$backend.cmisBiz + "/api/creditreportqrylst/",
      formdata : {},
      formType : 'edit',
      dicOptions: {borrowRelOptions:[{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '008', value: '法定代表，出资人及关联人等'}, {key: '009', value: '其他关系人'}], qryClsOptions:[{key: '0', value: '个人'}, {key: '1', value: '企业'}, {key: '3', value: '苏州地方'}], qryResnOptions:[{key: '02', value: '贷款审批'}, {key: '08', value: '担保资格审查'}, {key: '22', value: '法人代表，出资人及关联人等资信查询'}, {key: '25', value: '资信审查'}, {key: '27', value: '贷后管理'}], authbookContentOptions:[{key: '001', value: '审核本人贷款申请'}, {key: '002', value: '审批本人贷记卡'}, {key: '003', value: '审核本人作为担保人'}, {key: '004', value: '对已发放的信贷业务进行贷后风险管理'}, {key: '005', value: '受理法人或其他组织的贷款申请或其作为担保人，需要查询本人作为法定代表人、出资人及关联人信用情况'}, {key: '006', value: '对公业务贷后管理需要查询本人作为法定代表人、出资人及关联人信用状况'}, {key: '007', value: '特约商户实名审查'}, {key: '008', value: '处理本人的征信异议'}, {key: '009', value: '其他支行认为需要查询本人的信用状况'}, {key: '010', value: '资信审查'}], approveStatusOptions:[{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}], qryStatusOptions:[{key: '001', value: '查询中'}, {key: '002', value: '查询失败'}, {key: '003', value: '已查询'}], qryFlagOptions:[{key: '01', value: '人工'}, {key: '02', value: '业务发起'}] },
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
    execBillCardDefaultValueFormula:function() {
      this.formdata.qryCls = this.$xutils.getDefaultformulaData("0")
    }
  }
}
</script>