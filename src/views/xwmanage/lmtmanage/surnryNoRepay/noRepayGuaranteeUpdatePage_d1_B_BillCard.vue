<template>
  <div id="d1_B_BillCard">
    <div id="d1_B_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="押品统一编号" ctype="input" placeholder="押品统一编号" name="guarNo" hidden></yu-xform-item>
          <yu-xform-item label="共有人编号" ctype="input" placeholder="共有人编号" name="commonOwnerId" disabled></yu-xform-item>
          <yu-xform-item label="共有人客户名称" ctype="yu-xcustom" name="commonOwnerName" placeholder="共有人客户名称" @select-fn="commonSelectFn" :mapping="{'cusName':'commonOwnerName','certCode':'commonCertCode','cusId':'commonOwnerId'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="共有人证件类型 std_zb_c" ctype="input" placeholder="共有人证件类型 std_zb_c" name="commonCertType" hidden></yu-xform-item>
          <yu-xform-item label="共有人证件号码" ctype="input" placeholder="共有人证件号码" name="commonCertCode"></yu-xform-item>
          <yu-xform-item label="权属人类别 std_zb_own" ctype="input" placeholder="权属人类别 std_zb_own" name="ownerType" hidden></yu-xform-item>
          <yu-xform-item label="共有方式 std_zb_into" ctype="input" placeholder="共有方式 std_zb_into" name="intotalType" hidden></yu-xform-item>
          <yu-xform-item label="所占比例" ctype="input" placeholder="所占比例" name="commonHoldPortio" hidden></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_B_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisGuar + "/api/guarcommonowner/update",
      addUrl: this.$backend.cmisGuar + "/api/guarcommonowner/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{}
    }
  },
  methods: {
  }
}
</script>