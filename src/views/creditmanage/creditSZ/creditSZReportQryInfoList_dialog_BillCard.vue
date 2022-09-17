<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="130px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="征信查询流水号" ctype="input" placeholder="征信查询流水号" name="crqlSerno"></yu-xform-item>
          <yu-xform-item label="征信查询类别" ctype="select" name="qryCls" disabled hidden :options="dicOptions.qryClsOptions" placeholder="征信查询类别"></yu-xform-item>
          <yu-xform-item label="征信查询原因" ctype="select" name="qryResn" :options="dicOptions.qryResnOptions" placeholder="征信查询原因"></yu-xform-item>
          <yu-xform-item label="查询原因描述" ctype="input" placeholder="查询原因描述" name="qryResnDec" hidden></yu-xform-item>
          <yu-xform-item label="主借款客户号" ctype="yu-xcustom" name="borrowerCusId" hidden placeholder="主借款客户号" @select-fn="commonSelectFn" :mapping="{'cusId':'borrowerCusId','cusName':'borrowerCusName','certCode':'borrowerCusName'}" width="480" height="480" ></yu-xform-item>
          <yu-xform-item label="主借款人名称" ctype="input" placeholder="主借款人名称" name="borrowerCusName" hidden></yu-xform-item>
          <yu-xform-item label="主借款人证件号码" ctype="input" placeholder="主借款人证件号码" name="borrowerCertCode" hidden></yu-xform-item>
          <yu-xform-item label="与主借款人关系" ctype="select" name="borrowRel" hidden :options="dicOptions.borrowRelOptions" placeholder="与主借款人关系"></yu-xform-item>
          <yu-xform-item label="征信查询对象号" ctype="yu-xcustom" name="cusId" placeholder="征信查询对象号" @select-fn="commonSelectFn" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="880" height="680" ></yu-xform-item>
          <yu-xform-item label="征信查询对象名称" ctype="input" placeholder="征信查询对象名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="查询对象证件类型" ctype="select" name="certType" :options="dicOptions.certTypeOptions" placeholder="查询对象证件类型"></yu-xform-item>
          <yu-xform-item label="查询对象证件号码" ctype="input" placeholder="查询对象证件号码" name="certCode"></yu-xform-item>
          <yu-xform-item label="授权书编号" ctype="input" placeholder="授权书编号" name="authbookNo" hidden></yu-xform-item>
          <yu-xform-item label="授权书日期" ctype="datepicker" name="authbookDate" value-format="yyyy-MM-dd" hidden placeholder="授权书日期"></yu-xform-item>
          <yu-xform-item label="授权书内容" ctype="checkbox" value-type="string" separator=";" name="authbookContent" hidden :options="dicOptions.authbookContentOptions" placeholder="授权书内容"></yu-xform-item>
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
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/update',
      addUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/',
      formdata: {},
      formType: 'edit',
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}, {key: '3', value: '苏州地方'}], qryResnOptions: [{key: '1', value: '贷前'}, {key: '2', value: '贷中'}, {key: '3', value: '贷后'}, {key: '4', value: '关联查询'}], borrowRelOptions: [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '008', value: '法定代表，出资人及关联人等'}, {key: '009', value: '其他关系人'}], certTypeOptions: [{key: '01', value: '工商注册号'}, {key: '02', value: '机关和事业单位登记号'}, {key: '03', value: '社会团体登记号'}, {key: '04', value: '民办非企业登记号'}, {key: '05', value: '基金会登记号'}, {key: '06', value: '宗教证书登记号'}, {key: '10', value: '中征码'}, {key: '20', value: '统一社会信用代码'}, {key: '30', value: '组织机构代码'}, {key: '41', value: '纳税人识别号（国税）'}, {key: '42', value: '纳税人识别号（地税）'}, {key: 'M', value: '营业执照'}], authbookContentOptions: [{key: '001', value: '审核本单位信贷业务申请'}, {key: '002', value: '审批本单位信贷业务'}, {key: '003', value: '审核本单位作为担保人'}, {key: '004', value: '对授权人已发放的信贷业务进行贷后风险管理'}, {key: '005', value: '涉及本单位的关联人的信贷业务或担保业务，需要查询本单位信用状况'}, {key: '006', value: '处理本单位的征信异议'}, {key: '007', value: '其他支行认为需要查询本单位的信用状况'}, {key: '008', value: '受理企业信用等级评定'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}], qryStatusOptions: [{key: '001', value: '查询中'}, {key: '002', value: '查询失败'}, {key: '003', value: '已查询'}], qryFlagOptions: [{key: '01', value: '人工'}, {key: '02', value: '业务发起'}] },
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.qryCls = this.$xutils.getDefaultformulaData('3');
    }
  }
};
</script>
