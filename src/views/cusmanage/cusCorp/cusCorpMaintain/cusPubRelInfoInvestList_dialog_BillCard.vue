<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="被投资人客户编号" ctype="input" placeholder="被投资人客户编号" name="cusId" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="被投资企业名称(全称)" ctype="input" placeholder="被投资企业名称(全称)" name="cusNameRel" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="投资性质" ctype="select" rules="required" data-code="STD_ZB_COM_INV_TYP" placeholder="投资性质" name="comInvTyp" :colspan="12"></yu-xform-item>
          <yu-xform-item label="被投资企业证件类型" ctype="select" data-code="STD_ZB_CERT_TYP" placeholder="被投资企业证件类型" name="certType" exclude-key="A,B,C,D,E,F,G,H,I,J,K,L,O,S,T,W,X,Y"></yu-xform-item>
          <yu-xform-item label="被投资企业证件号码" ctype="input" placeholder="被投资企业证件号码" name="certCode" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="关联客户编号" ctype="input" placeholder="关联客户编号" name="cusIdRel" :colspan="12"></yu-xform-item>
          <yu-xform-item label="注册登记号" ctype="input" placeholder="注册登记号" name="regiNo" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="贷款卡号" ctype="input" placeholder="贷款卡号" name="lnCardNo" hidden :colspan="12"></yu-xform-item>
          <yu-xform-item label="出资方式" ctype="select" rules="required" data-code="STD_ZB_INVT_TYPE" placeholder="出资方式" name="invApp" :colspan="12"></yu-xform-item>
          <yu-xform-item label="币种" ctype="select" rules="required" data-code="STD_ZB_CUR_TYP" placeholder="币种" name="curType" :colspan="12"></yu-xform-item>
          <yu-xform-item label="投资金额(万元)" ctype="input" placeholder="投资金额(万元)" name="invAmt" rules="required" :colspan="12"></yu-xform-item>
          <yu-xform-item label="投资时间" ctype="datepicker" value-format="yyyy-MM-dd" :rules="invDtRules" placeholder="投资时间" name="invDt" :colspan="12"></yu-xform-item>
          <yu-xform-item label="所占比例" ctype="yu-interest-rate" placeholder="所占比例" name="invPerc" :rules="invPercRules"  :format-rate="true" sign="%" :multiple="100" :colspan="12"></yu-xform-item>
        </yu-xform-group> 
        <yu-xform-group :column="1">
          <yu-xform-item label="投资说明" ctype="textarea" placeholder="投资说明" name="invDesc"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" placeholder="备注" name="remark"></yu-xform-item>
        </yu-xform-group> 
        <yu-xform-group :column="2">
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" disabled hidden data-code=" STD_ZB_OPR_TYPE" placeholder="操作类型" name="oprType"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
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
yufp.lookup.reg('STD_ZB_CERT_TYP,STD_ZB_COM_INV_TYP,STD_ZB_CERT_TYP,STD_ZB_INVT_TYPE');
export default{
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuspubrelinvest/update',
      addUrl: this.$backend.cmisCus + '/api/cuspubrelinvest/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {},
      invDtRules: [
        {
          validator: this.checkDate,
          required: true,
          trigger: 'blur'
        }
      ],
      invPercRules: [
        { required: true, message: '必输不能为空' },
        { validator: this.checkInvPerc, trigger: 'blur' }
      ]
    };
  },
  methods: {
    checkDate: function (rule, value, callback) {
      if (value == '' || value == null) {
        callback(new Error('请选择投资时间'));
      } else {
        var startTime = new Date(value);
        var endTime = new Date();
        if (endTime > startTime) {
          callback();
        } else {
          callback(new Error('投资时间不能晚于当前时间'));
        }
      }
    },
    checkInvPerc: function (rule, value, callback) {
      if (!isNaN(value) && (value > 1 || value <= 0)) {
        callback(new Error('所占比例必须大于0%且小于等于100%'));
      } else {
        callback();
      }
    }
  }
};
</script>