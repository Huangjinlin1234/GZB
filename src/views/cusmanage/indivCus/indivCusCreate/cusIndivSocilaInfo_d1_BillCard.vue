<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="是否家庭成员" ctype="select" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否家庭成员" name="isFamilyMem"></yu-xform-item>
          <yu-xform-item label="与客户关系" ctype="select" rules="required" data-code="STD_ZB_SELFPER_REL_TYP" placeholder="与客户关系" name="indivCusRel"></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" colspan="10"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" colspan="2">
            <yu-button @click="getCusMsg" type="primary" size="small">获取</yu-button>
          </yu-xform-item>
          <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="name" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="性别" ctype="select" data-code="STD_ZB_SEX" placeholder="性别" name="sex"></yu-xform-item>
          <yu-xform-item label="年收入（元）" ctype="yu-num" placeholder="年收入（元）" name="yearn"></yu-xform-item>
          <yu-xform-item label="职业" ctype="select" data-code="STD_ZB_OCC" placeholder="职业" name="occu"></yu-xform-item>
          <yu-xform-item label="职务" ctype="select" data-code="STD_ZB_JOB_TTL" placeholder="职务" name="duty"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" placeholder="备注" name="remark"></yu-xform-item>
          <yu-xform-item label="关联客户编号" ctype="input" placeholder="关联客户编号" name="cusIdRel" hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="家庭成员编号" ctype="input" placeholder="家庭成员编号" name="famCusId" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="upddateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
    <yu-xdialog :visible.sync="visiable" width="500px" title="个人客户快捷创建">
        <yu-xform ref="createFormRef" v-model="dialogData" label-width="120px" :rules="dialogFormRules">
          <yu-xform-group :column="1">
            <yu-xform-item label="证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType"  @change="ChangeCertType"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required"></yu-xform-item>
            <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="cusName"></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
        <div style="text-align:center;">
          <el-button type="primary" @click="creat" size="small">创建</el-button>
          <el-button @click="back" size="small">返回</el-button>
        </div>
    </yu-xdialog>
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
      updateUrl: this.$backend.cmisCus + '/api/cusindivsocial/update',
      addUrl: this.$backend.cmisCus + '/api/cusindivsocial/',
      formdata: {},
      formType: 'edit',
      formRules: { yearn: [{validator: validator.number, message: '不是正确的数字', trigger: 'blur'}] },
      dialogFormRules: {},
      imageUrls: {},
      File: {},
      dialogData: {},
      visiable: false
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.upddateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    },

    getCusMsg () {
      var _this = this;
      var data = _this.$route.meta.params;
      var certType = this.formdata.certType;
      var certCode = this.formdata.certCode;
      if (!certType || !certCode) {
        this.$xutils.showMsgBox('提示', '请先填写：证件号码、证件类型！', 350, 150);
        return;
      }
      if(certCode == data.certCode){
        this.$xutils.showMsgBox('提示', '社会信息证件号码不能和客户本人证件号码相同！', 350, 150);
        return;
      }
      var rqData = {};
      rqData['certType'] = certType;
      rqData['certCode'] = certCode;
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindivsocial/getCusMsg',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          if (response.data) {
            var isFamilyMem = this.formdata.isFamilyMem;
            var indivCusRel = this.formdata.indivCusRel;
            yufp.extend(this.formdata, response.data);
            this.formdata.isFamilyMem = isFamilyMem;
            this.formdata.indivCusRel = indivCusRel;
            this.formdata.name = response.data.cusName;
          } else {
            this.visiable = true;
          }
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    creat () {
      var validate = false;
      this.$refs.createFormRef.validate(function (valid) {
        validate = valid;
      });
      if(!validate){
        return;
      }
      var rqData = this.dialogData;
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindivsocial/createCus',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          yufp.extend(this.formdata, response.data);
          this.formdata.name = response.data.cusName;
          this.visiable = false;
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    back () {
      this.visiable = false;
    },

    // 证件类型选择校验
    ChangeCertType: function (certType) {
      // 身份证校验
      if (certType == 'A') {
        this.dialogFormRules.certCode = [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}];
      } else {
        this.dialogFormRules.certCode = [];
      }
    }
  }
};
</script>
