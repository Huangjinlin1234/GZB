<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="operate" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="名单流水号" ctype="input" placeholder="名单流水号" name="serno" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户姓名" ctype="input" placeholder="客户姓名" name="cusName" rules="required"></yu-xform-item>
          <yu-xform-item label="身份证号码" ctype="input" placeholder="身份证号码" name="idcardNo" rules="required"></yu-xform-item>
          <yu-xform-item label="手机号码" ctype="input" placeholder="手机号码" name="mobileNo" rules="required"></yu-xform-item>
          <yu-xform-item label="性别" ctype="select" name="sex" rules="required" data-code="STD_ZB_SEX" placeholder="性别"></yu-xform-item>
          <yu-xform-item label="学历" ctype="select" name="edu" rules="required" data-code="STD_ZB_EDU" placeholder="学历"></yu-xform-item>
          <yu-xform-item label="有无子女" ctype="select" name="isHaveChildren" rules="required" placeholder="有无子女"></yu-xform-item>
          <yu-xform-item label="婚姻状况" ctype="select" name="marStatus" rules="required" placeholder="婚姻状况"></yu-xform-item>
          <yu-xform-item label="经营地址" ctype="yu-xynd-info" name="operAddr" rules="required" placeholder="经营地址" @select-fn="commonSelectFn" :mapping="{'operAddr':'operAddr','managerId':'managerId'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="经营年限" ctype="input" placeholder="经营年限" name="operLmt" rules="required"></yu-xform-item>
          <yu-xform-item label="客户经理" ctype="yu-xynd-info" name="managerId" rules="required" placeholder="客户经理" @select-fn="commonSelectFn" :mapping="{'operAddr':'operAddr','managerId':'managerId'}" width="720" height="480" ></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="名单状态" ctype="select" name="listStatus" rules="required" placeholder="名单状态"></yu-xform-item>
          <yu-xform-item label="入库日期" ctype="input" placeholder="入库日期" name="storageDate"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId"></yu-xform-item>
          <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="inputDate"></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId"></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId"></yu-xform-item>
          <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" placeholder="操作类型"></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" disabled></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
import { validator } from '@/utils/validate';
export default{
  name: 'D1BillCard',
  mixins: [mixinForm],
  props: {
    operate: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstynd/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstynd/',
      formdata: {},
      formType: 'edit',
      formRules: {
        idcardNo: [{validator: validator.IDCard, message: '不是正确的身份证号码', trigger: 'blur'}],
        mobileNo: [{validator: validator.mobile, message: '不是正确的手机号', trigger: 'blur'}],
        storageDate: [{validator: validator.isDate, message: '不是正确的日期', trigger: 'blur'}] },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>