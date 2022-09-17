<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="160px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" disabled hidden></yu-xform-item>
          <yu-xform-item label="合作方案编号" ctype="input" placeholder="合作方案编号" name="coopPlanNo" disabled hidden></yu-xform-item>
          <yu-xform-item label="合作方类型" ctype="select" name="partnerType" rules="required" disabled data-code="STD_PARTNER_TYPE" placeholder="合作方类型" @change="checkPartnerType"></yu-xform-item>
          <yu-xform-item label="合作方编号" ctype="input" placeholder="合作方编号" name="partnerNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="合作方名称" ctype="input" placeholder="合作方名称" name="partnerName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="证书类型" ctype="input" name="liceType" placeholder="证书类型" ></yu-xform-item>
          <yu-xform-item label="证书名称" ctype="input" placeholder="证书名称" name="liceName" rules="required" maxlength="100"></yu-xform-item>
          <yu-xform-item label="证书编号" ctype="input" placeholder="证书编号" name="liceNo" rules="required" maxlength="100"></yu-xform-item>
          <yu-xform-item label="资质等级" :ctype="aptiLvlCtype" name="aptiLvl"  placeholder="资质等级" data-code="STD_ZB_QUAL_LEVEL"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" name="aptiLiceRegiOrg" rules="required" placeholder="登记机构" ></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="aptiLiceRegiDate" value-format="yyyy-MM-dd" :rules="aptiLiceRegiDateRules" placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="到期日期" ctype="datepicker" name="aptiLiceEndDate" value-format="yyyy-MM-dd" :rules="aptiLiceEndDateRules" placeholder="到期日期"></yu-xform-item>
          <yu-xform-item label="资质说明" ctype="textarea" name="aptiDesc" placeholder="资质说明" :autosize="{ minRows: 3}" :colspan="24" maxlength="500"></yu-xform-item>
          <yu-xform-item label="是否我行信贷客户" ctype="input" placeholder="是否我行信贷客户" name="isBankCretCus" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" v-if="operate!='details'" @click="customClick('save')">保存</yu-button>
      <yu-button type="primary" @click="customClick('bycancel')">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_PARTNER_TYPE,STD_LICE_TYPE,STD_ZB_QUAL_LEVEL');
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    const _this = this;
    const aptiLiceRegiDate = function (rules, value, callback) {
      if (!value) {
        callback();
      }
      if (!_this.formdata.aptiLiceEndDate) {
        callback();
      }
      const st = new Date(value);
      const ed = new Date(_this.formdata.aptiLiceEndDate);
      if (st > ed) {
        callback(new Error('登记日期不能大于到期日期'));
      }
      callback();
    };

    const aptiLiceEndDate = function (rules, value, callback) {
      if (!value) {
        callback();
      }
      if (!_this.formdata.aptiLiceRegiDate) {
        callback();
      }
      const ed = new Date(value);
      const st = new Date(_this.formdata.aptiLiceRegiDate);
      if (ed < st) {
        callback(new Error('到期日期不能小于登记日期'));
      }

      callback();
    };
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopplanaptiinfo/update',
      addUrl: this.$backend.cmisBiz + '/api/coopplanaptiinfo/',
      formdata: {},
      formRules: {liceType:[{required: false, message: '字段不能为空'}], aptiLvl:[{required: false, message: '字段不能为空'}] },
      aptiLiceRegiDateRules: [{required: true, type: 'date', message: '字段不能为空'}, {validator: aptiLiceRegiDate, trigger: 'blur', type: 'date'}],
      aptiLiceEndDateRules: [{required: true, type: 'date', message: '字段不能为空'}, {validator: aptiLiceEndDate, trigger: 'blur', type: 'date'}],
      aptiLvlCtype: 'input'

    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$LoginOrgName');
      this.formdata.aptiLiceRegiDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      },
    checkPartnerType: function () {
      if (this.formdata.partnerType == 1) {
        this.setBillCardItemRequired('liceType;aptiLvl', true);
      }
      if (this.formdata.partnerType == 2) {
        this.setBillCardItemRequired('aptiLvl', true);
        this.aptiLvlCtype = 'select';
      }
    }
  }
};
</script>