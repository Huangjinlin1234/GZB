<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" disabled hidden></yu-xform-item>
          <yu-xform-item label="是否家庭成员" ctype="select" name="isFamilyMem" rules="required" placeholder="是否家庭成员"></yu-xform-item>
          <yu-xform-item label="与客户关系" ctype="select" name="indivCusRel" rules="required" placeholder="与客户关系"></yu-xform-item>
          <yu-xform-item label="证件类型" ctype="select" name="certType" rules="required" placeholder="证件类型"></yu-xform-item>
          <yu-xform-item label="证件号码" ctype="yu-xsocial-relate" name="certNo" rules="required" placeholder="证件号码" @select-fn="commonSelectFn" :mapping="{'certNo':'certNo','cusId':'cusId','name':'name'}" width="480" height="480" ></yu-xform-item>
          <yu-xform-item label="姓名" ctype="input" placeholder="姓名" name="name" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户编号" ctype="input" placeholder="客户编号" name="cusId" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="性别" ctype="select" name="sex" placeholder="性别"></yu-xform-item>
          <yu-xform-item label="关联客户编号" ctype="input" placeholder="关联客户编号" name="correCusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="年收入（元）" ctype="input" placeholder="年收入（元）" name="yearn"></yu-xform-item>
          <yu-xform-item label="职业" ctype="select" name="occu" placeholder="职业"></yu-xform-item>
          <yu-xform-item label="职务" ctype="select" name="duty" placeholder="职务"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" disabled hidden></yu-xform-item>
          <yu-xform-item label="家庭成员编号" ctype="input" placeholder="家庭成员编号" name="famCusId" disabled hidden></yu-xform-item>
          <yu-xform-item label="备注" ctype="input" placeholder="备注" name="remark"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新日期" ctype="input" placeholder="更新日期" name="updDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" disabled hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="upddateTime" disabled hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('doBack')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "d1_BillCard",
  mixins:[mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + "/api/cusindivsocial/update",
      addUrl: this.$backend.cmisCus + "/api/cusindivsocial/",
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