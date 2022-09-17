<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="目录编号" ctype="input" placeholder="目录编号" name="catalogId" rules="required"></yu-xform-item>
          <yu-xform-item label="目录名称" ctype="input" placeholder="目录名称" name="catalogName" rules="required"></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="3">
          <yu-xform-item label="上级目录编码" ctype="yu-xprd-catalog" name="supCatalogId" placeholder="上级目录编码" @select-fn="commonSelectFn" :mapping="{'id':'supCatalogId','label':'supCatalogName','path':'catalogLevelId'}" width="480" height="480" ></yu-xform-item>
          <yu-xform-item label="上级目录名称" ctype="input" placeholder="上级目录名称" name="supCatalogName" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="3">
          <yu-xform-item label="目录层级" ctype="input" placeholder="目录层级" name="catalogLevelId" disabled :colspan="24"></yu-xform-item>
          <yu-xform-item label="备注" ctype="textarea" name="remark" placeholder="备注" :colspan="24"></yu-xform-item>
          <yu-xform-item label="登记人名称" ctype="input" placeholder="登记人名称" name="inputName" disabled></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记机构名称" ctype="input" placeholder="登记机构名称" name="inputBrName" disabled></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人名称" ctype="input" placeholder="最后修改人名称" name="updName" disabled></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构名称" ctype="input" placeholder="最后修改机构名称" name="updBrName" disabled></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" rules="required" disabled hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" disabled placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" name="oprType" hidden data-code="STD_ZB_OPR_TYPE" placeholder="操作类型"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center;">
      <yu-button type="primary" v-show="editable" @click="saveFn">保存</yu-button>
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from '@/utils/mixins/mixin-form'
export default{
  name: "dialog_BillCard",
  mixins:[mixinForm],
  props: {
    pageParams: null,
    dialogId: null,
    editable: {type:Boolean, default:true}
  },
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgprdcatalog/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgprdcatalog/",
      formdata : {},
      formType : 'edit',
      formRules: { },
      imageUrls:{},
      File:{},
    }
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    AfterInit: function() {
      let params = this.pageParams;
      let formDetail = this.$refs.refForm;
      if (params.flag === 'ADD') {
        this.execBillCardDefaultValueFormula();
      } else if (params.flag === 'EDIT') {
        formDetail.setFormData(params);
      } else {
        formDetail.setFormData(params);
        this.setItemEditable('*', false);
        this.editable = false;
      }
    },
    saveFn: function() {
      let params = this.pageParams;
      let url = this.updateUrl;
      let opType = '更新'
      if (params.flag === 'ADD') {
        url = this.addUrl;
      }
      this.$request({
        url: url,
        method: 'POST',
        data: this.formdata,
      }).then(res => {
        if (res.code === '0') {
          this.$message(opType + '成功!');
          this.$dialog.close(this.dialogId);
        }
      }).catch(() => {
        this.$message({ message: opType + '失败!', type: 'error' });
      });
    },
    execBillCardDefaultValueFormula:function() {
      this.formdata.catalogId = this.$xutils.getDefaultformulaData("SEQ:PRD_CATA")
      this.formdata.inputName = this.$xutils.getDefaultformulaData("$LoginUserName")
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.inputBrName = this.$xutils.getDefaultformulaData("$LoginOrgName")
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.updName = this.$xutils.getDefaultformulaData("$LoginUserName")
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode")
      this.formdata.updBrName = this.$xutils.getDefaultformulaData("$LoginOrgName")
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode")
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME")
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01")
    },
    onCancel: function () {
      this.$dialog.close(this.dialogId);
    }
  }
}
</script>
