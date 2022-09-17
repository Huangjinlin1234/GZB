<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="出资人性质" ctype="select" rules="required" data-code="STD_ZB_INVT_TYP" placeholder="出资人性质" name="invtTyp" :colspan="12" @change="invtTypChange"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="2">
          <yu-xform-item label="出资人证件类型" ctype="select" data-code="STD_ZB_CERT_TYP" placeholder="出资人证件类型" name="certTyp" :colspan="12"></yu-xform-item>
          <yu-xform-item label="出资人证件号码 " ctype="input" placeholder="出资人证件号码 " name="certCode" :colspan="10"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" colspan="2" v-if="formType=='edit'" >
              <yu-button @click="getCusMsg" type="primary" size="small">获取</yu-button>
            </yu-xform-item>
          <yu-xform-item label="出资人名称" ctype="input" placeholder="出资人名称" name="invtName" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="关联客户编号" ctype="input" placeholder="关联客户编号" name="cusIdRel" hidden></yu-xform-item>
          <yu-xform-item label="出资人客户编号" ctype="input" placeholder="出资人客户编号" name="cusId" disabled></yu-xform-item>
          <yu-xform-item label="国别" ctype="select" data-code="STD_ZB_COUNTRY" placeholder="国别" name="country" :colspan="12"></yu-xform-item>
          <yu-xform-item label="出资性质" ctype="select" data-code="STD_ZB_INVT_TYPE" placeholder="出资性质" name="invtType" :colspan="12"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" data-code="STD_ZB_CUR_TYP" placeholder="币种" name="curType" :colspan="12"></yu-xform-item>
          <yu-xform-item label="出资金额" ctype="yu-currency" placeholder="出资金额 " name="invtAmt" :colspan="12" :min="0" @change="getInvtPerc()"></yu-xform-item>
          <yu-xform-item label="出资比例" ctype="yu-num" placeholder="出资比例" name="invtPerc" rules="required" :colspan="12" sign="%" :multiple="100" :min="0"></yu-xform-item>
          <yu-xform-item label="出资时间" ctype="datepicker" value-format="yyyy-MM-dd" placeholder="出资时间" name="invDate" :colspan="12"></yu-xform-item>
          <yu-xform-item label="出资说明" ctype="textarea" placeholder="出资说明" name="invtDesc" :colspan="24"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" placeholder="备注" name="remark" :colspan="24"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" disabled hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型" name="oprType"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="formType=='edit'" @click="customClick('onSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('onBack')">返回</yu-button>
    </yu-form-buttons>
    <yu-xdialog :visible.sync="visiable" width="500px" :title="客户快捷创建">
        <yu-xform v-model="dialogData" label-width="120px" related-table-name="refTable" :rules="dialogFormRules">
          <yu-xform-group :column="1">
            <yu-xform-item label="证件类型" ctype="select" rules="required" data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="mrgCertType"  @change="ChangeCertType"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="mrgCertCode" rules="required"></yu-xform-item>
            <yu-xform-item label="姓名" ctype="input" placeholder="高管姓名" name="mrgName"></yu-xform-item>
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
yufp.lookup.reg('STD_ZB_INVT_TYP,STD_ZB_CERT_TYP,STD_ZB_COUNTRY,STD_ZB_INVT_TYPE,STD_ZB_CUR_TYP');
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props:{
    formType:{
      type:String,
      default:'edit'
    }
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuscorpapital/update',
      addUrl: this.$backend.cmisCus + '/api/cuscorpapital/',
      formdata: {},
      formRules: { },
      imageUrls: {},
      File: {},
      visiable: false,
      getUrl: this.$backend.cmisCus + '/api/cusindiv/getCertByCodeAndType',
      creatUrl: this.$backend.cmisCus + '/api/cuscorpmgr/sendEcif',
      dialogData: null,
      dialogFormRules: [],
      totalInvtAmt: 0,
    };
  },
  methods: {
    invtTypChange (value) {
      if (value == '01') {
        this.getUrl = this.$backend.cmisCus + '/api/cusindiv/getCertByCodeAndType';
        this.creatUrl = this.$backend.cmisCus + '/api/cuscorpmgr/sendEcif';
      } else {
        this.getUrl = this.$backend.cmisCus + '/api/cuspubrelinvest/getRel';
        this.creatUrl = this.$backend.cmisCus + '/api/cuspubrelinvest/createCrop';
      }
    },

    getCusMsg () {
      var invtTyp = this.formdata.invtTyp;
      var mrgCertType = this.formdata.certTyp;
      var mrgCertCode = this.formdata.certCode;
      if (!mrgCertType || !mrgCertCode || !invtTyp) {
        this.$xutils.showMsgBox('提示', '请先填写：出资人性质、高管证件号码、高管证件类型！', 350, 150);
        return;
      }
      var rqData = {};
      rqData['certType'] = mrgCertType;
      rqData['certCode'] = mrgCertCode;
      this.$request({
        url: this.getUrl,
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          if (response.data) {
            if (invtTyp == '01') {
              this.formdata.cusId = response.data.cusId;
              this.formdata.mrgCertType = response.data.certType;
              this.formdata.mrgCertCode = response.data.certCode;
              this.formdata.invtName = response.data.cusName;
            } else {
              this.formdata.cusId = response.data.cusId;
              this.formdata.mrgCertType = response.data.certType;
              this.formdata.mrgCertCode = response.data.certCode;
              this.formdata.invtName = response.data.cusName;
            }
          } else {
            this.visiable = true;
          }
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    creat () {
      var rqData = {};
      var invtTyp = this.formdata.invtTyp;
      if (invtTyp == '01') {
        rqData = this.dialogData;
      } else {
        rqData['certType'] = this.dialogData.mrgCertType;
        rqData['certCode'] = this.dialogData.mrgCertCode;
        rqData['cusNameRel'] = this.dialogData.mrgName;
      }
      this.$request({
        url: this.creatUrl,
        method: 'post',
        data: rqData
      }).then((response) => {
        if (response.code === '0') {
          if (invtTyp == '01') {
            this.formdata.cusId = response.data.cusId;
            this.formdata.mrgCertType = response.data.certType;
            this.formdata.mrgCertCode = response.data.certCode;
            this.formdata.invtName = response.data.mrgName;
          } else {
            this.formdata.cusId = response.data.cusId;
            this.formdata.mrgCertType = response.data.certType;
            this.formdata.mrgCertCode = response.data.certCode;
            this.formdata.invtName = response.data.cusName;
          }
          this.visiable = false;
        } else {
          this.$xutils.showMsgBox('提示', response.message, 350, 150);
        }
      });
    },

    // 证件类型选择校验
    ChangeCertType: function (mrgCertType) {
      // 身份证校验
      if (mrgCertType == 'A') {
        this.dialogFormRules.mrgCertCode = [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}];
      } else {
        this.dialogFormRules.mrgCertCode = [];
      }
    },

    back () {
      this.visiable = false;
    },

    getInvtPerc () {
      let invtAmt = this.formdata.invtAmt;
      this.formdata.invtPerc = (parseFloat(invtAmt * 100) / parseFloat(this.totalInvtAmt * 100)).toFixed(2)
    }
  },

  mounted() {
    let _this = this;
    setTimeout(() => {
      let cusId = this.formdata.cusIdRel;
      yufp.service.request({
        method: 'POST',
        url: `${backend.cmisCus}/api/cuscorp/${cusId}`,
        data: {cusId: cusId},
        async: false,
        callback: function (code, message, response) {
          if (response.code == '0' && response.data) {
            _this.totalInvtAmt = response.data.regiCapAmt
          } else {
            _this.$message({type: 'error', message: '查询客户基础数据失败！'});
          }
        }
      });
    }, 500)
  }
};
</script>