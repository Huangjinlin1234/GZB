<template>
  <div id="d1_1_BillCard">
    <div id="d1_1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="业务流水号" ctype="input" placeholder="业务流水号" name="serno" disabled ></yu-xform-item>
          <yu-xform-item label="客户类型" ctype="input" placeholder="客户类型" name="cusType" disabled ></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" disabled ></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" disabled ></yu-xform-item>
          <yu-xform-item label="依存客户编号" ctype="input" placeholder="依存客户编号" name="depCusNo" disabled ></yu-xform-item>
          <yu-xform-item label="依存客户名称" ctype="input" placeholder="依存客户名称" name="depCusName" disabled ></yu-xform-item>
          <yu-xform-item label="经济依存客户识别因素" ctype="select" name="ecoDepCusDistFactor" disabled data-code="STD_LST_JJYC_CUS_DIST_FACTOR" placeholder="经济依存客户识别因素" :colspan="24"></yu-xform-item>
          <yu-xform-item label="情况说明" ctype="input" placeholder="情况说明" name="caseMome" disabled :colspan="24"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" disabled ></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" disabled ></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled ></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled ></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled ></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden ></yu-xform-item>
          <yu-xform-item label="状态" ctype="select" name="status" disabled hidden data-code="STD_ZB_STATUS" placeholder="状态" ></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden ></yu-xform-item>
          <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled hidden ></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden ></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled hidden ></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D11BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstjjyc/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstjjyc/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getDefaultformulaData('UUID');
    }
  }
};
</script>