<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="高管人员信息新增">
          <yu-xform-group :column="2">
            <yu-xform-item label="权力机构" ctype="select" :rules="isRequired" data-code="STD_POWER_ORG_TYPE" placeholder="权力机构" name="clatmOrg"></yu-xform-item>
            <yu-xform-item label="高管类别" ctype="select" rules="required" data-code="STD_CROP_MRG_TYPE" placeholder="高管类别" name="mrgType"></yu-xform-item>
            <yu-xform-item label="高管证件类型" ctype="select" :rules="isRequired" data-code="STD_ZB_CERT_TYP" placeholder="高管证件类型" name="mrgCertType"></yu-xform-item>
            <yu-xform-item label="高管证件号码" ctype="input" :rules="isRequired" placeholder="高管证件号码" name="mrgCertCode" colspan="10"></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="2">
              <yu-button @click="getCusMsg" type="primary" size="small">获取</yu-button>
            </yu-xform-item>
            <yu-xform-item label="高管姓名" ctype="input" placeholder="高管姓名" name="mrgName" rules="required" ></yu-xform-item>
            <yu-xform-item label="关联客户编号" ctype="input" placeholder="关联客户编号" name="cusIdRel"  disabled hidden></yu-xform-item>
            <yu-xform-item label="高管客户编号" ctype="input" :rules="isRequired" placeholder="高管客户编号" name="cusId"></yu-xform-item>
            <yu-xform-item label="国别" ctype="select" :rules="isRequired" data-code="STD_ZB_COUNTRY" placeholder="国别" name="country"></yu-xform-item>
            <yu-xform-item label="性别" ctype="select" :rules="isRequired" data-code="STD_ZB_SEX" placeholder="性别" name="mrgSex"></yu-xform-item>
            <yu-xform-item label="出生日期" ctype="datepicker" :rules="isRequired" value-format="yyyy-MM-dd" placeholder="出生日期" name="mrgBday"></yu-xform-item>
            <yu-xform-item label="证件到期日" ctype="datepicker" :rules="isRequired" value-format="yyyy-MM-dd" placeholder="证件到期日" name="certIdate" ></yu-xform-item>
            <yu-xform-item label="高管职业" ctype="select" :rules="isRequired" data-code="STD_ZB_OCC" placeholder="高管职业" name="mrgOcc"></yu-xform-item>
            <yu-xform-item label="高管职务" ctype="select" :rules="isRequired" data-code="STD_ZB_JOB_TTL" placeholder="高管职务" name="mrgDuty"></yu-xform-item>
            <yu-xform-item label="高管职称 " ctype="select" :rules="isRequired" data-code="STD_ZB_TITLE" placeholder="高管职称 " name="mrgCrtf"></yu-xform-item>
            <yu-xform-item label="从业日期" ctype="datepicker" :rules="isRequired" value-format="yyyy-MM-dd" placeholder="从业日期" name="fjobDate"></yu-xform-item>
            <yu-xform-item label="高管学历" ctype="select"  data-code="STD_ZB_EDU" placeholder="高管学历"  :rules="isRequired" name="mrgEdt"></yu-xform-item>
            <yu-xform-item label="高管学位 " ctype="select" data-code="STD_ZB_DEGREE" placeholder="高管学位 " name="mrgDgr"></yu-xform-item>
            <yu-xform-item label="个人净资产" ctype="select" :rules="isRequired" data-code="STD_ZB_INDIV_AMT" placeholder="个人净资产" name="indivNas"></yu-xform-item>
            <yu-xform-item label="本地居住状况 " ctype="select" :rules="isRequired" data-code="STD_ZB_LOCAL_RS" placeholder="本地居住状况 " name="localResiStatus"></yu-xform-item>
            <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="resiAddr"></yu-xform-item>
            <yu-xform-item label="联系电话" ctype="input" placeholder="联系电话" name="mrgPhone" disabled hidden></yu-xform-item>
            <yu-xform-item label="持股比例" ctype="yu-num" placeholder="持股比例" name="shdPerc" sign="%" :multiple="100" rules="required"></yu-xform-item>
            <yu-xform-item label="控股类型" ctype="select" rules="required" data-code="STD_ZB_HOLD_TYPE" placeholder="控股类型" name="holdType"></yu-xform-item>
            <yu-xform-item label="签字样本开始日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="签字样本开始日期" name="signInitDate"></yu-xform-item>
            <yu-xform-item label="签字样本到期日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="签字样本到期日期" name="signEndDate"></yu-xform-item>
            <yu-xform-item label="授权书开始日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="授权书开始日期" name="accreditInitDate"></yu-xform-item>
            <yu-xform-item label="授权书到期日期" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="授权书到期日期" name="accreditEndDate"></yu-xform-item>
            <yu-xform-item label="工作简历" ctype="input" placeholder="工作简历" name="resume" disabled hidden></yu-xform-item>
            <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="select" disabled hidden data-code="STD_ZB_LOCAL_RS" placeholder="操作类型" name="oprType"></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('onBack')">返回</yu-button>
    </yu-form-buttons>
    <yu-xdialog :visible.sync="visiable" width="500px" title="个人客户快捷创建">
        <yu-xform v-model="dialogData" label-width="120px" related-table-name="refTable" :rules="dialogFormRules">
          <yu-xform-group :column="1">
            <yu-xform-item label="高管证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="高管证件类型" name="mrgCertType"  @change="ChangeCertType"></yu-xform-item>
            <yu-xform-item label="高管证件号码" ctype="input" placeholder="高管证件号码" name="mrgCertCode" rules="required"></yu-xform-item>
            <yu-xform-item label="高管姓名" ctype="input" placeholder="高管姓名" name="mrgName"></yu-xform-item>
            <yu-xform-item label="高管性别" ctype="select" data-code="STD_ZB_SEX" placeholder="高管性别" name="mrgSex"></yu-xform-item>
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
  props: {
    pageParams: Object,
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuscorpmgr/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorpmgr/',
      formdata: {},
      dialogData: {},
      formType: 'edit',
      formRules: {cusId: [{validator: validator.numberAndLetter, message: '不是正确的客户编号', trigger: 'blur'}]},
      dialogFormRules: {},
      imageUrls: {},
      File: {},
      visiable: false,
      isRequired: [{required: true, message: '字段不能为空'}]
    };
  },
  mounted () {
    if(this.pageParams && this.pageParams.bizType === 'A02') {
      this.isRequired = false
    }
  },
  methods: {
    getCusMsg () {
      var mrgCertType = this.formdata.mrgCertType;
      var mrgCertCode = this.formdata.mrgCertCode;
      if (!mrgCertType || !mrgCertCode) {
        this.$xutils.showMsgBox('提示', '请先填写：高管证件号码、高管证件类型！', 350, 150);
        return;
      }
      var rqData = {};
      rqData['certType'] = mrgCertType;
      rqData['certCode'] = mrgCertCode;
      this.$request({
        url: this.$backend.cmisCus + '/api/cusindiv/getCertByCodeAndType',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          if (response.data) {
            // yufp.extend(this.formdata, response.data);
            this.formdata.mrgName = response.data.cusName;
            this.formdata.cusId = response.data.cusId;
            this.formdata.country = response.data.nation;
            this.formdata.mrgSex = response.data.sex;
            this.formdata.mrgBday = response.data.indivDtOfBirth;
            this.formdata.certIdate = response.data.certEndDt;
          } else {
            this.visiable = true;
          }
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    creat () {
      var rqData = this.dialogData;
      this.$request({
        url: this.$backend.cmisCus + '/api/cuscorpmgr/sendEcif',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          this.formdata.mrgName = response.data.mrgName;
          this.formdata.cusId = response.data.cusId;
          this.formdata.country = response.data.country;
          this.formdata.mrgSex = response.data.mrgSex;
          this.formdata.mrgBday = response.data.mrgBday;
          this.formdata.certIdate = response.data.certIdate;
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