<template>
  <div id="d1_1_BillCard">
    <div id="d1_1_BillCardContent">
      <yu-xform ref="refForm" label-width="150px" :form-type="formType" v-model="formdata" hidden-del-val="true" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="征信查询类别" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="征信查询流水号" ctype="input" placeholder="征信查询流水号" name="crqlSerno"></yu-xform-item>
            <yu-xform-item label="征信查询类别" ctype="select" name="qryCls" disabled :options="dicOptions.qryClsOptions" placeholder="征信查询类别"></yu-xform-item>
            <yu-xform-item label="征信查询原因" rules="required" ctype="select" name="qryResn" :options="dicOptions.qryResnOptions" placeholder="征信查询原因"></yu-xform-item>
            <yu-xform-item label="查询原因描述" ctype="input" placeholder="查询原因描述" name="qryResnDec" rules="required"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="主借款人信息" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="主借款客户号"  rules="required" ctype="YuXcusBase" name="borrowerCusId" placeholder="主借款客户号" @select-fn="commonSelectFn" :mapping="{'cusId':'borrowerCusId','cusName':'borrowerCusName','certCode':'borrowerCertCode','certType':'borrowerCertType'}" width="880" height="680" :requestUrl="requestUrl" :parms="{'condition':{managerId: managerId}}"></yu-xform-item>
            <yu-xform-item label="主借款人名称" rules="required" ctype="input" placeholder="主借款人名称" name="borrowerCusName" disabled></yu-xform-item>
            <yu-xform-item label="主借款人证件号码" rules="required" ctype="input" placeholder="主借款人证件号码" name="borrowerCertCode" disabled></yu-xform-item>
            <yu-xform-item label="主借款人证件类型" rules="required" ctype="select" placeholder="主借款人证件类型" name="borrowerCertType" data-code="STD_ZB_CERT_TYP" disabled></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="查询对象信息" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="与主借款人关系" rules="required" ctype="select" name="borrowRel" :options="dicOptions.borrowRelOptions" placeholder="与主借款人关系"></yu-xform-item>
            <yu-xform-item label="征信查询对象号"  rules="required" ctype="YuXcusBase" name="cusId" placeholder="征信查询对象号" @select-fn="commonSelectFn" v-show="isChoose" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="880" height="680" :requestUrl="requestUrl" :parms="{'condition':{cusCatalog:'2'}}" ></yu-xform-item>
            <yu-xform-item label="征信查询对象号"  rules="required" ctype="YuXcusBase" name="cusId" placeholder="征信查询对象号" @select-fn="commonSelectFn" v-show="!isChoose" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="880" height="680" :requestUrl="requestUrl" :parms="{'condition':{cusCatalog:'2', managerId: managerId}}" ></yu-xform-item>
            <yu-xform-item label="征信查询对象名称" rules="required" ctype="input" placeholder="征信查询对象名称" name="cusName" disabled></yu-xform-item>
            <yu-xform-item label="查询对象证件类型" rules="required" ctype="select" name="certType" :options="dicOptions.certTypeOptions" placeholder="查询对象证件类型"></yu-xform-item>
            <yu-xform-item label="查询对象证件号码" rules="required" ctype="input" placeholder="查询对象证件号码" name="certCode"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="授权信息" :collapseHide="false">
          <yu-xform-group :column="2">
            <yu-xform-item label="授权书编号" ctype="yu-xauthbook" placeholder="授权书编号" name="authbookNo" @select-fn="commonSelectFn" :hidden="!isRequired" :mapping="{'authbookNo':'authbookNo','cusName':'cusName', 'certType':'certType', 'certCode':'certCode', 'authbookContent':'authbookContent', 'authbookDate':'authbookDate', 'imageNo':'imageNo'}" width="880" height="680" :parms="params"></yu-xform-item>
            <yu-xform-item label="授权书编号" ctype="yu-xauthbook" placeholder="授权书编号" name="authbookNo" @select-fn="commonSelectFn" :hidden="isRequired" rules="required" :mapping="{'authbookNo':'authbookNo','cusName':'cusName', 'certType':'certType', 'certCode':'certCode', 'authbookContent':'authbookContent', 'authbookDate':'authbookDate', 'imageNo':'imageNo'}" width="880" height="680" :parms="params"></yu-xform-item>
            <yu-xform-item label="授权书日期" :rules="authbookDateRules" ctype="datepicker" name="authbookDate" value-format="yyyy-MM-dd" placeholder="授权书日期"></yu-xform-item>
            <yu-xform-item label="授权书内容" :colspan="13" ref="auth" rules="required" ctype="checkbox" value-type="string" separator=";" name="authbookContent" :options="dicOptions.authbookContentOptions" placeholder="授权书内容"></yu-xform-item>
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
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')" v-norepeat.loading>保存</yu-button>
      <yu-button type="primary" @click="customClick('onCommit')" v-norepeat.loading>提交</yu-button>
      <yu-button type="primary" @click="customClick('onBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator, isOrgCode } from '@/utils/validate';
