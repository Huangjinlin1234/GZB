<template>
  <div id="d1_BillCard">
    <div id="d1_BillCardContent">
      <yu-xform ref="refForm" label-width="140px" :disabled="formType == 'details'" v-model="formdata" :rules="formRules" :form-change="triggerEditChangeEvent">
        <yu-xform-group :column="3">
          <yu-xform-item label="押品编号" ctype="yu-xcustom-ref" name="guarNo" rules="required" placeholder="押品编号" @select-fn="commonSelectFn" :mapping="{ guarNo: 'guarNo', guarTypeCdCnname: 'guarTypeCdCnname', guarCusId: 'guarCusId', guarCusName: 'guarCusName', guarTypeCd: 'guarTypeCd' }" width="80%" height="550" pagePath="evalmanage/guarReevalApplyList/guarEvalApplyNoneEvalList" displayKey="guarNo"></yu-xform-item>
          <yu-xform-item label="担保分类代码" ctype="input" placeholder="担保分类代码" name="guarTypeCd" disabled></yu-xform-item>
          <yu-xform-item label="押品分类名称" ctype="input" placeholder="押品分类名称" name="guarTypeCdCnname" disabled></yu-xform-item>
          <yu-xform-item label="评估方式" ctype="select" name="evalWay" rules="required" data-code="STD_ZB_EVAL_INOUT_TYPE" placeholder="评估方式"></yu-xform-item>
        </yu-xform-group>
        <yu-panel title="登记信息" panel-type="simple">
          <yu-xform-group :column="3">
            <yu-xform-item label="经办人" ctype="input" placeholder="经办人" name="inputName" disabled></yu-xform-item>
            <yu-xform-item label="经办机构" ctype="input" placeholder="经办机构" name="inputBrName" disabled></yu-xform-item>
            <yu-xform-item label="经办日期" ctype="input" name="inputDate" disabled placeholder="经办日期"></yu-xform-item>
            <!-- <yu-xform-item label="经办日期" ctype="datepicker" name="inputDate" value-format="yyyy-MM-dd" disabled placeholder="经办日期"></yu-xform-item> -->
          </yu-xform-group>
        </yu-panel>
      </yu-xform>
    </div>
    <yu-form-buttons class="yubfp-button-group" style="text-align:center;">
      <yu-button type="primary" @click="nextStep" v-norepeat.loading="{timeout:200}">下一步</yu-button>
      <yu-button type="primary" @click="bycancel">取消</yu-button>
    </yu-form-buttons>
  </div>
</template>
<script>
yufp.lookup.reg("STD_ZB_EVAL_INOUT_TYPE,STD_ZB_APP_ST");
import mixinUtils from "@/utils/mixins/mixin-utils";
export default {
  components: {},
  mixins: [mixinUtils],
  props: {
    pageParams: Object,
    dialogId: String
  },

  data() {
    return {
      updateUrl: this.$backend.cmisEval + "/api/guarevalapp/update",
      addUrl: this.$backend.cmisEval + "/api/guarevalapp/",
      formdata: {},
      formType: "edit",
      formRules: {},
      imageUrls: {},
      File: {}
    };
  },
  mounted() {
    this.AfterInit();
  },
  methods: {
    // 押品初步估值申请
    AfterInit() {
      let userInfo = this.$store.state.oauth;
      this.formdata.inputName = userInfo.userName;
      this.formdata.inputId = userInfo.loginCode;
      this.formdata.inputBrName = userInfo.org.name;
      this.formdata.inputBrId = userInfo.org.code;
      this.formdata.inputDate = this.$xutils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date());
      this.formdata.oprType = "01";
    },

    // 新增页面
    nextStep() {
      let jsoPar = Object.assign({}, this.formdata);
      let validatedResult = false;
      this.$refs.refForm.validate(valid => {
        validatedResult = valid;
      });
      if (!validatedResult) {
        return;
      }

      // // 插入数据
      jsoPar.approveStatus = "000"; //审批状态(默认)
      this.$request({
        async: true,
        method: "POST",
        url: this.$backend.cmisEval + "/api/guarevalapp/add",
        data: jsoPar
      }).then(response => {
        if (response.code != 0) {
          this.$message.error("保存失败: " + response.message);
          return;
        }
        jsoPar["model_group_no"] = "CMG000132";
        jsoPar["op"] = "ADD";
        jsoPar["evalAppSerno"] = response.data.evalAppSerno;
        this.$dialog.open("押品价值初估", "cfgmanage/productconfig/templetfactory/tempetfactorypreviewIndex", -1, -1, jsoPar, null);
        this.$dialog.close(this.dialogId);
        
        this.$message.success("保存成功!");
      });
    },

    bycancel() {
      this.$dialog.close(this.dialogId);
    }
  }
};
</script>
