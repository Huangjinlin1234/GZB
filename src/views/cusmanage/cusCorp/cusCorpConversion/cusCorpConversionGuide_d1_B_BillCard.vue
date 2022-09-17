<template>
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-panel title="对公客户转正" panel-type="simple">
          <yu-xform-group :column="1" style="text-aglin:center;padding:0 20%">
            <yu-xform-item label="客户编号" ctype="yu-xetrs-cst1" :pageParams="{ cusRankCls: '02' }" rules="required" placeholder="客户编号" name="cusId" :colspan="24" @select-fn="commonSelectFn" :mapping="{ certType: 'certType', cusId: 'cusId', certCode: 'certCode', cusName: 'cusName', cusState: 'cusState' }" width="1200px" height="600px"></yu-xform-item>
            <yu-xform-item label="客户简称" ctype="input" placeholder="客户简称" name="cusShortName" hidden></yu-xform-item>
            <yu-xform-item label="客户类型" ctype="input" placeholder="客户类型" name="cusType" hidden></yu-xform-item>
            <yu-xform-item label="证件类型" ctype="select" rules="required" disabled data-code="STD_ZB_CERT_TYP" placeholder="证件类型" name="certType" :colspan="24"></yu-xform-item>
            <yu-xform-item label="证件号码" ctype="input" placeholder="证件号码" name="certCode" rules="required" disabled :colspan="24"></yu-xform-item>
            <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled :colspan="24"></yu-xform-item>
            <yu-xform-item label="开户日期" ctype="input" placeholder="开户日期" name="openDate" hidden></yu-xform-item>
            <yu-xform-item label="开户类型 std_zb_open" ctype="input" placeholder="开户类型 std_zb_open" name="openType" hidden></yu-xform-item>
            <yu-xform-item label="客户大类" ctype="input" placeholder="客户大类" name="cusCatalog" hidden></yu-xform-item>
            <yu-xform-item label="所属条线 std_zb_biz_" ctype="input" placeholder="所属条线 std_zb_biz_" name="belgLine" hidden></yu-xform-item>
            <yu-xform-item label="信用等级 std_zb_cred" ctype="input" placeholder="信用等级 std_zb_cred" name="cusCrdGrade" hidden></yu-xform-item>
            <yu-xform-item label="信用评定到期日期" ctype="input" placeholder="信用评定到期日期" name="cusCrdDt" hidden></yu-xform-item>
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" hidden></yu-xform-item>
            <yu-xform-item label="客户状态 std_zb_cus_" ctype="input" placeholder="客户状态 std_zb_cus_" name="cusState" hidden></yu-xform-item>
            <yu-xform-item label="主管机构" ctype="input" placeholder="主管机构" name="managerBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
            <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" hidden></yu-xform-item>
            <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" hidden></yu-xform-item>
            <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" hidden></yu-xform-item>
            <yu-xform-item label="操作类型  std_zb_opr" ctype="input" placeholder="操作类型  std_zb_opr" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="影像编号" ctype="input" placeholder="影像编号" name="imgNo" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
            <yu-xform-item label="业务类型" ctype="select" rules="required" disabled data-code="STD_ZB_CUS_BIZ_TYPE" placeholder="业务类型" name="bizType" :colspan="24"></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doNext')">下一步</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg('STD_CUS_STATE,STD_ZB_CUS_CLS,STD_ZB_CUS_TYP,STD_ZB_CERT_TYP');
export default {
  name: 'D1BBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusbase/update',
      addUrl: this.$backend.cmisCus + '/api/cusbase/',
      formdata: {},
      formType: 'edit',
      dicOptions: { cusRankClsOptions: [{ key: '0', value: '正式客户' }, { key: '1', value: '临时客户' }] },
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {}
};
</script>
