<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="2">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="申请流水号" ctype="input" placeholder="申请流水号" name="serno" hidden></yu-xform-item>
          <yu-xform-item label="合作方案编号" ctype="input" placeholder="合作方案编号" name="coopPlanNo" hidden></yu-xform-item>
          <yu-xform-item label="适用机构名称" name="suitOrgName" ctype="textarea" rules="required" placeholder="适用机构名称" disabled colspan="22"></yu-xform-item>
          <yu-xform-item label="" ctype="custom" name="custom" colspan="2">
            <yu-button @click="chooseOrgFn" type="primary">选择</yu-button>
          </yu-xform-item>
          <yu-xform-item label="适用机构编号" ctype="input" placeholder="适用机构编号" name="suitOrgNo" rules="required" disabled colspan="24"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="input" placeholder="登记日期" name="inputDate" hidden></yu-xform-item>
          <yu-xform-item label="最近修改人" ctype="input" placeholder="最近修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改机构" ctype="input" placeholder="最近修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最近修改日期" ctype="input" placeholder="最近修改日期" name="updDate" hidden></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
          <yu-xform-item label="创建时间" ctype="input" placeholder="创建时间" name="createTime" hidden></yu-xform-item>
          <yu-xform-item label="修改时间" ctype="input" placeholder="修改时间" name="updateTime" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('save')">确定</yu-button>
      <yu-button type="primary" @click="customClick('back')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form';
export default {
  name: 'D1BillCard',
  mixins: [mixinForm],
   props: {
    params: String
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisBiz + '/api/coopplansuitorginfo/update',
      addUrl: this.$backend.cmisBiz + '/api/coopplansuitorginfo/',
      formdata: {},
      formType: 'edit',
      formRules: { },
      imageUrls: {},
      File: {}
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.serno = this.$xutils.getSEQWithParamFromServer('COOP_SERNO');
      this.formdata.inputId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.inputDate = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updId = this.$xutils.getDefaultformulaData('$LoginLoginCode');
      this.formdata.updBrId = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.updDate = this.$xutils.getDefaultformulaData('$LoginOrgCode');
      this.formdata.createTime = this.$xutils.getDefaultformulaData('$CURRTIME');
      this.formdata.updateTime = this.$xutils.getDefaultformulaData('$CURRTIME');
    },
    // 选择任务
    chooseOrgFn: function () {
      var _this = this;
      const json = {
        isWholeBankSuit:_this.params
      };
      this.$dialog.open(
        '机构查询',
        'bizmanage/coopBiz/coopPlanApp/cooPlanOrgList',
        800,
        500,
        json,
        () => {
          this.makeData();
        },
        true,
        false
      );
    },
    makeData () {
      var _this = this;
      let orgIds = '';
      let orgNames = '';
      let data = _this.$route.params.selectedData;
      data.forEach(item => {
        orgIds = orgIds + ',' + item.orgId;
        orgNames = orgNames + ',' + item.orgName;
      });
      orgIds = orgIds.substring(1, orgIds.length);
      orgNames = orgNames.substring(1, orgNames.length);
      _this.formdata.suitOrgName = orgNames;
      _this.formdata.suitOrgNo = orgIds;
    }
  }
};
</script>
