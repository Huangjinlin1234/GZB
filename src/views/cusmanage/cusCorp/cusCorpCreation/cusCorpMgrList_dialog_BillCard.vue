<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="高管人员信息">
          <yu-xform-group :column="2">
            <yu-xform-item label="权力机构" ctype="select" rules="required" data-code="STD_POWER_ORG_TYPE" placeholder="权力机构" name="clatmOrg"></yu-xform-item>
            <yu-xform-item label="高管客户编号" ctype="input" placeholder="高管客户编号" name="cusId" disabled hidden></yu-xform-item>
            <yu-xform-item label="高管类别" ctype="select" rules="required" data-code="STD_CROP_MRG_TYPE" placeholder="高管类别" name="mrgType"></yu-xform-item>
            <yu-xform-item label="高管证件号码" ctype="input" placeholder="高管证件号码" name="mrgCertCode" rules="required" colspan="10" disabled></yu-xform-item>
            <yu-xform-item label="" ctype="custom" colspan="2">
              <yu-button @click="getCusMsg" type="primary" size="small">获取</yu-button>
            </yu-xform-item>
            <yu-xform-item label="高管证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="高管证件类型" name="mrgCertType" disabled></yu-xform-item>
            <yu-xform-item label="高管姓名" ctype="input" placeholder="高管姓名" name="mrgName" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="关联客户编号" ctype="input" placeholder="关联客户编号" name="cusIdRel" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="国别" ctype="select" rules="required"  data-code="STD_ZB_COUNTRY" placeholder="国别" name="country"></yu-xform-item>
            <yu-xform-item label="性别" ctype="select" rules="required"  data-code="STD_ZB_SEX" placeholder="性别" name="mrgSex"></yu-xform-item>
            <yu-xform-item label="出生日期" ctype="input" placeholder="出生日期" name="mrgBday" rules="required" ></yu-xform-item>
            <yu-xform-item label="证件到期日" ctype="input" placeholder="证件到期日" name="certIdate" rules="required"></yu-xform-item>
            <yu-xform-item label="高管职业" ctype="select" rules="required" data-code="STD_ZB_OCC" placeholder="高管职业" name="mrgOcc"></yu-xform-item>
            <yu-xform-item label="高管职务" ctype="select" rules="required" data-code="STD_ZB_JOB_TTL" placeholder="高管职务" name="mrgDuty"></yu-xform-item>
            <yu-xform-item label="高管职称 " ctype="select" rules="required" data-code="STD_ZB_TITLE" placeholder="高管职称 " name="mrgCrtf"></yu-xform-item>
            <yu-xform-item label="高管学历" ctype="select" rules="required" data-code="STD_ZB_EDU" placeholder="高管学历" name="mrgEdt"></yu-xform-item>
            <yu-xform-item label="高管学位 " ctype="select" rules="required" data-code="STD_ZB_DEGREE" placeholder="高管学位 " name="mrgDgr"></yu-xform-item>
            <yu-xform-item label="从业日期" ctype="datepicker" value-format="yyyy-MM-dd" rules="required" placeholder="从业日期" name="fjobDate"></yu-xform-item>
            <yu-xform-item label="个人净资产" ctype="select" rules="required" data-code="STD_ZB_INDIV_AMT" placeholder="个人净资产" name="indivNas"></yu-xform-item>
            <yu-xform-item label="本地居住状况 " ctype="select" rules="required" data-code="STD_ZB_LOCAL_RS" placeholder="本地居住状况 " name="localResiStatus"></yu-xform-item>
            <yu-xform-item label="居住地址" ctype="input" placeholder="居住地址" name="resiAddr"></yu-xform-item>
            <yu-xform-item label="联系电话" ctype="input" placeholder="联系电话" name="mrgPhone" disabled hidden></yu-xform-item>
            <yu-xform-item label="持股比例" ctype="yu-num" placeholder="持股比例" name="shdPerc" sign="%" :multiple="100"></yu-xform-item>
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
      updateUrl: this.$backend.cmisCus + '/api/cuscorpmgr/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorpmgr/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    getCusMsg () {
      let _this = this;
      var mrgCertType = this.formdata.mrgCertType;
      var mrgCertCode = this.formdata.mrgCertCode;
      if (!mrgCertType || !mrgCertCode) {
        _this.$xutils.showMsgBox('提示', '请先填写：高管证件号码、高管证件类型！', 350, 150);
        return;
      }
      var rqData = {};
      rqData['certType'] = mrgCertType;
      rqData['certCode'] = mrgCertCode;
      _this.$request({
        url: _this.$backend.cmisCus + '/api/cusindiv/getCertByCodeAndType',
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          if (response.data) {
            _this.formdata.mrgName = response.data.cusName;
            _this.formdata.cusId = response.data.cusId;
            _this.formdata.country = response.data.nation;
            _this.formdata.mrgSex = response.data.sex;
            _this.formdata.mrgBday = response.data.indivDtOfBirth;
            _this.formdata.certIdate = response.data.certEndDt;
          } else {
            _this.formdata.mrgName = '';
            _this.formdata.cusId = '';
            _this.formdata.country = '';
            _this.formdata.mrgSex = '';
            _this.formdata.mrgBday = '';
            _this.formdata.certIdate = '';
          }
        } else {
          _this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },
  }
};
</script>