<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="160px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="客户编号" ctype="yu-xcustom-ref" placeholder="客户编号" name="cusId" rules="required" @select-fn="commonSelectFn" :mapping="{listBelg:'listBelg',managerBrId:'belgOrg',innerEval:'innerEval',lmtAmt:'lmtAmt',cusId:'cusId',cusName:'cusName',managerId:'managerId'}" width="1200" height="600" pagePath="cusmanage/cusRelevance/cusXuanQuIndex" title="客户选取"></yu-xform-item>
          <yu-xform-item label="客户名称" ctype="input" placeholder="客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="客户规模" ctype="select" name="cusScale" data-code="STD_ZB_CUS_SCALE" rules="required" placeholder="客户规模"></yu-xform-item>
          <yu-xform-item label="是否优良信贷客户" ctype="select" name="isFineCretCus" rules="required" data-code="STD_ZB_YES_NO" placeholder="是否优良信贷客户"></yu-xform-item>
          <yu-xform-item label="授信金额" ctype="input" placeholder="授信金额" name="lmtAmt" rules="required"></yu-xform-item>
          <yu-xform-item label="内部评级" ctype="select" name="innerEval" data-code="STD_ZB_EVAL_RST" rules="required" placeholder="内部评级"></yu-xform-item>
          <yu-xform-item label="名单归属" ctype="select" name="listBelg" data-code="STD_LST_WHBXD_LIST_BELG" rules="required" placeholder="名单归属"></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerIdName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="管户客户经理" ctype="input" placeholder="管户客户经理" name="managerId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrg"  disabled hidden></yu-xform-item>
          <yu-xform-item label="所属机构" ctype="input" placeholder="所属机构" name="belgOrgName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="申请日期" ctype="datepicker" name="appDate" value-format="yyyy-MM-dd" disabled rules="required" placeholder="申请日期"></yu-xform-item>
          <!-- <yu-xform-item label="申请说明" ctype="textarea" name="appExpl" placeholder="申请说明" rules="required" :colspan="24"></yu-xform-item> -->
          <yu-xform-item label="状态" ctype="select" name="status" disabled data-code="STD_ZB_STATUS" placeholder="状态"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputIdName"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrIdName"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记时间" ctype="input" placeholder="登记时间" name="inputDate" disabled hidden></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="更新人" ctype="input" placeholder="更新人" name="updIdName" hidden></yu-xform-item>
          <yu-xform-item label="更新机构" ctype="input" placeholder="更新机构" name="updBrIdName" hidden></yu-xform-item>
          <yu-xform-item label="更新时间" ctype="input" placeholder="更新时间" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
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
yufp.lookup.reg('STD_ZB_CUS_SCALE,STD_ZB_YES_NO,STD_ZB_EVAL_RST,STD_ZB_EVAL_RST,STD_LST_WHBXD_LIST_BELG,STD_ZB_APPR_STATUS,STD_ZB_STATUS');
export default {
  name: 'DialogBillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cuslstwhbxd/update',
      addUrl: this.$backend.cmisCus + '/api/cuslstwhbxd/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {}
};
</script>