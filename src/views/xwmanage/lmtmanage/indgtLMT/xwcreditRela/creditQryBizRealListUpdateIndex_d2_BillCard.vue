<template>
<!--小微征信报告模板-->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="150px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="征信查询类别" ctype="select" rules="required" name="qryCls" :options="dicOptions.qryClsOptions" placeholder="征信查询类别"></yu-xform-item>
          <yu-xform-item label="征信查询原因" rules="required" ctype="select" name="qryResn" :options="dicOptions.qryResnOptions" placeholder="征信查询原因"></yu-xform-item>
          <yu-xform-item label="征信查询对象号" rules="required" ctype="YuXcusBase" name="cusId" placeholder="征信查询对象号" @select-fn="commonSelectFn" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="880" height="680" :requestUrl="requestUrl" :parms="{'condition':{cusCatalog:'2'}}" ></yu-xform-item>
          <yu-xform-item label="征信查询对象名称" ctype="input" rules="required" placeholder="征信查询对象名称" name="cusName"></yu-xform-item>
          <yu-xform-item label="查询对象证件类型" ctype="select" rules="required" name="certType" :options="dicOptions.certTypeOptions" placeholder="查询对象证件类型"></yu-xform-item>
          <yu-xform-item label="查询对象证件号码" ctype="input" rules="required" placeholder="查询对象证件号码" name="certCode"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onContinue')" v-norepeat.loading>保存</yu-button>
      <yu-button type="primary" @click="customClick('onBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/update',
      addUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/query',
      formdata: {},
      formType: 'edit',
      dicOptions: {qryClsOptions: [{key: '3', value: '苏州地方'}], qryResnOptions: [{key: '1', value: '贷前'}, {key: '2', value: '贷中'}, {key: '3', value: '贷后'}, {key: '4', value: '关联查询'}], borrowRelOptions: [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '008', value: '法定代表，出资人及关联人等'}, {key: '009', value: '其他关系人'}], certTypeOptions: [{key: '01', value: '机关和事业单位登记号'}, {key: '02', value: '社会团体登记号'}, {key: '03', value: '民办非企业登记号'}, {key: '04', value: '基金会登记号'}, {key: '05', value: '宗教证书登记号'}, {key: '06', value: '工商注册号'}, {key: 'P2', value: '中征码'}, {key: 'R', value: '统一社会信用代码'}, {key: 'Q', value: '组织机构代码'}, {key: '07', value: '纳税人识别号（国税）'}, {key: '08', value: '纳税人识别号（地税）'}, {key: 'M', value: '营业执照'}], authbookContentOptions: [{key: '001', value: '审核本单位信贷业务申请'}, {key: '002', value: '审批本单位信贷业务'}, {key: '003', value: '审核本单位作为担保人'}, {key: '004', value: '对授权人已发放的信贷业务进行贷后风险管理'}, {key: '005', value: '涉及本单位的关联人的信贷业务或担保业务，需要查询本单位信用状况'}, {key: '006', value: '处理本单位的征信异议'}, {key: '007', value: '其他支行认为需要查询本单位的信用状况'}, {key: '008', value: '受理企业信用等级评定'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}], qryStatusOptions: [{key: '001', value: '查询中'}, {key: '002', value: '查询失败'}, {key: '003', value: '已查询'}], qryFlagOptions: [{key: '01', value: '人工'}, {key: '02', value: '业务发起'}] },
      formRules: {
        certCode: [{validator: validator.numberAndLetter, message: '不是正确的证件号'}]
      },
      imageUrls: {},
      File: {},
      requestUrl: this.$backend.cmisCus + '/api/cusbase/querybymodel'
    };
  },
  computed: {
    changeData () {
      const { borrowRel, cusId, cusName, certType, certCode, qryCls } = this.formdata;
      return {
        borrowRel, cusId, cusName, certType, certCode, qryCls
      };
    }
  },
  watch: {
    changeData (val) {
      if (val.cusId) {
        this.setItemEditable('cusName', false);
        this.setItemEditable('certType', false);
        this.setItemEditable('certCode', false);
      } else {
        this.setItemEditable('cusName', true);
        this.setItemEditable('certType', true);
        this.setItemEditable('certCode', true);
      }
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.qryCls = this.$xutils.getDefaultformulaData('3');
    }
  }
};
</script>