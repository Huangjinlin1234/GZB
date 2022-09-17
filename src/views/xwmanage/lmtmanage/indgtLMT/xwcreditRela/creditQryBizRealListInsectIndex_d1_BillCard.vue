<template>
<!--小微征信报告模板-->
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="150px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="征信查询类别" ctype="select" name="qryCls" rules="required" :options="dicOptions.qryClsOptions" placeholder="征信查询类别" @change="ChangeQryCls"></yu-xform-item>
          <yu-xform-item label="与主借款人关系" ctype="select" name="borrowRel" rules="required" :options="dicOptions.borrowRelOptions" placeholder="与主借款人关系" @change="ChangeBorrowRel"></yu-xform-item>
          <yu-xform-item label="征信查询对象号" ctype="YuXcusBase" name="cusId" rules="required" placeholder="征信查询对象号" @select-fn="commonSelectFn" v-show="isChoose == 'qrmi'" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="880" height="680" :requestUrl="requestUrl" :parms="{'condition':{cusCatalog:'1', managerId: managerId}}" ></yu-xform-item>
          <yu-xform-item label="征信查询对象号" ctype="YuXcusBase" name="cusId" rules="required" placeholder="征信查询对象号" @select-fn="commonSelectFn" v-show="isChoose == 'qr'" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="880" height="680" :requestUrl="requestUrl" :parms="{'condition':{cusCatalog:'1'}}" ></yu-xform-item>
          <yu-xform-item label="征信查询对象号" ctype="YuXcusBase" name="cusId" rules="required" placeholder="征信查询对象号" @select-fn="commonSelectFn" v-show="isChoose == 'qymi'" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="880" height="680" :requestUrl="requestUrl" :parms="{'condition':{cusCatalog:'2', managerId: managerId}}" ></yu-xform-item>
          <yu-xform-item label="征信查询对象号" ctype="YuXcusBase" name="cusId" rules="required" placeholder="征信查询对象号" @select-fn="commonSelectFn" v-show="isChoose == 'qy'" :mapping="{'certType':'certType','cusId':'cusId','cusName':'cusName','certCode':'certCode'}" width="880" height="680" :requestUrl="requestUrl" :parms="{'condition':{cusCatalog:'2'}}" ></yu-xform-item>
          <yu-xform-item label="征信查询对象名称" ctype="input" placeholder="征信查询对象名称" name="cusName" rules="required"></yu-xform-item>
          <yu-xform-item label="查询对象证件类型" ctype="select" name="certType" :options="dicOptions.certTypeOptions" placeholder="查询对象证件类型" rules="required" @change="ChangeCertType"></yu-xform-item>
          <yu-xform-item label="查询对象证件号码" ctype="input" placeholder="查询对象证件号码" name="certCode" rules="required"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')" v-norepeat.loading>保存</yu-button>
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
  props: {
    paramsBillCard: Object
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/creditqrybizreal/update',
      addUrl: this.$backend.cmisBiz + '/api/creditqrybizreal/createBySerno',
      formdata: {},
      formType: 'edit',
      dicOptions: {qryClsOptions: [{key: '0', value: '个人'}, {key: '1', value: '企业'}], qryResnOptions: [{key: '1', value: '贷前'}, {key: '2', value: '贷中'}, {key: '3', value: '贷后'}, {key: '4', value: '关联查询'}], borrowRelOptions: [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '008', value: '法定代表，出资人及关联人等'}, {key: '009', value: '其他关系人'}], certTypeOptions: [{key: 'C', value: '户口簿'}, {key: 'A', value: '居民身份证'}, {key: 'B', value: '护照'}, {key: '11', value: '军人身份证件'}, {key: 'D', value: '港澳居民来往内地通行证'}, {key: 'E', value: '台湾同胞来往内地通行证'}, {key: '12', value: '外国人居留证'}, {key: 'Y', value: '警官证'}, {key: '13', value: '香港身份证'}, {key: '14', value: '澳门身份证'}, {key: '15', value: '台湾身份证'}, {key: '16', value: '其他证件'}], authbookContentOptions: [{key: '001', value: '审核本单位信贷业务申请'}, {key: '002', value: '审批本单位信贷业务'}, {key: '003', value: '审核本单位作为担保人'}, {key: '004', value: '对授权人已发放的信贷业务进行贷后风险管理'}, {key: '005', value: '涉及本单位的关联人的信贷业务或担保业务，需要查询本单位信用状况'}, {key: '006', value: '处理本单位的征信异议'}, {key: '007', value: '其他支行认为需要查询本单位的信用状况'}, {key: '008', value: '受理企业信用等级评定'}], approveStatusOptions: [{key: '000', value: '待发起'}, {key: '111', value: '审批中'}, {key: '997', value: '审批通过'}], qryStatusOptions: [{key: '001', value: '查询中'}, {key: '002', value: '查询失败'}, {key: '003', value: '已查询'}], qryFlagOptions: [{key: '01', value: '人工'}, {key: '02', value: '业务发起'}] },
      formRules: {
        certCode: [{validator: validator.numberAndLetter, message: '不是正确的证件号'}]
      },
      imageUrls: {},
      File: {},
      dataCode: null,
      requestUrl: this.$backend.cmisCus + '/api/cusbase/querybymodel',
      managerId: this.$store.state.oauth.loginCode,
      isChoose: 'qr'
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
      if (val.borrowRel == '001' && val.qryCls == '0') {
        this.isChoose = 'qrmi';
      } else if (val.borrowRel == '001' && val.qryCls == '1') {
        this.isChoose = 'qymi';
      } else if (val.borrowRel != '001' && val.qryCls == '0') {
        this.isChoose = 'qr';
      } else if (val.borrowRel != '001' && val.qryCls == '1') {
        this.isChoose = 'qy';
      } else {
        this.isChoose = 'qr';
      }

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
      this.formdata.qryCls = this.$xutils.getDefaultformulaData('0');
    },
    // 查询类型选择校验
    ChangeQryCls: function (qryCls) {
      if (qryCls == '0') {
        this.formdata.certType = '';
        this.formdata.borrowRel = '';
        this.dicOptions.certTypeOptions = [{key: 'C', value: '户口簿'}, {key: 'A', value: '居民身份证'}, {key: 'B', value: '护照'}, {key: '11', value: '军人身份证件'}, {key: 'D', value: '港澳居民来往内地通行证'}, {key: 'E', value: '台湾同胞来往内地通行证'}, {key: '12', value: '外国人居留证'}, {key: 'Y', value: '警官证'}, {key: '13', value: '香港身份证'}, {key: '14', value: '澳门身份证'}, {key: '15', value: '台湾身份证'}, {key: '16', value: '其他证件'}];
        this.dicOptions.borrowRelOptions = [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '008', value: '法定代表，出资人及关联人等'}, {key: '009', value: '其他关系人'}];
      } else {
        this.formdata.certType = '';
        this.formdata.borrowRel = '';
        this.formRules.certCode = [{validator: validator.numberAndLetter, message: '不是正确的证件号'}];
        this.dicOptions.certTypeOptions = [{key: '01', value: '机关和事业单位登记号'}, {key: '02', value: '社会团体登记号'}, {key: '03', value: '民办非企业登记号'}, {key: '04', value: '基金会登记号'}, {key: '05', value: '宗教证书登记号'}, {key: '06', value: '工商注册号'}, {key: 'P2', value: '中征码'}, {key: 'R', value: '统一社会信用代码'}, {key: 'Q', value: '组织机构代码'}, {key: '07', value: '纳税人识别号（国税）'}, {key: '08', value: '纳税人识别号（地税）'}, {key: 'M', value: '营业执照'}];
        this.dicOptions.borrowRelOptions = [{key: '001', value: '主借款人'}, {key: '005', value: '共同借款人'}, {key: '007', value: '担保人'}, {key: '003', value: '关联人'}];
      }
      if (this.paramsBillCard.flag == '合作方') {
        this.$data.dicOptions.borrowRelOptions = [{key: '001', value: '主借款人'}];
      }
    },
    // 证件类型选择校验
    ChangeCertType: function (certType) {
      // 身份证校验
      if (certType == 'A') {
        this.formRules.certCode = [{validator: validator.IDCard, message: '不是正确的身份证号码'}];
      } else {
        this.formRules.certCode = [{validator: validator.numberAndLetter, message: '不是正确的证件号'}];
      }
    },

    // 与主借款人关系
    ChangeBorrowRel: function (borrowRel) {
      if (borrowRel == '001' && this.paramsBillCard.borrowerCusId) {
        this.queryBorrowerInfo(this.paramsBillCard.borrowerCusId);
      } else {
        this.formdata.cusId = this.formdata.cusId ? this.formdata.cusId : null;
        this.formdata.cusName = this.formdata.cusName ? this.formdata.cusName : null;
        this.formdata.certType = this.formdata.certType ? this.formdata.certType : null;
        this.formdata.certCode = this.formdata.certCode ? this.formdata.certCode : null;
      }
    },

    queryBorrowerInfo (borrowerCusId) {
      var _this = this;
      // 根据客户编号查询证件类型
      yufp.service.request({
        async: false,
        method: 'POST',
        url: _this.$backend.cmisCus + '/api/cusbase/queryCus',
        data: borrowerCusId,
        callback: function (code, message, response) {
          if (code == '0') {
            _this.formdata.borrowerCertType = response.certType;
            _this.formdata.cusId = borrowerCusId;
            _this.formdata.cusName = response.cusName;
            _this.formdata.certType = response.certType;
            _this.formdata.certCode = response.certCode;
          }
        }
      });
    }
  }
};
</script>
