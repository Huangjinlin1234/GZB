<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="120px" :form-type="formType" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="主键" ctype="input" placeholder="主键" name="pkId" hidden></yu-xform-item>
          <yu-xform-item label="关联左表指标配置编码" ctype="yu-xflex-query-grp" name="leftIndexCode" rules="required" placeholder="关联左表指标配置编码" @select-fn="commonSelectFn" :mapping="{ datasource: 'datasource', indexCode: 'leftIndexCode', alias: 'leftTableAlias', tableSour: 'leftTableName' }" width="680" height="480" :parms="{ createType: '1' }" :disabled="disabled"></yu-xform-item>
          <yu-xform-item label="关联左表表名" ctype="input" placeholder="关联左表表名" name="leftTableName" rules="required" disabled></yu-xform-item>
          <yu-xform-item label="表名（请勿删除，用于加载表字段时使用参照，必须使用该字段名）" ctype="input" placeholder="表名（请勿删除，用于加载表字段时使用参照，必须使用该字段名）" name="tablename" disabled hidden></yu-xform-item>
          <yu-xform-item label="数据源（请勿删除，用于加载表使用，传值必须用该名称）" ctype="input" placeholder="数据源（请勿删除，用于加载表使用，传值必须用该名称）" name="datasource" disabled hidden></yu-xform-item>
          <yu-xform-item label="左表别名" ctype="input" placeholder="左表别名" name="leftTableAlias" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="3">
          <yu-xform-item label="左表关联字段" ctype="yu-xflex-query-detls" placeholder="左表关联字段" name="leftColName" rules="required" @select-fn="commonSelectFn" :mapping="{ colNameEn: 'leftColName' }" width="480" height="480" :parms="parms" :disabled="disableds"></yu-xform-item>
          <yu-xform-item label="关联右表指标配置编码" ctype="yu-xflex-query-grp" name="rightIndexCode" rules="required" placeholder="关联右表指标配置编码" @select-fn="commonSelectFn" :mapping="{ datasource: 'datasource', indexCode: 'rightIndexCode', alias: 'rightTableAlias', tableSour: 'rightTableName' }" width="680" height="480" :parms="{ createType: '2' }" :disabled="disabled"></yu-xform-item>
          <yu-xform-item label="关联右表表名" ctype="input" placeholder="关联右表表名" name="rightTableName" rules="required" disabled></yu-xform-item>
        </yu-xform-group>
        <yu-xform-group :column="3">
          <yu-xform-item label="右表别名" ctype="input" placeholder="右表别名" name="rightTableAlias" disabled></yu-xform-item>
          <yu-xform-item label="右表关联字段" ctype="yu-xflex-query-detlsright" name="rightColName" rules="required" placeholder="右表关联字段" @select-fn="commonSelectFn" :mapping="{ colNameEn: 'rightColName' }" width="480" height="480" :parms="paemsright" :disabled="disableds"></yu-xform-item>
          <yu-xform-item label="关联方式" ctype="select" name="joinWay" rules="required" :options="dicOptions.joinWayOptions" placeholder="关联方式" :disabled="disableds"></yu-xform-item>
          <yu-xform-item label="登记人" ctype="input" placeholder="登记人" name="inputId" hidden></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构" name="inputBrId" hidden></yu-xform-item>
          <yu-xform-item label="登记日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" hidden placeholder="登记日期"></yu-xform-item>
          <yu-xform-item label="最后修改人" ctype="input" placeholder="最后修改人" name="updId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改机构" ctype="input" placeholder="最后修改机构" name="updBrId" hidden></yu-xform-item>
          <yu-xform-item label="最后修改日期" ctype="datepicker" name="updDate" value-format="yyyy-MM-dd" hidden placeholder="最后修改日期"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="input" placeholder="操作类型" name="oprType" hidden></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="customClick('onSave')" v-show="saveBtnShow">保存</yu-button>
      <yu-button type="primary" @click="customClick('onCancel')">返回</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";

export default {
  name: "d1_BillCard",
  mixins: [mixinForm],
  data: function() {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfgflexqryindrel/update",
      addUrl: this.$backend.cmisCfg + "/api/cfgflexqryindrel/",
      formdata: {},
      formType: "edit",
      dicOptions: { joinWayOptions: [{ key: "left join", value: "left join" }] },
      formRules: {},
      imageUrls: {},
      File: {},
      disableds: false,
      disabled: false,
      saveBtnShow: true,
      parms: {},
      paemsright: {}
    };
  },
  watch: {
    "formdata.leftIndexCode": function(newVal) {
      this.parms = { indexCode: newVal };
    },
    "formdata.rightIndexCode": function(newVal) {
      this.paemsright = { indexCode: newVal };
    }
  },
  methods: {
    execBillCardDefaultValueFormula: function() {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("UUID");
      this.formdata.inputId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.updId = this.$xutils.getDefaultformulaData("$LoginLoginCode");
      this.formdata.updBrId = this.$xutils.getDefaultformulaData("$LoginOrgCode");
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01");
    },
    dealEditButton(flag) {
      this.saveBtnShow = flag;
      this.disableds = true;
      this.disabled = true;
    },
    dealEditBillCard(flag) {
      this.disabled = flag;
    }
  }
};
</script>
