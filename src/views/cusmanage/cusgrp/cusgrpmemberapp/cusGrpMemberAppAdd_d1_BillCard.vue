<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="集团编号" ctype="input" placeholder="集团编号" name="grpNo" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="成员客户编号" ctype="yu-xcustom-ref" rules="required" placeholder="成员客户编号" name="cusId" @select-fn="commonSelectFn" :mapping="{'cusRankCls':'cusRankCls','cusId':'cusId','cusName':'cusName','cusType':'cusType','managerId':'managerId','managerBrId':'managerBrId','cusCatalog':'cusCatalog'}" width="1200" height="500" pagePath="cusmanage/cusRelevance/cusAllXuanQuIndexForAll" title="客户选取"></yu-xform-item>
          <yu-xform-item label="成员客户大类" ctype="select" disabled placeholder="成员客户大类" name="cusCatalog" data-code="STD_ZB_CUS_CATALOG"></yu-xform-item>
          <yu-xform-item label="成员客户类型" ctype="select" disabled placeholder="成员客户类型" name="cusType" data-code="STD_ZB_CUS_TYP"></yu-xform-item>
          <yu-xform-item label="成员客户名称" ctype="input" placeholder="成员客户名称" name="cusName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="集团关联关系类型" ctype="select" rules="required" disabled data-code="STD_ZB_GRP_CORRE_TYPE" placeholder="集团关联关系类型" name="grpCorreType"></yu-xform-item>
          <yu-xform-item label="集团关联关系描述" ctype="textarea" placeholder="集团关联关系描述" name="grpCorreDetail"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="input" placeholder="最后修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="确认状态" ctype="select" hidden placeholder="确认状态" name="conStatus"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="主管经理" ctype="input" placeholder="主管经理" name="managerId" hidden></yu-xform-item>
          <yu-xform-item label="主管部门" ctype="input" placeholder="主管部门" name="managerBrId" hidden></yu-xform-item>
          <yu-xform-item label="变更类型" ctype="input" placeholder="变更类型" name="" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
          <yu-xform-item label="客户状态" ctype="select" disabled hidden data-code="STD_ZB_CUS_CLS" placeholder="客户状态" name="cusRankCls"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('doSave')">保存</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
yufp.lookup.reg("STD_ZB_GRP_CORRE_TYPE,STD_ZB_CUS_TYP,STD_ZB_CUS_CATALOG");
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCus + '/api/cusgrpmemberapp/update',
      addUrl: this.$backend.cmisCus + '/api/cusgrpmemberapp/',
      formdata: {},
      formType: 'edit',
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData('SEQ:PK_VALUE');
      this.formdata.oprType = this.$xutils.getDefaultformulaData('01');
      this.formdata.modifyType = this.$xutils.getDefaultformulaData('02');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.managerId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.managerBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$CURRDATE');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    }
  }
};
</script>
