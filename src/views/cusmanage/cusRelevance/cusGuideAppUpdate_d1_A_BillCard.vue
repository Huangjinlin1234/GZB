<template>
  <div id="d1_A_BillCard">
    <yu-panel title="基本信息">
      <div id="d1_A_BillCardContent">
        <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
          <yu-xform-group :column="2">
            <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" disabled hidden></yu-xform-item>
            <yu-xform-item label="申请类型" ctype="input" placeholder="申请类型" name="appType" hidden></yu-xform-item>
            <yu-xform-item label="关联编号" ctype="input" placeholder="关联编号" name="correNo" disabled hidden></yu-xform-item>
            <yu-xform-item label="关联客户名称" ctype="input" placeholder="关联客户名称" name="correCusName" disabled rules="required"></yu-xform-item>
            <yu-xform-item label="关联客户编号" ctype="yu-xcustom-ref" name="correCusId" rules="required" disabled placeholder="关联客户编号" @select-fn="commonSelectFn" :mapping="{'cusId':'correCusId','cusName':'correCusName'}" width="800" height="500" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="自定义参照Title"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="1">
            <yu-xform-item label="申请原因" ctype="textarea" placeholder="申请原因" name="resnMemo" rules="required"></yu-xform-item>
          </yu-xform-group>
          <yu-xform-group :column="2">
            <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" disabled hidden></yu-xform-item>
            <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg" disabled hidden></yu-xform-item>
            <yu-xform-item label="审批状态" ctype="input" placeholder="审批状态" name="approveStatus" hidden></yu-xform-item>
            <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
            <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" rules="required" disabled></yu-xform-item>
            <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="lastUpdateId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="lastUpdateBrId" hidden></yu-xform-item>
            <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="lastUpdateDate" hidden></yu-xform-item>
            <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
            <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          </yu-xform-group>
        </yu-xform>
      </div>
    </yu-panel>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default{
  name: 'D1ABillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusrelcusapp/update',
      addUrl: this.$backend.cmisCus + '/api/cusrelcusapp/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
  }
};
</script>
