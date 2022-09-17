<template>
  <div id="dialog_BillCard">
    <div id="dialog_BillCardContent">
      <yu-xform
        ref="refForm"
        label-width="120px"
        :form-type="formType"
        v-model="formdata"
        :rules="formRules"
        :form-change="triggerEditChangeEvent"
      >
        <yu-xform-group :column="3">
          <yu-xform-item
            label="序列号"
            ctype="input"
            placeholder="序列号"
            name="pkId"
            rules="required"
            hidden
          ></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="客户移交配置主表">
          <yu-xform-group :column="3">
            <yu-xform-item
              label="移交方式"
              ctype="select"
              name="handoverWay"
              rules="required"
              data-code="STD_ZB_HAND_TYP"
              placeholder="移交方式"
            ></yu-xform-item>
            <yu-xform-item
              label="移交范围"
              ctype="select"
              name="handoverScope"
              rules="required"
              data-code="STD_ZB_HAND_SCOP"
              placeholder="移交范围"
            ></yu-xform-item>
            <yu-xform-item
              label="扩展处理"
              ctype="input"
              placeholder="扩展处理"
              name="extClass"
              rules="required"
            ></yu-xform-item>
            <yu-xform-item
              label="备注"
              ctype="textarea"
              name="remark"
              placeholder="备注"
              :colspan="16"
            ></yu-xform-item>
            <yu-xform-item
              label="操作类型"
              ctype="select"
              name="oprType"
              hidden
              data-code="STD_ZB_OPR_TYPE"
              placeholder="操作类型"
            ></yu-xform-item>
            <yu-xform-item
              label="执行语句中变量使用说明"
              ctype="textarea"
              name="specification"
              placeholder="变量以冒号开头，各变量代表内容如下：serno：移交申请流水号，handoverid：移出人，handoversorg：移出机构，
receiveid：接收人，receivesorg：接收机构，cusid：客户码"
              disabled
              :colspan="16"
            ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
        <yu-panel title="登记信息" v-show="false">
          <yu-xform-group :column="3">
            <yu-xform-item
              label="登记人"
              ctype="input"
              placeholder="登记人"
              name="inputId"
            ></yu-xform-item>
            <yu-xform-item
              label="登记机构"
              ctype="input"
              placeholder="登记机构"
              name="inputBrId"
            ></yu-xform-item>
            <yu-xform-item
              label="登记日期"
              ctype="datepicker"
              name="inputDate"
              value-format="yyyy-MM-dd"
              disabled
              placeholder="登记日期"
            ></yu-xform-item>
            <yu-xform-item
              label="更新机构"
              ctype="input"
              placeholder="更新机构"
              name="updBrId"
            ></yu-xform-item>
            <yu-xform-item
              label="更新日期"
              ctype="datepicker"
              name="updDate"
              value-format="yyyy-MM-dd"
              disabled
              placeholder="更新日期"
            ></yu-xform-item>
            <yu-xform-item
              label="更新人"
              ctype="input"
              placeholder="更新人"
              name="updId"
            ></yu-xform-item>
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align: center">
      <yu-button type="primary" v-if="formType != 'details'" @click="onSaveData"
        >保存</yu-button
      >
      <yu-button type="primary" @click="onCancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
import mixinForm from "@/utils/mixins/mixin-form";
export default {
  name: "dialog_BillCard",
  mixins: [mixinForm],
  data: function () {
    return {
      updateUrl: this.$backend.cmisCfg + "/api/cfghandover/update",
      addUrl: this.$backend.cmisCfg + "/api/cfghandover/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {},
    };
  },
  methods: {
    execBillCardDefaultValueFormula: function () {
      this.formdata.pkId = this.$xutils.getDefaultformulaData("UUID");
      this.formdata.inputId = this.$xutils.getDefaultformulaData(
        "getLoginUserLoginCode()"
      );
      this.formdata.inputBrId = this.$xutils.getDefaultformulaData(
        "$LoginOrgCode"
      );
      this.formdata.inputDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.updBrId = this.$xutils.getDefaultformulaData(
        "$LoginOrgCode"
      );
      this.formdata.updDate = this.$xutils.getDefaultformulaData("$CURRTIME");
      this.formdata.updId = this.$xutils.getDefaultformulaData(
        "getLoginUserLoginCode()"
      );
      this.formdata.oprType = this.$xutils.getDefaultformulaData("01");
    },
  },
};
</script>