yufp.lookup.reg('STD_ZB_CERT_TYP');
export default{
  name: 'D11BillCard',
  mixins: [mixinForm],
  data: function () {
    const authDate = function (rules, value, callback) {
      if (!value) {
        callback();
      }
      let valueDate = Date.parse(value, 'yyyy-MM-dd');
      let openday = yufp.session.openday.substr(0, 4) + '-' + yufp.session.openday.substr(4, 2) + '-' + yufp.session.openday.substr(6, 2);
      let opendayValue = Date.parse(openday, 'yyyy-MM-dd');
      if (valueDate > opendayValue) {
        callback(new Error('征信授权书日期不得超过当天日期'));
      }
      callback();
    };
    return {
      updateUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/update',
      addUrl: this.$backend.cmisBiz + '/api/creditreportqrylst/create',
      formdata: {},
      formType: 'edit',
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}, {key: '3', value: '苏州地方'}], qryResnOptions: [{key: '17', value: '额度审批'}, {key: '01', value: '贷前审查'}, {key: '27', value: '贷后管理'}, {key: '04', value: '其他原因'}, {key: '05', value: '关联查询'}, {key: '18', value: '担保审查'}], borrowRelOptions: [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '003', value: '关联人'}], certTypeOptions: [{key: '01', value: '机关和事业单位登记号'}, {key: '02', value: '社会团体登记号'}, {key: '03', value: '民办非企业登记号'}, {key: '04', value: '基金会登记号'}, {key: '05', value: '宗教证书登记号'}, {key: '06', value: '工商注册号'}, {key: 'P2', value: '中征码'}, {key: 'R', value: '统一社会信用代码'}, {key: 'Q', value: '组织机构代码'}, {key: '07', value: '纳税人识别号（国税）'}, {key: '08', value: '纳税人识别号（地税）'}, {key: 'M', value: '营业执照'}], authbookContentOptions: [{key: '008', value: '审核本单位信贷业务申请'}, {key: '009', value: '审核本单位作为担保人'}, {key: '010', value: '审核本单位作为关联人'}, {key: '011', value: '受理企业信用等级评定'}, {key: '007', value: '对已发放的信贷业务进行贷后风险管理'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}], qryStatusOptions: [{key: '001', value: '查询中'}, {key: '002', value: '查询失败'}, {key: '003', value: '已查询'}], qryFlagOptions: [{key: '01', value: '人工'}, {key: '02', value: '业务发起'}] },
      formRules: {
        borrowerCertCode: [{validator: validator.numberAndLetter, message: '不是正确的证件号'}],
        certCode: [{required: true, message: '字段不能为空'}, {validator: validator.numberAndLetter, message: '不是正确的证件号'}]
      },
      imageUrls: {},
      File: {},
      isRequired: true,
      authbookDateRules: [{required: true, type: 'date', message: '字段不能为空'}, {validator: authDate, trigger: 'blur', type: 'date'}],
      params: {},
      requestUrl: this.$backend.cmisCus + '/api/cusbase/querybymodel',
      managerId: this.$store.state.oauth.loginCode,
      isChoose: true
    };
  },
  mounted () {
    this.$refs.auth.$el.children[1].children[0].children[0].style.display = 'grid';
  },
  computed: {
    changeData () {
      const { borrowRel, borrowerCusId, borrowerCusName, borrowerCertCode, borrowerCertType, cusId, cusName, certType, certCode } = this.formdata;
      return {
        borrowRel, borrowerCusId, borrowerCusName, borrowerCertCode, borrowerCertType, cusId, cusName, certType, certCode
      };
    },
    changeAuthbookNo () {
      const { qryResn, certCode } = this.formdata;
      return {
        qryResn, certCode
      };
    }
  },
  watch: {
    changeData (val) {
      if (val.borrowRel == '001') {
        if (val.borrowerCusName && val.borrowerCertCode) {
          this.formdata.cusId = val.borrowerCusId;
          this.formdata.cusName = val.borrowerCusName;
          this.formdata.certType = this.formdata.certType ? this.formdata.certType : val.borrowerCertType;
          this.formdata.certCode = this.formdata.certCode ? this.formdata.certCode : val.borrowerCertCode;
        }
        this.isChoose = false;
      } else {
        this.isChoose = true;
      }

      if (val.borrowerCusId) {
        this.setItemEditable('borrowerCusName', false);
      } else {
        this.setItemEditable('borrowerCusName', true);
      }

      if (val.cusId) {
        this.setItemEditable('cusName', false);
      } else {
        this.setItemEditable('cusName', true);
      }

      if (val.certType == 'Q' || val.certType == 'R') {
        if (!isOrgCode(val.certCode, val.certType)) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
        }
      }

      if (val.borrowerCertType == 'Q' || val.borrowerCertType == 'R') {
        if (!isOrgCode(val.borrowerCertCode, val.borrowerCertType)) {
          this.$message({ message: '请输入正确的证件号码', type: 'warning' });
        }
      }
    },
    changeAuthbookNo (val) {
      if (val.qryResn == '27') {
        this.params = {condition: {certCode: val.certCode, mangerId: this.$xutils.getLoginUserInfo().userCode}};
      }
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.qryCls = this.$xutils.getDefaultformulaData('1');
    }
  }
};
</script>
