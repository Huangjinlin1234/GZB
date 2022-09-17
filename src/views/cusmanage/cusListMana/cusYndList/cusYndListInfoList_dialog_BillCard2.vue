<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="名单流水号" ctype="input" placeholder="名单流水号" name="serno" :colspan="24"></yu-xform-item>
          <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName"></yu-xform-item>
          <yu-xform-item label="身份证号码" ctype="input" placeholder="身份证号码" name="idcardNo"></yu-xform-item>
          <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="mobileNo"></yu-xform-item>
          <yu-xform-item label="性别" ctype="input" placeholder="性别" name="sex"></yu-xform-item>
          <yu-xform-item label="学历" ctype="input" placeholder="学历" name="edu"></yu-xform-item>
          <yu-xform-item label="有无子女" ctype="input" placeholder="有无子女" name="indivMarBaby"></yu-xform-item>
          <yu-xform-item label="婚姻状况" ctype="input" placeholder="婚姻状况" name="marStatus"></yu-xform-item>
          <yu-xform-item label="客户经理" ctype="input" placeholder="客户经理" name="managerId"></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg"></yu-xform-item>
          <yu-xform-item label="名单状态" ctype="select" name="listStatus" data-code="STD_CUS_STATE" placeholder="名单状态"></yu-xform-item>
          <yu-xform-item label="入库日期" ctype="input" placeholder="入库日期" name="storageDate"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
          <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="inputDate"></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId"></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId"></yu-xform-item>
          <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime"></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime"></yu-xform-item>
          <yu-xform-item label="经营地址" ctype="input" placeholder="经营地址" name="operAddr"></yu-xform-item>
          <yu-xform-item label="经营年限" ctype="input" placeholder="经营年限" name="operLmt"></yu-xform-item>
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
import { validator } from '@/utils/validate';
export default {
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstynd/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstynd/',
      formdata: {},
      formType: 'edit',
      formRules: {
        idcardNo: [{ validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur' }],
        mobileNo: [{ validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur' }],
        storageDate: [{ validator: validator.isDate, message: '不是正确的日期', trigger: 'blur' }]
      },
      imageUrls: {},
      File: {}
    };
  },
  methods: {}
};
</script>
